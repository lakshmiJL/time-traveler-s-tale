import { useEffect, useState } from "react";
import { Music, VolumeX, Volume2, Sun, Moon } from "lucide-react";

interface Props {
  narratorEnabled: boolean;
  onToggleNarrator: () => void;
}

/**
 * StoryControls — fixed top-right toolbar.
 * Lets the learner toggle narration, background music, and light/dark theme.
 * Music uses a free ambient track served from a CDN; it loops quietly.
 */
export function StoryControls({ narratorEnabled, onToggleNarrator }: Props) {
  const [music, setMusic] = useState(false);
  const [light, setLight] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e0c8e8.mp3?filename=ambient-piano-amp-strings-10711.mp3",
    );
    a.loop = true;
    a.volume = 0.25;
    setAudio(a);
    return () => {
      a.pause();
    };
  }, []);

  useEffect(() => {
    if (!audio) return;
    if (music) audio.play().catch(() => {});
    else audio.pause();
  }, [music, audio]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={onToggleNarrator}
        title={narratorEnabled ? "Mute EvoBot" : "Unmute EvoBot"}
        className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur-md transition hover:bg-card hover:text-primary"
      >
        {narratorEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>
      <button
        onClick={() => setMusic((m) => !m)}
        title={music ? "Stop music" : "Play music"}
        className={`grid h-11 w-11 place-items-center rounded-full border border-border backdrop-blur-md transition ${
          music ? "bg-primary text-primary-foreground" : "bg-card/70 text-foreground hover:bg-card hover:text-primary"
        }`}
      >
        <Music className="h-5 w-5" />
      </button>
      <button
        onClick={() => setLight((l) => !l)}
        title="Toggle theme"
        className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur-md transition hover:bg-card hover:text-accent"
      >
        {light ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
    </div>
  );
}
