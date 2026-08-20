const lines = [
  { indent: 0, width: "58%", tone: "accent" },
  { indent: 1, width: "72%", tone: "mid" },
  { indent: 2, width: "46%", tone: "low" },
  { indent: 2, width: "64%", tone: "mid" },
  { indent: 1, width: "38%", tone: "low" },
  { indent: 0, width: "52%", tone: "accent" },
  { indent: 1, width: "66%", tone: "mid" },
];

const toneClass: Record<string, string> = {
  accent: "bg-accent/45",
  mid: "bg-foreground/20",
  low: "bg-foreground/10",
};

/** Abstract, code-to-interface visual. No stock imagery, motion is subtle. */
export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="panel relative overflow-hidden p-4 sm:p-5"
    >
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-60" />
      <div className="relative flex items-center gap-1.5 pb-4">
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="size-2 rounded-full bg-muted-foreground/30" />
        <span className="size-2 rounded-full bg-muted-foreground/20" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          avion / build
        </span>
      </div>

      <div className="relative grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/70 bg-background/60 p-4">
          <ul className="space-y-2.5">
            {lines.map((line, i) => (
              <li
                key={i}
                className="hero-line flex items-center gap-2"
                style={{ animationDelay: `${i * 140}ms` }}
              >
                <span className="font-mono text-[10px] text-muted-foreground/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`h-2 rounded ${toneClass[line.tone]}`}
                  style={{ width: line.width, marginLeft: line.indent * 10 }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/70 bg-background/60 p-4">
          <div className="hero-float space-y-3">
            <div className="h-5 w-2/3 rounded bg-foreground/20" />
            <div className="h-2.5 w-1/2 rounded bg-foreground/10" />
            <div className="h-8 w-28 rounded-full bg-accent/40" />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="h-12 rounded-lg bg-foreground/10" />
              <div className="h-12 rounded-lg bg-foreground/[0.07]" />
              <div className="h-12 rounded-lg bg-foreground/[0.05]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
