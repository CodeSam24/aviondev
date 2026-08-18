import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { processSteps, site } from "@/data/site";

const title = "Contact — Start a Web Design Project | Sam";
const description =
  "Tell me what you're looking to build and I'll get back to you. Send a project inquiry or email directly.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Have a project in mind?"
        description="Tell me what you're looking to build, and I'll get back to you."
      />
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={120} className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Prefer email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block text-lg font-medium underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {site.email}
              </a>
            </div>
            <div className="hairline" />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                What happens next
              </p>
              <ol className="mt-4 space-y-4">
                {processSteps.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="font-mono text-xs text-accent">{s.step}</span>
                    <span className="text-sm text-muted-foreground">{s.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
