import StickerPeel from './StickerPeel';

const NOTE_LINES = [
  'Zenith es el nombre',
  'de la espada más épica',
  'de uno de mis juegos',
  'favoritos, Terraria.',
  '',
  'Seed es la semilla,',
  'el inicio de cualquier',
  'universo, mundo o vida.'
];

function buildNoteSvg() {
  const lineHeight = 30;
  const startY = 70;
  const tspans = NOTE_LINES.map(
    (line, i) => `<tspan x="30" y="${startY + i * lineHeight}">${line}</tspan>`
  ).join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="340" viewBox="0 0 320 340">
      <rect x="4" y="4" width="312" height="332" fill="#F5D949" />
      <polygon points="280,332 316,332 316,296" fill="#E0C23D" />
      <text font-family="'Segoe Print','Bradley Hand','Comic Sans MS',cursive" font-size="22" fill="#3A3320">${tspans}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const NOTE_SRC = buildNoteSvg();

export default function NameOriginNote() {
  return (
    <div className="relative w-[220px] h-[240px]">
      <StickerPeel imageSrc={NOTE_SRC} width={220} rotate={-6} initialPosition="center" shadowIntensity={0.5} />
    </div>
  );
}
