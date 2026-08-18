/**
 * Single source of truth for business info, services, projects, pricing.
 * Edit values here — no component changes needed.
 */

export const site = {
  name: "Sam",
  brand: "Sam — Web Development",
  role: "Freelance Web Developer",
  email: "hello@example.com",
  description:
    "Freelance web developer building modern, responsive websites for small businesses, creators, coaches, and local businesses.",
  socials: [
    { label: "GitHub", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    title: "Business Websites",
    description:
      "Professional websites designed to give your business a strong online presence.",
  },
  {
    title: "Landing Pages",
    description:
      "Focused, high-converting pages built around a specific product, service, or goal.",
  },
  {
    title: "Website Redesigns",
    description:
      "Transform outdated websites into modern, responsive experiences.",
  },
  {
    title: "Website Maintenance",
    description:
      "Keep your website updated, polished, and running smoothly after launch.",
  },
];

export type Project = {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  /** Set to a live URL when the project is ready to share. */
  href?: string;
  /** Two-tone accent used by the generated preview panel. */
  hue: number;
};

export const projects: Project[] = [
  {
    slug: "burger-dev",
    name: "Burger Dev",
    description:
      "A menu-forward site for a food brand, focused on fast browsing and clear ordering information.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    hue: 60,
  },
  {
    slug: "progressive-rpm",
    name: "Progressive RPM",
    description:
      "A clean, information-first website structured around services and customer enquiries.",
    tech: ["React", "TypeScript", "Vite"],
    hue: 230,
  },
  {
    slug: "coach-website",
    name: "Coach Website",
    description:
      "A personal coaching site built to explain the offer and turn visitors into booked calls.",
    tech: ["React", "Tailwind CSS", "Forms"],
    hue: 155,
  },
  {
    slug: "freelancing-website",
    name: "Freelancing Website",
    description:
      "This site — a client-facing freelance web development site built for clarity and speed.",
    tech: ["TanStack Start", "TypeScript", "Tailwind CSS"],
    hue: 20,
  },
];

export const benefits = [
  {
    title: "Custom Built",
    description:
      "Websites designed around your business instead of forcing your business into a template.",
  },
  {
    title: "Responsive",
    description:
      "Designed to look and work properly across phones, tablets, and desktops.",
  },
  {
    title: "Direct Communication",
    description:
      "Work directly with the person designing and building your website.",
  },
  {
    title: "Modern Design",
    description:
      "Clean, professional interfaces built to make your business look credible online.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Tell Me What You Need",
    description:
      "Share your business, goals, style, and what you want your website to accomplish.",
  },
  {
    step: "02",
    title: "Design & Build",
    description:
      "I design and develop the website around your brand and requirements.",
  },
  {
    step: "03",
    title: "Review",
    description:
      "You review the website and provide feedback for revisions.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Once everything is ready, your website goes live.",
  },
];

export type Tier = {
  name: string;
  description: string;
  price: string;
  note: string;
  cta: string;
  featured?: boolean;
};

/** Prices are starting prices — update the `price` field anytime. */
export const pricing: Tier[] = [
  {
    name: "Starter",
    description: "Simple landing pages and smaller websites.",
    price: "Starting at $XXX",
    note: "Starting price",
    cta: "Start a Project",
  },
  {
    name: "Business",
    description: "Multi-page websites for businesses and organizations.",
    price: "Starting at $XXX",
    note: "Starting price",
    cta: "Start a Project",
    featured: true,
  },
  {
    name: "Custom",
    description: "Larger or specialized projects with custom requirements.",
    price: "Let's Talk",
    note: "Scoped per project",
    cta: "Get in Touch",
  },
];

export const projectTypes = [
  "Business Website",
  "Landing Page",
  "Website Redesign",
  "Website Maintenance",
  "Something Else",
];

export const budgets = [
  "Not sure yet",
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500+",
];
