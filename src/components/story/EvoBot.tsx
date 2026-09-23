import { useEffect, useState } from "react";
import { Bot } from "lucide-react";

interface Props {
  speaking: boolean;
  enabled: boolean;
  currentLine: string;
}

/**
 * EvoBot — the floating AI narrator mascot in the bottom-left corner.
 * Shows a speech bubble with the current narration line, pulses while speaking.
 */
export function EvoBot({ speaking, enabled, currentLine }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!currentLine) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(t);
  }, [currentLine]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-3">
      <div
        className={`relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground transition ${
          speaking ? "animate-pulse-glow" : ""
        }`}
      >
        <Bot className="h-8 w-8" />
        <span className="absolute -top-1 -right-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
          AI
        </span>
      </div>
      {enabled && show && currentLine && (
        <div className="max-w-xs rounded-2xl rounded-bl-sm border border-border bg-card/85 px-4 py-3 text-sm text-card-foreground backdrop-blur-md animate-fade-up">
          <p className="font-semibold text-primary">EvoBot 🤖</p>
          <p className="mt-0.5 leading-snug">{currentLine}</p>
        </div>
      )}
    </div>
  );
}
