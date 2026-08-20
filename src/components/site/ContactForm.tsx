import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { budgets, projectTypes, site } from "@/data/site";

const field =
  "mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-accent/40 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";
const labelClass = "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground";

export type InquiryPayload = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof InquiryPayload, string>>;

function validate(v: InquiryPayload): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  else if (v.name.length > 100) errors.name = "Name must be under 100 characters.";
  if (!v.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email))
    errors.email = "Please enter a valid email address.";
  if (v.company.length > 100) errors.company = "Must be under 100 characters.";
  if (!v.message.trim()) errors.message = "Tell me a little about the project.";
  else if (v.message.length > 2000) errors.message = "Message must be under 2000 characters.";
  return errors;
}

/**
 * No email backend is connected yet, so the inquiry is handed off to the
 * visitor's email client with everything pre-filled.
 *
 * To connect a real service later (Resend, Formspree, a server function, ...),
 * replace the body of this function with your API call and return true/false.
 */
async function submitInquiry(values: InquiryPayload): Promise<boolean> {
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Business / Company: ${values.company || "—"}`,
    `Project type: ${values.projectType}`,
    `Budget: ${values.budget}`,
    "",
    values.message,
  ].join("\n");

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Project inquiry — ${values.name}`,
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
  return true;
}

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: InquiryPayload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      projectType: String(data.get("projectType") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? "").trim(),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    setSending(true);
    try {
      const ok = await submitInquiry(values);
      if (!ok) throw new Error("failed");
      toast.success("Your inquiry is ready to send", {
        description: `Your email app should open with the details filled in. If it doesn't, email ${site.email} directly.`,
      });
    } catch {
      toast.error("Something went wrong", {
        description: `Please email ${site.email} directly and I'll get back to you.`,
      });
    } finally {
      setSending(false);
    }
  }

  function errorFor(key: keyof InquiryPayload) {
    const message = errors[key];
    if (!message) return null;
    return (
      <p id={`${key}-error`} role="alert" className="mt-2 text-xs text-destructive">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="panel p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={field}
          />
          {errorFor("name")}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@business.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
          />
          {errorFor("email")}
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
          {errorFor("company")}
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
            rows={5}
            placeholder="What are you looking to build?"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${field} resize-y`}
          />
          {errorFor("message")}
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Preparing…" : "Send Project Inquiry"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Submitting opens your email app with the inquiry pre-filled, so nothing is
        sent without you seeing it. You can also email {site.email} directly.
      </p>
    </form>
  );
}
