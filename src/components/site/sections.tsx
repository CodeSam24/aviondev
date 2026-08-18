import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import {
  benefits,
  pricing,
  processSteps,
  projects,
  services,
  site,
} from "@/data/site";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";

export function CtaButtons({ secondary = true }: { secondary?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        to="/contact"
        className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Start a Project
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      {secondary ? (
        <Link
          to="/work"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          View My Work
        </Link>
      ) : null}
    </div>
  );
}

export function ServicesSection({ heading = true }: { heading?: boolean }) {
  return (
    <Section id="services">
      {heading ? (
        <SectionHeading
          eyebrow="Services"
          title="What I build"
          description="Focused web development work for businesses, creators, and coaches who need a site that actually performs."
        />
      ) : null}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {services.map((service, i) => (
          <Reveal
            key={service.title}
            delay={i * 70}
            className="panel group p-7 transition-colors duration-300 hover:border-accent/40 sm:p-8"
          >
            <span className="font-mono text-xs text-accent">
              0{i + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function WorkSection({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <Section id="work" className="border-y border-border bg-surface/30">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects, treated like case studies"
        description="A look at what I've built — the goal, the approach, and the stack behind each site."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {list.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

export function BenefitsSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Work With Me"
        title="A simpler way to get a website built"
      />
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={i * 70} className="bg-background p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-7 items-center justify-center rounded-full border border-accent/40 text-accent">
                <Check className="size-3.5" />
              </span>
              <h3 className="text-base font-semibold">{b.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {b.description}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ProcessSection() {
  return (
    <Section id="process" className="border-y border-border bg-surface/30">
      <SectionHeading
        eyebrow="Process"
        title="Four steps, no guesswork"
        description="You always know what stage your project is in and what happens next."
      />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.step}
            delay={i * 80}
            className="bg-background p-7 sm:p-9"
          >
            <p className="font-mono text-sm text-accent">{step.step}</p>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent starting prices"
        description="Every project is quoted individually. The figures below are starting prices — final pricing depends on scope."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {pricing.map((tier, i) => (
          <Reveal
            key={tier.name}
            delay={i * 80}
            className={`panel flex flex-col p-7 sm:p-8 ${
              tier.featured ? "border-accent/45 bg-surface-2/60" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              {tier.featured ? (
                <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Most common
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {tier.description}
            </p>
            <p className="mt-8 font-display text-2xl font-semibold">{tier.price}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {tier.note}
            </p>
            <Link
              to="/contact"
              className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                tier.featured
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "border border-border hover:border-accent hover:text-accent"
              }`}
            >
              {tier.cta}
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <SectionHeading
          eyebrow="About"
          title="Built by a developer who actually cares about the details."
        />
        <Reveal delay={100} className="max-w-xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            I'm Sam, a freelance web developer focused on building modern
            websites for businesses and creators. I started learning web
            development because I wanted to understand how websites actually
            work—not just use them. Now I use those skills to help businesses
            build a stronger online presence.
          </p>
          <div className="mt-8 hairline" />
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer email? Reach me at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {site.email}
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

export function CtaBand() {
  return (
    <Section className="border-t border-border">
      <Reveal className="panel relative overflow-hidden p-10 text-center sm:p-16">
        <div className="pointer-events-none absolute inset-0 glow-top" />
        <div className="relative">
          <h2 className="mx-auto max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell me what you're looking to build, and I'll get back to you.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButtons />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
