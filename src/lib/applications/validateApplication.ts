import {
  ALLOWED_RESUME_EXTENSIONS,
  ALLOWED_RESUME_MIME_TYPES,
  CONFIDENCE_LEVEL_OPTIONS,
  CURRENT_STATUS_OPTIONS,
  INTERNSHIP_DURATION_OPTIONS,
  MAX_APPLICATION_FIELD_LENGTH,
  MAX_RESUME_BYTES,
  MIN_CAREER_GOAL_LENGTH,
  VISA_STATUS_OPTIONS,
  YES_NO_OPTIONS,
  type YesNo,
} from "@/lib/applications/applicationTypes";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN_RE = /^((https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w%-]+\/?)$/i;

export function trimField(value: FormDataEntryValue | null | undefined): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_APPLICATION_FIELD_LENGTH);
}

export function isYesNo(value: string): value is YesNo {
  return YES_NO_OPTIONS.some((o) => o.value === value);
}

export type ValidatedApplication = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  university: string;
  currentQualification: string;
  linkedIn: string;
  duration: string;
  careerAssistance: YesNo;
  jobOpportunitiesAfter: YesNo;
  previousInternship: YesNo;
  previousInternshipDetails: string;
  relevantWorkExperience: YesNo;
  relevantWorkExperienceDetails: string;
  currentStatus: string;
  relevantSkills: string;
  projectsCertificationsCourses: YesNo;
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
  declarationAccepted: YesNo;
  internshipTrack: string;
  source: string;
  website: string;
  resume: File;
};

function requireCareerGoal(errors: Record<string, string>, field: string, value: string, label: string) {
  if (!value || value.length < MIN_CAREER_GOAL_LENGTH) {
    errors[field] = `Please share at least ${MIN_CAREER_GOAL_LENGTH} characters for ${label}.`;
  }
}

export function validateApplicationForm(formData: FormData): {
  data?: ValidatedApplication;
  errors?: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  const firstName = trimField(formData.get("firstName"));
  const lastName = trimField(formData.get("lastName"));
  const email = trimField(formData.get("email"));
  const phone = trimField(formData.get("phone"));
  const country = trimField(formData.get("country"));
  const university = trimField(formData.get("university"));
  const currentQualification = trimField(formData.get("currentQualification"));
  const linkedIn = trimField(formData.get("linkedIn"));
  const duration = trimField(formData.get("duration"));
  const careerAssistance = trimField(formData.get("careerAssistance"));
  const jobOpportunitiesAfter = trimField(formData.get("jobOpportunitiesAfter"));
  const previousInternship = trimField(formData.get("previousInternship"));
  const previousInternshipDetails = trimField(formData.get("previousInternshipDetails"));
  const relevantWorkExperience = trimField(formData.get("relevantWorkExperience"));
  const relevantWorkExperienceDetails = trimField(formData.get("relevantWorkExperienceDetails"));
  const currentStatus = trimField(formData.get("currentStatus"));
  const relevantSkills = trimField(formData.get("relevantSkills"));
  const projectsCertificationsCourses = trimField(formData.get("projectsCertificationsCourses"));
  const projectsCertificationsDetails = trimField(formData.get("projectsCertificationsDetails"));
  const visaStatus = trimField(formData.get("visaStatus"));
  const visaDetails = trimField(formData.get("visaDetails"));
  const industryOrCareerPath = trimField(formData.get("industryOrCareerPath"));
  const biggestCareerChallenge = trimField(formData.get("biggestCareerChallenge"));
  const whyChoseInternship = trimField(formData.get("whyChoseInternship"));
  const careerGrowthHelp = trimField(formData.get("careerGrowthHelp"));
  const whyChoseBriticana = trimField(formData.get("whyChoseBriticana"));
  const internshipExpectations = trimField(formData.get("internshipExpectations"));
  const impactAcademicProfessionalGrowth = trimField(formData.get("impactAcademicProfessionalGrowth"));
  const specificLearningOutcomes = trimField(formData.get("specificLearningOutcomes"));
  const challengesToOvercome = trimField(formData.get("challengesToOvercome"));
  const confidenceLevel = trimField(formData.get("confidenceLevel"));
  const declarationAccepted = trimField(formData.get("declarationAccepted"));
  const internshipTrack = trimField(formData.get("internshipTrack"));
  const source = trimField(formData.get("source")) || "apply-page";
  const website = trimField(formData.get("website"));

  const resumeEntry = formData.get("resume");
  const resume = resumeEntry instanceof File && resumeEntry.size > 0 ? resumeEntry : null;

  if (!firstName) errors.firstName = "Please enter your first name.";
  if (!lastName) errors.lastName = "Please enter your last name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (!phone) errors.phone = "Please enter your contact number.";
  if (!country) errors.country = "Please enter your country of residence.";
  if (!university) errors.university = "Please enter your university or institution name.";
  if (!currentQualification) errors.currentQualification = "Please enter your current qualification.";
  if (linkedIn && !LINKEDIN_RE.test(linkedIn)) {
    errors.linkedIn = "Use a valid LinkedIn profile URL (linkedin.com/in/your-name).";
  }

  if (!duration) errors.duration = "Please select a preferred internship duration.";
  else if (!INTERNSHIP_DURATION_OPTIONS.includes(duration as (typeof INTERNSHIP_DURATION_OPTIONS)[number])) {
    errors.duration = "Please choose a valid duration.";
  }
  if (!careerAssistance || !isYesNo(careerAssistance)) {
    errors.careerAssistance = "Please indicate if you require career assistance.";
  }
  if (!jobOpportunitiesAfter || !isYesNo(jobOpportunitiesAfter)) {
    errors.jobOpportunitiesAfter = "Please indicate if you are interested in job opportunities after the internship.";
  }

  if (!previousInternship || !isYesNo(previousInternship)) {
    errors.previousInternship = "Please answer about previous internship experience.";
  }
  if (previousInternship === "yes" && !previousInternshipDetails) {
    errors.previousInternshipDetails = "Please share your internship details and duration.";
  }

  if (!relevantWorkExperience || !isYesNo(relevantWorkExperience)) {
    errors.relevantWorkExperience = "Please answer about relevant work experience in this field.";
  }
  if (relevantWorkExperience === "yes" && !relevantWorkExperienceDetails) {
    errors.relevantWorkExperienceDetails = "Please share your experience and duration.";
  }

  if (!currentStatus) errors.currentStatus = "Please select what you are currently doing.";
  else if (!CURRENT_STATUS_OPTIONS.some((o) => o.value === currentStatus)) {
    errors.currentStatus = "Please select a valid current status.";
  }

  if (!relevantSkills) {
    errors.relevantSkills = "Please describe skills relevant to this internship.";
  }

  if (!projectsCertificationsCourses || !isYesNo(projectsCertificationsCourses)) {
    errors.projectsCertificationsCourses =
      "Please answer about projects, certifications, or courses related to this field.";
  }
  if (projectsCertificationsCourses === "yes" && !projectsCertificationsDetails) {
    errors.projectsCertificationsDetails = "Please provide details of your projects, certifications, or courses.";
  }

  if (!visaStatus) errors.visaStatus = "Please select your current visa status.";
  else if (!VISA_STATUS_OPTIONS.some((o) => o.value === visaStatus)) {
    errors.visaStatus = "Please select a valid visa status.";
  }
  if (visaStatus === "other" && !visaDetails) {
    errors.visaDetails = "Please describe your visa type.";
  }

  requireCareerGoal(errors, "industryOrCareerPath", industryOrCareerPath, "industry or career path");
  requireCareerGoal(errors, "biggestCareerChallenge", biggestCareerChallenge, "biggest career challenge");
  requireCareerGoal(errors, "whyChoseInternship", whyChoseInternship, "why you chose this programme");
  requireCareerGoal(errors, "careerGrowthHelp", careerGrowthHelp, "how this internship will help your career growth");

  requireCareerGoal(errors, "whyChoseBriticana", whyChoseBriticana, "why you chose the Briticana Internship Program");
  requireCareerGoal(errors, "internshipExpectations", internshipExpectations, "your expectations from this internship");
  requireCareerGoal(
    errors,
    "impactAcademicProfessionalGrowth",
    impactAcademicProfessionalGrowth,
    "how this internship will impact your growth",
  );
  requireCareerGoal(errors, "specificLearningOutcomes", specificLearningOutcomes, "specific learning outcomes");
  requireCareerGoal(errors, "challengesToOvercome", challengesToOvercome, "challenges you expect to overcome");

  if (!confidenceLevel) {
    errors.confidenceLevel = "Please rate your current confidence level in your chosen domain.";
  } else if (!CONFIDENCE_LEVEL_OPTIONS.some((o) => o.value === confidenceLevel)) {
    errors.confidenceLevel = "Please select a valid confidence level.";
  }

  if (declarationAccepted !== "yes") {
    errors.declarationAccepted = "Please confirm the declaration to submit your application.";
  }

  if (!resume) {
    errors.resume = "Please upload your resume (PDF or Word, max 5 MB).";
  } else {
    const ext = resume.name.toLowerCase().slice(resume.name.lastIndexOf("."));
    const mimeOk = ALLOWED_RESUME_MIME_TYPES.includes(
      resume.type as (typeof ALLOWED_RESUME_MIME_TYPES)[number],
    );
    const extOk = ALLOWED_RESUME_EXTENSIONS.includes(
      ext as (typeof ALLOWED_RESUME_EXTENSIONS)[number],
    );
    if (resume.size > MAX_RESUME_BYTES) {
      errors.resume = "Resume must be 5 MB or smaller.";
    } else if (!mimeOk && !extOk) {
      errors.resume = "Upload a PDF or Word document (.pdf, .doc, .docx).";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      phone,
      country,
      university,
      currentQualification,
      linkedIn,
      duration,
      careerAssistance: careerAssistance as YesNo,
      jobOpportunitiesAfter: jobOpportunitiesAfter as YesNo,
      previousInternship: previousInternship as YesNo,
      previousInternshipDetails,
      relevantWorkExperience: relevantWorkExperience as YesNo,
      relevantWorkExperienceDetails,
      currentStatus,
      relevantSkills,
      projectsCertificationsCourses: projectsCertificationsCourses as YesNo,
      projectsCertificationsDetails,
      visaStatus,
      visaDetails,
      industryOrCareerPath,
      biggestCareerChallenge,
      whyChoseInternship,
      careerGrowthHelp,
      whyChoseBriticana,
      internshipExpectations,
      impactAcademicProfessionalGrowth,
      specificLearningOutcomes,
      challengesToOvercome,
      confidenceLevel,
      declarationAccepted: declarationAccepted as YesNo,
      internshipTrack,
      source,
      website,
      resume: resume!,
    },
  };
}
