import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import {
  BenefitsSection,
  CtaBand,
  PricingSection,
  ServicesSection,
} from "@/components/site/sections";

const title = "Services — Websites, Landing Pages & Redesigns | AVION";
const description =
  "Business websites, landing pages, website redesigns, and ongoing maintenance — built custom for your business.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Websites built around what your business needs"
        description="Four ways I help businesses, creators, and coaches show up properly online."
      />
      <ServicesSection heading={false} />
      <BenefitsSection />
      <PricingSection />
      <CtaBand />
    </>
  );
}
