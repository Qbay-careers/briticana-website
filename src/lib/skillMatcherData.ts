/**
 * Briticana Skill Matcher — Complete 39-Domain & Skill Registry
 * Maps skills across all 39 Briticana internship domains for instant, accurate matching.
 */

export type MatchableDomain = {
  slug: string;
  title: string;
  shortDesc: string;
  /** Primary skills that strongly indicate this domain (weight: 3) */
  primarySkills: string[];
  /** Secondary / supporting skills relevant to this domain (weight: 1.5) */
  secondarySkills: string[];
};

export const ALL_39_DOMAINS: MatchableDomain[] = [
  {
    slug: "administration",
    title: "Administration",
    shortDesc: "Manage CRM workflows, compliance documentation, office systems, and executive coordination.",
    primarySkills: ["CRM Management", "Workflow Management", "Communication", "Documentation", "Excel", "SOP"],
    secondarySkills: ["Google Workspace", "Notion", "Trello", "Data Management", "Process Tracking", "Vendor Management"],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    shortDesc: "Design AI workflows, prompt engineering systems, LLM agents, and intelligent automation.",
    primarySkills: ["Prompt Engineering", "AI Workflow Design", "Python", "Machine Learning", "TensorFlow", "Deep Learning"],
    secondarySkills: ["Hugging Face", "Data Annotation", "REST APIs", "Statistics", "Jupyter Notebook", "Git"],
  },
  {
    slug: "asset-management",
    title: "Asset Management",
    shortDesc: "Track institutional portfolios, monitor asset performance, and manage financial risk.",
    primarySkills: ["Portfolio Analysis", "Asset Tracking", "Risk Management", "Financial Reporting", "Excel", "Data Governance"],
    secondarySkills: ["Financial Modeling", "Statistics", "Tableau", "Power BI", "Budgeting", "Accounting"],
  },
  {
    slug: "audit",
    title: "Audit",
    shortDesc: "Conduct internal audit analytics, control testing, compliance reviews, and financial checks.",
    primarySkills: ["Audit Analytics", "Accounting", "Risk Management", "Financial Reporting", "Excel", "Compliance Review"],
    secondarySkills: ["Bookkeeping", "Tally", "Power BI", "Data Validation", "SAP", "SQL"],
  },
  {
    slug: "business-analysis",
    title: "Business Analysis",
    shortDesc: "Translate business needs into clear requirements, process maps, and data-backed insights.",
    primarySkills: ["Business Analysis", "Requirements Analysis", "Process Mapping", "Excel", "SQL", "Agile"],
    secondarySkills: ["Tableau", "Power BI", "Stakeholder Management", "Communication", "Workflow Management", "Scrum"],
  },
  {
    slug: "clinical",
    title: "Clinical",
    shortDesc: "Support clinical trials, clinical documentation, protocol management, and regulatory filings.",
    primarySkills: ["Clinical Research", "Clinical Documentation", "Academic Writing", "Research Methods", "Regulatory Compliance", "SPSS"],
    secondarySkills: ["SOP", "Statistics", "Data Cleaning", "Healthcare Compliance", "CAPA", "Documentation"],
  },
  {
    slug: "compliance",
    title: "Compliance",
    shortDesc: "Oversee regulatory governance, policy reviews, risk monitoring, and audit readiness.",
    primarySkills: ["Regulatory Compliance", "Risk Management", "Compliance Review", "Policy Analysis", "SOP", "ISO 9001"],
    secondarySkills: ["Contract Management", "Audit Analytics", "Documentation", "CAPA", "Data Governance", "Legal Research"],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortDesc: "Defend networks and applications through vulnerability assessment, SIEM, and incident response.",
    primarySkills: ["Cybersecurity", "Incident Response", "SIEM", "Splunk", "Security Monitoring", "Penetration Testing"],
    secondarySkills: ["Network Security", "Linux", "Risk Management", "Python", "Cloud Security", "Vulnerability Assessment"],
  },
  {
    slug: "data-analytics-operations",
    title: "Data Analytics & Data Operations",
    shortDesc: "Clean datasets, build executive dashboards, and deliver actionable business intelligence.",
    primarySkills: ["Data Cleaning", "SQL", "Excel", "Tableau", "Power BI", "Statistics"],
    secondarySkills: ["Python", "Google Analytics", "Data Visualization", "SPSS", "Data Modeling", "Reporting"],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    shortDesc: "Modernize legacy workflows using cloud platforms, automation, and digital strategy.",
    primarySkills: ["Workflow Management", "Digital Strategy", "Process Mapping", "Agile", "Cloud Architecture", "Business Analysis"],
    secondarySkills: ["SAP", "CRM Management", "Data Visualization", "Stakeholder Management", "Change Management", "AI Workflow Design"],
  },
  {
    slug: "engineering",
    title: "Engineering",
    shortDesc: "Apply engineering design, CAD modeling, technical analysis, and process optimization.",
    primarySkills: ["Engineering Design", "AutoCAD", "Technical Drawing", "CAD / SolidWorks", "Project Planning", "Quality Control"],
    secondarySkills: ["ISO 9001", "Root Cause Analysis", "Excel", "Lean Six Sigma", "SOP", "Documentation"],
  },
  {
    slug: "finance",
    title: "Finance",
    shortDesc: "Build financial models, budgets, forecasts, and commercial FP&A performance reports.",
    primarySkills: ["Financial Reporting", "Accounting", "Budgeting", "Bookkeeping", "Tally", "Financial Modeling"],
    secondarySkills: ["Excel", "SAP", "Power BI", "Portfolio Analysis", "Audit Analytics", "Risk Management"],
  },
  {
    slug: "food-quality",
    title: "Food Quality",
    shortDesc: "Ensure food safety standards, HACCP compliance, quality audits, and safety documentation.",
    primarySkills: ["Food Safety", "HACCP", "Quality Control", "ISO 9001", "SOP", "CAPA"],
    secondarySkills: ["Laboratory Testing", "Compliance Review", "Root Cause Analysis", "Documentation", "Excel", "Audit Analytics"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    shortDesc: "Create cohesive visual brand identities, marketing creatives, layouts, and illustrations.",
    primarySkills: ["Brand Design", "Canva", "Illustrator", "Photoshop", "Visual Storytelling", "Figma"],
    secondarySkills: ["Content Marketing", "Social Media Marketing", "UI Design", "Layout Design", "Typography", "Wireframing"],
  },
  {
    slug: "hr",
    title: "HR",
    shortDesc: "Lead talent recruitment, employee relations, HRIS administration, and people analytics.",
    primarySkills: ["Recruitment", "HRIS", "Employee Relations", "Sourcing", "Communication", "Workforce Planning"],
    secondarySkills: ["People Analytics", "Onboarding", "Excel", "Compliance Review", "Workflow Management", "CRM Management"],
  },
  {
    slug: "infrastructure-operations",
    title: "Infrastructure Operations",
    shortDesc: "Operate resilient cloud and server infrastructure, capacity planning, and observability.",
    primarySkills: ["AWS", "GCP", "Linux", "Docker", "Kubernetes", "Cloud Architecture"],
    secondarySkills: ["Grafana & Monitoring", "Incident Response", "DevOps", "Network Security", "CI/CD", "Security Monitoring"],
  },
  {
    slug: "it-operations",
    title: "IT Operations",
    shortDesc: "Manage enterprise IT systems, incident tracking, governance, and service reliability.",
    primarySkills: ["Incident Response", "Linux", "Grafana & Monitoring", "Security Monitoring", "Workflow Management", "Network Security"],
    secondarySkills: ["AWS", "GCP", "SOP", "Documentation", "SQL", "Risk Management"],
  },
  {
    slug: "laboratory-operations",
    title: "Laboratory Operations",
    shortDesc: "Support laboratory documentation, sample tracking, testing protocols, and QA compliance.",
    primarySkills: ["Laboratory Testing", "SOP", "Quality Control", "CAPA", "Research Methods", "Clinical Documentation"],
    secondarySkills: ["GMP", "ISO 9001", "SPSS", "Statistics", "Data Cleaning", "Academic Writing"],
  },
  {
    slug: "legal",
    title: "Legal",
    shortDesc: "Review commercial contracts, perform legal research, and maintain regulatory compliance.",
    primarySkills: ["Contract Management", "Legal Research", "Regulatory Compliance", "Policy Analysis", "Compliance Review", "Academic Writing"],
    secondarySkills: ["Risk Management", "Documentation", "Communication", "Vendor Management", "SOP", "Audit Analytics"],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    shortDesc: "Train predictive models, engineer features, and evaluate machine learning pipelines.",
    primarySkills: ["Machine Learning", "Python", "TensorFlow", "Deep Learning", "Statistics", "Data Cleaning"],
    secondarySkills: ["SQL", "SPSS", "Jupyter Notebook", "Prompt Engineering", "Git", "Data Visualization"],
  },
  {
    slug: "marketing",
    title: "Marketing",
    shortDesc: "Drive brand awareness and growth through SEO, paid ads, content strategy, and analytics.",
    primarySkills: ["Content Marketing", "SEO", "Google Ads", "Google Analytics", "Social Media Marketing", "Copywriting"],
    secondarySkills: ["Canva", "Brand Design", "Communication", "CRM Management", "Excel", "Digital Strategy"],
  },
  {
    slug: "mechanical-quality",
    title: "Mechanical Quality",
    shortDesc: "Conduct mechanical inspections, root cause analysis, ISO 9001 audits, and process checks.",
    primarySkills: ["AutoCAD", "Engineering Design", "Technical Drawing", "ISO 9001", "Quality Control", "Root Cause Analysis"],
    secondarySkills: ["CAD / SolidWorks", "CAPA", "Lean Six Sigma", "SOP", "Statistics", "Excel"],
  },
  {
    slug: "nursing",
    title: "Nursing",
    shortDesc: "Support clinical care documentation, healthcare quality protocols, and patient safety workflows.",
    primarySkills: ["Patient Care", "Clinical Documentation", "Healthcare Compliance", "Clinical Research", "Communication", "SOP"],
    secondarySkills: ["Research Methods", "Academic Writing", "Quality Control", "CAPA", "Documentation", "Statistics"],
  },
  {
    slug: "operations",
    title: "Operations",
    shortDesc: "Streamline cross-functional business operations, vendor workflows, and KPI tracking.",
    primarySkills: ["Workflow Management", "Vendor Management", "Process Mapping", "Excel", "Lean Six Sigma", "SOP"],
    secondarySkills: ["Project Planning", "SAP", "Inventory Management", "Communication", "Budgeting", "Demand Planning"],
  },
  {
    slug: "pharmaceutical-quality",
    title: "Pharmaceutical Quality",
    shortDesc: "Maintain GMP standards, CAPA investigations, batch documentation, and QA audits.",
    primarySkills: ["GMP", "CAPA", "ISO 9001", "SOP", "Quality Control", "Regulatory Compliance"],
    secondarySkills: ["Clinical Documentation", "Laboratory Testing", "Root Cause Analysis", "Audit Analytics", "Compliance Review", "Documentation"],
  },
  {
    slug: "procurement",
    title: "Procurement",
    shortDesc: "Manage strategic sourcing, supplier negotiations, purchase contracts, and cost savings.",
    primarySkills: ["Sourcing", "Vendor Management", "Contract Management", "SAP", "Demand Planning", "Budgeting"],
    secondarySkills: ["Excel", "Supply Chain", "Inventory Management", "Negotiation", "Risk Management", "Accounting"],
  },
  {
    slug: "product-management",
    title: "Product Management",
    shortDesc: "Define product roadmaps, run user research, prioritize sprints, and ship features.",
    primarySkills: ["Product Strategy", "Agile", "Scrum", "User Research", "Wireframing", "Stakeholder Management"],
    secondarySkills: ["Figma", "Business Analysis", "Google Analytics", "SQL", "Communication", "Usability Testing"],
  },
  {
    slug: "project-management",
    title: "Project Management",
    shortDesc: "Coordinate project timelines, agile sprints, budgets, risk registers, and team delivery.",
    primarySkills: ["Project Planning", "Agile", "Scrum", "Risk Management", "Budgeting", "Stakeholder Management"],
    secondarySkills: ["Workflow Management", "Communication", "Excel", "Vendor Management", "Process Mapping", "Documentation"],
  },
  {
    slug: "quality-assurance",
    title: "Quality Assurance",
    shortDesc: "Establish QA standards, compliance audits, CAPA tracking, and continuous improvement.",
    primarySkills: ["Quality Control", "ISO 9001", "CAPA", "SOP", "Root Cause Analysis", "QA Testing"],
    secondarySkills: ["GMP", "Audit Analytics", "Lean Six Sigma", "Compliance Review", "Documentation", "Excel"],
  },
  {
    slug: "quantity-surveying",
    title: "Quantity Surveying",
    shortDesc: "Prepare construction cost estimates, bill of quantities, budgets, and contract valuations.",
    primarySkills: ["Cost Estimation", "Contract Management", "Budgeting", "AutoCAD", "Technical Drawing", "Excel"],
    secondarySkills: ["Procurement", "Vendor Management", "Project Planning", "Financial Reporting", "Risk Management", "Engineering Design"],
  },
  {
    slug: "renewable-energy",
    title: "Renewable Energy",
    shortDesc: "Support clean energy projects, solar/wind system planning, and technical sustainability.",
    primarySkills: ["Solar & Renewable Systems", "ESG & Sustainability", "Engineering Design", "AutoCAD", "Project Planning", "Data Cleaning"],
    secondarySkills: ["Technical Drawing", "Carbon Accounting", "Excel", "Research Methods", "Power BI", "Risk Management"],
  },
  {
    slug: "site-reliability",
    title: "Site Reliability",
    shortDesc: "Ensure high-availability cloud services with observability, automation, and incident response.",
    primarySkills: ["Linux", "Docker", "Kubernetes", "AWS", "GCP", "DevOps"],
    secondarySkills: ["CI/CD", "Grafana & Monitoring", "Incident Response", "Python", "Git", "Cloud Architecture"],
  },
  {
    slug: "smart-manufacturing",
    title: "Smart Manufacturing",
    shortDesc: "Optimize Industry 4.0 production lines with automation, lean metrics, and quality systems.",
    primarySkills: ["PLC / Automation", "Lean Six Sigma", "Engineering Design", "ISO 9001", "Quality Control", "Root Cause Analysis"],
    secondarySkills: ["AutoCAD", "CAD / SolidWorks", "SAP", "Data Visualization", "SOP", "Demand Planning"],
  },
  {
    slug: "software-development",
    title: "Software Development",
    shortDesc: "Build modern full-stack web apps, REST APIs, databases, and scalable cloud backends.",
    primarySkills: ["Python", "React", "JavaScript", "TypeScript", "Django", "REST APIs", "Git", "Node.js", "HTML & CSS"],
    secondarySkills: ["SQL", "Java", "Docker", "AWS", "GCP", "Agile", "CI/CD"],
  },
  {
    slug: "software-testing",
    title: "Software Testing",
    shortDesc: "Design automated test suites, QA test plans, API validations, and bug tracking workflows.",
    primarySkills: ["QA Testing", "Automated Testing", "Selenium", "REST APIs", "Git", "Agile"],
    secondarySkills: ["JavaScript", "Python", "SQL", "CI/CD", "Documentation", "Scrum"],
  },
  {
    slug: "supply-chain",
    title: "Supply Chain",
    shortDesc: "Coordinate end-to-end demand planning, logistics, sourcing, and global supply networks.",
    primarySkills: ["Supply Chain", "Demand Planning", "Logistics", "Inventory Management", "SAP", "Vendor Management"],
    secondarySkills: ["Sourcing", "Excel", "Power BI", "Workflow Management", "Lean Six Sigma", "Budgeting"],
  },
  {
    slug: "sustainability",
    title: "Sustainability",
    shortDesc: "Track ESG metrics, carbon accounting, environmental compliance, and green initiatives.",
    primarySkills: ["ESG & Sustainability", "Carbon Accounting", "Research Methods", "Policy Analysis", "Academic Writing", "Regulatory Compliance"],
    secondarySkills: ["Solar & Renewable Systems", "Data Visualization", "Excel", "Reporting", "Stakeholder Management", "ISO 9001"],
  },
  {
    slug: "ux",
    title: "UX",
    shortDesc: "Research user journeys, build wireframes and Figma prototypes, and run usability tests.",
    primarySkills: ["Figma", "Wireframing", "User Research", "Usability Testing", "UI Design", "Brand Design"],
    secondarySkills: ["Canva", "Illustrator", "Product Strategy", "Communication", "HTML & CSS", "Agile"],
  },
  {
    slug: "warehouse-operations",
    title: "Warehouse Operations",
    shortDesc: "Manage warehouse inventory accuracy, dispatch logistics, SOP compliance, and fulfillment.",
    primarySkills: ["Inventory Management", "Logistics", "Demand Planning", "SAP", "SOP", "Workflow Management"],
    secondarySkills: ["Supply Chain", "Excel", "Quality Control", "Vendor Management", "Lean Six Sigma", "Safety Compliance"],
  },
];

/**
 * Deduplicated, alphabetically sorted master list of all selectable skills across all 39 domains.
 * Includes every skill shown in the design reference + all Briticana domain skills.
 */
export const ALL_MATCHER_SKILLS: string[] = Array.from(
  new Set([
    // Reference mockup skills (guaranteed present)
    "Academic Writing",
    "Accounting",
    "Agile",
    "AutoCAD",
    "Bookkeeping",
    "Brand Design",
    "Budgeting",
    "CAPA",
    "Canva",
    "Clinical Documentation",
    "Clinical Research",
    "Communication",
    "Content Marketing",
    "Contract Management",
    "Data Cleaning",
    "Demand Planning",
    "Django",
    "Employee Relations",
    "Engineering Design",
    "Excel",
    "Figma",
    "Financial Reporting",
    "GCP",
    "Git",
    "Google Ads",
    "Google Analytics",
    "HRIS",
    "ISO 9001",
    "Illustrator",
    "Incident Response",
    "REST APIs",
    "React",
    "Recruitment",
    "Research Methods",
    "Risk Management",
    "SAP",
    "SEO",
    "SIEM",
    "SOP",
    "SPSS",
    "SQL",
    "Scrum",
    "Security Monitoring",
    "Social Media Marketing",
    "Sourcing",
    "Splunk",
    "Statistics",
    "Tableau",
    "Tally",
    "Technical Drawing",
    "TensorFlow",
    "Usability Testing",
    "User Research",
    "Vendor Management",
    "Wireframing",
    "Workflow Management",
    // All primary & secondary skills across all 39 domains
    ...ALL_39_DOMAINS.flatMap((d) => [...d.primarySkills, ...d.secondarySkills]),
  ]),
).sort((a, b) => a.localeCompare(b));

export type DomainMatchResult = {
  domain: MatchableDomain;
  score: number;
  matchPercent: number;
  matchedSkills: string[];
};

/**
 * Matches user-selected skills against all 39 Briticana internship domains and returns top ranked domains.
 */
export function matchDomainsBySkills(selectedSkills: string[]): DomainMatchResult[] {
  const normalizedSelected = selectedSkills
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (normalizedSelected.length === 0) return [];

  const results: DomainMatchResult[] = [];

  for (const domain of ALL_39_DOMAINS) {
    let score = 0;
    const matched: string[] = [];

    for (const userSkillRaw of selectedSkills) {
      const userSkill = userSkillRaw.trim().toLowerCase();
      if (!userSkill) continue;

      const isPrimary = domain.primarySkills.some(
        (ps) =>
          ps.toLowerCase() === userSkill ||
          ps.toLowerCase().includes(userSkill) ||
          userSkill.includes(ps.toLowerCase()),
      );

      if (isPrimary) {
        score += 3;
        matched.push(userSkillRaw);
        continue;
      }

      const isSecondary = domain.secondarySkills.some(
        (ss) =>
          ss.toLowerCase() === userSkill ||
          ss.toLowerCase().includes(userSkill) ||
          userSkill.includes(ss.toLowerCase()),
      );

      if (isSecondary) {
        score += 1.5;
        matched.push(userSkillRaw);
        continue;
      }

      // Keyword match against domain title or shortDesc for custom typed skills
      if (
        domain.title.toLowerCase().includes(userSkill) ||
        domain.shortDesc.toLowerCase().includes(userSkill)
      ) {
        score += 1;
        matched.push(userSkillRaw);
      }
    }

    if (score > 0) {
      results.push({
        domain,
        score,
        matchPercent: 0,
        matchedSkills: Array.from(new Set(matched)),
      });
    }
  }

  // Fallback if custom skills didn't directly hit keywords
  if (results.length === 0) {
    const fallbackDomains = [
      ALL_39_DOMAINS.find((d) => d.slug === "business-analysis")!,
      ALL_39_DOMAINS.find((d) => d.slug === "software-development")!,
      ALL_39_DOMAINS.find((d) => d.slug === "project-management")!,
    ];
    return fallbackDomains.map((domain, idx) => ({
      domain,
      score: 3 - idx,
      matchPercent: 84 - idx * 6,
      matchedSkills: selectedSkills.slice(0, 3),
    }));
  }

  results.sort((a, b) => b.score - a.score || b.matchedSkills.length - a.matchedSkills.length);

  const topScore = results[0].score;
  return results.slice(0, 4).map((item, idx) => {
    const ratio = item.score / Math.max(topScore, 1);
    const rawPercent = Math.round(72 + ratio * 25 - idx * 2);
    const matchPercent = Math.max(68, Math.min(98, rawPercent));
    return {
      ...item,
      matchPercent,
    };
  });
}
