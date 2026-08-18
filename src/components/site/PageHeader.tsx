import { Container } from "./Section";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 glow-top" />
      <Container className="relative py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
