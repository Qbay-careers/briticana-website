# Sanity seed examples (optional)

Create documents in **Studio** (`/studio`) or use **Vision** / **import** with NDJSON. Replace `YOUR_PROJECT_ID` if using HTTP API directly.

## Singletons (fixed `_id` recommended for desk shortcuts)

**Home page** — `_id`: `homePage`, `_type`: `homePage`

```json
{
  "_id": "homePage",
  "_type": "homePage",
  "heroHeadline": "Build Real Industry Experience Before Your First Job",
  "heroSubheadline": "Join structured startup-style internship programs designed to help students gain practical exposure, teamwork experience, portfolio projects, and industry-ready skills.",
  "heroOverview": "Briticana is an execution-focused experience platform where students collaborate on real-world projects under guided mentorship and structured workflows inspired by modern startups and professional teams.",
  "heroCtaApplyUrl": "https://example.com/apply-form",
  "heroCtaExploreUrl": "/programs"
}
```

**Site settings** — `_id`: `siteSettings`, `_type`: `siteSettings`

```json
{
  "_id": "siteSettings",
  "_type": "siteSettings",
  "email": "hello@briticana.com",
  "contactNumber": "+353 000 0000",
  "whatsappNumber": "+353 000 0000",
  "whatsappUrl": "https://wa.me/353000000000",
  "officeAddress": "Dublin · London · Berlin",
  "googleMapsLink": "https://maps.google.com/",
  "facebook": "https://www.facebook.com/",
  "instagram": "https://www.instagram.com/",
  "linkedin": "https://www.linkedin.com/"
}
```

## Internship domains (create before internships)

Each domain is its own document; internships **reference** it (like a foreign key). Use stable `_id` values so NDJSON imports can wire references reliably.

Example — Data Analysis (`_id`: `internshipDomain-data-analysis`):

```json
{
  "_id": "internshipDomain-data-analysis",
  "_type": "internshipDomain",
  "title": "Data Analysis",
  "slug": { "_type": "slug", "current": "data-analysis" },
  "sortOrder": 1,
  "shortOverview": "Work with real-world data to uncover insights and support decisions."
}
```

Repeat for the other PRD slugs (same `_id` pattern: `internshipDomain-<slug>`):

| `_id` | `slug.current` | Suggested title |
|-------|----------------|-----------------|
| `internshipDomain-human-resources` | `human-resources` | Human Resources (HR) |
| `internshipDomain-software-development` | `software-development` | Software Development |
| `internshipDomain-ui-ux-design` | `ui-ux-design` | UI/UX Design |
| `internshipDomain-digital-marketing` | `digital-marketing` | Digital Marketing |
| `internshipDomain-business-operations` | `business-operations` | Business Operations |
| `internshipDomain-product-management` | `product-management` | Product Management |
| `internshipDomain-cybersecurity` | `cybersecurity` | Cybersecurity |
| `internshipDomain-cloud-devops` | `cloud-devops` | Cloud & DevOps |
| `internshipDomain-ai-automation` | `ai-automation` | AI & Automation |
| `internshipDomain-finance-research` | `finance-research` | Finance & Research |
| `internshipDomain-sales-growth` | `sales-growth` | Sales & Growth |

## Internship (example)

`domain` must be a **reference** to an `internshipDomain` document (not a string).

```json
{
  "_type": "internship",
  "title": "Software Development — Spring cohort",
  "slug": { "_type": "slug", "current": "software-development-spring" },
  "domain": { "_type": "reference", "_ref": "internshipDomain-software-development" },
  "overview": "Team-based sprint work with mentor reviews and a shipping milestone.",
  "skillsCovered": ["Git", "TypeScript", "REST APIs"],
  "toolsUsed": ["VS Code", "GitHub"],
  "durationOptions": ["3 months", "6 months"],
  "availableRegions": ["Ireland", "United Kingdom", "Germany", "Finland", "Sweden"],
  "certificationDetails": "Briticana experience certificate upon successful completion.",
  "projectStructure": "Kickoff → weekly demos → final submission.",
  "applicationStatus": "open",
  "batchStartDate": "2026-09-01",
  "googleFormLink": "https://docs.google.com/forms/"
}
```

### Migrating existing internships

If documents still have `domain` as a **string** (legacy), open each internship in Studio and pick the matching domain from the **Domain** reference field, then publish. Listing/detail GROQ expects a reference.

## Student (verification demo)

```json
{
  "_type": "student",
  "studentName": "Demo Student",
  "internshipId": "BRIT-DEMO-001",
  "domain": "software-development",
  "duration": "6 months",
  "region": "Ireland",
  "completionStatus": "in-progress",
  "certificateIssued": false,
  "mentorEvaluation": "On track; strong collaboration in sprint 2."
}
```

Use **Verification** page with code `BRIT-DEMO-001` after publishing.
