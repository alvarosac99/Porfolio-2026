// Detecta dispositivos donde los fondos WebGL/canvas pesados no compensan:
// móviles (puntero grueso), pantallas pequeñas o usuarios que piden menos
// movimiento. En esos casos servimos un fondo estático barato en su lugar.
export function prefersLightweight() {
  if (typeof window === 'undefined') return true;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.innerWidth <= 768;
  return coarse || reduced || small;
}
