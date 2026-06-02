import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import InternshipCard from "@/components/internships/InternshipCard";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusBadge from "@/components/shared/StatusBadge";
import { internshipDomainLabel } from "@/lib/internshipDomainLabels";
import { client } from "@/lib/sanity/client";
import { urlForSanityImage } from "@/lib/sanity/image";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getAllInternships, getInternshipBySlug, getInternshipSlugs } from "@/lib/sanity/queries";
import type { Internship, InternshipApplicationStatus } from "@/lib/sanity/types";

type InternshipDetailPageProps = {
  params: { slug: string };
};

function statusVariant(status: InternshipApplicationStatus | undefined) {
  switch (status) {
    case "open":
      return "success" as const;
    case "coming-soon":
      return "warning" as const;
    case "closed":
      return "danger" as const;
    default:
      return "secondary" as const;
  }
}

function statusLabel(status: InternshipApplicationStatus | undefined) {
  switch (status) {
    case "open":
      return "Applications open";
    case "closed":
      return "Applications closed";
    case "coming-soon":
      return "Coming soon";
    default:
      return "Status";
  }
}

export async function generateStaticParams() {
  if (!isSanityConfigured()) return [];
  try {
    const slugs = await client.fetch<string[]>(getInternshipSlugs);
    return (slugs || []).filter(Boolean).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: InternshipDetailPageProps) {
  if (!isSanityConfigured()) {
    return { title: "Internship | Briticana" };
  }
  const doc = await client.fetch<Internship | null>(getInternshipBySlug, { slug: params.slug });
  return { title: doc?.title ? `${doc.title} | Briticana` : "Internship | Briticana" };
}

export default async function InternshipDetailPage({ params }: InternshipDetailPageProps) {
  if (!isSanityConfigured()) {
    return (
      <div className="container py-5">
        <p className="text-secondary mb-3">
          Sanity is not configured. Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> to load internship details from the CMS.
        </p>
        <Link href="/internships">Back to internships</Link>
      </div>
    );
  }

  const internship = await client.fetch<Internship | null>(getInternshipBySlug, { slug: params.slug });
  if (!internship) {
    notFound();
  }

  const all = await client.fetch<Internship[]>(getAllInternships).catch(() => [] as Internship[]);
  const related = all.filter((i) => i._id !== internship._id && i.domain === internship.domain).slice(0, 2);

  const imgUrl = urlForSanityImage(internship.featuredImage, 960);
  const showApply = internship.applicationStatus === "open" && internship.googleFormLink?.trim();

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small mb-0">
          <li className="breadcrumb-item">
            <Link href="/internships">Internships</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {internship.title}
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
        <h1 className="mb-0">{internship.title}</h1>
        <StatusBadge label={statusLabel(internship.applicationStatus)} variant={statusVariant(internship.applicationStatus)} />
      </div>

      <p className="text-secondary mb-2">
        <span className="fw-semibold text-body">Domain:</span> {internshipDomainLabel(internship.domain)}
      </p>
      {internship.availableRegions?.length ? (
        <p className="text-secondary mb-2">
          <span className="fw-semibold text-body">Regions:</span> {internship.availableRegions.join(", ")}
        </p>
      ) : null}
      {internship.durationOptions?.length ? (
        <p className="text-secondary mb-4">
          <span className="fw-semibold text-body">Durations:</span> {internship.durationOptions.join(", ")}
        </p>
      ) : null}

      {imgUrl ? (
        <div className="ratio ratio-21x9 mb-4 rounded overflow-hidden bg-body-secondary position-relative">
          <Image src={imgUrl} alt="" fill className="object-fit-cover" sizes="(max-width: 768px) 100vw, 960px" priority />
        </div>
      ) : null}

      {internship.overview ? (
        <section className="mb-5">
          <h2 className="h4">Overview</h2>
          <p className="text-secondary mb-0" style={{ whiteSpace: "pre-wrap" }}>
            {internship.overview}
          </p>
        </section>
      ) : null}

      {internship.skillsCovered?.length ? (
        <section className="mb-5">
          <h2 className="h4">Skills covered</h2>
          <ul className="mb-0">
            {internship.skillsCovered.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {internship.toolsUsed?.length ? (
        <section className="mb-5">
          <h2 className="h4">Tools used</h2>
          <ul className="mb-0">
            {internship.toolsUsed.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {internship.projectStructure ? (
        <section className="mb-5">
          <h2 className="h4">Project structure</h2>
          <p className="text-secondary mb-0" style={{ whiteSpace: "pre-wrap" }}>
            {internship.projectStructure}
          </p>
        </section>
      ) : null}

      {internship.certificationDetails ? (
        <section className="mb-5">
          <h2 className="h4">Certification</h2>
          <p className="text-secondary mb-0" style={{ whiteSpace: "pre-wrap" }}>
            {internship.certificationDetails}
          </p>
        </section>
      ) : null}

      <div className="d-flex flex-wrap gap-3 mb-5">
        {showApply ? (
          <a className="btn btn-primary" href={internship.googleFormLink} target="_blank" rel="noopener noreferrer">
            Apply now
          </a>
        ) : null}
        <Link href="/internships" className="btn btn-outline-secondary">
          All internships
        </Link>
      </div>

      {related.length > 0 ? (
        <>
          <SectionHeading
            kicker="Related"
            title="More in this domain"
            description="Comparable tracks you may want to compare before you apply."
          />
          <div className="row g-4">
            {related.map((r) => (
              <div key={r._id} className="col-md-6">
                <div className="position-relative h-100">
                  <InternshipCard internship={r} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
