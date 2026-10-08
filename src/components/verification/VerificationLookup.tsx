"use client";

import { useRef, useState } from "react";

import VerificationForm from "@/components/verification/VerificationForm";
import VerificationResult, {
  type VerificationRecord,
  type VerificationResultState,
} from "@/components/verification/VerificationResult";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getStudentByCode } from "@/lib/sanity/queries";
import type { Student } from "@/lib/sanity/types";

function formatCompletionStatus(status: Student["completionStatus"] | string | undefined): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "in-progress":
      return "In Progress";
    case "not-started":
      return "Not Started";
    default:
      return status ? String(status) : "Completed";
  }
}

function mapStudentToVerificationRecord(student: Student): VerificationRecord {
  return {
    code: student.internshipId,
    name: student.studentName?.trim() || "Student",
    domain: student.domain?.trim() || "—",
    duration: student.duration?.trim() || "—",
    region: student.region?.trim() || "—",
    status: formatCompletionStatus(student.completionStatus),
    certificateIssued: Boolean(student.certificateIssued),
    mentorEvaluation: student.mentorEvaluation?.trim() || "—",
  };
}

export default function VerificationLookup() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<VerificationResultState>({ status: "idle" });
  const inFlightRef = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inFlightRef.current) {
      return;
    }

    const trimmed = code.trim();
    if (!trimmed) {
      setResult({ status: "not-found", code: "" });
      return;
    }

    if (!isSanityConfigured()) {
      setResult({
        status: "error",
        message: "Verification service is not configured.",
      });
      return;
    }

    inFlightRef.current = true;
    setResult({ status: "loading" });

    try {
      const student = await client
        .withConfig({ useCdn: false })
        .fetch<Student | null>(getStudentByCode, { code: trimmed });

      if (student && student.internshipId) {
        setResult({
          status: "found",
          record: mapStudentToVerificationRecord(student),
        });
        return;
      }

      setResult({ status: "not-found", code: trimmed });
    } catch {
      setResult({
        status: "error",
        message: "Unable to connect to the verification service. Please try again shortly.",
      });
    } finally {
      inFlightRef.current = false;
    }
  }

  return (
    <div className="row g-4 justify-content-center">
      <div className="col-lg-5">
        <VerificationForm
          code={code}
          onCodeChange={setCode}
          onSubmit={handleSubmit}
          isLoading={result.status === "loading"}
        />
      </div>
      <div className="col-lg-7">
        <VerificationResult state={result} />
      </div>
    </div>
  );
}
