import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CtaBand, PricingSection, ProcessSection } from "@/components/site/sections";

const title = "Process — How a Project Works | Sam";
const description =
  "A simple four-step process: tell me what you need, design and build, review, and launch.";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/process" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="How working together looks"
        description="Clear steps, direct communication, and no surprises between the first message and launch day."
      />
      <ProcessSection />
      <PricingSection />
      <CtaBand />
    </>
  );
}
