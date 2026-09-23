import { Link } from "@tanstack/react-router";

/**
 * TopNav — fixed Shopify-Editions style top bar.
 * Tiny brand on the left, edition tag, navigation links, CTA on the right.
 */
export function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-10">
      <Link to="/" className="flex items-center gap-3 text-foreground">
        <span className="grid h-6 w-6 place-items-center rounded-sm bg-foreground text-[10px] font-bold text-background">
          E
        </span>
        <span className="font-display text-base font-medium tracking-tight">Evolution Editions</span>
        <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">Vol. I · 4.5B Years</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-foreground/90 md:flex">
        <a href="#chapters" className="transition hover:text-foreground">Chapters</a>
        <a href="#future" className="transition hover:text-foreground">Future</a>
      </nav>
      <a
        href="#earth"
        className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-85"
      >
        Begin journey
      </a>
    </header>
  );
}
