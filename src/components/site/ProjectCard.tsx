import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";
import { Reveal } from "./Reveal";

function Preview({ name, hue, featured }: { name: string; hue: number; featured?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-border ${featured ? "aspect-[16/8]" : "aspect-[16/10]"}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 0%, oklch(0.42 0.09 ${hue} / 0.55), transparent 60%), linear-gradient(160deg, oklch(0.22 0 0), oklch(0.16 0 0))`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-border/80 bg-background/40 px-4 py-3 backdrop-blur">
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        <span className="ml-3 h-4 w-1/3 rounded bg-muted-foreground/15" />
      </div>
      <div className="absolute inset-x-6 top-16 space-y-3 sm:inset-x-10 sm:top-20">
        <div className="h-6 w-2/3 rounded bg-foreground/20 sm:h-8" />
        <div className="h-3 w-1/2 rounded bg-foreground/10" />
        <div className="grid grid-cols-3 gap-3 pt-4">
          <div className="h-14 rounded-lg bg-foreground/10 sm:h-20" />
          <div className="h-14 rounded-lg bg-foreground/[0.07] sm:h-20" />
          <div className="h-14 rounded-lg bg-foreground/[0.05] sm:h-20" />
        </div>
      </div>
      <span className="absolute bottom-4 right-5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/35">
        {name}
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <Reveal
      as="article"
      delay={index * 80}
      className={`group panel overflow-hidden p-4 transition-colors duration-300 hover:border-accent/40 sm:p-6 ${
        featured ? "lg:p-8" : ""
      }`}
    >
      <Preview name={project.name} hue={project.hue} featured={featured} />
      <div
        className={`flex flex-col gap-5 px-1 pb-1 pt-6 sm:flex-row sm:items-end sm:justify-between ${
          featured ? "sm:pt-8" : ""
        }`}
      >
        <div className={featured ? "max-w-2xl" : "max-w-lg"}>
          <h3 className={featured ? "text-2xl font-semibold sm:text-3xl" : "text-xl font-semibold"}>
            {project.name}
          </h3>
          <p
            className={`mt-2 leading-relaxed text-muted-foreground ${
              featured ? "text-base" : "text-sm"
            }`}
          >
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={project.href ?? "#"}
          target={project.href ? "_blank" : undefined}
          rel={project.href ? "noreferrer" : undefined}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          View Project
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </Reveal>
  );
}
