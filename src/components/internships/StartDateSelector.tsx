"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type BatchStatus = "closed" | "closing-soon" | "open";

type StartDate = {
  date: Date;
  status: BatchStatus;
};

export type StartDateSelectorProps = {
  /** From Sanity Site settings — path (e.g. /contact) or full URL. Falls back to /contact when empty. */
  applyUrl?: string | null;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const STATUS_LABEL: Record<BatchStatus, string> = {
  closed: "Closed",
  "closing-soon": "Closing Soon",
  open: "Open",
};

const COMPLETION_OPTIONS = [
  { label: "3 Months", add: (d: Date) => addMonths(d, 3) },
  { label: "6 Months", add: (d: Date) => addMonths(d, 6) },
  { label: "9 Months", add: (d: Date) => addMonths(d, 9) },
];

const PROGRAM_PERKS = ["Mentor-Led Projects", "Real-World Experience", "Verifiable Certificate"];

const DEFAULT_APPLY = "/contact";

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonths(date: Date, months: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function mostRecentMonday(today: Date): Date {
  const d = startOfDay(today);
  const day = d.getDay(); // 0 Sun ... 1 Mon
  const diff = (day + 6) % 7; // days since Monday
  return addDays(d, -diff);
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

function buildStartDates(today: Date): StartDate[] {
  const base = addDays(mostRecentMonday(today), -7);
  const start = startOfDay(today);
  return Array.from({ length: 6 }, (_, i) => {
    const date = addDays(base, i * 7);
    const daysUntil = Math.round((date.getTime() - start.getTime()) / MS_PER_DAY);
    let status: BatchStatus = "open";
    if (daysUntil < 0) status = "closed";
    else if (daysUntil <= 10) status = "closing-soon";
    return { date, status };
  });
}

const MONTH_SHORT = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });
const FULL_DATE = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const SHORT_DATE = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function resolveApplyHref(raw?: string | null): string {
  const t = raw?.trim();
  if (!t) return DEFAULT_APPLY;
  return t;
}

function ApplyNowButton({ href, className }: { href: string; className?: string }) {
  const target = resolveApplyHref(href);
  const isAppPath = target.startsWith("/") && !target.startsWith("//");

  if (isAppPath) {
    return (
      <Link href={target} className={className}>
        Apply Now
      </Link>
    );
  }

  return (
    <a href={target} className={className} target="_blank" rel="noopener noreferrer">
      Apply Now
    </a>
  );
}

export default function StartDateSelector({ applyUrl }: StartDateSelectorProps) {
  const startDates = useMemo(() => buildStartDates(new Date()), []);
  const defaultIndex = useMemo(() => {
    const openIndex = startDates.findIndex((s) => s.status === "open");
    return openIndex === -1 ? startDates.length - 1 : openIndex;
  }, [startDates]);

  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const selected = startDates[selectedIndex] ?? startDates[startDates.length - 1];

  return (
    <section className="start-date-picker" data-component="StartDateSelector">
      <div className="text-center mb-5">
        <h2>
          Choose Your <span>Start Date</span>
        </h2>
        <p className="text-secondary mt-2 mb-0 mx-auto" style={{ maxWidth: "560px" }}>
          Select a start date that fits your schedule. New batches begin every Monday — see completion dates instantly
          and apply in seconds.
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
                  <li key={item.date.toISOString()}>
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
                          {MONTH_SHORT(item.date)} {ordinal(item.date.getDate())}
                        </span>
                        <span className="start-date-year d-block small text-secondary">{item.date.getFullYear()}</span>
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
                <span className="small text-uppercase d-block mb-1 start-date-detail-label">Selected Start Date</span>
                <span className="h3 mb-0 text-white d-block">{FULL_DATE(selected.date)}</span>
              </div>
              <ApplyNowButton href={applyUrl ?? ""} className="main-btn start-date-apply flex-shrink-0" />
            </div>

            <div className="bg-white p-4">
              <div className="d-flex flex-wrap gap-2 mb-4">
                {PROGRAM_PERKS.map((perk) => (
                  <span key={perk} className="start-date-perk d-inline-flex align-items-center gap-1">
                    <i className="ri-checkbox-circle-fill" aria-hidden /> {perk}
                  </span>
                ))}
              </div>

              <p className="fw-semibold mb-3">Completion Date Calendar</p>
              <div className="row g-3">
                {COMPLETION_OPTIONS.map((opt) => (
                  <div key={opt.label} className="col-12 col-sm-4">
                    <div className="start-date-completion h-100 text-center">
                      <span className="d-block small text-uppercase text-secondary mb-1">{opt.label}</span>
                      <span className="d-block fw-semibold">{SHORT_DATE(opt.add(selected.date))}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="small text-secondary mt-3 mb-0">
                * Completion dates are approximate and may vary based on program requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
