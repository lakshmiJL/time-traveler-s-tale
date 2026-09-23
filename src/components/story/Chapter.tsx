import { type ReactNode, useEffect, useRef } from "react";

interface Props {
  id: string;
  narration: string;
  onEnter: (line: string) => void;
  background?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Chapter — full-viewport section that fires a narration line when it
 * scrolls into view. `background` accepts a CSS background value (use a
 * gradient token, e.g. "var(--gradient-ocean)").
 */
export function Chapter({ id, narration, onEnter, background, className = "", children }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.45) {
            onEnter(narration);
          }
        });
      },
      { threshold: [0.45, 0.7] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [narration, onEnter]);

  return (
    <section
      id={id}
      ref={ref}
      style={{ background }}
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-24 ${className}`}
    >
      {children}
    </section>
  );
}
