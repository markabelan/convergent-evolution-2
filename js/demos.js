export const DEMOS = {
  bat: `
<svg class="demo-svg is-air" viewBox="0 0 320 168" aria-hidden="true">
  <defs>
    <radialGradient id="air-glow" cx="68%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#e2b84a" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#e2b84a" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="320" height="168" fill="url(#air-glow)" />
  <g fill="#f4efe2" opacity="0.35">
    <circle cx="28" cy="18" r="1" />
    <circle cx="62" cy="12" r="0.6" />
    <circle cx="108" cy="22" r="0.8" />
    <circle cx="168" cy="10" r="0.5" />
    <circle cx="214" cy="20" r="0.9" />
    <circle cx="268" cy="14" r="0.6" />
    <circle cx="296" cy="28" r="0.7" />
  </g>
  <g class="sonar sonar-out" transform="translate(128,88)">
    <path class="ring delay-0" d="M 8,-12 A 22 22 0 0 1 8,12" />
    <path class="ring delay-1" d="M 14,-28 A 46 46 0 0 1 14,28" />
    <path class="ring delay-2" d="M 20,-44 A 70 70 0 0 1 20,44" />
    <path class="ring delay-3" d="M 26,-60 A 94 94 0 0 1 26,60" />
  </g>
  <g class="sonar sonar-back" transform="translate(128,88)">
    <path class="ring delay-2" d="M 110,-16 A 32 32 0 0 0 110,16" />
    <path class="ring delay-3" d="M 86,-28 A 56 56 0 0 0 86,28" />
  </g>
  <g transform="translate(242,44)">
    <g class="prey" fill="#f4efe2">
      <ellipse cx="0" cy="0" rx="6" ry="3.6" />
      <ellipse cx="-7" cy="-4" rx="8" ry="4" transform="rotate(-28)" opacity="0.85" />
      <ellipse cx="-7" cy="4" rx="8" ry="4" transform="rotate(28)" opacity="0.85" />
      <circle cx="5" cy="-1" r="1.1" />
    </g>
  </g>
  <g fill="#cfc6b0" transform="translate(22,70)">
    <path d="M18 40 C 28 18 58 8 86 22 C 108 8 132 14 148 28 L 134 32 C 122 22 108 24 98 32 C 118 30 138 40 150 56 C 128 42 108 44 94 40 C 88 54 74 66 54 74 C 68 58 74 46 78 36 C 58 42 36 44 18 40 Z" />
    <ellipse cx="92" cy="30" rx="14" ry="9" />
    <path d="M88 20 L90 8 L96 20 Z" />
    <path d="M96 18 L102 6 L104 20 Z" />
  </g>
  <g class="callout" fill="#e2b84a">
    <text x="104" y="52">Larynx</text>
    <text x="242" y="82">Moth</text>
    <text x="36" y="64">Ears</text>
  </g>
</svg>`,

  dolphin: `
<svg class="demo-svg is-sea" viewBox="0 0 320 168" aria-hidden="true">
  <defs>
    <radialGradient id="sea-glow" cx="64%" cy="42%" r="58%">
      <stop offset="0%" stop-color="#8ecae6" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#8ecae6" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="320" height="168" fill="url(#sea-glow)" />
  <g opacity="0.14" stroke="#8ecae6" fill="none" stroke-width="1">
    <path d="M0 36 Q 70 28 140 40 T 320 34" />
    <path d="M0 96 Q 80 88 160 100 T 320 94" />
    <path d="M0 148 Q 70 156 150 146 T 320 152" />
  </g>
  <g class="sonar sonar-out" transform="translate(132,88)">
    <path class="ring delay-0" d="M 12,-12 A 24 24 0 0 1 12,12" />
    <path class="ring delay-1" d="M 18,-28 A 48 48 0 0 1 18,28" />
    <path class="ring delay-2" d="M 24,-44 A 72 72 0 0 1 24,44" />
    <path class="ring delay-3" d="M 30,-60 A 96 96 0 0 1 30,60" />
  </g>
  <g class="sonar sonar-back" transform="translate(132,88)">
    <path class="ring delay-2" d="M 96,-14 A 28 28 0 0 0 96,14" />
    <path class="ring delay-3" d="M 72,-26 A 52 52 0 0 0 72,26" />
  </g>
  <g transform="translate(250,58)">
    <g class="prey" fill="#8ecae6">
      <ellipse cx="0" cy="0" rx="13" ry="6" />
      <path d="M-13 0 L-23 -6 L-21 0 L-23 6 Z" />
      <circle cx="6" cy="-1.5" r="1.1" fill="#0a2428" />
    </g>
  </g>
  <g fill="#cfc6b0" transform="translate(12,70)">
    <path d="M28 36 C 52 14 98 8 140 22 C 164 32 186 46 196 56 C 186 52 172 54 160 60 C 174 66 184 78 188 90 C 170 76 150 74 132 76 C 126 98 112 118 90 128 C 106 106 110 84 108 66 C 84 70 58 68 34 54 C 18 60 6 72 0 84 C 12 66 20 50 28 36 Z" />
    <path d="M148 18 C 154 4 162 -6 166 16 C 158 14 152 16 148 18 Z" />
  </g>
  <g class="callout" fill="#8ecae6">
    <text x="176" y="42">Melon</text>
    <text x="250" y="88">Fish</text>
    <text x="96" y="128">Jawbone</text>
  </g>
</svg>`,

  cactus: `
<svg class="demo-svg is-desert" viewBox="0 0 320 168" aria-hidden="true">
  <defs>
    <radialGradient id="desert-glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#e2b84a" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#e2b84a" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="320" height="168" fill="url(#desert-glow)" />
  <path d="M0 138 Q 80 128 160 138 T 320 136 L 320 168 L 0 168 Z" fill="#1a2c1c" />
  <g fill="#7fb389" transform="translate(118,28)">
    <rect x="28" y="18" width="26" height="96" rx="13" />
    <rect x="0" y="46" width="36" height="16" rx="8" />
    <rect x="46" y="38" width="38" height="16" rx="8" />
    <rect x="0" y="22" width="14" height="40" rx="7" />
    <rect x="70" y="14" width="14" height="40" rx="7" />
  </g>
  <g class="spines" stroke="#e2b84a" stroke-width="1.15" stroke-linecap="round" fill="none">
    <g transform="translate(157,58)">
      <line class="spine-ray d0" x1="0" y1="0" x2="-16" y2="-10" />
      <line class="spine-ray d1" x1="0" y1="0" x2="-18" y2="2" />
      <line class="spine-ray d2" x1="0" y1="0" x2="-14" y2="12" />
    </g>
    <g transform="translate(175,50)">
      <line class="spine-ray d1" x1="0" y1="0" x2="16" y2="-10" />
      <line class="spine-ray d0" x1="0" y1="0" x2="18" y2="2" />
      <line class="spine-ray d2" x1="0" y1="0" x2="14" y2="12" />
    </g>
    <g transform="translate(157,88)">
      <line class="spine-ray d2" x1="0" y1="0" x2="-17" y2="-8" />
      <line class="spine-ray d0" x1="0" y1="0" x2="-18" y2="4" />
      <line class="spine-ray d1" x1="0" y1="0" x2="-12" y2="14" />
    </g>
    <g transform="translate(175,96)">
      <line class="spine-ray d0" x1="0" y1="0" x2="17" y2="-8" />
      <line class="spine-ray d2" x1="0" y1="0" x2="18" y2="4" />
      <line class="spine-ray d1" x1="0" y1="0" x2="12" y2="14" />
    </g>
    <g transform="translate(132,54)">
      <line class="spine-ray d1" x1="0" y1="0" x2="-14" y2="-8" />
      <line class="spine-ray d0" x1="0" y1="0" x2="-16" y2="4" />
    </g>
    <g transform="translate(200,46)">
      <line class="spine-ray d2" x1="0" y1="0" x2="14" y2="-8" />
      <line class="spine-ray d1" x1="0" y1="0" x2="16" y2="4" />
    </g>
  </g>
  <g class="callout" fill="#e2b84a">
    <text x="160" y="24" text-anchor="middle">Modified leaves</text>
    <text x="232" y="128">Shade + warning</text>
  </g>
</svg>`,

  hedgehog: `
<svg class="demo-svg is-dusk" viewBox="0 0 320 168" aria-hidden="true">
  <defs>
    <radialGradient id="dusk-glow" cx="48%" cy="40%" r="58%">
      <stop offset="0%" stop-color="#c9ada7" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#c9ada7" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="320" height="168" fill="url(#dusk-glow)" />
  <path d="M0 140 Q 90 132 180 142 T 320 138 L 320 168 L 0 168 Z" fill="#1a2c1c" />
  <g transform="translate(96,86)">
    <g class="quills" stroke="#e2b84a" stroke-width="1.35" stroke-linecap="round" fill="none">
      <line class="spine-ray d0" x1="40" y1="20" x2="18" y2="-6" />
      <line class="spine-ray d1" x1="50" y1="16" x2="34" y2="-14" />
      <line class="spine-ray d2" x1="62" y1="14" x2="54" y2="-16" />
      <line class="spine-ray d0" x1="74" y1="14" x2="78" y2="-16" />
      <line class="spine-ray d1" x1="86" y1="16" x2="102" y2="-10" />
      <line class="spine-ray d2" x1="96" y1="22" x2="118" y2="2" />
      <line class="spine-ray d1" x1="32" y1="28" x2="8" y2="12" />
      <line class="spine-ray d0" x1="28" y1="24" x2="6" y2="0" />
      <line class="spine-ray d2" x1="104" y1="26" x2="128" y2="12" />
    </g>
    <path fill="#b7aa93" d="M28 38 C 28 22 52 12 78 14 C 100 16 118 28 118 42 C 118 54 100 62 78 62 C 52 62 28 52 28 38 Z" />
    <path fill="#cfc6b0" d="M108 40 C 118 36 132 40 136 48 C 138 54 132 58 122 56 C 114 54 108 48 108 40 Z" />
    <circle cx="128" cy="46" r="1.5" fill="#111f16" />
    <path d="M134 50 Q 140 52 136 55" fill="none" stroke="#111f16" stroke-width="1.1" stroke-linecap="round" />
    <ellipse cx="58" cy="58" rx="6" ry="3.2" fill="#6f7f6a" />
    <ellipse cx="88" cy="58" rx="6" ry="3.2" fill="#6f7f6a" />
  </g>
  <g class="callout" fill="#e2b84a">
    <text x="160" y="28" text-anchor="middle">Keratin quills</text>
    <text x="250" y="128">Same geometry</text>
  </g>
</svg>`,

  prochloro: `
<svg class="demo-svg is-sea" viewBox="0 0 320 168" aria-hidden="true">
  <defs>
    <radialGradient id="sun-glow" cx="50%" cy="8%" r="62%">
      <stop offset="0%" stop-color="#e2b84a" stop-opacity="0.28" />
      <stop offset="100%" stop-color="#e2b84a" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="320" height="168" fill="#0b1c22" />
  <rect width="320" height="168" fill="url(#sun-glow)" />
  <g class="sun-pulse" fill="none" stroke="#e2b84a" stroke-width="1.1" opacity="0.55">
    <path d="M160 8 L160 22" />
    <path d="M132 16 L140 26" />
    <path d="M188 16 L180 26" />
    <path d="M112 28 L124 34" />
    <path d="M208 28 L196 34" />
  </g>
  <circle cx="160" cy="10" r="6" fill="#e2b84a" opacity="0.85" />
  <g transform="translate(160,96)">
    <ellipse cx="0" cy="0" rx="54" ry="32" fill="#1d4a48" />
    <ellipse cx="0" cy="0" rx="40" ry="22" fill="#2f7a6e" />
    <ellipse cx="-8" cy="-4" rx="14" ry="9" fill="#7fb389" opacity="0.7" />
    <ellipse cx="12" cy="6" rx="10" ry="7" fill="#8ecae6" opacity="0.35" />
  </g>
  <g class="callout" fill="#8ecae6">
    <text x="160" y="52" text-anchor="middle">Sunlight</text>
    <text x="54" y="100">CO₂</text>
    <text x="250" y="128">Sugar</text>
  </g>
</svg>`,

  methano: `
<svg class="demo-svg is-mud" viewBox="0 0 320 168" aria-hidden="true">
  <rect width="320" height="168" fill="#12180f" />
  <path d="M0 128 Q 80 118 160 130 T 320 124 L 320 168 L 0 168 Z" fill="#1a2418" />
  <g class="bubbles" fill="#e2b84a">
    <circle class="bubble d0" cx="128" cy="96" r="3.2" />
    <circle class="bubble d1" cx="148" cy="110" r="2.2" />
    <circle class="bubble d2" cx="168" cy="90" r="2.8" />
    <circle class="bubble d0" cx="188" cy="108" r="1.8" />
    <circle class="bubble d1" cx="206" cy="86" r="2.4" />
  </g>
  <g transform="translate(160,108)">
    <ellipse cx="0" cy="0" rx="38" ry="24" fill="#5c4a38" />
    <ellipse cx="-6" cy="-4" rx="16" ry="11" fill="#d08458" opacity="0.45" />
    <ellipse cx="10" cy="6" rx="10" ry="7" fill="#2a2018" opacity="0.35" />
  </g>
  <g class="callout" fill="#e2b84a">
    <text x="48" y="88">H₂ + CO₂</text>
    <text x="214" y="56">Methane</text>
  </g>
</svg>`,

  maize: `
<svg class="demo-svg is-field" viewBox="0 0 320 168" aria-hidden="true">
  <defs>
    <radialGradient id="field-glow" cx="50%" cy="0%" r="55%">
      <stop offset="0%" stop-color="#e2b84a" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#e2b84a" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="320" height="168" fill="url(#field-glow)" />
  <path d="M0 132 Q 90 124 180 134 T 320 130 L 320 168 L 0 168 Z" fill="#1a2c1c" />
  <g fill="#7fb389" transform="translate(148,18)">
    <rect x="10" y="20" width="8" height="110" rx="3" />
    <path d="M14 48 C -10 40 -18 22 8 18 C 18 28 20 40 14 48 Z" />
    <path d="M14 70 C 40 58 48 36 22 34 C 12 46 10 60 14 70 Z" />
    <path d="M14 96 C -8 86 -12 64 12 62 C 20 74 20 88 14 96 Z" />
  </g>
  <g transform="translate(176,72)">
    <rect x="0" y="0" width="18" height="46" rx="8" fill="#e2b84a" />
    <g fill="#142016" opacity="0.35">
      <circle cx="6" cy="10" r="1.1" />
      <circle cx="12" cy="16" r="1.1" />
      <circle cx="6" cy="22" r="1.1" />
      <circle cx="12" cy="28" r="1.1" />
      <circle cx="6" cy="34" r="1.1" />
    </g>
  </g>
  <g class="callout" fill="#e2b84a">
    <text x="160" y="24" text-anchor="middle">C4 leaf</text>
    <text x="220" y="128">Hard sun</text>
  </g>
</svg>`,

  saltbush: `
<svg class="demo-svg is-salt" viewBox="0 0 320 168" aria-hidden="true">
  <rect width="320" height="168" fill="#161c18" />
  <path d="M0 134 Q 110 126 200 136 T 320 132 L 320 168 L 0 168 Z" fill="#2a2a22" />
  <g fill="#b7c4b0" transform="translate(110,58)">
    <ellipse cx="50" cy="48" rx="70" ry="28" />
    <ellipse cx="18" cy="28" rx="28" ry="18" />
    <ellipse cx="56" cy="18" rx="32" ry="20" />
    <ellipse cx="90" cy="30" rx="26" ry="16" />
    <rect x="46" y="48" width="8" height="36" fill="#6f7f6a" />
  </g>
  <g fill="#f4efe2" opacity="0.55">
    <circle cx="132" cy="86" r="1.4" />
    <circle cx="168" cy="74" r="1.1" />
    <circle cx="196" cy="92" r="1.3" />
    <circle cx="150" cy="102" r="0.9" />
    <circle cx="184" cy="64" r="1" />
  </g>
  <g class="callout" fill="#e2b84a">
    <text x="160" y="28" text-anchor="middle">Same pathway</text>
    <text x="232" y="128">Salt + drought</text>
  </g>
</svg>`,

  bluecrab: `
<svg class="demo-svg is-sea" viewBox="0 0 320 168" aria-hidden="true">
  <rect width="320" height="168" fill="#0c1c22" />
  <path d="M0 128 Q 80 136 160 128 T 320 134 L 320 168 L 0 168 Z" fill="#163038" />
  <g transform="translate(160,86)">
    <g class="crab-shift" fill="#7aa8c4">
    <ellipse cx="0" cy="0" rx="48" ry="28" />
    <path d="M-48 -4 L-78 -18 L-70 4 Z" />
    <path d="M48 -4 L78 -18 L70 4 Z" />
    <line x1="-20" y1="16" x2="-36" y2="36" stroke="#7aa8c4" stroke-width="4" />
    <line x1="-6" y1="18" x2="-10" y2="40" stroke="#7aa8c4" stroke-width="4" />
    <line x1="20" y1="16" x2="36" y2="36" stroke="#7aa8c4" stroke-width="4" />
    <line x1="6" y1="18" x2="10" y2="40" stroke="#7aa8c4" stroke-width="4" />
    <circle cx="-16" cy="-6" r="3" fill="#111f16" />
    <circle cx="16" cy="-6" r="3" fill="#111f16" />
    </g>
  </g>
  <g class="callout" fill="#8ecae6">
    <text x="160" y="28" text-anchor="middle">True crab</text>
    <text x="232" y="128">Wide carapace</text>
  </g>
</svg>`,

  coconutcrab: `
<svg class="demo-svg is-dusk" viewBox="0 0 320 168" aria-hidden="true">
  <rect width="320" height="168" fill="#16140f" />
  <path d="M0 130 Q 90 122 180 132 T 320 128 L 320 168 L 0 168 Z" fill="#2a2418" />
  <g transform="translate(160,88)">
    <g class="crab-shift" fill="#c9a227">
    <ellipse cx="0" cy="4" rx="42" ry="26" />
    <path d="M-40 0 L-72 -8 L-66 14 Z" />
    <path d="M40 0 L76 -4 L70 16 Z" />
    <line x1="-18" y1="20" x2="-30" y2="40" stroke="#c9a227" stroke-width="5" />
    <line x1="0" y1="22" x2="2" y2="44" stroke="#c9a227" stroke-width="5" />
    <line x1="18" y1="20" x2="32" y2="40" stroke="#c9a227" stroke-width="5" />
    <circle cx="-12" cy="-2" r="3" fill="#111f16" />
    <circle cx="14" cy="-2" r="3" fill="#111f16" />
    </g>
  </g>
  <g class="callout" fill="#e2b84a">
    <text x="160" y="28" text-anchor="middle">Anomuran</text>
    <text x="228" y="128">Same shape</text>
  </g>
</svg>`,
};
