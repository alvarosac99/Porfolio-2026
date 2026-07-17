import { lazy, Suspense, useEffect, useState } from 'react';
import { prefersLightweight } from '../../lib/clientCaps';

// TargetCursor (cursor personalizado) arrastra gsap y no tiene sentido en
// táctil. Se carga en diferido y solo en escritorio: en móvil ni se hidrata
// ni se descarga su chunk.
const TargetCursor = lazy(() => import('./TargetCursor'));

export default function CursorLayer(props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!prefersLightweight()) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <TargetCursor {...props} />
    </Suspense>
  );
}
