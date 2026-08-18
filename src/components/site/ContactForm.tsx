import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { budgets, projectTypes, site } from "@/data/site";

const field =
  "mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-accent/40 focus:border-accent focus:outline-none";
const labelClass = "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground";

export function ContactForm() {
  const [sending, setSending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const type = String(data.get("projectType") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "");

    setSending(true);
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business / Company: ${company}`,
      `Project type: ${type}`,
      `Budget: ${budget}`,
      "",
      message,
    ].join("\n");

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project inquiry — ${name}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    toast.success("Opening your email client", {
      description: `If nothing opens, email me directly at ${site.email}.`,
    });
    form.reset();
    setSending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@business.com"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Business / Company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Optional"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <select id="projectType" name="projectType" defaultValue={projectTypes[0]} className={field}>
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-background">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="budget" className={labelClass}>
            Budget
          </label>
          <select id="budget" name="budget" defaultValue={budgets[0]} className={field}>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-background">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you looking to build?"
            className={`${field} resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        Send Project Inquiry
      </button>
    </form>
  );
}
