import { useEffect, useState } from 'react';
import FaultyTerminal from './FaultyTerminal';

export default function HubBackground() {
  const [tint, setTint] = useState('#FF7A42');

  useEffect(() => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    if (accent) setTint(accent);
  }, []);

  return (
    <FaultyTerminal
      scale={1.5}
      gridMul={[2, 1]}
      digitSize={1.5}
      timeScale={0.3}
      scanlineIntensity={0.15}
      glitchAmount={0.3}
      flickerAmount={0.3}
      noiseAmp={0}
      chromaticAberration={0}
      curvature={0}
      dither={0.4}
      tint={tint}
      mouseReact={true}
      mouseStrength={0.15}
      dpr={1}
      pageLoadAnimation={true}
      brightness={0.35}
    />
  );
}
