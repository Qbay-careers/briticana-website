"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { INTERNSHIP_DOMAIN_LABELS } from "@/lib/internshipDomainLabels";
import { INTERNSHIP_DURATIONS, INTERNSHIP_REGIONS } from "@/lib/internshipFilters";

export type ApplyFormInitial = {
  internship?: string;
  domain?: string;
  duration?: string;
  region?: string;
  source?: string;
};

type FieldErrors = Partial<Record<"fullName" | "email" | "phone" | "domain", string>>;

const OTHER = "Other";

export default function ApplyForm({ initial }: { initial?: ApplyFormInitial }) {
  const domainOptions = useMemo(() => {
    const base = [...INTERNSHIP_DOMAIN_LABELS];
    if (initial?.domain && !base.includes(initial.domain)) base.unshift(initial.domain);
    return base;
  }, [initial?.domain]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [domain, setDomain] = useState(initial?.domain ?? "");
  const [duration, setDuration] = useState(initial?.duration ?? "");
  const [region, setRegion] = useState(initial?.region ?? "");
  const [educationLevel, setEducationLevel] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setFormError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          country,
          domain,
          duration,
          region,
          educationLevel,
          introduction,
          internship: initial?.internship ?? "",
          source: initial?.source ?? "apply-page",
          website,
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fields?: FieldErrors }
        | null;

      if (res.ok && data?.ok) {
        setSubmitted(true);
        return;
      }

      if (data?.fields) setFieldErrors(data.fields);
      setFormError(data?.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="apply-card" role="status">
        <div className="apply-card__body text-center py-5">
          <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: "3rem" }} aria-hidden />
          <h3 className="mt-3 mb-2">Application received</h3>
          <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "520px" }}>
            Thank you for applying{fullName ? `, ${fullName.split(" ")[0]}` : ""}. Our team will review your details
            and reach out by email with the next steps.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link href="/internships" className="main-btn">
              Explore more internships
            </Link>
            <Link href="/" className="main-btn black">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-card">
      <div className="apply-card__head">
        <span className="apply-card__head-icon" aria-hidden>
          <i className="ri-quill-pen-line" />
        </span>
        <div>
          <p className="apply-card__title">Application details</p>
          <p className="apply-card__subtitle">Fields marked with * are required.</p>
        </div>
      </div>

      <form className="apply-form apply-card__body" onSubmit={(e) => void handleSubmit(e)} noValidate>
        {initial?.internship ? (
          <div className="apply-note mb-4" role="note">
            <i className="ri-briefcase-4-line" aria-hidden />
            <span>
              Applying for <strong>{initial.internship}</strong>
            </span>
          </div>
        ) : null}

        {formError ? (
          <div className="alert alert-danger py-2 small mb-4" role="alert">
            {formError}
          </div>
        ) : null}

        <div className="row g-3 g-md-4">
          <div className="col-md-6">
            <label htmlFor="apply-name" className="form-label">
              Full name <span className="apply-required">*</span>
            </label>
            <div className="apply-control">
              <i className="apply-control__icon ri-user-line" aria-hidden />
              <input
                id="apply-name"
                type="text"
                className={`form-control${fieldErrors.fullName ? " is-invalid" : ""}`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>
            {fieldErrors.fullName ? <div className="invalid-feedback d-block">{fieldErrors.fullName}</div> : null}
          </div>

          <div className="col-md-6">
            <label htmlFor="apply-email" className="form-label">
              Email <span className="apply-required">*</span>
            </label>
            <div className="apply-control">
              <i className="apply-control__icon ri-mail-line" aria-hidden />
              <input
                id="apply-email"
                type="email"
                className={`form-control${fieldErrors.email ? " is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            {fieldErrors.email ? <div className="invalid-feedback d-block">{fieldErrors.email}</div> : null}
          </div>

          <div className="col-md-6">
            <label htmlFor="apply-phone" className="form-label">
              Phone <span className="apply-required">*</span>
            </label>
            <div className="apply-control">
              <i className="apply-control__icon ri-phone-line" aria-hidden />
              <input
                id="apply-phone"
                type="tel"
                className={`form-control${fieldErrors.phone ? " is-invalid" : ""}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 900000"
                autoComplete="tel"
                required
              />
            </div>
            {fieldErrors.phone ? <div className="invalid-feedback d-block">{fieldErrors.phone}</div> : null}
          </div>

          <div className="col-md-6">
            <label htmlFor="apply-country" className="form-label">
              Country / region of residence
            </label>
            <div className="apply-control">
              <i className="apply-control__icon ri-map-pin-line" aria-hidden />
              <input
                id="apply-country"
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United Kingdom"
                autoComplete="country-name"
              />
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="apply-domain" className="form-label">
              Domain you&apos;re applying for <span className="apply-required">*</span>
            </label>
            <div className="apply-control">
              <i className="apply-control__icon ri-stack-line" aria-hidden />
              <select
                id="apply-domain"
                className={`form-select${fieldErrors.domain ? " is-invalid" : ""}`}
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              >
                <option value="">Select a domain…</option>
                {domainOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
                <option value={OTHER}>{OTHER}</option>
              </select>
            </div>
            {fieldErrors.domain ? <div className="invalid-feedback d-block">{fieldErrors.domain}</div> : null}
          </div>

          <div className="col-md-6">
            <label htmlFor="apply-duration" className="form-label">
              Preferred duration
            </label>
            <div className="apply-control">
              <i className="apply-control__icon ri-time-line" aria-hidden />
              <select
                id="apply-duration"
                className="form-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">Select duration…</option>
                {INTERNSHIP_DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="apply-region" className="form-label">
              Preferred program region
            </label>
            <div className="apply-control">
              <i className="apply-control__icon ri-global-line" aria-hidden />
              <select
                id="apply-region"
                className="form-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Select region…</option>
                {INTERNSHIP_REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="apply-education" className="form-label">
              Current education level
            </label>
            <div className="apply-control">
              <i className="apply-control__icon ri-graduation-cap-line" aria-hidden />
              <input
                id="apply-education"
                type="text"
                className="form-control"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                placeholder="e.g. Final-year undergraduate"
              />
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="apply-intro" className="form-label">
              Brief introduction
            </label>
            <div className="apply-control apply-control--textarea">
              <i className="apply-control__icon ri-chat-3-line" aria-hidden />
              <textarea
                id="apply-intro"
                className="form-control"
                rows={4}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="Tell us a little about yourself, your goals, and why you'd like to join."
              />
            </div>
          </div>

          {/* Honeypot: hidden from users; bots that fill it are silently dropped. */}
          <div className="d-none" aria-hidden>
            <label htmlFor="apply-website">Website</label>
            <input
              id="apply-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="main-btn apply-submit w-100 justify-content-center" disabled={submitting}>
              {submitting ? (
                "Submitting…"
              ) : (
                <>
                  Submit application <i className="ri-arrow-right-long-line ms-2" aria-hidden />
                </>
              )}
            </button>
            <p className="small text-secondary text-center mt-3 mb-0 apply-consent">
              By submitting, you agree to our <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
