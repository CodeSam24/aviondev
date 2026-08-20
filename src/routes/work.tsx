import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CtaBand, WorkSection } from "@/components/site/sections";

const title = "Work — Web Development Projects | AVION";
const description =
  "A look at the websites AVION has designed and built, with the goal, approach, and technologies behind each project.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Selected projects"
        description="Each project is approached as a case study: what it needed to do, and how it was built."
      />
      <WorkSection />
      <CtaBand />
    </>
  );
}
