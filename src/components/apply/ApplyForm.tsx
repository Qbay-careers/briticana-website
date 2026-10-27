"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import "@/styles/internship-application-form.css";

export type ApplyFormInitial = {
  internship?: string;
  domain?: string;
  duration?: string;
  region?: string;
  source?: string;
};

// Google Apps Script Web App Webhook URL (connected to Google Sheet & Drive)
const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwDbIQBUm5Y3YYJcuwfPgieamXeX9FWzpKNZxcm8PnxJZji9H5BIjfHfGLotBR96fAX/exec";

const DOMAIN_OPTIONS = [
  "Administration",
  "Artificial Intelligence",
  "Asset Management",
  "Audit",
  "Business Analysis",
  "Clinical",
  "Compliance",
  "Cybersecurity",
  "Other / Not sure yet",
];

const DURATION_OPTIONS = [
  "3 Months",
  "6 Months",
  "9 Months",
  "12 Months",
  "15 Months",
  "18 Months",
  "21 Months",
  "24 Months",
];

function matchDomainOption(domain?: string): string {
  if (!domain) return "";
  const clean = domain.trim().toLowerCase();
  for (const opt of DOMAIN_OPTIONS) {
    if (opt.toLowerCase() === clean || clean.includes(opt.toLowerCase())) {
      return opt;
    }
  }
  return "";
}

function matchDurationOption(duration?: string): string {
  if (!duration) return "";
  const clean = duration.trim().toLowerCase();
  for (const opt of DURATION_OPTIONS) {
    if (opt.toLowerCase().startsWith(clean.slice(0, 2))) {
      return opt;
    }
  }
  return "";
}

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string; name: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = (reader.result as string) || "";
      const base64 = res.split(",")[1] || "";
      resolve({
        base64,
        mimeType: file.type || "application/octet-stream",
        name: file.name,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ApplyForm({ initial }: { initial?: ApplyFormInitial }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Theme: light / dark
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Section 1: Personal Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState(initial?.region || "");
  const [university, setUniversity] = useState("");
  const [currentQualification, setCurrentQualification] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Section 2: Internship Details
  const [domain, setDomain] = useState(() => matchDomainOption(initial?.domain));
  const [duration, setDuration] = useState(() => matchDurationOption(initial?.duration));
  const [currentStatus, setCurrentStatus] = useState("");
  const [careerAssistance, setCareerAssistance] = useState("");
  const [jobInterest, setJobInterest] = useState("");

  // Consent & state
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  // Error tracking for validation
  const [touched, setTouched] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Progress Calculation
  const progressPercent = useMemo(() => {
    const requiredChecks = [
      Boolean(firstName.trim()),
      Boolean(lastName.trim()),
      Boolean(country.trim()),
      Boolean(university.trim()),
      Boolean(currentQualification.trim()),
      Boolean(resumeFile),
      Boolean(domain.trim()),
      Boolean(duration.trim()),
      Boolean(currentStatus.trim()),
      Boolean(careerAssistance.trim()),
      Boolean(jobInterest.trim()),
      Boolean(consent),
    ];
    const completed = requiredChecks.filter(Boolean).length;
    return Math.min(100, Math.round((completed / requiredChecks.length) * 100));
  }, [
    firstName,
    lastName,
    country,
    university,
    currentQualification,
    resumeFile,
    domain,
    duration,
    currentStatus,
    careerAssistance,
    jobInterest,
    consent,
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const isFirstValid = Boolean(firstName.trim());
    const isLastValid = Boolean(lastName.trim());
    const isCountryValid = Boolean(country.trim());
    const isUniValid = Boolean(university.trim());
    const isQualValid = Boolean(currentQualification.trim());
    const isResumeValid = Boolean(resumeFile);
    const isDomainValid = Boolean(domain.trim());
    const isDurationValid = Boolean(duration.trim());
    const isStatusValid = Boolean(currentStatus.trim());
    const isCareerValid = Boolean(careerAssistance.trim());
    const isJobValid = Boolean(jobInterest.trim());
    const isConsentValid = Boolean(consent);

    const allValid =
      isFirstValid &&
      isLastValid &&
      isCountryValid &&
      isUniValid &&
      isQualValid &&
      isResumeValid &&
      isDomainValid &&
      isDurationValid &&
      isStatusValid &&
      isCareerValid &&
      isJobValid &&
      isConsentValid;

    if (!allValid) {
      // Find and scroll to the first invalid field
      const firstInvalidEl = document.querySelector(
        ".briti-app-form-root .fg.invalid, .briti-app-form-root .consent.invalid",
      );
      if (firstInvalidEl) {
        firstInvalidEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    const payload: Record<string, string> = {
      submittedAt: new Date().toISOString(),
      source: initial?.source || initial?.internship || "Web Form",
      "First Name": firstName.trim(),
      "Last Name": lastName.trim(),
      "Country of Residence": country.trim(),
      "University / Institution": university.trim(),
      "Current Qualification": currentQualification.trim(),
      "LinkedIn Profile": linkedIn.trim(),
      "Preferred Domain": domain,
      "Preferred Duration": duration,
      "Current Status": currentStatus,
      "Career Assistance": careerAssistance,
      "Job Interest": jobInterest,
      "Declaration Consent": "Agreed",
      "Resume File": "",
      "Resume Base64": "",
      "Resume MimeType": "",
    };

    if (initial?.internship) {
      payload["Internship Title"] = initial.internship;
    }

    if (resumeFile) {
      try {
        const fileData = await fileToBase64(resumeFile);
        payload["Resume File"] = fileData.name;
        payload["Resume Base64"] = fileData.base64;
        payload["Resume MimeType"] = fileData.mimeType;
      } catch (err) {
        console.warn("Could not read resume file as Base64", err);
        payload["Resume File"] = resumeFile.name;
      }
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setSubmittedName(firstName.trim());
      setIsSuccess(true);
      if (cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.warn("Submit error:", err);
      alert("Could not send application. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="briti-app-form-root" data-theme={theme}>
      <div className="shell">
        {/* Topbar with Theme Toggle */}
        <div className="topbar">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>
        </div>

        {/* Main Application Card */}
        <div className="card" ref={cardRef}>
          {/* Hero Section */}
          <div className="hero">
            <div className="logo">
              <img
                src="/assets/briticana-logo.webp"
                alt="Briticana logo"
                width={100}
                height={100}
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <h1>Internship Application</h1>
            <p>
              Apply below to join the Briticana remote internship programme. Upload your CV — it covers education,
              skills and experience.
            </p>
            <span className="badge">Briticana · Since 2001</span>
          </div>

          {/* Progress Bar */}
          <div className="progress-wrap">
            <div
              className="progress-bar"
              style={{ width: isSuccess ? "100%" : `${progressPercent}%` }}
            />
          </div>

          {/* Success View */}
          {isSuccess ? (
            <div className="success show">
              <div className="tick">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2>Application Submitted 🎉</h2>
              <p>
                Thank you{submittedName ? `, ${submittedName}` : ""}! Your Briticana Internship application has been
                received. Our team will assess your application and match you to the right project domain, then reach out
                with next steps.
              </p>
              <Link href="/internships">Explore internship domains</Link>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} noValidate>
              {/* Optional Internship Pill Banner if preselected */}
              {initial?.internship && (
                <div className="applying-banner">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span>
                    Applying for <strong>{initial.internship}</strong>
                  </span>
                </div>
              )}

              {/* Section 1: Personal Information */}
              <section className="section">
                <div className="section-head">
                  <span className="num">1</span>
                  <h2>Personal Information</h2>
                </div>
                <div className="grid two">
                  {/* First Name */}
                  <div className={`fg ${touched && !firstName.trim() ? "invalid" : ""}`}>
                    <label htmlFor="first-name">
                      First Name<span className="req">*</span>
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      name="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <span className="err">Required</span>
                  </div>

                  {/* Last Name */}
                  <div className={`fg ${touched && !lastName.trim() ? "invalid" : ""}`}>
                    <label htmlFor="last-name">
                      Last Name<span className="req">*</span>
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      name="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <span className="err">Required</span>
                  </div>

                  {/* Country of Residence */}
                  <div className={`fg ${touched && !country.trim() ? "invalid" : ""}`}>
                    <label htmlFor="country-residence">
                      Country of Residence<span className="req">*</span>
                    </label>
                    <input
                      id="country-residence"
                      type="text"
                      name="Country of Residence"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                    <span className="err">Required</span>
                  </div>

                  {/* University / Institution */}
                  <div className={`fg ${touched && !university.trim() ? "invalid" : ""}`}>
                    <label htmlFor="university">
                      University / Institution<span className="req">*</span>
                    </label>
                    <input
                      id="university"
                      type="text"
                      name="University / Institution"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      required
                    />
                    <span className="err">Required</span>
                  </div>

                  {/* Current Qualification */}
                  <div className={`fg ${touched && !currentQualification.trim() ? "invalid" : ""}`}>
                    <label htmlFor="qualification">
                      Current Qualification<span className="req">*</span>
                    </label>
                    <input
                      id="qualification"
                      type="text"
                      name="Current Qualification"
                      placeholder="e.g. BSc Computer Science"
                      value={currentQualification}
                      onChange={(e) => setCurrentQualification(e.target.value)}
                      required
                    />
                    <span className="err">Required</span>
                  </div>

                  {/* LinkedIn Profile (Optional) */}
                  <div className="fg">
                    <label htmlFor="linkedin-profile">
                      LinkedIn Profile<span className="opt">optional</span>
                    </label>
                    <input
                      id="linkedin-profile"
                      type="url"
                      name="LinkedIn Profile"
                      placeholder="https://linkedin.com/in/..."
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                    />
                  </div>

                  {/* Upload Resume / CV */}
                  <div className={`fg full ${touched && !resumeFile ? "invalid" : ""}`}>
                    <label>
                      Upload Resume / CV<span className="req">*</span>
                    </label>
                    <label
                      className={`file ${dragOver ? "is-dragover" : ""}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <span className="fname">
                        {resumeFile ? resumeFile.name : "Click to upload (PDF, DOC, DOCX)"}
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="err">Please upload your resume</span>
                  </div>
                </div>
              </section>

              {/* Section 2: Internship Details */}
              <section className="section">
                <div className="section-head">
                  <span className="num">2</span>
                  <h2>Internship Details</h2>
                </div>
                <div className="grid two">
                  {/* Preferred Domain */}
                  <div className={`fg ${touched && !domain ? "invalid" : ""}`}>
                    <label htmlFor="preferred-domain">
                      Preferred Domain<span className="req">*</span>
                    </label>
                    <select
                      id="preferred-domain"
                      name="Preferred Domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      required
                    >
                      <option value="">Select…</option>
                      {DOMAIN_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="err">Required</span>
                  </div>

                  {/* Preferred Duration */}
                  <div className={`fg ${touched && !duration ? "invalid" : ""}`}>
                    <label htmlFor="preferred-duration">
                      Preferred Duration<span className="req">*</span>
                    </label>
                    <select
                      id="preferred-duration"
                      name="Preferred Duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    >
                      <option value="">Select…</option>
                      {DURATION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="err">Required</span>
                  </div>

                  {/* Are you currently */}
                  <div className={`fg ${touched && !currentStatus ? "invalid" : ""}`}>
                    <label htmlFor="current-status">
                      Are you currently<span className="req">*</span>
                    </label>
                    <select
                      id="current-status"
                      name="Current Status"
                      value={currentStatus}
                      onChange={(e) => setCurrentStatus(e.target.value)}
                      required
                    >
                      <option value="">Select…</option>
                      <option value="Studying">Studying</option>
                      <option value="Working">Working</option>
                      <option value="Both Studying & Working">Both Studying &amp; Working</option>
                      <option value="Neither">Neither</option>
                    </select>
                    <span className="err">Required</span>
                  </div>

                  {/* Require Career Assistance? */}
                  <div className={`fg ${touched && !careerAssistance ? "invalid" : ""}`}>
                    <label htmlFor="career-assistance">
                      Require Career Assistance?<span className="req">*</span>
                    </label>
                    <select
                      id="career-assistance"
                      name="Career Assistance"
                      value={careerAssistance}
                      onChange={(e) => setCareerAssistance(e.target.value)}
                      required
                    >
                      <option value="">Select…</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <span className="err">Required</span>
                  </div>

                  {/* Interested in jobs after internship? */}
                  <div className={`fg ${touched && !jobInterest ? "invalid" : ""}`}>
                    <label htmlFor="job-interest">
                      Interested in jobs after internship?<span className="req">*</span>
                    </label>
                    <select
                      id="job-interest"
                      name="Job Interest"
                      value={jobInterest}
                      onChange={(e) => setJobInterest(e.target.value)}
                      required
                    >
                      <option value="">Select…</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <span className="err">Required</span>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className={`consent ${touched && !consent ? "invalid" : ""}`}>
                  <label className="check">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                    />
                    <span>
                      I confirm the information is accurate and I consent to Briticana processing my application for the
                      remote internship programme.
                    </span>
                  </label>
                  <span className="err">Please confirm the declaration to proceed</span>
                </div>
              </section>

              {/* Submit Actions */}
              <div className="actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="submitBtn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <footer className="legal">
          Copyright Briticana · All Rights Reserved · Remote Internship Programme
        </footer>
      </div>
    </div>
  );
}
