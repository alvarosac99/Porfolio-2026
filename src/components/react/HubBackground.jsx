import { useEffect, useState } from 'react';
import Plasma from './Plasma';

export default function HubBackground() {
  const [color, setColor] = useState('#FF7A42');

  useEffect(() => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    if (accent) setColor(accent);
  }, []);

  return <Plasma color={color} speed={0.5} direction="forward" scale={1.3} opacity={0.6} mouseInteractive={true} />;
}
