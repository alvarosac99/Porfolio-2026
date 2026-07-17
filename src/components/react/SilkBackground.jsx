import { lazy, Suspense, useEffect, useState } from 'react';
import { prefersLightweight } from '../../lib/clientCaps';

// Silk arrastra three.js completo + @react-three/fiber para un fondo a 0.12 de
// opacidad. Se carga en diferido y solo en escritorio: en móvil/reduced-motion
// no se monta, así ese bundle enorme nunca se descarga en el teléfono.
const Silk = lazy(() => import('./Silk'));

export default function SilkBackground(props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!prefersLightweight()) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Silk {...props} />
    </Suspense>
  );
}
