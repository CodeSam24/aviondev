import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Section";
import { HeroVisual } from "@/components/site/HeroVisual";
import {
  AboutSection,
  BenefitsSection,
  CtaBand,
  CtaButtons,
  PricingSection,
  ProcessSection,
  ServicesSection,
  WorkSection,
} from "@/components/site/sections";

const title = "AVION — Modern Websites for Businesses That Want to Stand Out";
const description =
  "AVION is a freelance web development studio building fast, responsive, custom websites for small businesses, creators, coaches, and local businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] glow-top" />
      <Container className="relative pb-16 pt-24 sm:pb-24 sm:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Freelance Web Development
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-6xl">
            Modern websites for businesses that want to stand out.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I design and build fast, responsive websites tailored to your
            business, brand, and customers.
          </p>
        </Reveal>
        <Reveal delay={240} className="mt-9">
          <CtaButtons />
        </Reveal>
        </div>
        <Reveal delay={200} className="hidden lg:block">
          <HeroVisual />
        </Reveal>
        </div>
        <Reveal delay={320} className="mt-16">
          <div className="hairline" />
          <ul className="grid gap-6 pt-8 sm:grid-cols-3">
            {[
              ["Small businesses", "Sites that make local businesses easy to find and trust."],
              ["Creators & coaches", "Pages built to explain your offer and convert visitors."],
              ["Redesigns", "Outdated sites rebuilt into modern, responsive experiences."],
            ].map(([label, copy]) => (
              <li key={label}>
                <p className="text-sm font-medium">{label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {copy}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WorkSection />
      <BenefitsSection />
      <ProcessSection />
      <PricingSection />
      <AboutSection />
      <CtaBand />
    </>
  );
}
