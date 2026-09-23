import { useEffect, useState } from "react";

/**
 * Starfield — generates a deterministic-looking field of twinkling stars.
 * Pure CSS dots; cheap to render. Re-seeds only on count change.
 */
export function Starfield({ count = 80 }: { count?: number }) {
  const [stars, setStars] = useState<Array<{ x: number; y: number; s: number; d: number }>>([]);
  useEffect(() => {
    const arr = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 1,
      d: Math.random() * 4,
    }));
    setStars(arr);
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.s}px`,
            height: `${s.s}px`,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}
    </div>
  );
}
