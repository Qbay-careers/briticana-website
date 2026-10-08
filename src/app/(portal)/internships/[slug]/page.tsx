import Link from "next/link";
import { notFound } from "next/navigation";

import InternshipDetailMarketing from "@/components/internships/InternshipDetailMarketing";
import {
  dbContentToInternship,
  fetchAllInternshipContent,
  fetchInternshipContentByKey,
  mergeInternshipWithDbContent,
  type EnrichedInternship,
} from "@/lib/internships/internshipContentApi";
import { sanitizeInternshipText } from "@/lib/internships/internshipRoleClarifier";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getAllInternships, getInternshipBySlug } from "@/lib/sanity/queries";
import type { Internship } from "@/lib/sanity/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type InternshipDetailPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: InternshipDetailPageProps) {
  const dbContent = await fetchInternshipContentByKey(params.slug);
  if (dbContent?.title) {
    return { title: `${sanitizeInternshipText(dbContent.title)} | Briticana` };
  }
  if (!isSanityConfigured()) {
    return { title: "Internship | Briticana" };
  }
  const doc = await client.fetch<Internship | null>(
    getInternshipBySlug,
    { slug: params.slug },
    { cache: "no-store" },
  );
  return {
    title: doc?.title ? `${sanitizeInternshipText(doc.title)} | Briticana` : "Internship | Briticana",
  };
}

export default async function InternshipDetailPage({ params }: InternshipDetailPageProps) {
  const [dbContent, allDbContent] = await Promise.all([
    fetchInternshipContentByKey(params.slug),
    fetchAllInternshipContent(),
  ]);

  const dbTrackMap = new Map(
    allDbContent
      .filter((item) => item.page_type === "track")
      .map((item) => [item.page_key, item]),
  );

  let sanityInternship: Internship | null = null;
  let allSanityInternships: Internship[] = [];

  if (isSanityConfigured()) {
    try {
      const [fetchedDoc, fetchedAll] = await Promise.all([
        client.fetch<Internship | null>(
          getInternshipBySlug,
          { slug: params.slug },
          { cache: "no-store" },
        ),
        client
          .fetch<Internship[]>(getAllInternships, {}, { cache: "no-store" })
          .catch(() => [] as Internship[]),
      ]);
      sanityInternship = fetchedDoc;
      allSanityInternships = fetchedAll;
    } catch {
      sanityInternship = null;
      allSanityInternships = [];
    }
  }

  let internship: EnrichedInternship | null = null;
  if (sanityInternship) {
    internship = mergeInternshipWithDbContent(sanityInternship, dbContent);
  } else if (dbContent && dbContent.page_type === "track") {
    internship = dbContentToInternship(dbContent);
  }

  if (!internship) {
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
    notFound();
  }

  const domainId = internship.domain?._id;
  const related: EnrichedInternship[] = allSanityInternships
    .filter((i) => i._id !== internship?._id && domainId && i.domain?._id === domainId)
    .slice(0, 2)
    .map((r) => {
      const rSlug = r.slug?.current?.trim() || "";
      return mergeInternshipWithDbContent(r, dbTrackMap.get(rSlug));
    });

  return <InternshipDetailMarketing internship={internship} related={related} />;
}
