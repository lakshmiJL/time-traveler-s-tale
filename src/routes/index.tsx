import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScrollProgress } from "@/components/story/ScrollProgress";
import { StoryControls } from "@/components/story/StoryControls";
import { EvoBot } from "@/components/story/EvoBot";
import { TopNav } from "@/components/story/TopNav";
import { EditorialHero } from "@/components/story/EditorialHero";
import { useNarrator } from "@/hooks/use-narrator";
import {
  EarthChapter,
  FirstLifeChapter,
  WaterChapter,
  LandChapter,
  DinoChapter,
  ExtinctionChapter,
  HumansChapter,
  FutureChapter,
  EndChapter,
} from "@/components/story/chapters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Evolution Edition — A Scroll Through 4.5 Billion Years" },
      {
        name: "description",
        content:
          "An interactive editorial journey through the story of evolution, in 9 cinematic chapters. Voiced by EvoBot, your friendly AI guide.",
      },
      { property: "og:title", content: "The Evolution Edition" },
      {
        property: "og:description",
        content: "Travel through 4.5 billion years of life on Earth — interactive, voiced, and beautifully illustrated.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const narrator = useNarrator();
  const [line, setLine] = useState("");

  // Each chapter calls this when it scrolls into view.
  const handleEnter = (text: string) => {
    setLine(text);
    narrator.speak(text);
  };

  return (
    <main className="relative bg-background text-foreground">
      <ScrollProgress />
      <TopNav />
      <StoryControls narratorEnabled={narrator.enabled} onToggleNarrator={narrator.toggle} />
      <EvoBot speaking={narrator.speaking} enabled={narrator.enabled} currentLine={line} />

      <EditorialHero />
      <div id="chapters">
        <EarthChapter onEnter={handleEnter} />
        <FirstLifeChapter onEnter={handleEnter} />
        <WaterChapter onEnter={handleEnter} />
        <LandChapter onEnter={handleEnter} />
        <DinoChapter onEnter={handleEnter} />
        <ExtinctionChapter onEnter={handleEnter} />
        <HumansChapter onEnter={handleEnter} />
        <FutureChapter onEnter={handleEnter} />
        <EndChapter onEnter={handleEnter} />
      </div>
    </main>
  );
}
