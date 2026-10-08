"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { InternshipPageContentDTO } from "@/lib/internships/internshipContentApi";
import {
  buildTenDayBatchSchedule,
  formatBatchDateLong,
  formatBatchDayMonthShort,
  type BatchScheduleStatus,
} from "@/lib/internships/internshipRoleClarifier";
import { buildApplyHref } from "@/lib/studentApplicationForm";

export type StartDateSelectorProps = {
  overviewContent?: InternshipPageContentDTO | null;
};

const STATUS_LABEL: Record<BatchScheduleStatus, string> = {
  closed: "Closed",
  "closing-soon": "Closing Soon",
  open: "Open",
};

const DEFAULT_PROGRAM_PERKS = ["Mentor-Led Projects", "Real-World Experience", "Verifiable Certificate"];

function addMonths(date: Date, months: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  next.setMonth(next.getMonth() + months);
  return next;
}

const MONTH_SHORT = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });
const SHORT_DATE = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function StartDateSelector({ overviewContent }: StartDateSelectorProps) {
  const applyHref = buildApplyHref({ source: "internships-start-date" });
  const anchorBatchDate = overviewContent?.batch_start_date;

  const startDates = useMemo(
    () => buildTenDayBatchSchedule(anchorBatchDate, new Date(), 7),
    [anchorBatchDate],
  );

  const defaultIndex = useMemo(() => {
    const upcomingIndex = startDates.findIndex((s) => s.status !== "closed");
    return upcomingIndex === -1 ? 0 : upcomingIndex;
  }, [startDates]);

  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const selected = startDates[selectedIndex] ?? startDates[0];

  const primaryDurationLabel = overviewContent?.duration?.trim() || "3 Months";
  const completionOptions = useMemo(
    () => [
      { label: primaryDurationLabel, add: (d: Date) => addMonths(d, 3) },
      { label: "6 Months", add: (d: Date) => addMonths(d, 6) },
      { label: "9 Months", add: (d: Date) => addMonths(d, 9) },
    ],
    [primaryDurationLabel],
  );

  const programPerks = useMemo(() => {
    const raw = overviewContent?.benefits_and_features?.trim();
    if (!raw) return DEFAULT_PROGRAM_PERKS;
    const split = raw
      .split(/\||,|\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    return split.length > 0 ? split : DEFAULT_PROGRAM_PERKS;
  }, [overviewContent?.benefits_and_features]);

  const introText =
    overviewContent?.introductory_text?.trim() ||
    "Select a start date that fits your schedule — see completion dates instantly and apply in seconds.";

  const applicationInstructions =
    overviewContent?.application_instructions?.trim() ||
    "* Completion dates are approximate and may vary based on program requirements.";

  const ctaButtonText = overviewContent?.cta_button_text?.trim() || "Apply Now";

  return (
    <section className="start-date-picker" data-component="StartDateSelector">
      <div className="text-center mb-5">
        <h2>
          Choose Your <span>Start Date</span>
        </h2>
        <p className="text-secondary mt-2 mb-0 mx-auto" style={{ maxWidth: "560px" }}>
          {introText}
        </p>
      </div>

      <div className="row g-4 align-items-start">
        <div className="col-lg-4">
          <div className="start-date-list bg-white rounded-4 shadow-sm p-4">
            <p className="fw-semibold d-flex align-items-center gap-2 mb-3">
              <i className="ri-time-line" aria-hidden /> Available Start Dates
            </p>
            <ul className="start-date-scroll list-unstyled d-flex flex-column gap-3 mb-0">
              {startDates.map((item, index) => {
                const isSelected = index === selectedIndex;
                const isClosed = item.status === "closed";
                return (
                  <li key={`${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`}>
                    <button
                      type="button"
                      className={`start-date-row w-100 d-flex align-items-center gap-3 text-start${
                        isSelected ? " is-selected" : ""
                      }${isClosed ? " is-closed" : ""}`}
                      onClick={() => setSelectedIndex(index)}
                      aria-pressed={isSelected}
                    >
                      <span className="start-date-badge flex-shrink-0" aria-hidden>
                        {MONTH_SHORT(item.date)}
                      </span>
                      <span className="flex-grow-1">
                        <span className="start-date-day d-block fw-semibold">
                          {formatBatchDayMonthShort(item.date)}
                        </span>
                        <span className="start-date-year d-block small text-secondary">
                          {item.date.getFullYear()}
                        </span>
                      </span>
                      <span className={`start-date-pill status-${item.status} flex-shrink-0`}>
                        {STATUS_LABEL[item.status]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="start-date-detail rounded-4 shadow-sm overflow-hidden">
            <div className="start-date-detail-head d-flex flex-wrap align-items-center justify-content-between gap-3 p-4">
              <div>
                <span className="small text-uppercase d-block mb-1 start-date-detail-label">
                  Selected Start Date
                </span>
                <span className="h3 mb-0 text-white d-block">{formatBatchDateLong(selected.date)}</span>
              </div>
              <Link href={applyHref} className="main-btn start-date-apply flex-shrink-0">
                {ctaButtonText}
              </Link>
            </div>

            <div className="bg-white p-4">
              <div className="d-flex flex-wrap gap-2 mb-4">
                {programPerks.map((perk) => (
                  <span key={perk} className="start-date-perk d-inline-flex align-items-center gap-1">
                    <i className="ri-checkbox-circle-fill" aria-hidden /> {perk}
                  </span>
                ))}
              </div>

              <p className="fw-semibold mb-3">Completion Date Calendar</p>
              <div className="row g-3">
                {completionOptions.map((opt) => (
                  <div key={opt.label} className="col-12 col-sm-4">
                    <div className="start-date-completion h-100 text-center">
                      <span className="d-block small text-uppercase text-secondary mb-1">{opt.label}</span>
                      <span className="d-block fw-semibold">{SHORT_DATE(opt.add(selected.date))}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="small text-secondary mt-3 mb-0">{applicationInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
