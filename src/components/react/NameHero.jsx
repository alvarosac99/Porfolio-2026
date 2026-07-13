import { useEffect, useState } from 'react';
import TextPressure from './TextPressure';

export default function NameHero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reveal = () => {
      if (!cancelled) setReady(true);
    };

    if (document.fonts?.ready) {
      Promise.race([
        document.fonts.load('1em "Roboto Flex"').then(() => document.fonts.ready),
        new Promise(resolve => setTimeout(resolve, 400))
      ]).then(reveal);
    } else {
      setTimeout(reveal, 200);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="flex flex-col gap-0 w-full"
      style={{
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.25s ease'
      }}
    >
      <div style={{ position: 'relative', height: 'auto' }}>
        <TextPressure
          text="Álvaro Sebastián"
          flex={true}
          textAlign="left"
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="var(--color-text)"
          minFontSize={32}
          maxFontSize={72}
        />
      </div>
      <div style={{ position: 'relative', height: 'auto' }}>
        <TextPressure
          text="Acosta"
          flex={true}
          textAlign="left"
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="var(--color-accent)"
          minFontSize={32}
          maxFontSize={72}
        />
      </div>
    </div>
  );
}
