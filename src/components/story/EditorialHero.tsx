import { useRef } from "react";
import heroImg from "@/assets/hero-evolution.jpg";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

const CHAPTERS: Array<{ num: string; label: string; href: string }> = [
  { num: "I", label: "Cosmos", href: "#intro" },
  { num: "II", label: "Earth", href: "#earth" },
  { num: "III", label: "First Life", href: "#first-life" },
  { num: "IV", label: "Oceans", href: "#water" },
  { num: "V", label: "Land", href: "#land" },
  { num: "VI", label: "Dinosaurs", href: "#dinos" },
  { num: "VII", label: "Extinction", href: "#extinction" },
  { num: "VIII", label: "Humans", href: "#humans" },
  { num: "IX", label: "The Future", href: "#future" },
];

/**
 * EditorialHero — Shopify Editions-style hero with scroll-driven parallax.
 * Image drifts + zooms as you scroll; card fades and lifts.
 */
export function EditorialHero() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useScrollProgress(ref);
  const imgTransform = `translate3d(0, ${p * 18}%, 0) scale(${1 + p * 0.12})`;
  const cardOpacity = Math.max(0, 1 - p * 1.8);
  const cardY = p * 60;
  return (
    <section
      id="intro"
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div style={{ transform: imgTransform }} className="living-photo">
        <img
          src={heroImg}
          alt="A painterly fresco depicting the spark of life: a cosmic figure reaches toward a futuristic astronaut over a primordial landscape."
          width={1920}
          height={1088}
        />
      </div>
      {/* Subtle vignette so the card pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmos/30 via-transparent to-cosmos/60" />

      {/* Centered editorial card */}
      <div
        style={{ opacity: cardOpacity, transform: `translateY(${cardY}px)` }}
        className="relative z-10 mx-6 grid w-full max-w-2xl grid-cols-[1fr_auto] items-stretch gap-6 rounded-sm border border-foreground/30 bg-card/30 p-8 backdrop-blur-md md:p-12 animate-fade-up will-change-transform"
      >
        <div>
          <h1 className="font-display text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-7xl">
            The<br />
            Ev<span className="italic font-normal">o</span>lution<br />
            Edition
          </h1>
          <p className="mt-10 max-w-xs text-sm leading-relaxed text-foreground/85">
            A new world of life.<br />9 chapters · 4.5 billion years.
          </p>
          <ul className="mt-6 space-y-1 text-sm font-medium text-foreground">
            {CHAPTERS.slice(0, 9).map((c) => (
              <li key={c.num}>
                <a href={c.href} className="transition hover:text-accent">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ol className="flex flex-col items-end gap-1 pl-4 font-display text-sm font-light tracking-[0.15em] text-foreground/75">
          {CHAPTERS.map((c) => (
            <li key={c.num}>
              <a href={c.href} className="transition hover:text-accent">{c.num}</a>
            </li>
          ))}
        </ol>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-foreground/80">
        <p className="font-display text-xs uppercase tracking-[0.4em]">Scroll</p>
        <span className="mx-auto mt-2 block h-10 w-px bg-gradient-to-b from-foreground/80 to-transparent" />
      </div>
    </section>
  );
}
