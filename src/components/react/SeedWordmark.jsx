import { lazy, Suspense, useEffect, useState } from 'react';
import { prefersLightweight } from '../../lib/clientCaps';
import './SeedText.css';

// SeedText es un efecto three.js que además hace getImageData + asciify en el
// hilo principal cada frame: carísimo, y arrastra three.js al index. Aquí lo
// cargamos en diferido y SOLO en escritorio con potencia. En móvil / reduced-
// motion se pinta el wordmark a dos tonos plano, sin WebGL ni three.js.
const SeedText = lazy(() => import('./SeedText'));

function StaticWordmark({ text = 'ZenithSeed', splitAt = 6 }) {
  const a = text.slice(0, splitAt);
  const b = text.slice(splitAt);
  return (
    <div className="seed-text-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span
        className="font-mono font-bold tracking-tight"
        style={{ fontSize: 'clamp(2.5rem, 12vw, 6rem)', lineHeight: 1 }}
      >
        <span style={{ color: 'var(--color-text)' }}>{a}</span>
        <span style={{ color: 'var(--color-accent)' }}>{b}</span>
      </span>
    </div>
  );
}

export default function SeedWordmark(props) {
  const [rich, setRich] = useState(false);

  useEffect(() => {
    if (!prefersLightweight()) setRich(true);
  }, []);

  if (!rich) return <StaticWordmark text={props.text} splitAt={props.splitAt} />;

  return (
    <Suspense fallback={<StaticWordmark text={props.text} splitAt={props.splitAt} />}>
      <SeedText {...props} />
    </Suspense>
  );
}
