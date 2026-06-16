"use client";

import { useRef, useState } from "react";

import type { DemoDeliverable } from "@/lib/demo/studentDashboard";

type UploadDeliverablesDemoProps = {
  deliverables: readonly DemoDeliverable[];
};

export default function UploadDeliverablesDemo({ deliverables }: UploadDeliverablesDemoProps) {
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const inputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const uploadedCount = Object.keys(fileNames).length;
  const allUploaded = uploadedCount === deliverables.length;

  function handlePick(id: string, fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    setFileNames((prev) => ({ ...prev, [id]: file.name }));
  }

  function handleRemove(id: string) {
    setFileNames((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    const input = inputsRef.current[id];
    if (input) input.value = "";
  }

  if (submitted) {
    return (
      <div className="text-center py-3" role="status">
        <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: "2.5rem" }} aria-hidden />
        <h4 className="mt-3 mb-1">Deliverables submitted</h4>
        <p className="small text-secondary mb-0">
          Your mentor has been notified and will review your submission. You will be able to download your certificate
          once it is approved.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="list-unstyled mb-4">
        {deliverables.map((d) => {
          const uploaded = fileNames[d.id];
          return (
            <li key={d.id} className="d-flex align-items-center gap-3 py-2 border-bottom">
              <i className={`${d.icon} fs-5 ${uploaded ? "text-success" : "text-secondary"}`} aria-hidden />
              <span className="flex-grow-1">
                <span className="d-block">{d.label}</span>
                {uploaded ? <span className="small text-success d-block text-truncate">{uploaded}</span> : null}
              </span>

              <input
                ref={(el) => {
                  inputsRef.current[d.id] = el;
                }}
                type="file"
                className="d-none"
                id={`upload-${d.id}`}
                onChange={(e) => handlePick(d.id, e.target.files)}
              />

              {uploaded ? (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary flex-shrink-0"
                  onClick={() => handleRemove(d.id)}
                  aria-label={`Remove ${d.label}`}
                >
                  <i className="ri-close-line" aria-hidden /> Remove
                </button>
              ) : (
                <label htmlFor={`upload-${d.id}`} className="btn btn-sm btn-outline-primary flex-shrink-0 mb-0">
                  <i className="ri-upload-2-line me-1" aria-hidden /> Choose file
                </label>
              )}
            </li>
          );
        })}
      </ul>

      <p className="small text-secondary mb-3">
        {uploadedCount} of {deliverables.length} files added.
      </p>

      <button
        type="button"
        className="main-btn w-100 justify-content-center"
        disabled={!allUploaded}
        onClick={() => setSubmitted(true)}
      >
        <i className="ri-send-plane-2-line me-2" aria-hidden /> Submit deliverables
      </button>
    </div>
  );
}
