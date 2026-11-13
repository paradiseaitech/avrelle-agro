// Generates placeholder grade-comparison SVGs at consistent relative scale.
// 1 mm ≈ 6 px so relative sizes match the indicative grade ranges.
import { writeFileSync, mkdirSync } from "node:fs";

const out = new URL("../public/brand/grades/", import.meta.url);
mkdirSync(out, { recursive: true });

const grades = [
  { file: "thurr.svg", label: "Thurr(i)", mm: "6–8 mm", dia: 7 * 6 },
  { file: "3-suta.svg", label: "3 Suta", mm: "9–12.3 mm", dia: 10.65 * 6 },
  { file: "4-suta.svg", label: "4 Suta", mm: "12.5–15.5 mm", dia: 14 * 6 },
  { file: "5-suta.svg", label: "5 Suta", mm: "15.7–19 mm", dia: 17.35 * 6 },
  { file: "6-suta.svg", label: "6+ Suta", mm: "19–24 mm", dia: 21.5 * 6 },
];

for (const g of grades) {
  const r = g.dia / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <!-- ${g.label} (${g.mm}) — placeholder for real graded product photography -->
  <defs>
    <radialGradient id="p" cx="38%" cy="30%" r="78%">
      <stop offset="0%" stop-color="#FDFAF2"/>
      <stop offset="58%" stop-color="#F1E7D0"/>
      <stop offset="100%" stop-color="#DCCBA4"/>
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="98" fill="#FAF7EF"/>
  <circle cx="100" cy="100" r="98" stroke="#E5DAC3" stroke-width="1"/>
  <ellipse cx="100" cy="${100 + r * 0.86}" rx="${r * 0.92}" ry="${r * 0.16}" fill="#102A20" opacity="0.12"/>
  <g>
    <path transform="translate(100 100) scale(${r / 10})" d="M0,-10 C4.2,-10.6 8.2,-7.2 9.6,-3.2 C11.2,1.2 9.2,7 5.2,9.2 C1.2,11.4 -5,10.8 -8.2,7.2 C-11.4,3.6 -10.8,-4.2 -7.2,-8 C-5.2,-9.9 -3,-9.8 0,-10 Z" fill="url(#p)"/>
    <path transform="translate(100 100) scale(${r / 10})" d="M-6,-4.5 C-3,-6.5 3,-6.5 6,-4.5" stroke="#C9B387" stroke-width="0.7" fill="none" stroke-linecap="round" opacity="0.8"/>
    <path transform="translate(100 100) scale(${r / 10})" d="M-6.8,2.5 C-3.4,5 3.4,5 6.8,2.5" stroke="#C9B387" stroke-width="0.7" fill="none" stroke-linecap="round" opacity="0.65"/>
  </g>
</svg>
`;
  writeFileSync(new URL(g.file, out), svg);
  console.log("wrote", g.file, `(${g.dia}px @6px/mm)`);
}
