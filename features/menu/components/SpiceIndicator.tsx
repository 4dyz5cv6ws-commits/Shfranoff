import { SpiceLevel } from '../types';

export function SpiceIndicator({ level }: { level: SpiceLevel }) {
  if (level === 0) return null;

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Острота ${level} из 3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i < level ? 'bg-ember' : 'bg-cream/15'}`}
        />
      ))}
    </span>
  );
}
