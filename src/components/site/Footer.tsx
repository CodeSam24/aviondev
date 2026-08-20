import { Link } from "@tanstack/react-router";
import { nav, site } from "@/data/site";
import { Container } from "./Section";

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em]">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground/60">
                      {s.label} — {"note" in s ? s.note : "Coming soon"}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p>{site.role} · Built by {site.owner}</p>
        </div>
      </Container>
    </footer>
  );
}
