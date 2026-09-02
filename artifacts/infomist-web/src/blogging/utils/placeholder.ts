/**
 * Deterministic inline-SVG placeholder images as data URIs — so the prototype
 * renders fully with zero network dependency.
 */

const PALETTES: [string, string][] = [
  ["#0EA5E9", "#0369A1"],
  ["#84CC16", "#4D7C0F"],
  ["#8B5CF6", "#5B21B6"],
  ["#F97316", "#C2410C"],
  ["#06B6D4", "#0E7490"],
  ["#EC4899", "#9D174D"],
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

export function placeholderImage(seed: string, w = 1200, h = 675, label?: string): string {
  const [a, b] = PALETTES[hash(seed) % PALETTES.length];
  const text = (label ?? seed).slice(0, 28);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g fill="#ffffff" fill-opacity="0.14">
  <circle cx="${w * 0.82}" cy="${h * 0.2}" r="${h * 0.28}"/>
  <circle cx="${w * 0.15}" cy="${h * 0.85}" r="${h * 0.34}"/></g>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
  font-family="Inter, system-ui, sans-serif" font-size="${Math.round(h / 12)}"
  font-weight="700" fill="#ffffff" fill-opacity="0.92">${text}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function avatarDataUri(name: string, size = 128): string {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const [a, b] = PALETTES[hash(name) % PALETTES.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <rect width="${size}" height="${size}" rx="${size / 2}" fill="url(#g)"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="Inter, system-ui, sans-serif" font-size="${size * 0.4}" font-weight="700" fill="#fff">${initials}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
