/** GROQ query strings for Briticana content. Pass to `client.fetch` with params where noted. */

export const getAllInternships = `*[_type == "internship"] | order(coalesce(batchStartDate, _updatedAt) desc)`;

export const getInternshipBySlug = `*[_type == "internship" && slug.current == $slug][0]`;

export const getAllTestimonials = `*[_type == "testimonial"] | order(_createdAt desc)`;

export const getAllFaqItems = `*[_type == "faqItem"] | order(order asc)`;

export const getAllStartupPartners = `*[_type == "startupPartner"] | order(name asc)`;

export const getSiteSettings = `*[_type == "siteSettings"][0]`;

export const getStudentByCode = `*[_type == "student" && internshipId == $code][0]`;
