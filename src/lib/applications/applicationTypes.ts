/** Shared application form constants and types (safe for client + server). */

export const MAX_APPLICATION_FIELD_LENGTH = 4000;
export const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB
export const MIN_CAREER_GOAL_LENGTH = 30;

export const ALLOWED_RESUME_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

/** Matches client doc: 3 / 6 / 9 Months */
export const INTERNSHIP_DURATION_OPTIONS = ["3 Months", "6 Months", "9 Months"] as const;

export const CURRENT_STATUS_OPTIONS = [
  { value: "studying", label: "Studying" },
  { value: "working", label: "Working" },
  { value: "both", label: "Both Studying & Working" },
  { value: "neither", label: "Neither" },
] as const;

export const VISA_STATUS_OPTIONS = [
  { value: "student", label: "Student Visa" },
  { value: "graduate", label: "Graduate Visa" },
  { value: "job-seeker", label: "Job Seeker Visa" },
  { value: "dependent", label: "Dependent Visa" },
  { value: "skilled-worker", label: "Skilled Worker Visa" },
  { value: "other", label: "Other" },
] as const;

export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export type YesNo = (typeof YES_NO_OPTIONS)[number]["value"];

export const CONFIDENCE_LEVEL_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

/** Column order for Google Sheets row 1 — keep in sync with ApplicationRecord. */
export const APPLICATION_SHEET_HEADERS = [
  "Submitted At",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Country of Residence",
  "University",
  "Current Qualification",
  "LinkedIn",
  "Duration",
  "Career Assistance",
  "Job Opportunities After Internship",
  "Previous Internship",
  "Previous Internship Details",
  "Relevant Work Experience",
  "Relevant Work Experience Details",
  "Current Status",
  "Relevant Skills",
  "Projects Certifications Courses",
  "Projects Certifications Details",
  "Visa Status",
  "Visa Details",
  "Industry or Career Path",
  "Biggest Career Challenge",
  "Why Chose Internship",
  "Career Growth Help",
  "Why Chose Briticana",
  "Internship Expectations",
  "Impact Academic Professional Growth",
  "Specific Learning Outcomes",
  "Challenges To Overcome",
  "Confidence Level",
  "Resume URL",
  "Internship Track",
  "Source",
  "Declaration Accepted",
] as const;

export type ApplicationRecord = {
  submittedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  university: string;
  currentQualification: string;
  linkedIn: string;
  duration: string;
  careerAssistance: string;
  jobOpportunitiesAfter: string;
  previousInternship: string;
  previousInternshipDetails: string;
  relevantWorkExperience: string;
  relevantWorkExperienceDetails: string;
  currentStatus: string;
  relevantSkills: string;
  projectsCertificationsCourses: string;
  projectsCertificationsDetails: string;
  visaStatus: string;
  visaDetails: string;
  industryOrCareerPath: string;
  biggestCareerChallenge: string;
  whyChoseInternship: string;
  careerGrowthHelp: string;
  whyChoseBriticana: string;
  internshipExpectations: string;
  impactAcademicProfessionalGrowth: string;
  specificLearningOutcomes: string;
  challengesToOvercome: string;
  confidenceLevel: string;
  resumeUrl: string;
  internshipTrack: string;
  source: string;
  declarationAccepted: string;
};

export function applicationRecordToRow(record: ApplicationRecord): string[] {
  return [
    record.submittedAt,
    record.firstName,
    record.lastName,
    record.email,
    record.phone,
    record.country,
    record.university,
    record.currentQualification,
    record.linkedIn,
    record.duration,
    record.careerAssistance,
    record.jobOpportunitiesAfter,
    record.previousInternship,
    record.previousInternshipDetails,
    record.relevantWorkExperience,
    record.relevantWorkExperienceDetails,
    record.currentStatus,
    record.relevantSkills,
    record.projectsCertificationsCourses,
    record.projectsCertificationsDetails,
    record.visaStatus,
    record.visaDetails,
    record.industryOrCareerPath,
    record.biggestCareerChallenge,
    record.whyChoseInternship,
    record.careerGrowthHelp,
    record.whyChoseBriticana,
    record.internshipExpectations,
    record.impactAcademicProfessionalGrowth,
    record.specificLearningOutcomes,
    record.challengesToOvercome,
    record.confidenceLevel,
    record.resumeUrl,
    record.internshipTrack,
    record.source,
    record.declarationAccepted,
  ];
}

export function labelForCurrentStatus(value: string): string {
  return CURRENT_STATUS_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function labelForVisaStatus(value: string): string {
  return VISA_STATUS_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function labelForYesNo(value: string): string {
  return YES_NO_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function labelForConfidenceLevel(value: string): string {
  return CONFIDENCE_LEVEL_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

/** Normalise duration prefill from internship pages (e.g. "3 months" → "3 Months"). */
export function normaliseDurationPrefill(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  const match = INTERNSHIP_DURATION_OPTIONS.find((o) => o.toLowerCase() === trimmed.toLowerCase());
  return match ?? trimmed;
}
