import { createTreeScene } from "./scene.js";
import { DEMOS } from "./demos.js";

const stage = document.querySelector("#tree-root");
const figure = document.querySelector("#case-figure");
const kicker = figure.querySelector(".case-kicker");
const ancestorKicker = figure.querySelector(".case-ancestor-kicker");
const ancestorBody = figure.querySelector(".case-ancestor-body");
const solutionKicker = figure.querySelector(".case-solution-kicker");
const solutionBody = figure.querySelector(".case-solution-body");
const cards = [...figure.querySelectorAll(".case-card")];
const buttons = [...document.querySelectorAll(".trait")];

function renderCase(trait, extras = {}) {
  const examples = extras.examples?.length ? extras.examples : trait.examples;
  kicker.textContent = trait.label;

  ancestorKicker.innerHTML = `${trait.ancestor.kicker} <span class="case-lacked">${trait.ancestor.lacked}</span>`;
  ancestorBody.textContent = trait.ancestor.body;
  solutionKicker.textContent = trait.solution.kicker;
  solutionBody.textContent = trait.solution.body;

  cards.forEach((card, i) => {
    const ex = examples[i];
    if (!ex) return;
    card.setAttribute("aria-label", ex.name);
    card.querySelector(".case-demo").innerHTML = DEMOS[ex.demo] ?? "";
    const nameEl = card.querySelector(".case-name");
    nameEl.replaceChildren(ex.name);
    if (ex.latin) {
      nameEl.append(" ");
      const latin = document.createElement("em");
      latin.className = "case-latin";
      latin.textContent = ex.latin;
      nameEl.append(latin);
    }
    card.querySelector(".case-need").textContent = ex.need ?? ex.env ?? "";
    card.querySelector(".case-blurb").textContent = ex.blurb;
  });
}

const scene = createTreeScene(stage, {
  onTraitChange(trait, extras = {}) {
    if (!trait) return;
    buttons.forEach((btn) => {
      const on = btn.dataset.trait === trait.id;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (extras.phase === "reveal") renderCase(trait, extras);
  },
});

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    scene.setTrait(btn.dataset.trait);
  });
});

scene.setTrait("echolocation");
