import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CtaBand, PricingSection } from "@/components/site/sections";

const title = "Pricing — Website Packages | AVION";
const description =
  "Transparent starting prices for landing pages, business websites, and custom builds. Every AVION project is quoted individually.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Straightforward starting prices"
        description="Pricing depends on scope, features, and requirements — these are starting points, not caps."
      />
      <PricingSection heading={false} />
      <CtaBand />
    </>
  );
}
