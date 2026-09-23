import { useEffect, useState, type RefObject } from "react";

/**
 * useScrollProgress — returns 0..1 progress as the element travels
 * through the viewport. 0 = element's top just entered the bottom of the
 * viewport, 1 = element's bottom just left the top.
 * Used to drive parallax / scale / fade effects, Shopify-Editions style.
 */
export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const p = (vh - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}
