"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";

import ApplyFormControl from "@/components/apply/ApplyFormControl";
import ApplyFormSection from "@/components/apply/ApplyFormSection";
import ApplyYesNoGroup from "@/components/apply/ApplyYesNoGroup";
import {
  CURRENT_STATUS_OPTIONS,
  INTERNSHIP_DURATION_OPTIONS,
  MIN_CAREER_GOAL_LENGTH,
  VISA_STATUS_OPTIONS,
  normaliseDurationPrefill,
  type YesNo,
} from "@/lib/applications/applicationTypes";

export type ApplyFormInitial = {
  internship?: string;
  domain?: string;
  duration?: string;
  region?: string;
  source?: string;
};

type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  { id: "personal", title: "Personal", icon: "ri-user-3-line" },
  { id: "internship", title: "Internship", icon: "ri-stack-line" },
  { id: "education", title: "Experience", icon: "ri-graduation-cap-line" },
  { id: "skills", title: "Skills", icon: "ri-tools-line" },
  { id: "visa", title: "Visa", icon: "ri-passport-line" },
  { id: "resume", title: "Resume", icon: "ri-attachment-2" },
  { id: "feedback", title: "Feedback", icon: "ri-chat-quote-line" },
  { id: "consent", title: "Consent", icon: "ri-shield-check-line" },
] as const;

const TOTAL_STEPS = STEPS.length;

/** Maps each field to the step it lives on, so we can jump to the first error. */
const FIELD_STEP: Record<string, number> = {
  firstName: 0,
  lastName: 0,
  email: 0,
  phone: 0,
  country: 0,
  university: 0,
  currentQualification: 0,
  linkedIn: 0,
  duration: 1,
  careerAssistance: 1,
  jobOpportunitiesAfter: 1,
  previousInternship: 2,
  previousInternshipDetails: 2,
  relevantWorkExperience: 2,
  relevantWorkExperienceDetails: 2,
  currentStatus: 2,
  relevantSkills: 3,
  projectsCertificationsCourses: 3,
  projectsCertificationsDetails: 3,
  visaStatus: 4,
  visaDetails: 4,
  resume: 5,
  industryOrCareerPath: 6,
  biggestCareerChallenge: 6,
  whyChoseInternship: 6,
  careerGrowthHelp: 6,
  declarationAccepted: 7,
};

export default function ApplyForm({ initial }: { initial?: ApplyFormInitial }) {
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const durationLegendId = useId();

  const [step, setStep] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [currentQualification, setCurrentQualification] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [duration, setDuration] = useState(normaliseDurationPrefill(initial?.duration));
  const [careerAssistance, setCareerAssistance] = useState<YesNo | "">("");
  const [jobOpportunitiesAfter, setJobOpportunitiesAfter] = useState<YesNo | "">("");
  const [previousInternship, setPreviousInternship] = useState<YesNo | "">("");
  const [previousInternshipDetails, setPreviousInternshipDetails] = useState("");
  const [relevantWorkExperience, setRelevantWorkExperience] = useState<YesNo | "">("");
  const [relevantWorkExperienceDetails, setRelevantWorkExperienceDetails] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [relevantSkills, setRelevantSkills] = useState("");
  const [projectsCertificationsCourses, setProjectsCertificationsCourses] = useState<YesNo | "">("");
  const [projectsCertificationsDetails, setProjectsCertificationsDetails] = useState("");
  const [visaStatus, setVisaStatus] = useState("");
  const [visaDetails, setVisaDetails] = useState("");
  const [industryOrCareerPath, setIndustryOrCareerPath] = useState("");
  const [biggestCareerChallenge, setBiggestCareerChallenge] = useState("");
  const [whyChoseInternship, setWhyChoseInternship] = useState("");
  const [careerGrowthHelp, setCareerGrowthHelp] = useState("");
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [website, setWebsite] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [maxVisited, setMaxVisited] = useState(0);

  const goalTooShort = (value: string) => !value || value.trim().length < MIN_CAREER_GOAL_LENGTH;

  function required(label: string) {
    return (
      <>
        {label} <span className="apply-required">*</span>
      </>
    );
  }

  /** Client-side required-field checks for a single step (server still does full validation). */
  function validateStep(index: number): FieldErrors {
    const e: FieldErrors = {};
    switch (index) {
      case 0:
        if (!firstName.trim()) e.firstName = "Please enter your first name.";
        if (!lastName.trim()) e.lastName = "Please enter your last name.";
        if (!email.trim()) e.email = "Please enter your email.";
        else if (!EMAIL_RE.test(email.trim())) e.email = "Please enter a valid email.";
        if (!phone.trim()) e.phone = "Please enter your contact number.";
        if (!country.trim()) e.country = "Please enter your country of residence.";
        if (!university.trim()) e.university = "Please enter your university or institution name.";
        if (!currentQualification.trim()) e.currentQualification = "Please enter your current qualification.";
        break;
      case 1:
        if (!duration) e.duration = "Please select a preferred internship duration.";
        if (!careerAssistance) e.careerAssistance = "Please indicate if you require career assistance.";
        if (!jobOpportunitiesAfter)
          e.jobOpportunitiesAfter = "Please indicate if you are interested in job opportunities after the internship.";
        break;
      case 2:
        if (!previousInternship) e.previousInternship = "Please answer about previous internship experience.";
        if (previousInternship === "yes" && !previousInternshipDetails.trim())
          e.previousInternshipDetails = "Please share your internship details and duration.";
        if (!relevantWorkExperience)
          e.relevantWorkExperience = "Please answer about relevant work experience in this field.";
        if (relevantWorkExperience === "yes" && !relevantWorkExperienceDetails.trim())
          e.relevantWorkExperienceDetails = "Please share your experience and duration.";
        if (!currentStatus) e.currentStatus = "Please select what you are currently doing.";
        break;
      case 3:
        if (!relevantSkills.trim()) e.relevantSkills = "Please describe skills relevant to this internship.";
        if (!projectsCertificationsCourses)
          e.projectsCertificationsCourses =
            "Please answer about projects, certifications, or courses related to this field.";
        if (projectsCertificationsCourses === "yes" && !projectsCertificationsDetails.trim())
          e.projectsCertificationsDetails = "Please provide details of your projects, certifications, or courses.";
        break;
      case 4:
        if (!visaStatus) e.visaStatus = "Please select your current visa status.";
        if (visaStatus === "other" && !visaDetails.trim()) e.visaDetails = "Please describe your visa type.";
        break;
      case 5:
        if (!resumeFile) e.resume = "Please upload your resume (PDF or Word, max 5 MB).";
        break;
      case 6:
        if (goalTooShort(industryOrCareerPath))
          e.industryOrCareerPath = `Please share at least ${MIN_CAREER_GOAL_LENGTH} characters.`;
        if (goalTooShort(biggestCareerChallenge))
          e.biggestCareerChallenge = `Please share at least ${MIN_CAREER_GOAL_LENGTH} characters.`;
        if (goalTooShort(whyChoseInternship))
          e.whyChoseInternship = `Please share at least ${MIN_CAREER_GOAL_LENGTH} characters.`;
        if (goalTooShort(careerGrowthHelp))
          e.careerGrowthHelp = `Please share at least ${MIN_CAREER_GOAL_LENGTH} characters.`;
        break;
      case 7:
        if (!declarationAccepted)
          e.declarationAccepted = "Please confirm the declaration to submit your application.";
        break;
      default:
        break;
    }
    return e;
  }

  function goToStep(target: number) {
    setFormError(null);
    setStep(target);
    setMaxVisited((m) => Math.max(m, target));
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.getElementById("apply-card-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function handleNext() {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setFieldErrors((prev) => ({ ...prev, ...stepErrors }));
      setFormError("Please complete the highlighted fields before continuing.");
      return;
    }
    goToStep(Math.min(step + 1, TOTAL_STEPS - 1));
  }

  function handleBack() {
    goToStep(Math.max(step - 1, 0));
  }

  function handleTabClick(target: number) {
    if (target === step) return;
    // Allow going back freely; going forward validates the current step first.
    if (target < step) {
      goToStep(target);
      return;
    }
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setFieldErrors((prev) => ({ ...prev, ...stepErrors }));
      setFormError("Please complete the highlighted fields before continuing.");
      return;
    }
    goToStep(target);
  }

  function jumpToFirstError(errors: FieldErrors) {
    const steps = Object.keys(errors)
      .map((field) => FIELD_STEP[field])
      .filter((s): s is number => typeof s === "number");
    if (steps.length > 0) {
      goToStep(Math.min(...steps));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    // Validate every step before sending.
    let allErrors: FieldErrors = {};
    for (let i = 0; i < TOTAL_STEPS; i += 1) {
      allErrors = { ...allErrors, ...validateStep(i) };
    }
    if (Object.keys(allErrors).length > 0) {
      setFieldErrors(allErrors);
      setFormError("Please complete the highlighted fields.");
      jumpToFirstError(allErrors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    const body = new FormData();
    body.set("firstName", firstName);
    body.set("lastName", lastName);
    body.set("email", email);
    body.set("phone", phone);
    body.set("country", country);
    body.set("university", university);
    body.set("currentQualification", currentQualification);
    body.set("linkedIn", linkedIn);
    body.set("duration", duration);
    body.set("careerAssistance", careerAssistance);
    body.set("jobOpportunitiesAfter", jobOpportunitiesAfter);
    body.set("previousInternship", previousInternship);
    body.set("previousInternshipDetails", previousInternshipDetails);
    body.set("relevantWorkExperience", relevantWorkExperience);
    body.set("relevantWorkExperienceDetails", relevantWorkExperienceDetails);
    body.set("currentStatus", currentStatus);
    body.set("relevantSkills", relevantSkills);
    body.set("projectsCertificationsCourses", projectsCertificationsCourses);
    body.set("projectsCertificationsDetails", projectsCertificationsDetails);
    body.set("visaStatus", visaStatus);
    body.set("visaDetails", visaDetails);
    body.set("industryOrCareerPath", industryOrCareerPath);
    body.set("biggestCareerChallenge", biggestCareerChallenge);
    body.set("whyChoseInternship", whyChoseInternship);
    body.set("careerGrowthHelp", careerGrowthHelp);
    body.set("declarationAccepted", declarationAccepted ? "yes" : "no");
    body.set("internshipTrack", initial?.internship ?? "");
    body.set("source", initial?.source ?? "apply-page");
    body.set("website", website);
    if (resumeFile) body.set("resume", resumeFile);

    try {
      const res = await fetch("/api/applications", { method: "POST", body });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fields?: FieldErrors }
        | null;

      if (res.ok && data?.ok) {
        setSubmitted(true);
        return;
      }

      if (data?.fields) {
        setFieldErrors(data.fields);
        jumpToFirstError(data.fields);
      }
      setFormError(data?.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const progressPct = useMemo(() => Math.round(((step + 1) / TOTAL_STEPS) * 100), [step]);

  if (submitted) {
    return (
      <div className="apply-card" role="status">
        <div className="apply-card__body text-center py-5">
          <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: "3rem" }} aria-hidden />
          <h3 className="mt-3 mb-2">Application received</h3>
          <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "560px" }}>
            Thank you for applying{firstName ? `, ${firstName}` : ""}. Our team will review your application and follow
            up by email with the next steps.
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
    <div className="apply-card" id="apply-card-top">
      <div className="apply-card__head">
        <span className="apply-card__head-icon" aria-hidden>
          <i className="ri-quill-pen-line" />
        </span>
        <div>
          <p className="apply-card__title">Internship application form</p>
          <p className="apply-card__subtitle">
            Step {step + 1} of {TOTAL_STEPS} — {STEPS[step].title}. Fields marked with * are required.
          </p>
        </div>
      </div>

      <div className="apply-stepper" role="tablist" aria-label="Application steps">
        <div className="apply-progress" aria-hidden>
          <div className="apply-progress__bar" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="apply-stepper__track">
          {STEPS.map((s, i) => {
            const state = i === step ? "is-active" : i < maxVisited || i < step ? "is-complete" : "";
            return (
              <button
                type="button"
                key={s.id}
                role="tab"
                aria-selected={i === step}
                className={`apply-step-tab ${state}`}
                onClick={() => handleTabClick(i)}
              >
                <span className="apply-step-tab__num">
                  {i < step ? <i className="ri-check-line" aria-hidden /> : i + 1}
                </span>
                <span className="apply-step-tab__label">
                  <i className={`${s.icon} me-1`} aria-hidden />
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <form className="apply-form apply-card__body" onSubmit={(e) => void handleSubmit(e)} noValidate>
        {initial?.internship && step === 0 ? (
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

        {step === 0 ? (
          <ApplyFormSection icon="ri-user-3-line" title="Personal information">
            <ApplyFormControl
              id="apply-first-name"
              label={required("First name")}
              icon="ri-user-line"
              error={fieldErrors.firstName}
              inputProps={{
                value: firstName,
                onChange: (e) => setFirstName(e.target.value),
                placeholder: "First name",
                autoComplete: "given-name",
                required: true,
              }}
            />
            <ApplyFormControl
              id="apply-last-name"
              label={required("Last name")}
              icon="ri-user-line"
              error={fieldErrors.lastName}
              inputProps={{
                value: lastName,
                onChange: (e) => setLastName(e.target.value),
                placeholder: "Last name",
                autoComplete: "family-name",
                required: true,
              }}
            />
            <ApplyFormControl
              id="apply-email"
              label={required("Email address")}
              icon="ri-mail-line"
              error={fieldErrors.email}
              inputProps={{
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "you@example.com",
                autoComplete: "email",
                required: true,
              }}
            />
            <ApplyFormControl
              id="apply-phone"
              label={required("Contact number")}
              icon="ri-phone-line"
              error={fieldErrors.phone}
              inputProps={{
                type: "tel",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "+44 7700 900000",
                autoComplete: "tel",
                required: true,
              }}
            />
            <ApplyFormControl
              id="apply-country"
              label={required("Country of residence")}
              icon="ri-map-pin-line"
              error={fieldErrors.country}
              inputProps={{
                value: country,
                onChange: (e) => setCountry(e.target.value),
                placeholder: "e.g. United Kingdom",
                autoComplete: "country-name",
                required: true,
              }}
            />
            <ApplyFormControl
              id="apply-university"
              label={required("University / institution name")}
              icon="ri-building-4-line"
              error={fieldErrors.university}
              inputProps={{
                value: university,
                onChange: (e) => setUniversity(e.target.value),
                placeholder: "University or institution name",
                required: true,
              }}
            />
            <ApplyFormControl
              id="apply-qualification"
              label={required("Current qualification")}
              icon="ri-award-line"
              error={fieldErrors.currentQualification}
              inputProps={{
                value: currentQualification,
                onChange: (e) => setCurrentQualification(e.target.value),
                placeholder: "e.g. BSc Computer Science, MBA",
                required: true,
              }}
            />
            <ApplyFormControl
              id="apply-linkedin"
              label="LinkedIn profile"
              icon="ri-linkedin-box-line"
              error={fieldErrors.linkedIn}
              inputProps={{
                type: "url",
                value: linkedIn,
                onChange: (e) => setLinkedIn(e.target.value),
                placeholder: "https://linkedin.com/in/your-profile",
              }}
            />
          </ApplyFormSection>
        ) : null}

        {step === 1 ? (
          <ApplyFormSection icon="ri-stack-line" title="Internship details">
            <div className="col-12 apply-choice-group" role="radiogroup" aria-labelledby={durationLegendId}>
              <p id={durationLegendId} className="form-label apply-fieldset__legend">
                {required("Preferred internship duration")}
              </p>
              <div className="apply-choice-group__field">
                <div className={`apply-pill-group${fieldErrors.duration ? " is-invalid-group" : ""}`}>
                  {INTERNSHIP_DURATION_OPTIONS.map((d) => (
                    <label key={d} className={`apply-pill${duration === d ? " is-selected" : ""}`}>
                      <input
                        type="radio"
                        name="duration"
                        value={d}
                        checked={duration === d}
                        onChange={() => setDuration(d)}
                        className="visually-hidden"
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
              {fieldErrors.duration ? (
                <div className="invalid-feedback d-block">{fieldErrors.duration}</div>
              ) : null}
            </div>

            <ApplyYesNoGroup
              name="careerAssistance"
              legend={required("Do you require career assistance?")}
              value={careerAssistance}
              onChange={setCareerAssistance}
              error={fieldErrors.careerAssistance}
            />

            <ApplyYesNoGroup
              name="jobOpportunitiesAfter"
              legend={required("Are you interested in job opportunities after the internship?")}
              value={jobOpportunitiesAfter}
              onChange={setJobOpportunitiesAfter}
              error={fieldErrors.jobOpportunitiesAfter}
            />
          </ApplyFormSection>
        ) : null}

        {step === 2 ? (
          <ApplyFormSection icon="ri-graduation-cap-line" title="Education & experience">
            <ApplyYesNoGroup
              name="previousInternship"
              legend={required("Have you completed any internships before?")}
              value={previousInternship}
              onChange={setPreviousInternship}
              error={fieldErrors.previousInternship}
            />

            {previousInternship === "yes" ? (
              <ApplyFormControl
                id="apply-prev-internship"
                label={required("If yes, please share the internship details and duration")}
                icon="ri-briefcase-4-line"
                colClass="col-12"
                textarea
                error={fieldErrors.previousInternshipDetails}
                textareaProps={{
                  rows: 3,
                  value: previousInternshipDetails,
                  onChange: (e) => setPreviousInternshipDetails(e.target.value),
                  placeholder: "Organisation, role, domain, and duration…",
                }}
              />
            ) : null}

            <ApplyYesNoGroup
              name="relevantWorkExperience"
              legend={required("Do you have any relevant work experience in this field?")}
              value={relevantWorkExperience}
              onChange={setRelevantWorkExperience}
              error={fieldErrors.relevantWorkExperience}
            />

            {relevantWorkExperience === "yes" ? (
              <ApplyFormControl
                id="apply-work-exp"
                label={required("If yes, please share the experience and duration")}
                icon="ri-file-text-line"
                colClass="col-12"
                textarea
                error={fieldErrors.relevantWorkExperienceDetails}
                textareaProps={{
                  rows: 3,
                  value: relevantWorkExperienceDetails,
                  onChange: (e) => setRelevantWorkExperienceDetails(e.target.value),
                  placeholder: "Describe your experience and how long you worked in this field…",
                }}
              />
            ) : null}

            <ApplyFormControl
              id="apply-current-status"
              label={required("Are you currently")}
              icon="ri-briefcase-line"
              error={fieldErrors.currentStatus}
              selectProps={{
                value: currentStatus,
                onChange: (e) => setCurrentStatus(e.target.value),
                required: true,
                children: (
                  <>
                    <option value="">Select…</option>
                    {CURRENT_STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </>
                ),
              }}
            />
          </ApplyFormSection>
        ) : null}

        {step === 3 ? (
          <ApplyFormSection icon="ri-tools-line" title="Skills & background">
            <ApplyFormControl
              id="apply-skills"
              label={required("What skills do you have that are relevant to this internship?")}
              icon="ri-star-line"
              colClass="col-12"
              textarea
              error={fieldErrors.relevantSkills}
              textareaProps={{
                rows: 4,
                value: relevantSkills,
                onChange: (e) => setRelevantSkills(e.target.value),
                placeholder: "Technical skills, tools, domain knowledge…",
              }}
            />

            <ApplyYesNoGroup
              name="projectsCertificationsCourses"
              legend={required(
                "Have you completed any projects, certifications, or courses related to this field?",
              )}
              value={projectsCertificationsCourses}
              onChange={setProjectsCertificationsCourses}
              error={fieldErrors.projectsCertificationsCourses}
            />

            {projectsCertificationsCourses === "yes" ? (
              <ApplyFormControl
                id="apply-projects-details"
                label={required("If yes, please provide details")}
                icon="ri-folder-open-line"
                colClass="col-12"
                textarea
                error={fieldErrors.projectsCertificationsDetails}
                textareaProps={{
                  rows: 3,
                  value: projectsCertificationsDetails,
                  onChange: (e) => setProjectsCertificationsDetails(e.target.value),
                  placeholder: "Projects, certifications, courses, platforms, or institutions…",
                }}
              />
            ) : null}
          </ApplyFormSection>
        ) : null}

        {step === 4 ? (
          <ApplyFormSection icon="ri-passport-line" title="Visa information">
            <ApplyFormControl
              id="apply-visa-status"
              label={required("Current visa status")}
              icon="ri-shield-check-line"
              error={fieldErrors.visaStatus}
              selectProps={{
                value: visaStatus,
                onChange: (e) => setVisaStatus(e.target.value),
                required: true,
                children: (
                  <>
                    <option value="">Select visa status…</option>
                    {VISA_STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </>
                ),
              }}
            />
            {visaStatus === "other" ? (
              <ApplyFormControl
                id="apply-visa-details"
                label={required("Please describe your visa type")}
                icon="ri-file-text-line"
                colClass="col-12"
                error={fieldErrors.visaDetails}
                inputProps={{
                  value: visaDetails,
                  onChange: (e) => setVisaDetails(e.target.value),
                  placeholder: "Your visa type",
                }}
              />
            ) : null}
          </ApplyFormSection>
        ) : null}

        {step === 5 ? (
          <ApplyFormSection icon="ri-attachment-2" title="Resume" subtitle="PDF or Word, max 5 MB">
            <div className="col-12">
              <label htmlFor="apply-resume" className="form-label">
                {required("Upload resume / CV")}
              </label>
              <div
                className={`apply-file-upload${fieldErrors.resume ? " is-invalid-group" : ""}${resumeFile ? " has-file" : ""}`}
              >
                <input
                  ref={resumeInputRef}
                  id="apply-resume"
                  type="file"
                  className="visually-hidden"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                />
                <i className="ri-upload-cloud-2-line apply-file-upload__icon" aria-hidden />
                {resumeFile ? (
                  <>
                    <p className="apply-file-upload__name mb-2">{resumeFile.name}</p>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        setResumeFile(null);
                        if (resumeInputRef.current) resumeInputRef.current.value = "";
                      }}
                    >
                      Remove file
                    </button>
                  </>
                ) : (
                  <>
                    <p className="apply-file-upload__hint mb-2">Drag and drop or choose a file</p>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => resumeInputRef.current?.click()}
                    >
                      Choose file
                    </button>
                  </>
                )}
              </div>
              {fieldErrors.resume ? <div className="invalid-feedback d-block">{fieldErrors.resume}</div> : null}
            </div>
          </ApplyFormSection>
        ) : null}

        {step === 6 ? (
          <ApplyFormSection
            icon="ri-chat-quote-line"
            title="Feedback & career goals"
            subtitle={`Please answer in detail (min. ${MIN_CAREER_GOAL_LENGTH} characters each)`}
          >
            <ApplyFormControl
              id="apply-industry"
              label={required("Which industry or career path are you interested in?")}
              icon="ri-compass-3-line"
              colClass="col-12"
              textarea
              error={fieldErrors.industryOrCareerPath}
              textareaProps={{
                rows: 3,
                value: industryOrCareerPath,
                onChange: (e) => setIndustryOrCareerPath(e.target.value),
                placeholder: "Industry, role, or career direction you are pursuing…",
              }}
            />
            <ApplyFormControl
              id="apply-challenge"
              label={required("What is your biggest career challenge currently?")}
              icon="ri-flag-line"
              colClass="col-12"
              textarea
              error={fieldErrors.biggestCareerChallenge}
              textareaProps={{
                rows: 3,
                value: biggestCareerChallenge,
                onChange: (e) => setBiggestCareerChallenge(e.target.value),
                placeholder: "The main obstacle or challenge you are facing in your career…",
              }}
            />
            <ApplyFormControl
              id="apply-why"
              label={required("Why did you choose this internship programme?")}
              icon="ri-lightbulb-line"
              colClass="col-12"
              textarea
              error={fieldErrors.whyChoseInternship}
              textareaProps={{
                rows: 4,
                value: whyChoseInternship,
                onChange: (e) => setWhyChoseInternship(e.target.value),
                placeholder: "What motivated you to apply for this programme…",
              }}
            />
            <ApplyFormControl
              id="apply-growth"
              label={required(
                "How do you believe this internship will help your career growth and future goals?",
              )}
              icon="ri-rocket-line"
              colClass="col-12"
              textarea
              error={fieldErrors.careerGrowthHelp}
              textareaProps={{
                rows: 4,
                value: careerGrowthHelp,
                onChange: (e) => setCareerGrowthHelp(e.target.value),
                placeholder: "How this opportunity supports your long-term career goals…",
              }}
            />
          </ApplyFormSection>
        ) : null}

        {step === 7 ? (
          <ApplyFormSection icon="ri-shield-check-line" title="Declaration & consent" subtitle="Please read and confirm">
            <div className="col-12">
              <div className={`apply-declaration${fieldErrors.declarationAccepted ? " is-invalid-group" : ""}`}>
                <p className="fw-semibold mb-2">I hereby confirm that:</p>
                <ul>
                  <li>The information provided by me is true and accurate to the best of my knowledge.</li>
                  <li>
                    I understand that Briticana offers remote internship programmes and participation does not
                    guarantee employment or placement.
                  </li>
                  <li>
                    I consent to the processing of my information for internship administration, career support, and
                    related professional opportunities.
                  </li>
                  <li>
                    I agree to maintain professionalism and adhere to the ethical standards expected during the
                    internship.
                  </li>
                </ul>
                <label>
                  <input
                    type="checkbox"
                    checked={declarationAccepted}
                    onChange={(e) => setDeclarationAccepted(e.target.checked)}
                  />
                  <span>I confirm the above declaration and consent to submit my application.</span>
                </label>
              </div>
              {fieldErrors.declarationAccepted ? (
                <div className="invalid-feedback d-block">{fieldErrors.declarationAccepted}</div>
              ) : null}
            </div>
          </ApplyFormSection>
        ) : null}

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

        <div className="apply-wizard__nav">
          <button
            type="button"
            className="main-btn black apply-wizard__back"
            onClick={handleBack}
            disabled={step === 0 || submitting}
          >
            <i className="ri-arrow-left-long-line me-2" aria-hidden /> Back
          </button>

          {step < TOTAL_STEPS - 1 ? (
            <button type="button" className="main-btn apply-wizard__next" onClick={handleNext}>
              Next <i className="ri-arrow-right-long-line ms-2" aria-hidden />
            </button>
          ) : (
            <button type="submit" className="main-btn apply-submit apply-wizard__next" disabled={submitting}>
              {submitting ? (
                "Submitting application…"
              ) : (
                <>
                  Submit application <i className="ri-arrow-right-long-line ms-2" aria-hidden />
                </>
              )}
            </button>
          )}
        </div>

        {step === TOTAL_STEPS - 1 ? (
          <p className="small text-secondary text-center mt-3 mb-0 apply-consent">
            By submitting, you agree to our <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>. Your information and resume will be
            stored securely for review by the Briticana team.
          </p>
        ) : null}
      </form>
    </div>
  );
}
