import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useNarrator — wraps the browser's Web Speech API so EvoBot can talk.
 * Speaks short kid-friendly sentences. Safe on SSR (guards window).
 */
export function useNarrator() {
  const [enabled, setEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const lastSaid = useRef<string>("");

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (!enabled) return;
      if (lastSaid.current === text) return; // don't repeat the same line
      lastSaid.current = text;

      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      utter.pitch = 1.15;
      utter.volume = 1;
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    },
    [enabled],
  );

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      if (v) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        setSpeaking(false);
      }
      return !v;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { enabled, speaking, speak, stop, toggle };
}
