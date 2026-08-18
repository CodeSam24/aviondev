import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { nav, site } from "@/data/site";
import { Container } from "./Section";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-display text-sm font-semibold tracking-[0.2em] uppercase"
          onClick={() => setOpen(false)}
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-full px-3.5 py-2 text-sm transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Start a Project
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border md:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="py-3 text-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
