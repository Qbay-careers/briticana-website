import type { EnrichedInternship } from "@/lib/internships/internshipContentApi";
import { buildGoogleApplyHref } from "@/lib/googleInternships";

export const GOOGLE_CAREERS_DUBLIN_URL =
  "https://www.google.com/about/careers/applications/jobs/results?e=72477625&location=Dublin,%20Ireland&q=Intern&src=Online/Social/GS_EMEA";

export function isGoogleInternship(
  internship: { title?: string; slug?: { current?: string }; _id?: string } | null | undefined,
): boolean {
  if (!internship) return false;
  const title = (internship.title || "").toLowerCase();
  const slug = (internship.slug?.current || "").toLowerCase();
  const id = (internship._id || "").toLowerCase();
  return title.includes("google") || slug.includes("google") || id.includes("google");
}

export const SUPPLEMENTAL_CORE_TRACKS: EnrichedInternship[] = [
  // ═════════════════════════════════════════════════════════════════
  // 10 OFFICIAL GOOGLE DUBLIN 2027 INTERNSHIP ROLES (EMEA HEADQUARTERS)
  // ═════════════════════════════════════════════════════════════════

  // 1. Google Software Engineering BS/MS Intern
  {
    _id: "google-software-engineering-dublin",
    _type: "internship",
    title: "Google — Software Engineering Intern (Dublin, Ireland)",
    slug: { _type: "slug", current: "google-software-engineering-intern-dublin" },
    domain: {
      _id: "internshipDomain-software-development",
      _type: "internshipDomain",
      title: "Software Development",
      slug: { _type: "slug", current: "software-development" },
    },
    overview:
      "Develop distributed cloud systems, core infrastructure, and high-performance services at Google European Headquarters in Dublin.",
    skillsCovered: [
      "Algorithms & Data Structures",
      "Python, Go, C++",
      "Distributed Systems",
      "Google Cloud Platform (GCP)",
      "System Architecture",
      "Git & Code Review",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 Software Engineering Intern (Dublin, Ireland)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin Software Engineering 2027",
    customResponsibilities: [
      "Design, build, test, and deploy software across Google's core distributed infrastructure.",
      "Work closely with senior Google software engineers on real-world production codebases.",
      "Participate in sprint planning, architectural reviews, and code quality workflows.",
      "Optimize algorithms for latency, scalability, and system reliability.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Applications are reviewed on a rolling basis via Google Careers EMEA.",
  },

  // 2. Google Site Reliability Engineering (SRE) Intern
  {
    _id: "google-site-reliability-engineering-dublin",
    _type: "internship",
    title: "Google — Site Reliability Engineering (SRE) Intern (Dublin)",
    slug: { _type: "slug", current: "google-site-reliability-engineering-intern-dublin" },
    domain: {
      _id: "internshipDomain-software-development",
      _type: "internshipDomain",
      title: "Software Development",
      slug: { _type: "slug", current: "software-development" },
    },
    overview:
      "Keep Google's planetary-scale global services running seamlessly with high uptime, automated telemetry, and resilient Linux infrastructure.",
    skillsCovered: [
      "Linux Systems Internals",
      "Python & Go Automation",
      "Incident Response & Observability",
      "Distributed Networking",
      "Fault Tolerance Architecture",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 Site Reliability Engineering (SRE) Intern (Dublin)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin Site Reliability Engineering 2027",
    customResponsibilities: [
      "Engineer automated tooling to monitor, debug, and scale Google production services.",
      "Perform deep-dive performance analyses on distributed networking and Linux kernels.",
      "Collaborate with software engineers to architect resilient failover mechanisms.",
      "Participate in disaster recovery drills and telemetry automation.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Applications are reviewed on a rolling basis via Google Careers EMEA.",
  },

  // 3. Google Cloud Solutions & Architecture Intern
  {
    _id: "google-cloud-solutions-dublin",
    _type: "internship",
    title: "Google — Cloud Solutions & Architecture Intern (Dublin)",
    slug: { _type: "slug", current: "google-cloud-solutions-architecture-dublin" },
    domain: {
      _id: "internshipDomain-software-development",
      _type: "internshipDomain",
      title: "Software Development",
      slug: { _type: "slug", current: "software-development" },
    },
    overview:
      "Partner with enterprise customers across Europe to design resilient Google Cloud architectures, Kubernetes deployments, and AI integrations.",
    skillsCovered: [
      "Google Cloud Platform (GCP)",
      "Kubernetes & Microservices",
      "Cloud Security & IAM",
      "Terraform & IaC",
      "Enterprise Solutions",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 Cloud Solutions & Architecture Intern (Dublin)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin Cloud Solutions 2027",
    customResponsibilities: [
      "Architect proof-of-concept solutions on Google Cloud Platform for European enterprise clients.",
      "Automate cloud infrastructure deployments using Terraform and Kubernetes.",
      "Assist in migrating on-premise workloads to GCP cloud-native services.",
      "Present cloud architecture best practices to client engineering leads.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Applications are reviewed on a rolling basis via Google Careers EMEA.",
  },

  // 4. Google Data Center Facilities Operations Intern
  {
    _id: "google-data-center-facilities-dublin",
    _type: "internship",
    title: "Google — Data Center Facilities Operations Intern (Dublin)",
    slug: { _type: "slug", current: "google-data-center-facilities-dublin" },
    domain: {
      _id: "internshipDomain-software-development",
      _type: "internshipDomain",
      title: "Software Development",
      slug: { _type: "slug", current: "software-development" },
    },
    overview:
      "Maintain mission-critical data center server fleets, electrical distribution, high-density cooling, and hardware diagnostics in Dublin.",
    skillsCovered: [
      "Hardware Diagnostics",
      "Data Center Infrastructure",
      "Power & Cooling Systems",
      "Network Routing & Fiber",
      "Safety & Reliability Compliance",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 Data Center Facilities Operations Intern (Dublin)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin Data Center Operations 2027",
    customResponsibilities: [
      "Diagnose, triage, and repair server and network hardware across production data halls.",
      "Monitor power, thermal, and cooling telemetry to maximize efficiency and uptime.",
      "Deploy new server racks and configure optical networking switches.",
      "Adhere to global Google safety protocols and operational standards.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Applications are reviewed on a rolling basis via Google Careers EMEA.",
  },

  // 5. Google Business & Global Customer Growth Intern
  {
    _id: "google-business-customer-growth-dublin",
    _type: "internship",
    title: "Google — Business & Global Customer Growth Intern (Dublin)",
    slug: { _type: "slug", current: "google-business-customer-growth-dublin" },
    domain: {
      _id: "internshipDomain-business",
      _type: "internshipDomain",
      title: "Business",
      slug: { _type: "slug", current: "business-operations" },
    },
    overview:
      "Consult with high-growth businesses and enterprise clients across EMEA to analyze campaign performance and accelerate digital adoption.",
    skillsCovered: [
      "Digital Ads Strategy",
      "Client Consulting",
      "EMEA Market Growth",
      "Data Analytics & Insights",
      "Campaign Optimization",
      "Business Operations",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 Business & Global Customer Growth Intern (Dublin)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin Business Operations 2027",
    customResponsibilities: [
      "Analyze business performance metrics across high-growth European client accounts.",
      "Identify growth opportunities in digital advertising and multi-channel marketing campaigns.",
      "Collaborate with cross-functional sales and technical teams at Google's EMEA headquarters.",
      "Present strategic growth recommendations to business leadership.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Applications are reviewed on a rolling basis via Google Careers EMEA.",
  },

  // 6. Google Business Analyst MBA Intern
  {
    _id: "google-business-analyst-mba-dublin",
    _type: "internship",
    title: "Google — Business Analyst MBA Intern (Dublin, Ireland)",
    slug: { _type: "slug", current: "google-business-analyst-mba-dublin" },
    domain: {
      _id: "internshipDomain-business",
      _type: "internshipDomain",
      title: "Business",
      slug: { _type: "slug", current: "business-operations" },
    },
    overview:
      "Drive strategic business operations, evaluate EMEA market entry dynamics, and present executive business cases to Google leadership.",
    skillsCovered: [
      "Strategic Business Modeling",
      "Executive Presentation",
      "Cross-Functional Leadership",
      "Market Economics",
      "Revenue Optimization",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 Business Analyst MBA Intern (Dublin, Ireland)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin MBA Strategy 2027",
    customResponsibilities: [
      "Lead cross-functional business analysis on commercial performance across EMEA markets.",
      "Evaluate pricing models, partnership opportunities, and new revenue channels.",
      "Synthesize complex quantitative datasets into clear executive briefings.",
      "Present data-backed recommendations directly to Google VP-level stakeholders.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Open to candidates enrolled in an MBA or Master's program.",
  },

  // 7. Google Associate Product Marketing Manager (APMM) Intern
  {
    _id: "google-product-marketing-apmm-dublin",
    _type: "internship",
    title: "Google — APMM Product Marketing Intern (Dublin, Ireland)",
    slug: { _type: "slug", current: "google-product-marketing-apmm-dublin" },
    domain: {
      _id: "internshipDomain-marketing",
      _type: "internshipDomain",
      title: "Marketing",
      slug: { _type: "slug", current: "marketing" },
    },
    overview:
      "Shape product positioning, design launch campaigns, and drive user engagement for Google's leading EMEA technology products.",
    skillsCovered: [
      "Product Positioning",
      "Go-to-Market Strategy",
      "User Insights",
      "Global Product Launches",
      "Brand Storytelling",
      "Performance Marketing",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 APMM Product Marketing Intern (Dublin, Ireland)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin APMM Product Marketing 2027",
    customResponsibilities: [
      "Define market segmentation and audience personas for Google products in Europe.",
      "Help execute high-visibility marketing launches and user engagement campaigns.",
      "Synthesize customer data, market signals, and competitor benchmarks into actionable insights.",
      "Partner with product, sales, and PR teams to tell compelling product stories.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Applications are reviewed on a rolling basis via Google Careers EMEA.",
  },

  // 8. Google Media & Digital Campaign Analytics Intern
  {
    _id: "google-digital-marketing-analytics-dublin",
    _type: "internship",
    title: "Google — Media & Digital Campaign Analytics Intern (Dublin)",
    slug: { _type: "slug", current: "google-digital-marketing-analytics-dublin" },
    domain: {
      _id: "internshipDomain-marketing",
      _type: "internshipDomain",
      title: "Marketing",
      slug: { _type: "slug", current: "marketing" },
    },
    overview:
      "Optimize large-scale advertising portfolios, measure attribution models, and translate multi-channel customer journeys into growth.",
    skillsCovered: [
      "Google Analytics 4 & BigQuery",
      "Attribution Modeling",
      "Performance Marketing",
      "A/B Testing & Experimentation",
      "Audience Segmentation",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 Media & Digital Campaign Analytics Intern (Dublin)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin Campaign Analytics 2027",
    customResponsibilities: [
      "Analyze attribution models and marketing funnel effectiveness across EMEA campaigns.",
      "Design and evaluate statistical A/B tests to optimize conversion rates.",
      "Query large-scale campaign performance datasets using SQL and BigQuery.",
      "Deliver automated dashboards and reporting pipelines for marketing teams.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Applications are reviewed on a rolling basis via Google Careers EMEA.",
  },

  // 9. Google Financial Analyst & Commercial FP&A Intern
  {
    _id: "google-financial-analyst-dublin",
    _type: "internship",
    title: "Google — Financial Analyst & Commercial FP&A Intern (Dublin)",
    slug: { _type: "slug", current: "google-financial-analyst-dublin" },
    domain: {
      _id: "internshipDomain-finance",
      _type: "internshipDomain",
      title: "Finance",
      slug: { _type: "slug", current: "finance" },
    },
    overview:
      "Provide executive commercial insights, support financial modeling, and analyze cloud and digital advertising revenue streams at Google Dublin.",
    skillsCovered: [
      "Financial Modeling",
      "Commercial FP&A",
      "SQL & BigQuery Analytics",
      "Executive Reporting",
      "Revenue Forecasting",
      "Business Variance Analysis",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 Financial Analyst & Commercial FP&A Intern (Dublin)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin Commercial Finance 2027",
    customResponsibilities: [
      "Develop financial forecast models and evaluate revenue dynamics across EMEA product lines.",
      "Analyze large financial datasets using SQL and internal analytics platforms.",
      "Prepare executive briefing materials and variance commentary for finance directors.",
      "Assess capital allocation, operating expenses, and investment ROI for key initiatives.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Applications are reviewed on a rolling basis via Google Careers EMEA.",
  },

  // 10. Google UI/UX & Digital Product Design Intern
  {
    _id: "google-ux-design-dublin",
    _type: "internship",
    title: "Google — UI/UX & Digital Product Design Intern (Dublin)",
    slug: { _type: "slug", current: "google-ux-design-product-dublin" },
    domain: {
      _id: "internshipDomain-ux",
      _type: "internshipDomain",
      title: "UX",
      slug: { _type: "slug", current: "ux" },
    },
    overview:
      "Design intuitive interfaces, interactive prototypes, and accessible user experiences for Google platforms used by millions across EMEA.",
    skillsCovered: [
      "Figma & Design Systems",
      "User Research & Usability Testing",
      "Interactive Prototyping",
      "Information Architecture",
      "WCAG Accessibility Standards",
    ],
    durationOptions: ["3 months"],
    availableRegions: ["Ireland"],
    applicationStatus: "open",
    batchStartDate: "2027-06-01",
    googleFormLink: buildGoogleApplyHref("Google \u2014 UI/UX & Digital Product Design Intern (Dublin)"),
    customCtaButtonText: "Apply via Google",
    customHeading: "Google Dublin Product Design 2027",
    customResponsibilities: [
      "Create high-fidelity wireframes, interactive prototypes, and user flows in Figma.",
      "Conduct qualitative user interviews and synthesize feedback into design iterations.",
      "Contribute reusable UI components to Google design systems.",
      "Collaborate with product managers and engineers to ensure flawless implementation.",
    ],
    customApplicationInstructions:
      "Official Google Dublin 2027 opportunity. Please include a portfolio link with your application.",
  },

  // ═════════════════════════════════════════════════════════════════
  // BRITICANA CORE MENTOR-LED STARTUP TRACKS
  // ═════════════════════════════════════════════════════════════════
  {
    _id: "showcase-software-development",
    _type: "internship",
    title: "Software Development & Cloud Engineering",
    slug: { _type: "slug", current: "enterprise-cloud-native-net-devops" },
    domain: {
      _id: "internshipDomain-software-development",
      _type: "internshipDomain",
      title: "Software Development",
      slug: { _type: "slug", current: "software-development" },
    },
    overview:
      "Build websites and applications while learning how real software teams work.",
    skillsCovered: ["Programming", "Web development", "APIs & backend", "Git & teamwork"],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-digital-marketing",
    _type: "internship",
    title: "Digital Marketing, Brand Growth & Campaign Analytics",
    slug: { _type: "slug", current: "enterprise-digital-marketing-analytics-optimization" },
    domain: {
      _id: "internshipDomain-marketing",
      _type: "internshipDomain",
      title: "Marketing",
      slug: { _type: "slug", current: "marketing" },
    },
    overview:
      "Plan digital campaigns, grow brand awareness and learn how startups attract and engage customers.",
    skillsCovered: [
      "Campaign strategy",
      "Content marketing",
      "SEO & analytics",
      "Brand growth",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-ui-ux-design",
    _type: "internship",
    title: "UI/UX & Brand Design Studio",
    slug: { _type: "slug", current: "graphic-design-branding-creative-operations" },
    domain: {
      _id: "internshipDomain-ux",
      _type: "internshipDomain",
      title: "UX",
      slug: { _type: "slug", current: "ux" },
    },
    overview:
      "Design intuitive websites, mobile apps and brand visuals through user research and interactive prototypes.",
    skillsCovered: [
      "UI/UX wireframing",
      "Visual branding",
      "Figma prototypes",
      "Design systems",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-finance-accounting",
    _type: "internship",
    title: "Finance, FP&A & Financial Analytics",
    slug: { _type: "slug", current: "financial-analytics-accounting-automation" },
    domain: {
      _id: "internshipDomain-finance",
      _type: "internshipDomain",
      title: "Finance",
      slug: { _type: "slug", current: "finance" },
    },
    overview:
      "Analyse financial performance, build budgets and support smart investment and business decisions.",
    skillsCovered: [
      "Financial modeling",
      "Budgeting & FP&A",
      "Market analysis",
      "Financial reporting",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
  {
    _id: "showcase-human-resources",
    _type: "internship",
    title: "Human Resources (HR) & People Operations",
    slug: { _type: "slug", current: "startup-hr-operations-digital-people" },
    domain: {
      _id: "internshipDomain-hr",
      _type: "internshipDomain",
      title: "HR",
      slug: { _type: "slug", current: "hr" },
    },
    overview:
      "Help companies recruit great talent, onboard new team members and build a strong workplace culture.",
    skillsCovered: [
      "Talent recruitment",
      "People analytics",
      "Onboarding workflows",
      "Team culture",
    ],
    durationOptions: ["3 months", "6 months", "9 months"],
    availableRegions: ["United Kingdom", "Ireland", "Germany"],
    applicationStatus: "open",
    batchStartDate: "2026-10-10",
  },
];

export function getSupplementalTrackBySlug(slug: string): EnrichedInternship | null {
  const normalized = (slug || "").trim().toLowerCase();
  return (
    SUPPLEMENTAL_CORE_TRACKS.find(
      (t) => (t.slug?.current || "").trim().toLowerCase() === normalized,
    ) ?? null
  );
}
