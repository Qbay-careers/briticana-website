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

## Internship (example)

```json
{
  "_type": "internship",
  "title": "Software Development — Spring cohort",
  "slug": { "_type": "slug", "current": "software-development-spring" },
  "domain": "software-development",
  "overview": "Team-based sprint work with mentor reviews and a shipping milestone.",
  "skillsCovered": ["Git", "TypeScript", "REST APIs"],
  "toolsUsed": ["VS Code", "GitHub"],
  "durationOptions": ["3 months", "6 months"],
  "availableRegions": ["Ireland", "United Kingdom", "Germany", "Finland"],
  "certificationDetails": "Briticana experience certificate upon successful completion.",
  "projectStructure": "Kickoff → weekly demos → final submission.",
  "applicationStatus": "open",
  "batchStartDate": "2026-09-01",
  "googleFormLink": "https://docs.google.com/forms/"
}
```

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
