import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
