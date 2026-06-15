"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { INTERNSHIP_DURATIONS, INTERNSHIP_REGIONS } from "@/lib/internshipFilters";
import type { InternshipDomainDoc } from "@/lib/sanity/types";

export type FilterBarProps = {
  domains: InternshipDomainDoc[];
  initialDomain: string;
  initialRegion: string;
  initialDuration: string;
};

export default function FilterBar({ domains, initialDomain, initialRegion, initialDuration }: FilterBarProps) {
  const router = useRouter();
  const [domain, setDomain] = useState(initialDomain);
  const [region, setRegion] = useState(initialRegion);
  const [duration, setDuration] = useState(initialDuration);

  const hasActive = Boolean(domain || region || duration);

  const applyFilters = useCallback(() => {
    const p = new URLSearchParams();
    if (domain.trim()) p.set("domain", domain.trim());
    if (region.trim()) p.set("region", region.trim());
    if (duration.trim()) p.set("duration", duration.trim());
    const qs = p.toString();
    router.push(qs ? `/internships?${qs}` : "/internships");
  }, [domain, duration, region, router]);

  const clearFilters = useCallback(() => {
    setDomain("");
    setRegion("");
    setDuration("");
    router.push("/internships");
  }, [router]);

  return (
    <div className="filter-bar rounded-4 p-4 mb-5" data-component="FilterBar">
      <div className="row g-3 align-items-end">
        <div className="col-lg col-md-4 col-sm-6">
          <label htmlFor="filter-domain" className="form-label small fw-semibold mb-1">
            Domain
          </label>
          <select
            id="filter-domain"
            className="form-select form-select-sm filter-bar__select"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <option value="">All domains</option>
            {domains.map((d) => {
              const slug = d.slug?.current?.trim();
              if (!slug) return null;
              return (
                <option key={d._id} value={slug}>
                  {d.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-lg col-md-4 col-sm-6">
          <label htmlFor="filter-region" className="form-label small fw-semibold mb-1">
            Region
          </label>
          <select
            id="filter-region"
            className="form-select form-select-sm filter-bar__select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All regions</option>
            {INTERNSHIP_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg col-md-4 col-sm-6">
          <label htmlFor="filter-duration" className="form-label small fw-semibold mb-1">
            Duration
          </label>
          <select
            id="filter-duration"
            className="form-select form-select-sm filter-bar__select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Any duration</option>
            {INTERNSHIP_DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-auto col-sm-6 d-flex gap-2">
          <button type="button" className="main-btn px-4" onClick={applyFilters}>
            Apply
          </button>
          {hasActive ? (
            <button type="button" className="filter-bar__clear" onClick={clearFilters}>
              Clear
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
