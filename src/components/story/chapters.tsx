import { type ReactNode, useEffect, useRef, useState } from "react";
import { Chapter } from "./Chapter";
import { Sparkles, Send } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

import earthImg from "@/assets/ch-earth.jpg";
import cellsImg from "@/assets/ch-cells.jpg";
import waterImg from "@/assets/ch-water.jpg";
import landImg from "@/assets/ch-land.jpg";
import dinosImg from "@/assets/ch-dinos.jpg";
import extinctionImg from "@/assets/ch-extinction.jpg";
import humansImg from "@/assets/ch-humans.jpg";
import futureImg from "@/assets/ch-future.jpg";

type EnterFn = (line: string) => void;

/* ---------- Shared editorial scaffolding ---------- */

interface EditorialChapterProps {
  id: string;
  narration: string;
  onEnter: EnterFn;
  image: string;
  alt: string;
  numeral: string;
  era: string;
  title: ReactNode;
  body: string;
  /** Render extra interactive content beneath the body. */
  extra?: ReactNode;
  /** Card placement on large screens. */
  align?: "left" | "right" | "center";
  /** Optional class added to the section root (e.g. shake animation). */
  sectionClassName?: string;
}

function EditorialChapter({
  id,
  narration,
  onEnter,
  image,
  alt,
  numeral,
  era,
  title,
  body,
  extra,
  align = "left",
  sectionClassName = "",
}: EditorialChapterProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const p = useScrollProgress(sectionRef);

  // Narration: fire when the sticky stage is comfortably on-screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.3) onEnter(narration);
        });
      },
      { threshold: [0.3, 0.6] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [narration, onEnter]);

  // Shopify-Editions style motion driven by scroll progress (0..1):
  //  - image slowly drifts up + zooms out (parallax)
  //  - editorial card fades in, holds, fades out
  const imgTransform = `translate3d(0, ${(p - 0.5) * 14}%, 0) scale(${1.22 - p * 0.18})`;
  const cardOpacity =
    p < 0.18 ? 0 : p < 0.36 ? (p - 0.18) / 0.18 : p < 0.7 ? 1 : p < 0.88 ? 1 - (p - 0.7) / 0.18 : 0;
  const cardY = (1 - cardOpacity) * 40;

  const justifyClass =
    align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full min-h-[180vh] ${sectionClassName}`}
    >
      {/* Sticky stage — image stays pinned while the section scrolls past */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div style={{ transform: imgTransform }} className={`living-photo ${align === "right" ? "alt" : ""}`}>
          <img
            src={image}
            alt={alt}
            loading="lazy"
            width={1920}
            height={1280}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-cosmos/40 via-cosmos/20 to-cosmos/70" />

        <div className={`absolute inset-0 flex items-center px-6 py-24 ${justifyClass}`}>
          <div className={`flex w-full max-w-7xl ${justifyClass}`}>
            <div
              style={{ opacity: cardOpacity, transform: `translateY(${cardY}px)` }}
              className="w-full max-w-xl rounded-sm border border-foreground/25 bg-card/35 p-8 backdrop-blur-md md:p-10 will-change-transform"
            >
              <div className="flex items-center justify-between border-b border-foreground/20 pb-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-foreground/80">{era}</p>
                <p className="font-display text-sm tracking-[0.2em] text-foreground/80">{numeral}</p>
              </div>
              <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
                {title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/90 md:text-lg">{body}</p>
              {extra && <div className="mt-8">{extra}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- Chapter 02: Earth ---------- */
export function EarthChapter({ onEnter }: { onEnter: EnterFn }) {
  return (
    <EditorialChapter
      id="earth"
      onEnter={onEnter}
      narration="Earth was once a hot, dangerous place — full of fire, lava, and storms."
      image={earthImg}
      alt="Painterly view of primordial Earth: erupting volcanoes, glowing lava rivers, and a red sky."
      numeral="II"
      era="Chapter II · 4.5 Billion Years Ago"
      title={<>The <em className="font-normal italic">young</em> Earth</>}
      body="Volcanoes erupted. Oceans boiled. Lightning cracked through skies thick with ash. The young Earth was a fiery ball of chaos — and yet, something extraordinary was about to begin."
      align="left"
    />
  );
}

/* ---------- Chapter 03: First Life (with cell zoom interaction) ---------- */
export function FirstLifeChapter({ onEnter }: { onEnter: EnterFn }) {
  const [zoomed, setZoomed] = useState(false);
  return (
    <EditorialChapter
      id="first-life"
      onEnter={onEnter}
      narration="Tiny life forms were the very first to exist. Click to zoom into a cell."
      image={cellsImg}
      alt="Glowing translucent microbes drifting in deep teal primordial water with rays of light."
      numeral="III"
      era="Chapter III · 3.5 Billion Years Ago"
      title={<>A spark in the <em className="font-normal italic">water</em></>}
      body="Deep in warm oceans, single-celled microbes appeared — too small to see, but the great-great-great-grandparents of every living thing."
      align="right"
      extra={
        <button
          onClick={() => setZoomed((z) => !z)}
          className="group flex w-full items-center justify-between rounded-sm border border-foreground/30 bg-card/40 px-5 py-4 text-left transition hover:border-accent"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/70">Interaction</p>
            <p className="mt-1 font-display text-lg text-foreground">
              {zoomed ? "← Zoom out" : "Zoom into a cell →"}
            </p>
          </div>
          <span
            className={`grid h-12 w-12 place-items-center rounded-full border border-foreground/40 transition-transform duration-700 ${
              zoomed ? "scale-[2.4] border-accent" : "group-hover:scale-110"
            }`}
          >
            <span className="h-3 w-3 rounded-full bg-accent" />
          </span>
        </button>
      }
    />
  );
}

/* ---------- Chapter 04: Oceans ---------- */
export function WaterChapter({ onEnter }: { onEnter: EnterFn }) {
  return (
    <EditorialChapter
      id="water"
      onEnter={onEnter}
      narration="Life began to grow and change. Bigger creatures swam through ancient seas."
      image={waterImg}
      alt="Cambrian-era ocean: ancient fish and jellyfish swimming through deep blue-green water."
      numeral="IV"
      era="Chapter IV · 500 Million Years Ago"
      title={<>The age of <em className="font-normal italic">oceans</em></>}
      body="Over millions of years, simple cells became fish, trilobites, and giant sea creatures. The ocean was the cradle of evolution — a quiet world of fins, shells, and shimmering scales."
      align="left"
    />
  );
}

/* ---------- Chapter 05: Land ---------- */
export function LandChapter({ onEnter }: { onEnter: EnterFn }) {
  return (
    <EditorialChapter
      id="land"
      onEnter={onEnter}
      narration="Some brave creatures crawled out of the water and onto dry land."
      image={landImg}
      alt="Devonian shoreline at golden hour with a primitive amphibian crawling onto mossy rocks."
      numeral="V"
      era="Chapter V · 375 Million Years Ago"
      title={<>The first <em className="font-normal italic">step</em></>}
      body="Fins slowly turned into legs. Gills became lungs. For the first time, life had a whole new world to explore — solid ground, warm sun, and endless sky."
      align="right"
    />
  );
}

/* ---------- Chapter 06: Dinosaurs (with click-to-reveal facts) ---------- */
const DINO_FACTS = [
  "T-Rex had teeth the size of bananas.",
  "Some dinosaurs were as long as 3 school buses.",
  "Dinosaurs laid eggs, just like birds today.",
  "Birds are actually living dinosaurs.",
];
export function DinoChapter({ onEnter }: { onEnter: EnterFn }) {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <EditorialChapter
      id="dinos"
      onEnter={onEnter}
      narration="Then came the dinosaurs. For 165 million years, they ruled the Earth."
      image={dinosImg}
      alt="A massive T-rex in a misty Jurassic valley with a long-necked dinosaur in the distance."
      numeral="VI"
      era="Chapter VI · 230 – 65 Million Years Ago"
      title={<>Reign of the <em className="font-normal italic">giants</em></>}
      body="Reptiles of every shape and size walked, flew, and swam. The Earth shook with their footsteps. Tap a number to reveal a fact about the dinosaurs."
      align="left"
      extra={
        <div>
          <div className="grid grid-cols-4 gap-2">
            {DINO_FACTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-sm border py-3 font-display text-sm tracking-[0.2em] transition ${
                  idx === i
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-foreground/30 bg-card/30 text-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {["I", "II", "III", "IV"][i]}
              </button>
            ))}
          </div>
          {idx !== null && (
            <p className="mt-5 flex items-start gap-2 text-base text-foreground animate-fade-up">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span className="italic">{DINO_FACTS[idx]}</span>
            </p>
          )}
        </div>
      }
    />
  );
}

/* ---------- Chapter 07: Extinction (with screen-shake interaction) ---------- */
export function ExtinctionChapter({ onEnter }: { onEnter: EnterFn }) {
  const [boom, setBoom] = useState(false);
  const flashRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!boom) return;
    const t = setTimeout(() => setBoom(false), 1200);
    return () => clearTimeout(t);
  }, [boom]);

  return (
    <EditorialChapter
      id="extinction"
      onEnter={onEnter}
      narration="A massive asteroid struck the Earth. Everything changed in a single day."
      image={extinctionImg}
      alt="A flaming meteor streaking through a blood-red sky toward fleeing dinosaur silhouettes."
      numeral="VII"
      era="Chapter VII · 65 Million Years Ago"
      title={<>The <em className="font-normal italic">impact</em></>}
      body="A massive asteroid reshaped life on Earth. Most dinosaurs disappeared — but small, clever creatures survived in the shadows, waiting for their chance."
      align="right"
      sectionClassName={boom ? "animate-shake" : ""}
      extra={
        <>
          <button
            onClick={() => setBoom(true)}
            className="rounded-full border border-foreground/40 bg-foreground/10 px-6 py-3 font-display text-sm tracking-[0.3em] text-foreground backdrop-blur-md transition hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            TRIGGER THE IMPACT
          </button>
          {boom && (
            <div ref={flashRef} className="pointer-events-none fixed inset-0 z-30 bg-foreground animate-flash" />
          )}
        </>
      }
    />
  );
}

/* ---------- Chapter 08: Humans (with evolution slider) ---------- */
const STAGES = ["Primates", "Apes", "Early Humans", "Modern Humans"];
export function HumansChapter({ onEnter }: { onEnter: EnterFn }) {
  const [step, setStep] = useState(2);
  return (
    <EditorialChapter
      id="humans"
      onEnter={onEnter}
      narration="New life forms emerged — including mammals, and eventually, us."
      image={humansImg}
      alt="Silhouettes of human evolution walking across a savanna at golden hour."
      numeral="VIII"
      era="Chapter VIII · 200,000 Years Ago"
      title={<>And then came <em className="font-normal italic">us</em></>}
      body="Drag the slider to walk through millions of years of human evolution — from early primates to the curious, story-telling humans of today."
      align="left"
      extra={
        <div>
          <div className="flex items-end justify-between">
            <p className="font-display text-3xl text-foreground">{STAGES[step]}</p>
            <p className="font-display text-sm tracking-[0.2em] text-foreground/70">
              {step + 1} / {STAGES.length}
            </p>
          </div>
          <input
            type="range"
            min={0}
            max={STAGES.length - 1}
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value))}
            className="mt-4 w-full accent-[oklch(0.85_0.18_80)]"
            aria-label="Human evolution stage"
          />
          <div className="mt-2 flex justify-between text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            {STAGES.map((s) => <span key={s}>{s.split(" ")[0]}</span>)}
          </div>
        </div>
      }
    />
  );
}

/* ---------- Chapter 09: Future (with input) ---------- */
export function FutureChapter({ onEnter }: { onEnter: EnterFn }) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <EditorialChapter
      id="future"
      onEnter={onEnter}
      narration="What do you think comes next? Type your idea and shape the future of evolution."
      image={futureImg}
      alt="A robed figure on a Martian cliff overlooking a glowing futuristic city under three moons."
      numeral="IX"
      era="Chapter IX · The Future"
      title={<>What comes <em className="font-normal italic">next</em>?</>}
      body="Maybe humans will live on Mars. Maybe AI will become a new form of life. The next chapter of evolution hasn't been written yet — and that's where you come in."
      align="right"
      extra={
        !submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (answer.trim()) setSubmitted(true);
            }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="My prediction…"
              className="flex-1 rounded-sm border border-foreground/30 bg-card/40 px-4 py-3 text-foreground placeholder:text-foreground/50 backdrop-blur-md outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-6 py-3 font-medium text-background transition hover:opacity-85"
            >
              <Send className="h-4 w-4" /> Submit
            </button>
          </form>
        ) : (
          <div className="rounded-sm border border-accent/50 bg-card/50 p-5 backdrop-blur-md animate-fade-up">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent">Your prediction</p>
            <p className="mt-2 font-display text-2xl italic text-foreground">"{answer}"</p>
            <p className="mt-3 text-sm text-foreground/80">
              Every great discovery began with a question just like yours.
            </p>
          </div>
        )
      }
    />
  );
}

/* ---------- End plate (Editions-style closing) ---------- */
export function EndChapter({ onEnter }: { onEnter: EnterFn }) {
  return (
    <Chapter
      id="end"
      narration="The end — and your beginning."
      onEnter={onEnter}
      background="var(--gradient-cosmos)"
    >
      <div className="relative z-10 text-center animate-fade-up">
        <p className="font-display text-sm uppercase tracking-[0.4em] text-foreground/70">Fin.</p>
        <h2 className="mt-6 font-display text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-7xl">
          The story <em className="font-normal italic">continues</em>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-foreground/80">
          You've traveled 4.5 billion years in 9 chapters. The next one is yours to write.
        </p>
        <a
          href="#intro"
          className="mt-10 inline-block rounded-full border border-foreground/40 px-6 py-3 font-display text-sm tracking-[0.3em] text-foreground transition hover:border-accent hover:text-accent"
        >
          ↑ START AGAIN
        </a>
      </div>
    </Chapter>
  );
}
