import { useEffect, useState, lazy, Suspense } from 'react';
import { prefersLightweight } from '../../lib/clientCaps';

// Plasma arrastra ogl + un shader raymarch caro. Se carga en diferido y solo
// en equipos con potencia (escritorio, sin reduced-motion). En el resto se
// pinta un degradado estático que replica el tono sin coste de GPU.
const Plasma = lazy(() => import('./Plasma'));

function StaticBackground({ color }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(120% 120% at 50% 0%, ${color}22 0%, transparent 55%)`,
        opacity: 0.6
      }}
    />
  );
}

export default function HubBackground() {
  const [color, setColor] = useState('#FF7A42');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    if (accent) setColor(accent);
    if (!prefersLightweight()) setEnabled(true);
  }, []);

  if (!enabled) return <StaticBackground color={color} />;

  return (
    <Suspense fallback={<StaticBackground color={color} />}>
      <Plasma color={color} speed={0.5} direction="forward" scale={1.3} opacity={0.6} mouseInteractive={false} />
    </Suspense>
  );
}
