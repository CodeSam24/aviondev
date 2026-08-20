import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { AboutSection, BenefitsSection, CtaBand } from "@/components/site/sections";

const title = "About AVION — Freelance Web Development by Sam";
const description =
  "AVION is run by Sam, a freelance web developer building modern websites for businesses and creators. You work directly with him.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A developer, not an agency queue"
        description="You work directly with the person designing and building your website."
      />
      <AboutSection />
      <BenefitsSection />
      <CtaBand />
    </>
  );
}
