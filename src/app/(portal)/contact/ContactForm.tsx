"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const INQUIRY_TOPICS = [
  "Internship Programs & Admissions",
  "Certificate & Project Verification",
  "Experience Centers & Hubs",
  "University & Startup Partnerships",
  "Careers & Mentorship",
  "General Support",
] as const;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const announcerRef = useRef<HTMLDivElement | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: INQUIRY_TOPICS[0] as string,
    message: "",
  });

  // Synchronize aria-invalid and dynamic aria-describedby with CSS :user-invalid
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const flagged = new WeakSet<Element>();
    const announced = new WeakSet<Element>();
    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: Element | null = null;

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
      else el.removeAttribute("aria-describedby");
    };

    const announceError = (el: HTMLElement) => {
      const errorId = el.dataset.error;
      const announcer = announcerRef.current;
      if (!errorId || !announcer) return;
      const errorNode = document.getElementById(errorId);
      if (!errorNode) return;
      const text = errorNode.textContent?.replace(/\s+/g, " ").trim() || "";
      if (!text) return;
      if (announceTimer) clearTimeout(announceTimer);
      announcer.textContent = "";
      announcedField = el;
      announceTimer = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = text;
        }
      }, 450);
    };

    const syncAria = (target: EventTarget | null, shouldAnnounce = false) => {
      if (!(target instanceof HTMLElement)) return;
      if (!target.matches("input, select, textarea")) return;

      let invalid = false;
      try {
        invalid = target.matches(":user-invalid");
      } catch {
        invalid = !(target as HTMLInputElement).validity.valid;
      }

      if (invalid) {
        if (shouldAnnounce && !announced.has(target)) {
          announceError(target);
          announced.add(target);
        }
        target.setAttribute("aria-invalid", "true");
        linkError(target, true);
        flagged.add(target);
      } else if (flagged.has(target) || target.getAttribute("aria-invalid") !== "true") {
        target.setAttribute("aria-invalid", "false");
        linkError(target, false);
        flagged.delete(target);
        announced.delete(target);
        if (announcedField === target && announcerRef.current) {
          if (announceTimer) clearTimeout(announceTimer);
          announcerRef.current.textContent = "";
        }
      }
    };

    form.querySelectorAll("input, select, textarea").forEach((el) => {
      el.setAttribute("aria-invalid", "false");
    });

    const onBlur = (e: Event) => syncAria(e.target, true);
    const onInput = (e: Event) => {
      if (e.target instanceof HTMLElement && e.target.hasAttribute("aria-invalid")) {
        syncAria(e.target, false);
      }
    };
    const onInvalid = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        announced.add(e.target);
        syncAria(e.target, false);
      }
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      if (announceTimer) clearTimeout(announceTimer);
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("invalid", onInvalid, true);
    };
  }, [submitted]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="briti-form-card--quiet text-center py-4" role="status" aria-live="polite">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
          style={{ width: "50px", height: "50px", background: "#dcfce7", color: "#15803d" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="briti-h3 mb-2">Message received</h3>
        <p className="briti-text mx-auto mb-3" style={{ maxWidth: "440px", fontSize: "0.9rem" }}>
          Thank you, <strong>{formData.name || "there"}</strong>. We will reply to{" "}
          <strong>{formData.email}</strong> within one business day.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button
            type="button"
            className="briti-btn-secondary"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                subject: INQUIRY_TOPICS[0],
                message: "",
              });
            }}
          >
            Send another note
          </button>
          <a href="mailto:support@briticana.us" className="briti-btn-primary">
            Email support@briticana.us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="briti-form-card--quiet">
      <div ref={announcerRef} aria-live="polite" className="visually-hidden" />

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="contact-name" className="briti-label">
            Full name <span className="text-danger">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Alex Morgan"
            className="briti-input"
            data-error="contact-name-error"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div id="contact-name-error" className="briti-error">
            <span role="img" aria-label="Error">
              !
            </span>{" "}
            Please enter your full name.
          </div>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="contact-email" className="briti-label">
            Email address <span className="text-danger">*</span>
          </label>
          <span id="contact-email-hint" className="briti-hint">
            Format: you@example.com
          </span>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-describedby="contact-email-hint"
            data-error="contact-email-error"
            className="briti-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <div id="contact-email-error" className="briti-error">
            <span role="img" aria-label="Error">
              !
            </span>{" "}
            Enter a valid email address in the format you@example.com.
          </div>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="contact-subject" className="briti-label">
            Topic
          </label>
          <select
            id="contact-subject"
            name="subject"
            className="briti-input"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
            {INQUIRY_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="contact-phone" className="briti-label">
            Phone or WhatsApp <span style={{ color: "#64748b", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="tel"
            type="tel"
            autoComplete="tel"
            placeholder="+1 734 249 8898"
            className="briti-input"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label htmlFor="contact-message" className="briti-label">
            Message <span className="text-danger">*</span>
          </label>
          <span id="contact-message-hint" className="briti-hint">
            Include your internship domain, verification ID, or partnership details if applicable.
          </span>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            rows={5}
            aria-describedby="contact-message-hint"
            data-error="contact-message-error"
            placeholder="Write your message here..."
            className="briti-input"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <div id="contact-message-error" className="briti-error">
            <span role="img" aria-label="Error">
              !
            </span>{" "}
            Please enter at least 10 characters so we can help you.
          </div>
        </div>

        <div className="col-12 pt-2 d-flex flex-wrap align-items-center justify-content-between gap-3 briti-form-submit-row">
          <button type="submit" disabled={isSubmitting} className="briti-btn-primary">
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
            Protected under UK GDPR &amp; EU GDPR.
          </span>
        </div>
      </div>
    </form>
  );
}
