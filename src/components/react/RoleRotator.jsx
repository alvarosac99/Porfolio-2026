import RotatingText from './RotatingText';

const ROLES = ['shippeando', 'construyendo', 'depurando', 'desplegando'];

export default function RoleRotator() {
  return (
    <span className="inline-flex items-center text-[var(--color-accent)]">
      [
      <RotatingText
        texts={ROLES}
        splitBy="words"
        mainClassName="inline-flex overflow-hidden"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        splitLevelClassName="overflow-hidden pb-0.5"
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        rotationInterval={2800}
      />
      ]
    </span>
  );
}
