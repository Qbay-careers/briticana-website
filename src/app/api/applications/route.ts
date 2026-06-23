import { NextResponse } from "next/server";

import {
  labelForConfidenceLevel,
  labelForCurrentStatus,
  labelForVisaStatus,
  labelForYesNo,
} from "@/lib/applications/applicationTypes";
import { appendApplicationRow, isSheetsConfigured } from "@/lib/applications/googleSheets";
import { isR2Configured, uploadResumeToR2 } from "@/lib/applications/r2Storage";
import { validateApplicationForm } from "@/lib/applications/validateApplication";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { data, errors } = validateApplicationForm(formData);

  if (errors) {
    return NextResponse.json({ ok: false, error: "Please check the form.", fields: errors }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again in a minute." },
      { status: 429 },
    );
  }

  if (!isSheetsConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Applications aren't configured yet. Please try again later or email us." },
      { status: 503 },
    );
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { ok: false, error: "Resume upload isn't configured yet. Please try again later or email us." },
      { status: 503 },
    );
  }

  try {
    const buffer = Buffer.from(await data.resume.arrayBuffer());
    const upload = await uploadResumeToR2(
      buffer,
      data.resume.type || "application/octet-stream",
      data.resume.name,
      { firstName: data.firstName, lastName: data.lastName },
    );

    await appendApplicationRow({
      submittedAt: new Date().toISOString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      university: data.university,
      currentQualification: data.currentQualification,
      linkedIn: data.linkedIn,
      duration: data.duration,
      careerAssistance: labelForYesNo(data.careerAssistance),
      jobOpportunitiesAfter: labelForYesNo(data.jobOpportunitiesAfter),
      previousInternship: labelForYesNo(data.previousInternship),
      previousInternshipDetails: data.previousInternshipDetails,
      relevantWorkExperience: labelForYesNo(data.relevantWorkExperience),
      relevantWorkExperienceDetails: data.relevantWorkExperienceDetails,
      currentStatus: labelForCurrentStatus(data.currentStatus),
      relevantSkills: data.relevantSkills,
      projectsCertificationsCourses: labelForYesNo(data.projectsCertificationsCourses),
      projectsCertificationsDetails: data.projectsCertificationsDetails,
      visaStatus: labelForVisaStatus(data.visaStatus),
      visaDetails: data.visaDetails,
      industryOrCareerPath: data.industryOrCareerPath,
      biggestCareerChallenge: data.biggestCareerChallenge,
      whyChoseInternship: data.whyChoseInternship,
      careerGrowthHelp: data.careerGrowthHelp,
      whyChoseBriticana: data.whyChoseBriticana,
      internshipExpectations: data.internshipExpectations,
      impactAcademicProfessionalGrowth: data.impactAcademicProfessionalGrowth,
      specificLearningOutcomes: data.specificLearningOutcomes,
      challengesToOvercome: data.challengesToOvercome,
      confidenceLevel: labelForConfidenceLevel(data.confidenceLevel),
      resumeUrl: upload.url,
      internshipTrack: data.internshipTrack,
      source: data.source,
      declarationAccepted: labelForYesNo(data.declarationAccepted),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to submit application:", err);
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("EPROTO") || message.includes("handshake failure")) {
      console.error(
        "R2 upload failed: check R2_ACCOUNT_ID is your Cloudflare Account ID (not Access Key ID). " +
          "Find it on Dashboard home or R2 Overview.",
      );
    }
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your application. Please try again." },
      { status: 502 },
    );
  }
}
