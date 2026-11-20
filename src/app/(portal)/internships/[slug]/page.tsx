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
import { getSupplementalTrackBySlug } from "@/lib/internships/supplementalTracks";
import { client } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/isSanityConfigured";
import { getAllInternships, getInternshipBySlug } from "@/lib/sanity/queries";
import type { Internship } from "@/lib/sanity/types";
import { buildPageAlternates } from "@/lib/seo/siteSeo";

export const revalidate = 300;

type InternshipDetailPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: InternshipDetailPageProps) {
  const alternates = buildPageAlternates(`/internships/${params.slug}`);
  const supp = getSupplementalTrackBySlug(params.slug);
  if (supp?.title) {
    return { title: `${sanitizeInternshipText(supp.title)} | Briticana`, alternates };
  }
  const dbContent = await fetchInternshipContentByKey(params.slug);
  if (dbContent?.title) {
    return { title: `${sanitizeInternshipText(dbContent.title)} | Briticana`, alternates };
  }
  if (!isSanityConfigured()) {
    return { title: "Internship | Briticana", alternates };
  }
  const fetchDoc = client.fetch<Internship | null>(
    getInternshipBySlug,
    { slug: params.slug },
    { next: { revalidate: 300 } },
  );
  const timeoutDoc = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
  const doc = await Promise.race([fetchDoc, timeoutDoc]);
  return {
    title: doc?.title ? `${sanitizeInternshipText(doc.title)} | Briticana` : "Internship | Briticana",
    alternates,
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
      const fetchPromise = Promise.all([
        client.fetch<Internship | null>(
          getInternshipBySlug,
          { slug: params.slug },
          { next: { revalidate: 300 } },
        ),
        client
          .fetch<Internship[]>(getAllInternships, {}, { next: { revalidate: 300 } })
          .catch(() => [] as Internship[]),
      ]);
      const timeoutPromise = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), 2000),
      );
      const res = await Promise.race([fetchPromise, timeoutPromise]);
      if (res && Array.isArray(res)) {
        sanityInternship = res[0];
        allSanityInternships = res[1];
      }
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
  } else {
    internship = getSupplementalTrackBySlug(params.slug);
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
