import { useEffect, useState } from "react";

/**
 * ScrollProgress — slim glowing bar at the very top showing journey progress.
 */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-[width] duration-150"
        style={{ width: `${pct}%`, boxShadow: "var(--shadow-glow-cyan)" }}
      />
    </div>
  );
}
