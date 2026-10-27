"""
Idempotent management command to initialize PostgreSQL (`InternshipPageContent`)
with the current published frontend internship page content (/internships overview
page + individual internship program pages from Sanity backup and fallback data).

Uses `get_or_create` by default so administrator edits saved in PostgreSQL are
never overwritten unless `--reset` is explicitly passed.
"""
import json
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction

from apps.api.models import InternshipPageContent


OVERVIEW_INITIAL_CONTENT = {
    "page_key": "internships-overview",
    "page_type": "overview",
    "title": "Internships — Browse Mentor-Led Tracks",
    "heading": "Browse Internships",
    "duration": "3 Months",
    "description": (
        "Compare mentor-led tracks, filter by domain and region, and apply when "
        "your timing aligns with the next batch."
    ),
    "introductory_text": (
        "Select a start date that fits your schedule. New batches begin every Monday "
        "— see completion dates instantly and apply in seconds."
    ),
    "program_details": (
        "We focus on execution-based learning. Every participant joins a structured "
        "project environment where tasks, reviews, collaboration, and deliverables "
        "follow a professional workflow — the way real startups and modern companies operate."
    ),
    "learning_outcomes": [
        "Work on real business challenges",
        "Collaborate with teams",
        "Learn through execution",
        "Build practical skills",
        "Create portfolio-ready projects",
        "Gain confidence through real experience",
    ],
    "responsibilities": [
        "Weekly sprint tasks and team collaboration",
        "Self-learning tasks and industry research",
        "Mentor feedback and performance reviews",
        "Project completion files and final delivery walkthroughs",
    ],
    "skills_and_requirements": [
        "Data Visualization and Storytelling",
        "SQL for Data Querying and Database Management",
        "Financial Modeling, Business Analysis & Operations",
        "Cloud, DevOps, Cybersecurity & Software Engineering",
    ],
    "benefits_and_features": "Mentor-Led Projects | Real-World Experience | Verifiable Certificate",
    "eligibility_information": (
        "Open to students, freshers, and aspiring professionals across Ireland, "
        "United Kingdom, Germany, Finland, and Sweden."
    ),
    "application_instructions": (
        "* Completion dates are approximate and may vary based on program requirements."
    ),
    "cta_button_text": "Apply Now",
    "domain_title": "All Domains",
    "domain_slug": "",
    "application_status": "open",
    "batch_start_date": "",
}


FALLBACK_TRACKS = [
    {
        "page_key": "data-analyst-advanced-analytics-demo",
        "page_type": "track",
        "title": "Data Analyst — Advanced Data Analytics, Business Intelligence & Decision Support Systems",
        "heading": "Data Analyst — Advanced Data Analytics, Business Intelligence & Decision Support Systems",
        "duration": "3 months, 6 months, 9 months",
        "description": (
            "As a Data Analyst Intern, you will work with real-world data to uncover meaningful "
            "insights that help organizations make informed decisions. You will learn to gather, "
            "organize, clean, and analyze data from various sources, turning raw information into "
            "reports and visualizations."
        ),
        "introductory_text": "Mentor-led internship track in Data Analysis",
        "program_details": (
            "Three phases — Foundation (core skills), Advanced Development (techniques and emerging tools), "
            "Professional Integration (projects and industry scenarios). Scope scales with 3, 6, or 9 month tracks."
        ),
        "learning_outcomes": [
            "Data Visualization and Storytelling",
            "Data Collection and Data Management",
            "SQL for Data Querying and Database Management",
            "Microsoft Excel for Data Analysis",
        ],
        "responsibilities": [
            "Gather, organize, clean, and analyze data from multiple sources",
            "Turn raw information into actionable reports and visualizations",
            "Collaborate in weekly mentor review checkpoints",
        ],
        "skills_and_requirements": [
            "Microsoft Excel",
            "Google Sheets",
            "Python",
            "MySQL",
        ],
        "benefits_and_features": (
            "Certificate with participant name, internship title, duration, and domain specialization "
            "upon successful completion within the program duration."
        ),
        "eligibility_information": "Ireland, United Kingdom, Germany, Finland, Sweden",
        "application_instructions": "Applications open — Next batch: Jun 15, 2026",
        "cta_button_text": "Apply now",
        "domain_title": "Data Analysis",
        "domain_slug": "data-analysis",
        "application_status": "open",
        "batch_start_date": "2026-06-15",
    },
    {
        "page_key": "finance-research-advanced-demo",
        "page_type": "track",
        "title": "Finance & Research — Advanced Financial Analysis, Investment Research & Strategic Decision Intelligence",
        "heading": "Finance & Research — Advanced Financial Analysis, Investment Research & Strategic Decision Intelligence",
        "duration": "3 months, 6 months, 9 months",
        "description": (
            "Gain practical exposure to financial analysis, market research, business intelligence, "
            "and strategic decision-making. Learn to analyze financial data, evaluate trends, conduct "
            "company research, and turn complex information into actionable insights."
        ),
        "introductory_text": "Mentor-led internship track in Finance & Research",
        "program_details": (
            "Three phases — Foundation (core finance and research skills), Advanced Development "
            "(valuation, forecasting, frameworks), Professional Integration (case studies and industry "
            "assignments). Scope scales with 3, 6, or 9 month tracks."
        ),
        "learning_outcomes": [
            "Budgeting and Financial Planning",
            "Financial Modeling and Forecasting",
            "Economic and Market Trend Analysis",
            "Financial Statement Analysis",
        ],
        "responsibilities": [
            "Analyze financial data and evaluate market trends",
            "Conduct company and investment research",
            "Deliver structured valuation and forecasting deliverables",
        ],
        "skills_and_requirements": [
            "Google Finance",
            "Microsoft Excel",
            "Financial Research Databases",
        ],
        "benefits_and_features": (
            "Certificate with participant name, internship title, duration, and domain specialization "
            "upon successful completion within the program duration."
        ),
        "eligibility_information": "Ireland, United Kingdom, Germany, Finland, Sweden",
        "application_instructions": "Applications open — Next batch: Jun 22, 2026",
        "cta_button_text": "Apply now",
        "domain_title": "Finance & Research",
        "domain_slug": "finance-research",
        "application_status": "open",
        "batch_start_date": "2026-06-22",
    },
]


class Command(BaseCommand):
    help = "Seed PostgreSQL InternshipPageContent with the current published internship pages and tracks."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Overwrite existing records with initial defaults.",
        )

    def handle(self, *args, **options):
        reset = bool(options.get("reset"))
        sanity_backup_path = (
            Path(settings.BASE_DIR).parent
            / "briticana-full-backup"
            / "sanity"
            / "documents.json"
        )

        records_to_seed = [OVERVIEW_INITIAL_CONTENT, *FALLBACK_TRACKS]

        if sanity_backup_path.exists():
            docs = json.loads(sanity_backup_path.read_text(encoding="utf-8"))
            domains_by_id = {
                d["_id"]: d
                for d in docs
                if isinstance(d, dict) and d.get("_type") == "internshipDomain"
            }
            for doc in docs:
                if not isinstance(doc, dict) or doc.get("_type") != "internship":
                    continue
                slug = (doc.get("slug") or {}).get("current", "").strip()
                if not slug:
                    continue
                domain_ref = (doc.get("domain") or {}).get("_ref", "")
                domain_doc = domains_by_id.get(domain_ref, {})
                domain_title = str(domain_doc.get("title") or "Internship").strip()
                domain_slug = str(
                    (domain_doc.get("slug") or {}).get("current") or ""
                ).strip()

                durations = doc.get("durationOptions") or []
                duration_str = (
                    ", ".join(str(x) for x in durations if x)
                    if durations
                    else "3 Months"
                )
                regions = doc.get("availableRegions") or []
                regions_str = (
                    ", ".join(str(r) for r in regions if r)
                    if regions
                    else "United Kingdom, Ireland, Germany, Finland, Sweden"
                )
                skills = [str(s) for s in (doc.get("skillsCovered") or []) if s]
                tools = [str(t) for t in (doc.get("toolsUsed") or []) if t]
                title = str(doc.get("title") or slug).strip()
                overview = str(doc.get("overview") or "").strip()
                project_structure = str(doc.get("projectStructure") or "").strip()
                cert_details = str(doc.get("certificationDetails") or "").strip()
                app_status = str(doc.get("applicationStatus") or "open").strip()
                batch_date = str(doc.get("batchStartDate") or "").strip()

                records_to_seed.append(
                    {
                        "page_key": slug,
                        "page_type": "track",
                        "title": title,
                        "heading": title,
                        "duration": duration_str,
                        "description": overview,
                        "introductory_text": f"Mentor-led internship track in {domain_title}",
                        "program_details": project_structure,
                        "learning_outcomes": skills,
                        "responsibilities": (
                            [line.strip() for line in project_structure.splitlines() if line.strip()]
                            if project_structure
                            else ["Complete structured project milestones and mentor reviews"]
                        ),
                        "skills_and_requirements": tools,
                        "benefits_and_features": cert_details,
                        "eligibility_information": regions_str,
                        "application_instructions": (
                            f"Application status: {app_status}"
                            + (f" | Next batch: {batch_date}" if batch_date else "")
                        ),
                        "cta_button_text": "Apply now",
                        "domain_title": domain_title,
                        "domain_slug": domain_slug,
                        "application_status": app_status,
                        "batch_start_date": batch_date,
                    }
                )

        created_count = 0
        updated_count = 0

        with transaction.atomic():
            for item in records_to_seed:
                page_key = item["page_key"]
                defaults = {k: v for k, v in item.items() if k != "page_key"}
                if reset:
                    _, created = InternshipPageContent.objects.update_or_create(
                        page_key=page_key,
                        defaults=defaults,
                    )
                    if created:
                        created_count += 1
                    else:
                        updated_count += 1
                else:
                    _, created = InternshipPageContent.objects.get_or_create(
                        page_key=page_key,
                        defaults=defaults,
                    )
                    if created:
                        created_count += 1

        total = InternshipPageContent.objects.count()
        self.stdout.write(
            self.style.SUCCESS(
                f"InternshipPageContent seed complete: created={created_count}, "
                f"updated={updated_count}, total_in_db={total}"
            )
        )
