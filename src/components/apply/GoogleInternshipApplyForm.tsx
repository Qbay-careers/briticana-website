"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import "@/styles/google-internship-form.css";
import {
  COUNTRY_OPTIONS,
  GOOGLE_INTERNSHIP_ROLES,
  GOOGLE_SPREADSHEET_ID,
  GOOGLE_TARGET_TAB,
  matchGoogleInternshipRole,
  type GoogleInternshipRole,
} from "@/lib/googleInternships";

export type GoogleApplyFormProps = {
  initialRole?: string;
};

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  internship?: string;
  cv?: string;
};

function sanitizeForSpreadsheet(val: string): string {
  const trimmed = val.trim();
  // Neutralize formula injection risk if string begins with =, +, -, @, \t, \r
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string; name: string; size: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = (reader.result as string) || "";
      const base64 = res.split(",")[1] || "";
      resolve({
        base64,
        mimeType: file.type || "application/pdf",
        name: file.name,
        size: file.size,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const GOOGLE_CAREERS_URL =
  "https://www.google.com/about/careers/applications/jobs/results?e=72477625&location=Dublin,%20Ireland&q=Intern&src=Online/Social/GS_EMEA";

export default function GoogleInternshipApplyForm({ initialRole }: GoogleApplyFormProps) {
  // Web App URL from environment
  const webAppUrl = process.env.NEXT_PUBLIC_GOOGLE_INTERNSHIP_APPS_SCRIPT_URL?.trim() || "";

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [selectedRole, setSelectedRole] = useState<GoogleInternshipRole | "">("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Searchable Country Dropdown State
  const [countrySearch, setCountrySearch] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  // UI / Status State
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [confirmedAppId, setConfirmedAppId] = useState<string | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // Initialize selected role from URL query param
  useEffect(() => {
    if (initialRole) {
      const matched = matchGoogleInternshipRole(initialRole);
      if (matched) {
        setSelectedRole(matched);
      }
    }
  }, [initialRole]);

  // Click outside to close country dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered countries
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRY_OPTIONS;
    const q = countrySearch.toLowerCase();
    return COUNTRY_OPTIONS.filter((c) => c.toLowerCase().includes(q));
  }, [countrySearch]);

  // CV File Selection & Validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setErrors((prev) => ({ ...prev, cv: "Only PDF format is accepted." }));
      setCvFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, cv: "File exceeds maximum size of 5 MB." }));
      setCvFile(null);
      return;
    }

    setErrors((prev) => ({ ...prev, cv: undefined }));
    setCvFile(file);
  };

  const handleRemoveFile = () => {
    setCvFile(null);
    setErrors((prev) => ({ ...prev, cv: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Validation
  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      errs.email = "Please provide a valid email address.";
    }

    const phonePattern = /^[\d\s+\-().]{6,25}$/;
    if (!phone.trim() || !phonePattern.test(phone.trim())) {
      errs.phone = "Please enter a valid phone number (with country code).";
    }

    if (!country.trim()) {
      errs.country = "Please select your country of residence.";
    }

    if (!selectedRole || !GOOGLE_INTERNSHIP_ROLES.includes(selectedRole)) {
      errs.internship = "Please choose one of the internship opportunities.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Form Submit Handler -> Transmits to Google Apps Script and verifies confirmation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (!webAppUrl) {
      setSubmitError(
        "Application service is not configured. Please ensure NEXT_PUBLIC_GOOGLE_INTERNSHIP_APPS_SCRIPT_URL is set in .env.local."
      );
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Optional CV Base64 encoding
      let cvPayload: { base64: string; mimeType: string; name: string; size: number } | null = null;
      if (cvFile) {
        cvPayload = await fileToBase64(cvFile);
      }

      const payload = {
        spreadsheetId: GOOGLE_SPREADSHEET_ID,
        targetTab: GOOGLE_TARGET_TAB,
        fullName: sanitizeForSpreadsheet(fullName),
        email: sanitizeForSpreadsheet(email),
        phoneNumber: sanitizeForSpreadsheet(phone),
        country: sanitizeForSpreadsheet(country),
        internshipRole: selectedRole,
        cvFile: cvPayload
          ? {
              fileName: cvPayload.name,
              fileSize: cvPayload.size,
              mimeType: cvPayload.mimeType,
              base64: cvPayload.base64,
            }
          : null,
        clientTimestamp: new Date().toISOString(),
      };

      const response = await fetch(webAppUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Submission returned HTTP ${response.status}`);
      }

      const result = await response.json().catch(() => null);

      if (!result) {
        throw new Error("Unable to parse server response from Google Apps Script.");
      }

      if (result.status === "error") {
        throw new Error(result.message || "Application rejected by server.");
      }

      if (result.status !== "success") {
        throw new Error(result.message || "Server did not confirm successful registration.");
      }

      // Confirmed successful registration by Google Apps Script backend
      setConfirmedAppId(result.applicationId || undefined);
      setIsRedirecting(true);
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while communicating with the server.";
      setSubmitError(msg);
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="google-internship-form-root" ref={formCardRef}>
      <div className="google-app-container">
        {/* Navigation Breadcrumb */}
        <div className="google-app-back-nav">
          <Link href="/internships" className="google-app-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back to All Internships</span>
          </Link>
        </div>

        {/* Main Card Shell */}
        <div className="google-app-card">
          {/* Redirecting / Submitted Screen */}
          {isRedirecting ? (
            <div className="google-app-success">
              <div className="google-app-success-icon" aria-hidden="true">
                ✓
              </div>
              <h2 className="google-app-success-title">Application Submitted</h2>
              <p className="google-app-success-msg">
                Your application has been received. Redirecting you to the official Google Careers portal...
              </p>
              <a href={GOOGLE_CAREERS_URL} className="google-app-success-btn">
                <span>Continue to Google Careers</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ) : (
            /* Application Form */
            <>
              <header className="google-app-hero">
                <h1 className="google-app-title">Application</h1>
              </header>

              <div className="google-app-body">
                {/* Submission Error Banner */}
                {submitError && (
                  <div className="google-app-notice google-app-notice--error" role="alert">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <div>
                      <strong>Error:</strong> {submitError}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Field 1: Internship Applying For */}
                  <div className="google-form-group">
                    <label className="google-form-label" htmlFor="google-role-select">
                      Internship Opportunity <span className="required-star">*</span>
                    </label>
                    <select
                      id="google-role-select"
                      className={`google-form-select ${errors.internship ? "is-invalid" : ""}`}
                      value={selectedRole}
                      onChange={(e) => {
                        setSelectedRole(e.target.value as GoogleInternshipRole);
                        if (errors.internship) setErrors((prev) => ({ ...prev, internship: undefined }));
                      }}
                      disabled={isSubmitting}
                    >
                      <option value="">-- Select Internship Track --</option>
                      {GOOGLE_INTERNSHIP_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {errors.internship && <span className="google-form-error-msg">{errors.internship}</span>}
                  </div>

                  {/* Field 2: Full Name */}
                  <div className="google-form-group">
                    <label className="google-form-label" htmlFor="google-fullname">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      id="google-fullname"
                      type="text"
                      className={`google-form-input ${errors.fullName ? "is-invalid" : ""}`}
                      placeholder="e.g. Maya Patel"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      disabled={isSubmitting}
                      autoComplete="name"
                    />
                    {errors.fullName && <span className="google-form-error-msg">{errors.fullName}</span>}
                  </div>

                  {/* Field 3: Email */}
                  <div className="google-form-group">
                    <label className="google-form-label" htmlFor="google-email">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      id="google-email"
                      type="email"
                      className={`google-form-input ${errors.email ? "is-invalid" : ""}`}
                      placeholder="e.g. maya.patel@university.edu"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                    {errors.email && <span className="google-form-error-msg">{errors.email}</span>}
                  </div>

                  {/* Field 4: Phone Number */}
                  <div className="google-form-group">
                    <label className="google-form-label" htmlFor="google-phone">
                      Phone Number (with Country Code) <span className="required-star">*</span>
                    </label>
                    <input
                      id="google-phone"
                      type="tel"
                      className={`google-form-input ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="e.g. +353 87 123 4567"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      disabled={isSubmitting}
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="google-form-error-msg">{errors.phone}</span>}
                  </div>

                  {/* Field 5: Searchable Country Dropdown */}
                  <div className="google-form-group" ref={countryRef}>
                    <label className="google-form-label" id="google-country-label">
                      Country of Residence <span className="required-star">*</span>
                    </label>
                    <div className="google-country-picker">
                      <button
                        type="button"
                        className={`google-country-toggle ${countryOpen ? "is-open" : ""} ${
                          errors.country ? "is-invalid" : ""
                        }`}
                        onClick={() => setCountryOpen((prev) => !prev)}
                        disabled={isSubmitting}
                        aria-haspopup="listbox"
                        aria-expanded={countryOpen}
                        aria-labelledby="google-country-label"
                      >
                        <span>{country || "-- Select your country --"}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{
                            transform: countryOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.15s ease",
                          }}
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {countryOpen && (
                        <div className="google-country-dropdown" role="listbox">
                          <div className="google-country-search-wrap">
                            <input
                              type="text"
                              className="google-country-search-input"
                              placeholder="Search country..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              autoFocus
                            />
                          </div>
                          <ul className="google-country-list">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((c) => (
                                <li
                                  key={c}
                                  role="option"
                                  aria-selected={country === c}
                                  className={`google-country-item ${country === c ? "is-selected" : ""}`}
                                  onClick={() => {
                                    setCountry(c);
                                    setCountryOpen(false);
                                    setCountrySearch("");
                                    if (errors.country) setErrors((prev) => ({ ...prev, country: undefined }));
                                  }}
                                >
                                  {c}
                                </li>
                              ))
                            ) : (
                              <li className="google-country-empty">No matching countries</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    {errors.country && <span className="google-form-error-msg">{errors.country}</span>}
                  </div>

                  {/* Field 6: Optional PDF CV Upload (Max 5 MB) */}
                  <div className="google-form-group">
                    <label className="google-form-label">
                      CV / Resume <span style={{ fontWeight: 400, color: "var(--g-text-secondary)" }}>(Optional PDF, Max 5 MB)</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                    />

                    {!cvFile ? (
                      <div
                        className={`google-file-dropzone ${errors.cv ? "is-invalid" : ""}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            if (fileInputRef.current) {
                              fileInputRef.current.files = e.dataTransfer.files;
                            }
                            handleFileChange({ target: { files: e.dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>);
                          }
                        }}
                      >
                        <svg className="google-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="12" y1="18" x2="12" y2="12" />
                          <line x1="9" y1="15" x2="15" y2="15" />
                        </svg>
                        <p className="google-file-primary-txt">
                          <span>Click to browse</span> or drag and drop your PDF
                        </p>
                        <p className="google-file-sub-txt">PDF format only • Maximum 5 MB</p>
                      </div>
                    ) : (
                      <div className="google-file-chip">
                        <div className="google-file-chip-info">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--g-blue)" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <div>
                            <div className="google-file-chip-name">{cvFile.name}</div>
                            <div className="google-file-chip-size">
                              {(cvFile.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="google-file-remove-btn"
                          onClick={handleRemoveFile}
                          disabled={isSubmitting}
                          title="Remove file"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {errors.cv && <span className="google-form-error-msg">{errors.cv}</span>}
                  </div>

                  {/* Actions / Submit */}
                  <div className="google-app-actions">
                    <button
                      type="submit"
                      className="google-app-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="google-spinner" aria-hidden="true" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
