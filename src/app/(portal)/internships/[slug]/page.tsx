import Link from "next/link";
import { notFound } from "next/navigation";

import InternshipDetailMarketing from "@/components/internships/InternshipDetailMarketing";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getAllInternships, getInternshipBySlug, getInternshipSlugs } from "@/lib/sanity/queries";
import type { Internship } from "@/lib/sanity/types";

type InternshipDetailPageProps = {
  params: { slug: string };
};

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
      <div className="container mw-1345 py-5">
        <p className="text-secondary mb-3">
          Sanity is not configured. Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> to load
          internship details from the CMS.
        </p>
        <Link href="/internships" className="main-btn black">
          Back to internships
        </Link>
      </div>
    );
  }

  const internship = await client.fetch<Internship | null>(getInternshipBySlug, { slug: params.slug });
  if (!internship) {
    notFound();
  }

  const all = await client.fetch<Internship[]>(getAllInternships).catch(() => [] as Internship[]);
  const domainId = internship.domain?._id;
  const related = all
    .filter((i) => i._id !== internship._id && domainId && i.domain?._id === domainId)
    .slice(0, 2);

  return <InternshipDetailMarketing internship={internship} related={related} />;
}
