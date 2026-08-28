import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  budgets,
  contactMethods,
  industries,
  pricing,
  projectTypes,
  site,
  type PackageSlug,
} from "@/data/site";

const field =
  "mt-2 w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-accent/40 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";
const labelClass = "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground";

export type InquiryPayload = {
  name: string;
  email: string;
  company: string;
  industry: string;
  packageName: string;
  projectType: string;
  budget: string;
  message: string;
  websiteUrl: string;
  features: string;
  contactMethod: string;
  contactDetail: string;
  notes: string;
};

type Errors = Partial<Record<keyof InquiryPayload, string>>;

function validate(v: InquiryPayload): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  else if (v.name.length > 100) errors.name = "Name must be under 100 characters.";
  if (!v.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email))
    errors.email = "Please enter a valid email address.";
  else if (v.email.length > 255) errors.email = "Email must be under 255 characters.";
  if (!v.company.trim()) errors.company = "Please enter your business name.";
  else if (v.company.length > 100) errors.company = "Must be under 100 characters.";
  if (!v.industry.trim()) errors.industry = "Please choose a business type.";
  if (!v.packageName.trim()) errors.packageName = "Please choose a package.";
  if (!v.message.trim()) errors.message = "Tell me a little about the project.";
  else if (v.message.length > 2000) errors.message = "Message must be under 2000 characters.";
  if (v.websiteUrl && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(v.websiteUrl.trim()))
    errors.websiteUrl = "Enter a valid URL, e.g. example.com";
  if (v.features.length > 1000) errors.features = "Must be under 1000 characters.";
  if (v.notes.length > 1000) errors.notes = "Must be under 1000 characters.";
  if (v.contactMethod !== "Email" && !v.contactDetail.trim())
    errors.contactDetail = "Add the handle or number to reach you on.";
  return errors;
}

function buildMailto(values: InquiryPayload) {
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Business / Company: ${values.company}`,
    `Business type: ${values.industry}`,
    `Package: ${values.packageName}`,
    `Project type: ${values.projectType}`,
    `Budget: ${values.budget}`,
    `Existing website: ${values.websiteUrl || "—"}`,
    `Preferred contact: ${values.contactMethod}${
      values.contactDetail ? ` (${values.contactDetail})` : ""
    }`,
    "",
    "What they need:",
    values.message,
    "",
    "Desired features:",
    values.features || "—",
    "",
    "Additional notes:",
    values.notes || "—",
  ].join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Project inquiry (${values.packageName}) — ${values.name}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({
  initialPackage,
}: {
  initialPackage?: PackageSlug | undefined;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<InquiryPayload | null>(null);
  const [mailtoHref, setMailtoHref] = useState("");
  const [contactMethod, setContactMethod] = useState(contactMethods[0]);

  const defaultPackage =
    pricing.find((t) => t.slug === initialPackage)?.name ?? pricing[1]?.name ?? "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const values: InquiryPayload = {
      name: get("name"),
      email: get("email"),
      company: get("company"),
      industry: get("industry"),
      packageName: get("packageName"),
      projectType: get("projectType"),
      budget: get("budget"),
      message: get("message"),
      websiteUrl: get("websiteUrl"),
      features: get("features"),
      contactMethod: get("contactMethod"),
      contactDetail: get("contactDetail"),
      notes: get("notes"),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    const href = buildMailto(values);
    setMailtoHref(href);
    setSubmitted(values);
    window.location.href = href;
    toast.success("Your inquiry is ready to send", {
      description: `Your email app should open with everything filled in. If it doesn't, email ${site.email} directly.`,
    });
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

  if (submitted) {
    return (
      <div className="panel p-6 sm:p-8" role="status" aria-live="polite">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Inquiry ready
        </p>
        <h2 className="mt-4 text-2xl font-semibold">
          Thanks, {submitted.name.split(" ")[0]}.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your details for the <span className="text-foreground">{submitted.packageName}</span>{" "}
          package are packaged into an email addressed to {site.email}. Your email
          app should have opened — nothing is sent until you press send there.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open my email app again
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              setMailtoHref("");
            }}
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="panel p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
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
            inputMode="email"
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
            Business name
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Your business"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={field}
          />
          {errorFor("company")}
        </div>
        <div>
          <label htmlFor="industry" className={labelClass}>
            Business type
          </label>
          <select id="industry" name="industry" defaultValue={industries[0]} className={field}>
            {industries.map((t) => (
              <option key={t} value={t} className="bg-background">
                {t}
              </option>
            ))}
          </select>
          {errorFor("industry")}
        </div>
        <div>
          <label htmlFor="packageName" className={labelClass}>
            Package
          </label>
          <select
            id="packageName"
            name="packageName"
            defaultValue={defaultPackage}
            className={field}
          >
            {pricing.map((t) => (
              <option key={t.slug} value={t.name} className="bg-background">
                {t.name} — {t.price}
              </option>
            ))}
          </select>
          {errorFor("packageName")}
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
        <div>
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
        <div>
          <label htmlFor="websiteUrl" className={labelClass}>
            Existing website (optional)
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            inputMode="url"
            placeholder="example.com"
            aria-invalid={!!errors.websiteUrl}
            aria-describedby={errors.websiteUrl ? "websiteUrl-error" : undefined}
            className={field}
          />
          {errorFor("websiteUrl")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            What do you need?
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
        <div className="sm:col-span-2">
          <label htmlFor="features" className={labelClass}>
            Desired features (optional)
          </label>
          <textarea
            id="features"
            name="features"
            rows={3}
            placeholder="Booking form, online store, blog, gallery, contact form…"
            aria-invalid={!!errors.features}
            aria-describedby={errors.features ? "features-error" : undefined}
            className={`${field} resize-y`}
          />
          {errorFor("features")}
        </div>
        <div>
          <label htmlFor="contactMethod" className={labelClass}>
            Preferred contact method
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            className={field}
          >
            {contactMethods.map((m) => (
              <option key={m} value={m} className="bg-background">
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contactDetail" className={labelClass}>
            {contactMethod === "Email" ? "Contact detail (optional)" : "Handle / number"}
          </label>
          <input
            id="contactDetail"
            name="contactDetail"
            placeholder={contactMethod === "Phone / text" ? "(555) 555-5555" : "@yourhandle"}
            aria-invalid={!!errors.contactDetail}
            aria-describedby={errors.contactDetail ? "contactDetail-error" : undefined}
            className={field}
          />
          {errorFor("contactDetail")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Additional notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Timelines, references, anything else."
            aria-invalid={!!errors.notes}
            aria-describedby={errors.notes ? "notes-error" : undefined}
            className={`${field} resize-y`}
          />
          {errorFor("notes")}
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        Send Project Inquiry
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Submitting opens your email app with the inquiry pre-filled, so nothing is
        sent without you seeing it. You can also email {site.email} directly.
      </p>
    </form>
  );
}
