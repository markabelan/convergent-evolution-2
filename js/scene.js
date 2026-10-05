import * as d3 from "d3";
import { DOMAIN_COLORS, TRAITS, TREE } from "./data.js";

const CASE_IDS = Object.values(TRAITS)
  .filter((trait) => trait.ancestor)
  .map((trait) => trait.id);

const DOMAIN_HEX = {
  eukaryotes: "#7fb389",
  archaea: "#d08458",
  bacteria: "#9aa8b8",
  root: "#e2b84a",
};

function hex(color) {
  if (typeof color === "string") return color;
  return `#${(color >>> 0).toString(16).padStart(6, "0")}`;
}

function flatten(node, parent = null, list = []) {
  node.parent = parent;
  list.push(node);
  (node.children ?? []).forEach((child) => flatten(child, node, list));
  return list;
}

function leavesOf(node) {
  const tips = [];
  const walk = (n) => {
    const kids = n.children ?? [];
    if (!kids.length) tips.push(n);
    else kids.forEach(walk);
  };
  walk(node);
  return tips;
}

function wrapAngle(angle) {
  return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}

function polar(r, angle) {
  return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

function layoutCladogram(root, rMax) {
  const hier = d3.hierarchy(root);
  d3.cluster()
    .size([2 * Math.PI, rMax])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.3))(hier);

  hier.each((d) => {
    d.data.angle = d.x - Math.PI / 2;
    d.data.r = d.y;
    const p = polar(d.data.r, d.data.angle);
    d.data.x = p.x;
    d.data.y = p.y;
  });

  const setSpan = (node) => {
    const kids = node.children ?? [];
    if (!kids.length) {
      node.angleMin = node.angle;
      node.angleMax = node.angle;
      return;
    }
    kids.forEach(setSpan);
    node.angleMin = d3.min(kids, (k) => k.angleMin);
    node.angleMax = d3.max(kids, (k) => k.angleMax);
  };
  setSpan(root);
}

function sampledArc(r, a0, a1) {
  const span = a1 - a0;
  if (r < 1.2 || Math.abs(span) < 0.01) return null;
  const steps = Math.max(12, Math.ceil((Math.abs(span) * r) / 3));
  const pts = d3.range(steps + 1).map((i) => {
    const a = a0 + (span * i) / steps;
    const p = polar(r, a);
    return `${p.x},${p.y}`;
  });
  return `M${pts.join("L")}`;
}

function nodeArcPath(node) {
  const a0 = node.angleMin ?? node.angle;
  const a1 = node.angleMax ?? node.angle;
  return sampledArc(node.r, a0, a1);
}

function sampleArcPoints(r, a0, a1) {
  let span = a1 - a0;
  while (span > Math.PI) span -= 2 * Math.PI;
  while (span < -Math.PI) span += 2 * Math.PI;
  if (r < 0.8 || Math.abs(span) < 0.006) return [];
  const steps = Math.max(8, Math.ceil((Math.abs(span) * r) / 2.5));
  return d3.range(1, steps + 1).map((i) => polar(r, a0 + (span * i) / steps));
}

function snakePoints(mrca, tip) {
  const chain = lineageFrom(mrca, tip).slice().reverse();
  const pts = [{ x: mrca.x, y: mrca.y }];
  let prev = mrca;
  chain.forEach((node) => {
    pts.push(...sampleArcPoints(prev.r, prev.angle, node.angle));
    pts.push({ x: node.x, y: node.y });
    prev = node;
  });
  return pts;
}

function pointsToPath(pts) {
  if (!pts.length) return "";
  return `M${pts.map((p) => `${p.x},${p.y}`).join("L")}`;
}

function easeSpin(t) {
  return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

function mrcaOf(a, b) {
  const seen = new Set();
  let n = a;
  while (n) {
    seen.add(n.id);
    n = n.parent;
  }
  n = b;
  while (n && !seen.has(n.id)) n = n.parent;
  return n;
}

function lineageFrom(ancestor, tip) {
  const nodes = [];
  let n = tip;
  while (n && n !== ancestor) {
    nodes.push(n);
    n = n.parent;
  }
  return nodes;
}

function shortestDelta(from, to) {
  let d = to - from;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

function traitFocus(trait, byId) {
  const examples = trait.examples
    .map((ex) => ({ ...ex, node: byId.get(ex.tip) }))
    .filter((ex) => ex.node);
  if (examples.length < 2) return null;
  const tips = examples.map((ex) => ex.node);
  const mrca = mrcaOf(tips[0], tips[1]);
  return { examples, tips, mrca };
}

function sortLeftRight(examples, rot) {
  return [...examples].sort((a, b) => {
    const xa = Math.cos(a.node.angle + rot) * a.node.r;
    const xb = Math.cos(b.node.angle + rot) * b.node.r;
    return xa - xb;
  });
}

export function createTreeScene(container, { onTraitChange } = {}) {
  const nodes = flatten(TREE);
  const byId = new Map(nodes.map((n) => [n.id, n]));

  let focusedTrait = null;
  let highlightFocus = null;
  let overlayOn = false;
  let cardsOn = false;
  let rMax = 220;
  let laidOut = false;
  let currentRot = 0;
  let seq = 0;
  const T_OUT = 140;
  const T_SPIN = 680;
  const T_SNAKE = 480;

  const wrap = d3.select(container).attr("class", "chronogram-wrap");
  const svg = wrap.append("svg").attr("class", "chronogram wheel").attr("aria-hidden", "true");
  const frameG = svg.append("g").attr("class", "chrono-frame");
  const rootG = frameG.append("g").attr("class", "chrono-zoom");
  const rimG = rootG.append("g").attr("class", "chrono-rim");
  const treeG = rootG.append("g").attr("class", "chrono-tree");
  const hotG = rootG.append("g").attr("class", "chrono-hot");
  const labelsG = frameG.append("g").attr("class", "chrono-labels");

  function frameMetrics() {
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 800;
    const stageBox = container.getBoundingClientRect();
    const pair = document.querySelector(".case-pair");
    const cardTop = pair
      ? pair.getBoundingClientRect().top - stageBox.top
      : h * 0.54;
    const lucaY = Math.max(4, h * 0.02);
    const radius = Math.max(280, cardTop - lucaY - 22);
    return {
      w,
      h,
      rMax: radius,
      ty: lucaY - h / 2,
    };
  }

  function layout() {
    const { w, h, rMax: radius, ty } = frameMetrics();
    svg.attr("viewBox", `${-w / 2} ${-h / 2} ${w} ${h}`).attr("width", w).attr("height", h);
    rMax = radius;
    frameG.attr("transform", `translate(0, ${ty})`);
    layoutCladogram(TREE, rMax);
    laidOut = true;
  }

  function frameOffset() {
    return frameMetrics().ty;
  }

  function htmlToFrame(el, { x: ox = 0.5, y: oy = 0 } = {}) {
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 800;
    const stageBox = container.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    return {
      x: box.left + box.width * ox - stageBox.left - w / 2,
      y: box.top + box.height * oy - stageBox.top - h / 2 - frameOffset(),
    };
  }

  function targetRotation(focus) {
    if (!focus) return currentRot;
    const mid = d3.mean(focus.tips, (d) => d.angle);
    return Math.PI / 2 - mid;
  }

  function applyRotation(rot) {
    currentRot = rot;
    rootG.attr("transform", `rotate(${(rot * 180) / Math.PI})`);
    placeLabels();
  }

  function placeAncestor(focus) {
    const el = document.querySelector(".case-ancestor");
    if (!el || !focus?.mrca) return;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 800;
    const p = polar(focus.mrca.r, focus.mrca.angle + currentRot);
    let x = w / 2 + p.x;
    let y = h / 2 + p.y + frameOffset();
    x = Math.max(200, Math.min(w - 200, x));
    const pair = document.querySelector(".case-pair");
    const stageBox = container.getBoundingClientRect();
    const cardTop = pair
      ? pair.getBoundingClientRect().top - stageBox.top
      : h * 0.58;
    if (y < 130) {
      el.style.left = `${x}px`;
      el.style.top = `${Math.min(cardTop - 120, Math.max(72, y + 16))}px`;
      el.style.transform = "translate(-50%, 0)";
    } else {
      let top = y - 10;
      if (top > cardTop - 16) top = Math.max(86, cardTop - 16);
      el.style.left = `${x}px`;
      el.style.top = `${top}px`;
      el.style.transform = "translate(-50%, -100%)";
    }
  }

  function placeLabels() {
    const rot = currentRot;
    const toScreen = (node, extra = 0) => polar(node.r + extra, node.angle + rot);

    const cladeNames = new Set(["bacteria", "archaea", "eukaryotes", "animals", "plants"]);
    const cladeNodes = nodes.filter((n) => cladeNames.has(n.id) && n.r > 18);
    labelsG
      .selectAll("text.clade")
      .data(cladeNodes, (d) => d.id)
      .join("text")
      .attr("class", "clade")
      .attr("x", (d) => toScreen(d, -12).x)
      .attr("y", (d) => toScreen(d, -12).y)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text((d) => d.name)
      .attr("opacity", 0.32);

    labelsG
      .selectAll("text.luca-label")
      .data([TREE])
      .join("text")
      .attr("class", "luca-label")
      .attr("x", 0)
      .attr("y", -14)
      .attr("text-anchor", "middle")
      .text("LUCA")
      .attr("opacity", 0.4);

    const cards = [...document.querySelectorAll(".case-card")];
    const ordered = overlayOn && highlightFocus ? sortLeftRight(highlightFocus.examples, rot) : [];
    const links = ordered.slice(0, 2).map((ex, i) => {
      const card = cards[i];
      if (!card) return null;
      return {
        id: ex.tip,
        from: toScreen(ex.node),
        to: htmlToFrame(card, { x: 0.5, y: 0 }),
      };
    }).filter(Boolean);

    labelsG
      .selectAll("path.callout-line")
      .data(cardsOn && overlayOn ? links : [], (d) => d.id)
      .join("path")
      .attr("class", "callout-line")
      .attr("fill", "none")
      .attr("stroke", "#e2b84a")
      .attr("stroke-width", 1.2)
      .attr("stroke-dasharray", "3.5 4.5")
      .attr("d", (d) => {
        const midY = (d.from.y + d.to.y) / 2;
        return `M${d.from.x},${d.from.y} Q ${d.from.x},${midY} ${d.to.x},${d.to.y}`;
      })
      .attr("opacity", cardsOn && overlayOn ? 0.72 : 0);

    const ancestor = document.querySelector(".case-ancestor");
    if (ancestor) ancestor.style.opacity = overlayOn && highlightFocus ? "1" : "0";
    if (overlayOn && highlightFocus) placeAncestor(highlightFocus);
  }

  function paint({ focus = null, duration = 0, snakeDuration = 0 } = {}) {
    if (!laidOut) layout();
    highlightFocus = focus;
    overlayOn = Boolean(focus);
    const snakes = focus?.mrca
      ? (focus.tips ?? [])
          .map((tip) => {
            const d = pointsToPath(snakePoints(focus.mrca, tip));
            return d ? { id: tip.id, d } : null;
          })
          .filter(Boolean)
      : [];
    const treeOp = 0.9;
    const arcOp = 0.82;
    const tipDelay = snakeDuration > 0 ? Math.max(0, snakeDuration - 140) : 0;
    const tipDur = snakeDuration > 0 ? 140 : Math.max(duration, 1);

    rimG
      .selectAll("circle.wheel-rim")
      .data([rMax])
      .join("circle")
      .attr("class", "wheel-rim")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", (d) => d)
      .attr("fill", "none")
      .attr("stroke", "rgba(244,239,226,0.16)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3 8");

    const internals = nodes.filter((n) => n.children?.length && n.r > 0.8);
    const spokes = [];
    nodes.forEach((node) => {
      if (!node.parent) return;
      spokes.push({
        id: `${node.parent.id}>${node.id}`,
        node,
        parent: node.parent,
      });
    });

    const spokeSel = treeG
      .selectAll("line.spoke")
      .data(spokes, (d) => d.id)
      .join("line")
      .attr("class", "spoke")
      .attr("x1", (d) => polar(d.parent.r, d.node.angle).x)
      .attr("y1", (d) => polar(d.parent.r, d.node.angle).y)
      .attr("x2", (d) => d.node.x)
      .attr("y2", (d) => d.node.y);
    spokeSel
      .attr("stroke", (d) => hex(DOMAIN_COLORS[d.node.domain] ?? DOMAIN_HEX.eukaryotes))
      .attr("stroke-width", 1.15)
      .attr("opacity", treeOp);

    const arcSel = treeG
      .selectAll("path.node-arc")
      .data(internals, (d) => d.id)
      .join("path")
      .attr("class", "node-arc")
      .attr("d", nodeArcPath)
      .attr("fill", "none")
      .attr("stroke-linecap", "round");
    arcSel
      .attr("stroke", (d) => hex(DOMAIN_COLORS[d.domain] ?? DOMAIN_HEX.eukaryotes))
      .attr("stroke-width", 1.2)
      .attr("opacity", arcOp);

    treeG
      .selectAll("circle.luca")
      .data([TREE])
      .join("circle")
      .attr("class", "luca")
      .attr("r", 4.5)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("fill", "#e2b84a")
      .attr("opacity", 0.7);

    const selectedTips = focus?.tips ?? [];
    treeG
      .selectAll("circle.tip")
      .data(selectedTips, (d) => d.id)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "tip")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("fill", "#e2b84a")
            .attr("r", 0)
            .attr("opacity", 0)
            .call((s) =>
              s
                .transition()
                .delay(tipDelay)
                .duration(tipDur)
                .ease(d3.easeCubicOut)
                .attr("r", 5.4)
                .attr("opacity", 1)
            ),
        (update) =>
          update
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("fill", "#e2b84a")
            .attr("r", 5.4)
            .attr("opacity", 1),
        (exit) =>
          exit
            .interrupt()
            .transition()
            .duration(Math.min(duration || 120, 120))
            .attr("opacity", 0)
            .attr("r", 0)
            .remove()
      );

    const snakeSel = hotG.selectAll("path.snake").data(snakes, (d) => d.id);
    snakeSel.join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "snake")
          .attr("fill", "none")
          .attr("stroke", "#e2b84a")
          .attr("stroke-width", 2.6)
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round")
          .attr("d", (d) => d.d)
          .attr("opacity", 1)
          .each(function () {
            const len = this.getTotalLength();
            const start = snakeDuration > 0 ? len : 0;
            d3.select(this)
              .attr("stroke-dasharray", `${len} ${len}`)
              .attr("stroke-dashoffset", start);
            if (snakeDuration > 0) {
              d3.select(this)
                .transition()
                .duration(snakeDuration)
                .ease(d3.easeCubicInOut)
                .attr("stroke-dashoffset", 0);
            }
          }),
      (update) =>
        update.attr("d", (d) => d.d).each(function () {
          const len = this.getTotalLength();
          d3.select(this)
            .interrupt()
            .attr("stroke-dasharray", `${len} ${len}`)
            .attr("stroke-dashoffset", 0)
            .attr("opacity", 1);
        }),
      (exit) =>
        exit
          .interrupt()
          .transition()
          .duration(duration)
          .attr("opacity", 0)
          .remove()
    );

    hotG
      .selectAll("circle.mrca")
      .data(focus?.mrca ? [focus.mrca] : [], (d) => d.id)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "mrca")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 7)
            .attr("fill", "#111f16")
            .attr("stroke", "#e2b84a")
            .attr("stroke-width", 2.2)
            .attr("opacity", 0)
            .call((s) => s.transition().duration(Math.min(duration || 120, 120)).attr("opacity", 1)),
        (update) => update.attr("cx", (d) => d.x).attr("cy", (d) => d.y).transition().duration(duration).attr("opacity", 1),
        (exit) => exit.transition().duration(duration).attr("opacity", 0).remove()
      );

    hotG
      .selectAll("path.mrca-mark")
      .data(focus?.mrca ? [focus.mrca] : [], (d) => d.id)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "mrca-mark")
            .attr("d", (d) => `M ${d.x - 3.2} ${d.y} L ${d.x + 3.2} ${d.y}`)
            .attr("stroke", "#e2b84a")
            .attr("stroke-width", 1.6)
            .attr("stroke-linecap", "round")
            .attr("opacity", 0)
            .call((s) => s.transition().duration(Math.min(duration || 120, 120)).attr("opacity", 1)),
        (update) => update.transition().duration(duration).attr("opacity", 1),
        (exit) => exit.transition().duration(duration).attr("opacity", 0).remove()
      );

    placeLabels();
  }

  function overlayEl() {
    return document.querySelector("#case-figure");
  }

  function setOverlayVisible(on) {
    cardsOn = on;
    overlayEl()?.classList.toggle("is-revealed", on);
    placeLabels();
  }

  function emitSelect(trait) {
    onTraitChange?.(trait, { phase: "select" });
  }

  function emitReveal(trait) {
    const focus = trait ? traitFocus(trait, byId) : null;
    const rot = targetRotation(focus);
    const examples = focus ? sortLeftRight(focus.examples, rot) : [];
    onTraitChange?.(trait, { phase: "reveal", examples, mrca: focus?.mrca ?? null });
  }

  function spinTo(focus, duration) {
    const target = targetRotation(focus);
    const delta = shortestDelta(currentRot, target);
    d3.select(container).interrupt();
    if (Math.abs(delta) < 0.02) {
      applyRotation(target);
      return Promise.resolve();
    }
    const from = currentRot;
    return new Promise((resolve) => {
      d3.select(container)
        .transition()
        .duration(duration)
        .ease(easeSpin)
        .tween("spin", () => (t) => {
          applyRotation(from + delta * t);
        })
        .on("end", () => {
          applyRotation(from + delta);
          resolve();
        })
        .on("interrupt", () => resolve());
    });
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function playSwitch(trait, { intro = false } = {}) {
    const id = ++seq;
    const focus = traitFocus(trait, byId);
    if (!laidOut) layout();

    if (!intro) {
      setOverlayVisible(false);
      paint({ focus: null, duration: T_OUT });
      await wait(T_OUT);
      if (id !== seq) return;
      emitReveal(trait);
    } else {
      setOverlayVisible(false);
      paint({ focus: null, duration: 0 });
      emitReveal(trait);
    }

    await spinTo(focus, T_SPIN);
    if (id !== seq) return;

    paint({ focus, duration: 0, snakeDuration: T_SNAKE });
    await wait(T_SNAKE);
    if (id !== seq) return;
    setOverlayVisible(true);
  }

  function setTrait(traitId) {
    const trait = TRAITS[traitId];
    if (!trait) return null;
    const intro = focusedTrait == null;
    const changed = focusedTrait !== traitId;
    focusedTrait = traitId;
    emitSelect(trait);
    if (!changed && !intro) {
      const focus = traitFocus(trait, byId);
      emitReveal(trait);
      setOverlayVisible(true);
      paint({ focus, duration: 0 });
      applyRotation(targetRotation(focus));
      return trait;
    }
    playSwitch(trait, { intro });
    return trait;
  }

  const ro = new ResizeObserver(() => {
    layout();
    paint({
      focus: highlightFocus,
      duration: 0,
    });
    applyRotation(currentRot);
  });
  ro.observe(container);
  layout();
  paint({ focus: null, duration: 0 });

  return {
    setTrait,
    getActiveTrait: () => focusedTrait,
    dispose() {
      ro.disconnect();
      wrap.selectAll("*").remove();
    },
  };
}
