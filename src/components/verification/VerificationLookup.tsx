"use client";

import { useState } from "react";

import { findVerificationRecord, type VerificationRecord } from "@/lib/demo/verificationRecords";

import VerificationForm from "@/components/verification/VerificationForm";
import VerificationResult from "@/components/verification/VerificationResult";

type LookupState =
  | { status: "idle" }
  | { status: "found"; record: VerificationRecord }
  | { status: "not-found"; code: string };

export default function VerificationLookup() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<LookupState>({ status: "idle" });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const match = findVerificationRecord(code);
    if (match) {
      setResult({ status: "found", record: match });
    } else {
      setResult({ status: "not-found", code: code.trim() });
    }
  }

  return (
    <div className="row g-4 justify-content-center">
      <div className="col-lg-5">
        <VerificationForm code={code} onCodeChange={setCode} onSubmit={handleSubmit} />
      </div>
      <div className="col-lg-7">
        <VerificationResult state={result} />
      </div>
    </div>
  );
}
