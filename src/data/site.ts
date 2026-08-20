import progressiveRpm from "@/assets/progressive-rpm.png.asset.json";

/**
 * Single source of truth for business info, services, projects, pricing.
 * Edit values here — no component changes needed.
 */

export const site = {
  name: "AVION",
  brand: "AVION — Web Development",
  role: "Freelance Web Development",
  owner: "Samuel Davis",
  email: "samuelldavis7706@gmail.com",
  tagline: "Modern websites for businesses that want to stand out.",
  description:
    "AVION is a freelance web development studio building modern, responsive websites for small businesses, creators, coaches, and local businesses.",
  socials: [
    { label: "GitHub", href: "https://github.com/CodeSam24" },
    { label: "Instagram", href: "https://www.instagram.com/avion.dev" },
  ],
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "Pricing", to: "/pricing" },
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
      "Focused pages built around a specific product, service, or goal.",
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
  /** Real screenshot of the live project. */
  image?: string;
};

/** Only real projects. Add new entries here and the Work section updates itself. */
export const projects: Project[] = [
  {
    slug: "progressive-rpm",
    name: "Progressive RPM",
    description:
      "A clean, information-first website structured around services and customer enquiries, built to load fast and read clearly on any device.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    hue: 230,
    image: progressiveRpm.url,
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
    description: "You review the website and provide feedback for revisions.",
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
    price: "Starting at $75",
    note: "Starting price",
    cta: "Start a Project",
  },
  {
    name: "Business",
    description: "Multi-page websites for businesses and organizations.",
    price: "Starting at $150",
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

export const pricingNote =
  "Every project is quoted individually based on scope, features, and requirements.";

export const projectTypes = [
  "Business Website",
  "Landing Page",
  "Website Redesign",
  "Website Maintenance",
  "Something Else",
];

export const budgets = [
  "Not sure yet",
  "Under $150",
  "$150 – $500",
  "$500 – $1,000",
  "$1,000+",
];
