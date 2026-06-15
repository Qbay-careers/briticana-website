/** GROQ query strings for Briticana content. Pass to `client.fetch` with params where noted. */

/** Dereference internship → domain for app types (slug.current used in filters). */
const internshipDomainExpand = `"domain": domain->{ _id, _type, title, slug, shortOverview, icon }`;

export const getHomePage = `*[_type == "homePage"]|order(_updatedAt desc)[0]`;

/** Marketing home: internship domain tiles (slug used for /internships?domain= filter). */
export const getAllInternshipDomains = `*[_type == "internshipDomain" && defined(slug.current)] | order(coalesce(sortOrder, 999) asc, title asc) {
  _id,
  _type,
  title,
  slug,
  icon
}`;

/** Domains listing: same order as home, plus live internship counts per domain. */
export const getInternshipDomainsWithCounts = `*[_type == "internshipDomain" && defined(slug.current)] | order(coalesce(sortOrder, 999) asc, title asc) {
  _id,
  _type,
  title,
  slug,
  shortOverview,
  icon,
  "internshipCount": count(*[_type == "internship" && domain._ref == ^._id])
}`;

/** Marketing home featured band: selected internships from the Home page singleton. */
export const getFeaturedInternshipsForHome = `*[_type == "homePage"][0].featuredInternships[]->{
  ...,
  ${internshipDomainExpand}
}`;

export const getAllInternships = `*[_type == "internship"] | order(coalesce(batchStartDate, _updatedAt) desc) {
  ...,
  ${internshipDomainExpand}
}`;

/** Optional filters: pass empty string or omit keys to skip. $domain matches domain slug.current. */
export const getInternshipsFiltered = `*[
  _type == "internship"
  && (!defined($domain) || $domain == "" || domain->slug.current == $domain)
  && (!defined($region) || $region == "" || $region in coalesce(availableRegions, []))
  && (!defined($duration) || $duration == "" || $duration in coalesce(durationOptions, []))
] | order(coalesce(batchStartDate, _updatedAt) desc) {
  ...,
  ${internshipDomainExpand}
}`;

export const getInternshipBySlug = `*[_type == "internship" && slug.current == $slug][0] {
  ...,
  ${internshipDomainExpand}
}`;

export const getInternshipSlugs = `*[_type == "internship" && defined(slug.current)].slug.current`;

export const getAllTestimonials = `*[_type == "testimonial"] | order(_createdAt desc)`;

export const getAllFaqItems = `*[_type == "faqItem"] | order(order asc)`;

export const getAllStartupPartners = `*[_type == "startupPartner"] | order(name asc)`;

export const getSiteSettings = `*[_type == "siteSettings"]|order(_updatedAt desc)[0]`;

export const getStudentByCode = `*[_type == "student" && internshipId == $code][0]`;
