/** GROQ query strings for Briticana content. Pass to `client.fetch` with params where noted. */

export const getHomePage = `*[_type == "homePage"]|order(_updatedAt desc)[0]`;

export const getAllInternships = `*[_type == "internship"] | order(coalesce(batchStartDate, _updatedAt) desc)`;

/** Optional filters: pass empty string or omit keys to skip. */
export const getInternshipsFiltered = `*[
  _type == "internship"
  && (!defined($domain) || $domain == "" || domain == $domain)
  && (!defined($region) || $region == "" || $region in coalesce(availableRegions, []))
  && (!defined($duration) || $duration == "" || $duration in coalesce(durationOptions, []))
] | order(coalesce(batchStartDate, _updatedAt) desc)`;

export const getInternshipBySlug = `*[_type == "internship" && slug.current == $slug][0]`;

export const getInternshipSlugs = `*[_type == "internship" && defined(slug.current)].slug.current`;

export const getAllTestimonials = `*[_type == "testimonial"] | order(_createdAt desc)`;

export const getAllFaqItems = `*[_type == "faqItem"] | order(order asc)`;

export const getAllStartupPartners = `*[_type == "startupPartner"] | order(name asc)`;

export const getSiteSettings = `*[_type == "siteSettings"]|order(_updatedAt desc)[0]`;

export const getStudentByCode = `*[_type == "student" && internshipId == $code][0]`;
