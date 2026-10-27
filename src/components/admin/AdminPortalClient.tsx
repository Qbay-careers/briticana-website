"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getBackendApiBaseUrl,
  type InternshipPageContentDTO,
} from "@/lib/internships/internshipContentApi";

interface AdminUser {
  username: string;
  isStaff: boolean;
}

interface VerificationRecordItem {
  id: number;
  code: string;
  student_name: string;
  domain: string;
  duration: string;
  region: string;
  status: string;
  certificate_issued: boolean;
  mentor_evaluation: string;
  issued_date?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface VerificationFormState {
  id: number | null;
  code: string;
  student_name: string;
  domain: string;
  duration: string;
  region: string;
  status: string;
  certificate_issued: boolean;
  mentor_evaluation: string;
}

interface InternshipEditorFormState {
  page_key: string;
  page_type: "overview" | "track";
  title: string;
  heading: string;
  duration: string;
  description: string;
  introductory_text: string;
  program_details: string;
  learning_outcomes_text: string;
  responsibilities_text: string;
  skills_and_requirements_text: string;
  benefits_and_features: string;
  eligibility_information: string;
  application_instructions: string;
  cta_button_text: string;
}

const EMPTY_VERIFICATION_FORM: VerificationFormState = {
  id: null,
  code: "",
  student_name: "",
  domain: "",
  duration: "3 Months",
  region: "United Kingdom",
  status: "Completed",
  certificate_issued: true,
  mentor_evaluation: "Excellent",
};

const ADMIN_TOKEN_STORAGE_KEY = "briticana_admin_session_token";

function dtoToEditorForm(dto: InternshipPageContentDTO): InternshipEditorFormState {
  return {
    page_key: dto.page_key,
    page_type: dto.page_type,
    title: dto.title ?? "",
    heading: dto.heading ?? "",
    duration: dto.duration ?? "3 Months",
    description: dto.description ?? "",
    introductory_text: dto.introductory_text ?? "",
    program_details: dto.program_details ?? "",
    learning_outcomes_text: (dto.learning_outcomes ?? []).join("\n"),
    responsibilities_text: (dto.responsibilities ?? []).join("\n"),
    skills_and_requirements_text: (dto.skills_and_requirements ?? []).join("\n"),
    benefits_and_features: dto.benefits_and_features ?? "",
    eligibility_information: dto.eligibility_information ?? "",
    application_instructions: dto.application_instructions ?? "",
    cta_button_text: dto.cta_button_text ?? "Apply Now",
  };
}

export default function AdminPortalClient() {
  const apiBase = useMemo(() => getBackendApiBaseUrl(), []);

  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Dashboard navigation state
  const [activeSection, setActiveSection] = useState<"verification" | "internship-content">(
    "verification",
  );

  // Verification Management state
  const [verifications, setVerifications] = useState<VerificationRecordItem[]>([]);
  const [verificationSearch, setVerificationSearch] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationForm, setVerificationForm] =
    useState<VerificationFormState>(EMPTY_VERIFICATION_FORM);
  const [verificationSaving, setVerificationSaving] = useState(false);
  const [verificationDeletingId, setVerificationDeletingId] = useState<number | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Internship Page Content Editor state
  const [internshipPages, setInternshipPages] = useState<InternshipPageContentDTO[]>([]);
  const [selectedPageKey, setSelectedPageKey] = useState<string>("internships-overview");
  const [pageFilterQuery, setPageFilterQuery] = useState("");
  const [savedPageSnapshot, setSavedPageSnapshot] = useState<InternshipPageContentDTO | null>(null);
  const [editorForm, setEditorForm] = useState<InternshipEditorFormState | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const [contentSuccess, setContentSuccess] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  const buildAuthHeaders = useCallback(
    (activeToken?: string | null): HeadersInit => {
      const t = activeToken ?? token;
      const headers: Record<string, string> = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (t) {
        headers.Authorization = `Bearer ${t}`;
      }
      return headers;
    },
    [token],
  );

  const handleUnauthorized = useCallback(() => {
    setToken(null);
    setAdminUser(null);
    try {
      window.sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  }, []);

  const fetchVerifications = useCallback(
    async (searchQuery = "", activeToken?: string | null) => {
      setVerificationLoading(true);
      try {
        const qs = searchQuery.trim()
          ? `?search=${encodeURIComponent(searchQuery.trim())}`
          : "";
        const res = await fetch(`${apiBase}/api/v1/admin/verifications/${qs}`, {
          method: "GET",
          headers: buildAuthHeaders(activeToken),
          credentials: "include",
          cache: "no-store",
        });
        if (res.status === 401 || res.status === 403) {
          handleUnauthorized();
          return;
        }
        const data = (await res.json()) as { results?: VerificationRecordItem[] };
        if (res.ok && Array.isArray(data.results)) {
          setVerifications(data.results);
        }
      } catch {
        setVerificationError("Unable to load verification records from backend.");
      } finally {
        setVerificationLoading(false);
      }
    },
    [apiBase, buildAuthHeaders, handleUnauthorized],
  );

  const fetchInternshipPagesList = useCallback(
    async (activeToken?: string | null) => {
      setContentLoading(true);
      try {
        const res = await fetch(`${apiBase}/api/v1/internships/content/`, {
          method: "GET",
          headers: buildAuthHeaders(activeToken),
          credentials: "include",
          cache: "no-store",
        });
        const data = (await res.json()) as { results?: InternshipPageContentDTO[] };
        if (res.ok && Array.isArray(data.results)) {
          setInternshipPages(data.results);
          const initial =
            data.results.find((p) => p.page_key === "internships-overview") ??
            data.results[0] ??
            null;
          if (initial) {
            setSelectedPageKey(initial.page_key);
            setSavedPageSnapshot(initial);
            setEditorForm(dtoToEditorForm(initial));
          }
        }
      } catch {
        setContentError("Unable to load internship page content list from backend.");
      } finally {
        setContentLoading(false);
      }
    },
    [apiBase, buildAuthHeaders],
  );

  const loadSingleInternshipPage = useCallback(
    async (pageKey: string, activeToken?: string | null, showReloadBanner = false) => {
      setContentLoading(true);
      setContentError(null);
      if (!showReloadBanner) {
        setContentSuccess(null);
      }
      try {
        const res = await fetch(
          `${apiBase}/api/v1/internships/content/${encodeURIComponent(pageKey)}/`,
          {
            method: "GET",
            headers: buildAuthHeaders(activeToken),
            credentials: "include",
            cache: "no-store",
          },
        );
        const data = (await res.json()) as {
          content?: InternshipPageContentDTO;
          error?: { message?: string };
        };
        if (res.ok && data.content) {
          setSavedPageSnapshot(data.content);
          setEditorForm(dtoToEditorForm(data.content));
          setInternshipPages((prev) =>
            prev.map((item) => (item.page_key === data.content!.page_key ? data.content! : item)),
          );
          if (showReloadBanner) {
            setContentSuccess("Loaded currently saved content from PostgreSQL.");
          }
        } else {
          setContentError(data.error?.message || "Failed to load selected internship page content.");
        }
      } catch {
        setContentError("Network error while loading internship page content.");
      } finally {
        setContentLoading(false);
      }
    },
    [apiBase, buildAuthHeaders],
  );

  // Restore existing session on mount
  useEffect(() => {
    let mounted = true;
    async function checkSession() {
      let storedToken: string | null = null;
      try {
        storedToken = window.sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
      } catch {
        storedToken = null;
      }

      if (!storedToken) {
        return;
      }

      try {
        const res = await fetch(`${apiBase}/api/v1/admin/auth/session/`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          cache: "no-store",
        });
        if (!mounted) return;
        if (res.ok) {
          const data = (await res.json()) as {
            authenticated?: boolean;
            user?: AdminUser;
          };
          if (data.authenticated && data.user) {
            setToken(storedToken);
            setAdminUser(data.user);
            void fetchVerifications("", storedToken);
            void fetchInternshipPagesList(storedToken);
          } else {
            handleUnauthorized();
          }
        } else {
          handleUnauthorized();
        }
      } catch {
        handleUnauthorized();
      }
    }
    void checkSession();
    return () => {
      mounted = false;
    };
  }, [apiBase, fetchInternshipPagesList, fetchVerifications, handleUnauthorized]);

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError(null);
    setLoginSubmitting(true);

    try {
      const res = await fetch(`${apiBase}/api/v1/admin/auth/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput,
        }),
      });
      const data = (await res.json()) as {
        authenticated?: boolean;
        token?: string;
        user?: AdminUser;
        error?: { message?: string };
      };

      if (!res.ok || !data.authenticated || !data.token || !data.user) {
        setLoginError(
          data.error?.message || "Invalid administrator username or password.",
        );
        return;
      }

      try {
        window.sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.token);
      } catch {
        // ignore storage errors
      }
      setToken(data.token);
      setAdminUser(data.user);
      setPasswordInput("");
      await Promise.all([
        fetchVerifications("", data.token),
        fetchInternshipPagesList(data.token),
      ]);
    } catch {
      setLoginError("Unable to connect to authentication service. Please try again.");
    } finally {
      setLoginSubmitting(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${apiBase}/api/v1/admin/auth/logout/`, {
        method: "POST",
        headers: buildAuthHeaders(),
        credentials: "include",
      });
    } catch {
      // proceed with client cleanup even if network call fails
    }
    handleUnauthorized();
    setVerificationSuccess(null);
    setVerificationError(null);
    setContentSuccess(null);
    setContentError(null);
  }

  async function handleVerificationSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setVerificationError(null);
    setVerificationSuccess(null);
    setVerificationSaving(true);

    const isEditing = verificationForm.id !== null;
    const url = isEditing
      ? `${apiBase}/api/v1/admin/verifications/${verificationForm.id}/`
      : `${apiBase}/api/v1/admin/verifications/`;
    const method = isEditing ? "PUT" : "POST";

    const payload = {
      code: verificationForm.code.trim().toUpperCase(),
      student_name: verificationForm.student_name.trim(),
      domain: verificationForm.domain.trim(),
      duration: verificationForm.duration.trim(),
      region: verificationForm.region.trim(),
      status: verificationForm.status.trim(),
      certificate_issued: verificationForm.certificate_issued,
      mentor_evaluation: verificationForm.mentor_evaluation.trim() || "Excellent",
    };

    try {
      const res = await fetch(url, {
        method,
        headers: buildAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = (await res.json()) as {
        message?: string;
        record?: VerificationRecordItem;
        error?: { message?: string };
      };

      if (!res.ok) {
        setVerificationError(
          data.error?.message || "Failed to save verification record.",
        );
        return;
      }

      setVerificationSuccess(
        data.message ||
          (isEditing
            ? "Verification record updated in PostgreSQL."
            : "New verification record saved to PostgreSQL."),
      );
      if (!isEditing) {
        setVerificationForm(EMPTY_VERIFICATION_FORM);
      } else if (data.record) {
        setVerificationForm({
          id: data.record.id,
          code: data.record.code,
          student_name: data.record.student_name,
          domain: data.record.domain,
          duration: data.record.duration,
          region: data.record.region,
          status: data.record.status,
          certificate_issued: data.record.certificate_issued,
          mentor_evaluation: data.record.mentor_evaluation,
        });
      }
      await fetchVerifications(verificationSearch);
    } catch {
      setVerificationError("Network error while saving verification record.");
    } finally {
      setVerificationSaving(false);
    }
  }

  function startEditVerification(item: VerificationRecordItem) {
    setVerificationError(null);
    setVerificationSuccess(null);
    setVerificationForm({
      id: item.id,
      code: item.code,
      student_name: item.student_name,
      domain: item.domain,
      duration: item.duration,
      region: item.region,
      status: item.status,
      certificate_issued: item.certificate_issued,
      mentor_evaluation: item.mentor_evaluation,
    });
  }

  function resetVerificationForm() {
    setVerificationError(null);
    setVerificationSuccess(null);
    setVerificationForm(EMPTY_VERIFICATION_FORM);
  }

  async function handleDeleteVerification(item: {
    id: number;
    code: string;
    student_name: string;
  }) {
    const confirmed = window.confirm(
      `Are you sure you want to delete verification record "${item.code}" (${item.student_name}) from PostgreSQL?`,
    );
    if (!confirmed) {
      return;
    }

    setVerificationError(null);
    setVerificationSuccess(null);
    setVerificationDeletingId(item.id);

    try {
      const res = await fetch(`${apiBase}/api/v1/admin/verifications/${item.id}/`, {
        method: "DELETE",
        headers: buildAuthHeaders(),
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = (await res.json()) as {
        deleted?: boolean;
        message?: string;
        error?: { message?: string };
      };

      if (!res.ok) {
        setVerificationError(
          data.error?.message || "Failed to delete verification record.",
        );
        return;
      }

      setVerificationSuccess(
        data.message || `Verification record ${item.code} deleted from PostgreSQL.`,
      );
      if (verificationForm.id === item.id) {
        setVerificationForm(EMPTY_VERIFICATION_FORM);
      }
      await fetchVerifications(verificationSearch);
    } catch {
      setVerificationError("Network error while deleting verification record.");
    } finally {
      setVerificationDeletingId(null);
    }
  }

  async function handleInternshipContentSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editorForm) return;
    setContentError(null);
    setContentSuccess(null);
    setContentSaving(true);

    const payload = {
      title: editorForm.title.trim(),
      heading: editorForm.heading.trim(),
      duration: editorForm.duration.trim(),
      description: editorForm.description,
      introductory_text: editorForm.introductory_text,
      program_details: editorForm.program_details,
      learning_outcomes: editorForm.learning_outcomes_text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      responsibilities: editorForm.responsibilities_text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      skills_and_requirements: editorForm.skills_and_requirements_text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      benefits_and_features: editorForm.benefits_and_features,
      eligibility_information: editorForm.eligibility_information,
      application_instructions: editorForm.application_instructions,
      cta_button_text: editorForm.cta_button_text.trim() || "Apply Now",
    };

    try {
      const res = await fetch(
        `${apiBase}/api/v1/internships/content/${encodeURIComponent(editorForm.page_key)}/`,
        {
          method: "PUT",
          headers: buildAuthHeaders(),
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = (await res.json()) as {
        message?: string;
        content?: InternshipPageContentDTO;
        error?: { message?: string };
      };

      if (!res.ok || !data.content) {
        setContentError(
          data.error?.message || "Failed to save internship page content.",
        );
        return;
      }

      setSavedPageSnapshot(data.content);
      setEditorForm(dtoToEditorForm(data.content));
      setInternshipPages((prev) =>
        prev.map((item) =>
          item.page_key === data.content!.page_key ? data.content! : item,
        ),
      );
      setContentSuccess(
        data.message || "Internship page content saved to PostgreSQL.",
      );
    } catch {
      setContentError("Network error while saving internship page content.");
    } finally {
      setContentSaving(false);
    }
  }

  function handleCancelUnsavedContentChanges() {
    setContentError(null);
    if (savedPageSnapshot) {
      setEditorForm(dtoToEditorForm(savedPageSnapshot));
      setContentSuccess("Unsaved changes discarded. Restored last saved PostgreSQL state.");
    }
  }

  const filteredInternshipPages = useMemo(() => {
    const q = pageFilterQuery.trim().toLowerCase();
    if (!q) return internshipPages;
    return internshipPages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.page_key.toLowerCase().includes(q) ||
        p.domain_title.toLowerCase().includes(q),
    );
  }, [internshipPages, pageFilterQuery]);

  // ==========================================================================
  // UNAUTHENTICATED VIEW: CUSTOM ADMIN LOGIN PAGE
  // ==========================================================================
  if (!adminUser || !token) {
    return (
      <div className="briti-admin-shell" data-testid="admin-portal-shell">
        <header className="briti-admin-topbar">
          <div className="briti-admin-topbar-inner">
            <div className="briti-admin-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/edumove/images/logo/logo.webp?v=3"
                alt="Briticana"
                className="briti-admin-logo"
              />
              <span className="briti-admin-brand-divider" aria-hidden="true" />
              <div className="briti-admin-brand-meta">
                <span className="briti-admin-brand-title">Briticana Administration</span>
                <span className="briti-admin-brand-subtitle">Internal Operations Portal</span>
              </div>
            </div>

            <div className="briti-admin-status-pill">
              <span className="briti-admin-status-dot" aria-hidden="true" />
              <span>Restricted Admin Access</span>
            </div>
          </div>
        </header>

        <main className="briti-admin-login-main">
          <div className="briti-admin-container">
            <div className="row align-items-center justify-content-between g-5">
              <div className="col-lg-6">
                <div className="briti-admin-eyebrow">
                  <i className="ri-shield-keyhole-line" aria-hidden="true" />
                  <span>Briticana Internal System</span>
                </div>

                <h1 className="briti-admin-portal-title">Administrator Portal</h1>

                <p className="briti-admin-portal-lead">
                  Sign in with your authorized Briticana administrator account to manage
                  certificate verification records and public internship page content.
                </p>

                <div className="briti-admin-feature-list">
                  <div className="briti-admin-feature-item">
                    <div className="briti-admin-feature-icon">
                      <i className="ri-shield-check-line" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="briti-admin-feature-title">
                        Certificate Verification Management
                      </div>
                      <p className="briti-admin-feature-desc">
                        Add, search, update, and remove student verification records stored in
                        PostgreSQL.
                      </p>
                    </div>
                  </div>

                  <div className="briti-admin-feature-item">
                    <div className="briti-admin-feature-icon">
                      <i className="ri-file-edit-line" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="briti-admin-feature-title">
                        Internship Page Content Editor
                      </div>
                      <p className="briti-admin-feature-desc">
                        Edit headings, program durations, learning outcomes, and call-to-action
                        labels across internship tracks.
                      </p>
                    </div>
                  </div>

                  <div className="briti-admin-feature-item">
                    <div className="briti-admin-feature-icon">
                      <i className="ri-database-2-line" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="briti-admin-feature-title">
                        Direct PostgreSQL Persistence
                      </div>
                      <p className="briti-admin-feature-desc">
                        Authenticated session-backed administration with immediate live updates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-8 mx-auto mx-lg-0">
                <div className="briti-admin-login-card" data-testid="admin-login-card">
                  <div className="mb-4">
                    <div className="briti-admin-login-icon-wrap">
                      <i className="ri-lock-2-line" aria-hidden="true" />
                    </div>
                    <h2 className="h4 fw-bold mb-1">Admin Login</h2>
                    <p className="text-secondary small mb-0">
                      Enter your administrator credentials to continue
                    </p>
                  </div>

                  <form onSubmit={(e) => void handleLoginSubmit(e)} noValidate>
                    {loginError ? (
                      <div
                        className="alert alert-danger py-2 small mb-3"
                        role="alert"
                        data-testid="admin-login-error"
                      >
                        {loginError}
                      </div>
                    ) : null}

                    <div className="mb-3">
                      <label htmlFor="admin-login-username" className="form-label">
                        Username
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="ri-user-settings-line" aria-hidden="true" />
                        </span>
                        <input
                          id="admin-login-username"
                          name="username"
                          type="text"
                          className="form-control"
                          placeholder="Enter admin username"
                          value={usernameInput}
                          onChange={(e) => setUsernameInput(e.target.value)}
                          required
                          autoComplete="username"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="admin-login-password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="ri-lock-password-line" aria-hidden="true" />
                        </span>
                        <input
                          id="admin-login-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="••••••••"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          required
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          aria-pressed={showPassword}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="briti-admin-btn-primary w-100"
                      disabled={loginSubmitting}
                      data-testid="admin-login-submit"
                    >
                      <i className="ri-login-circle-line" aria-hidden="true" />
                      <span>
                        {loginSubmitting ? "Signing in…" : "Sign in to Admin Dashboard"}
                      </span>
                    </button>
                  </form>

                  <div className="mt-4 pt-3 border-top d-flex align-items-center justify-content-center gap-2 text-secondary small">
                    <i className="ri-Draft-line ri-shield-user-line" aria-hidden="true" />
                    <span>Protected by Django session authentication</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================================================
  // AUTHENTICATED VIEW: CUSTOM ADMIN DASHBOARD
  // ==========================================================================
  const publicPreviewHref =
    selectedPageKey === "internships-overview"
      ? "/internships"
      : `/internships/${selectedPageKey}`;

  return (
    <div className="briti-admin-shell" data-testid="admin-dashboard-shell">
      <header className="briti-admin-topbar">
        <div className="briti-admin-topbar-inner">
          <div className="briti-admin-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edumove/images/logo/logo.webp?v=3"
              alt="Briticana"
              className="briti-admin-logo"
            />
            <span className="briti-admin-brand-divider" aria-hidden="true" />
            <div className="briti-admin-brand-meta">
              <span className="briti-admin-brand-title">Briticana Admin</span>
              <span className="briti-admin-brand-subtitle">Internal Management Console</span>
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            <div className="briti-admin-status-pill d-none d-sm-inline-flex">
              <span className="briti-admin-status-dot" aria-hidden="true" />
              <span>PostgreSQL Connected</span>
            </div>

            <div className="briti-admin-status-pill">
              <i className="ri-shield-user-line text-primary" aria-hidden="true" />
              <span>{adminUser.username}</span>
            </div>

            <button
              type="button"
              className="briti-admin-btn-logout"
              onClick={() => void handleLogout()}
              data-testid="admin-logout-btn"
            >
              <i className="ri-logout-box-r-line" aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="briti-admin-dashboard-main">
        <div className="briti-admin-container">
          {/* Dashboard Header Summary */}
          <div className="briti-admin-page-header">
            <div>
              <h1 className="briti-admin-dashboard-title">Briticana Admin Dashboard</h1>
              <p className="briti-admin-dashboard-subtitle">
                Signed in as <strong>{adminUser.username}</strong> — Manage certificate
                verification records and internship program content in PostgreSQL.
              </p>
            </div>

            <div className="briti-admin-kpi-row">
              <div className="briti-admin-kpi-chip">
                <i className="ri-verified-badge-line" aria-hidden="true" />
                <div>
                  <span className="briti-admin-kpi-label">Verification Records</span>
                  <span className="briti-admin-kpi-value">{verifications.length}</span>
                </div>
              </div>

              <div className="briti-admin-kpi-chip">
                <i className="ri-pages-line" aria-hidden="true" />
                <div>
                  <span className="briti-admin-kpi-label">Internship Pages</span>
                  <span className="briti-admin-kpi-value">{internshipPages.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div
            className="briti-admin-tabs"
            role="tablist"
            aria-label="Admin Dashboard Sections"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === "verification"}
              className={`briti-admin-tab-btn ${
                activeSection === "verification" ? "is-active" : ""
              }`}
              onClick={() => setActiveSection("verification")}
              data-testid="tab-verification-management"
            >
              <i className="ri-shield-check-line" aria-hidden="true" />
              <span>Verification Management</span>
              <span className="briti-admin-tab-badge">{verifications.length}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeSection === "internship-content"}
              className={`briti-admin-tab-btn ${
                activeSection === "internship-content" ? "is-active" : ""
              }`}
              onClick={() => setActiveSection("internship-content")}
              data-testid="tab-internship-content"
            >
              <i className="ri-file-edit-line" aria-hidden="true" />
              <span>Internship Page Content</span>
              <span className="briti-admin-tab-badge">{internshipPages.length}</span>
            </button>
          </div>

          {/* ================================================================
              SECTION 1: VERIFICATION MANAGEMENT
             ================================================================ */}
          {activeSection === "verification" ? (
            <div className="row g-4" data-testid="section-verification-management">
              {/* Left Column: Add / Edit Verification Form */}
              <div className="col-xl-4 col-lg-5">
                <div className="briti-admin-card h-100">
                  <div className="briti-admin-card-header">
                    <div>
                      <h2 className="briti-admin-card-title">
                        {verificationForm.id !== null
                          ? `Edit Verification Record #${verificationForm.id}`
                          : "Add New Verification Record"}
                      </h2>
                      <p className="briti-admin-card-subtitle">
                        {verificationForm.id !== null
                          ? "Modify fields below and save changes to PostgreSQL"
                          : "Create a new student certificate verification entry"}
                      </p>
                    </div>
                    {verificationForm.id !== null ? (
                      <button
                        type="button"
                        className="briti-admin-btn-secondary"
                        onClick={resetVerificationForm}
                      >
                        + New Record
                      </button>
                    ) : null}
                  </div>

                  {verificationSuccess ? (
                    <div
                      className="alert alert-success py-2 small mb-3"
                      role="status"
                      data-testid="verification-save-success"
                    >
                      {verificationSuccess}
                    </div>
                  ) : null}

                  {verificationError ? (
                    <div
                      className="alert alert-danger py-2 small mb-3"
                      role="alert"
                      data-testid="verification-save-error"
                    >
                      {verificationError}
                    </div>
                  ) : null}

                  <form onSubmit={(e) => void handleVerificationSave(e)}>
                    {verificationForm.id !== null ? (
                      <div className="mb-3">
                        <label htmlFor="vf-id" className="form-label">
                          Verification ID
                        </label>
                        <input
                          id="vf-id"
                          type="text"
                          className="form-control bg-light"
                          value={String(verificationForm.id)}
                          readOnly
                        />
                      </div>
                    ) : null}

                    <div className="mb-3">
                      <label htmlFor="vf-code" className="form-label">
                        Verification Code *
                      </label>
                      <input
                        id="vf-code"
                        type="text"
                        className="form-control"
                        placeholder="e.g. GTR94TY17 or BRT-2026-884"
                        value={verificationForm.code}
                        onChange={(e) =>
                          setVerificationForm((prev) => ({ ...prev, code: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="vf-student-name" className="form-label">
                        Student Name *
                      </label>
                      <input
                        id="vf-student-name"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Abhinand K"
                        value={verificationForm.student_name}
                        onChange={(e) =>
                          setVerificationForm((prev) => ({
                            ...prev,
                            student_name: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="vf-domain" className="form-label">
                        Domain / Course *
                      </label>
                      <input
                        id="vf-domain"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Web Development"
                        value={verificationForm.domain}
                        onChange={(e) =>
                          setVerificationForm((prev) => ({ ...prev, domain: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label htmlFor="vf-duration" className="form-label">
                          Duration *
                        </label>
                        <input
                          id="vf-duration"
                          type="text"
                          className="form-control"
                          placeholder="e.g. 3 Months"
                          value={verificationForm.duration}
                          onChange={(e) =>
                            setVerificationForm((prev) => ({
                              ...prev,
                              duration: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="vf-region" className="form-label">
                          Region / Country *
                        </label>
                        <input
                          id="vf-region"
                          type="text"
                          className="form-control"
                          placeholder="e.g. United Kingdom"
                          value={verificationForm.region}
                          onChange={(e) =>
                            setVerificationForm((prev) => ({ ...prev, region: e.target.value }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label htmlFor="vf-status" className="form-label">
                          Status *
                        </label>
                        <input
                          id="vf-status"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Completed"
                          value={verificationForm.status}
                          onChange={(e) =>
                            setVerificationForm((prev) => ({ ...prev, status: e.target.value }))
                          }
                          required
                        />
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="vf-evaluation" className="form-label">
                          Mentor Evaluation
                        </label>
                        <input
                          id="vf-evaluation"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Excellent"
                          value={verificationForm.mentor_evaluation}
                          onChange={(e) =>
                            setVerificationForm((prev) => ({
                              ...prev,
                              mentor_evaluation: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="form-check mb-4">
                      <input
                        id="vf-cert-issued"
                        type="checkbox"
                        className="form-check-input"
                        checked={verificationForm.certificate_issued}
                        onChange={(e) =>
                          setVerificationForm((prev) => ({
                            ...prev,
                            certificate_issued: e.target.checked,
                          }))
                        }
                      />
                      <label htmlFor="vf-cert-issued" className="form-check-label fw-semibold small">
                        Certificate Issued
                      </label>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                      <button
                        type="submit"
                        className="briti-admin-btn-primary"
                        disabled={
                          verificationSaving ||
                          (verificationForm.id !== null &&
                            verificationDeletingId === verificationForm.id)
                        }
                        data-testid="verification-save-btn"
                      >
                        {verificationSaving
                          ? "Saving…"
                          : verificationForm.id !== null
                            ? "Update Record in PostgreSQL"
                            : "Save Record to PostgreSQL"}
                      </button>
                      {verificationForm.id !== null ? (
                        <>
                          <button
                            type="button"
                            className="briti-admin-btn-secondary"
                            onClick={resetVerificationForm}
                            disabled={verificationDeletingId === verificationForm.id}
                          >
                            Cancel Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm px-3"
                            disabled={verificationDeletingId === verificationForm.id}
                            onClick={() =>
                              void handleDeleteVerification({
                                id: verificationForm.id!,
                                code: verificationForm.code,
                                student_name: verificationForm.student_name,
                              })
                            }
                            data-testid="verification-form-delete-btn"
                          >
                            {verificationDeletingId === verificationForm.id
                              ? "Deleting…"
                              : "Delete Record"}
                          </button>
                        </>
                      ) : null}
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column: Search & Verification Records Table */}
              <div className="col-xl-8 col-lg-7">
                <div className="briti-admin-card h-100">
                  <div className="briti-admin-card-header">
                    <div>
                      <h2 className="briti-admin-card-title">
                        Saved Verification Records ({verifications.length})
                      </h2>
                      <p className="briti-admin-card-subtitle">
                        Search by student name or verification code
                      </p>
                    </div>

                    <div className="d-flex gap-2">
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Search name or code…"
                        aria-label="Search verification records by student name or verification code"
                        value={verificationSearch}
                        onChange={(e) => {
                          const val = e.target.value;
                          setVerificationSearch(val);
                          void fetchVerifications(val);
                        }}
                        data-testid="verification-search-input"
                      />
                      <button
                        type="button"
                        className="briti-admin-btn-secondary"
                        onClick={() => void fetchVerifications(verificationSearch)}
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {verificationLoading ? (
                    <p className="text-secondary small py-3 mb-0">Loading records…</p>
                  ) : verifications.length === 0 ? (
                    <p className="text-secondary small py-3 mb-0">
                      No verification records match your search.
                    </p>
                  ) : (
                    <div className="briti-admin-table-wrap">
                      <table className="table table-hover align-middle briti-admin-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Student Name</th>
                            <th>Domain</th>
                            <th>Duration</th>
                            <th>Region</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {verifications.map((item) => (
                            <tr key={item.id}>
                              <td className="text-secondary">#{item.id}</td>
                              <td>
                                <code className="briti-admin-code-pill">{item.code}</code>
                              </td>
                              <td className="fw-semibold text-dark text-nowrap">
                                {item.student_name}
                              </td>
                              <td>{item.domain}</td>
                              <td className="text-nowrap">{item.duration}</td>
                              <td className="text-nowrap">{item.region}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    item.certificate_issued
                                      ? "bg-success-subtle text-success"
                                      : "bg-warning-subtle text-dark"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <div className="d-inline-flex align-items-center justify-content-end gap-2 flex-nowrap">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                                    onClick={() => startEditVerification(item)}
                                    disabled={verificationDeletingId === item.id}
                                    data-testid={`edit-verification-${item.code}`}
                                  >
                                    <i className="ri-edit-line" aria-hidden="true" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                                    onClick={() => void handleDeleteVerification(item)}
                                    disabled={verificationDeletingId === item.id}
                                    data-testid={`delete-verification-${item.code}`}
                                  >
                                    <i className="ri-delete-bin-line" aria-hidden="true" />
                                    <span>
                                      {verificationDeletingId === item.id
                                        ? "Deleting…"
                                        : "Delete"}
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ================================================================
               SECTION 2: INTERNSHIP PAGE CONTENT EDITOR
               ================================================================ */
            <div className="briti-admin-card" data-testid="section-internship-content">
              <div className="briti-admin-card-header">
                <div>
                  <h2 className="briti-admin-card-title">Internship Page Content Editor</h2>
                  <p className="briti-admin-card-subtitle">
                    Select the main Internships page or any individual internship program track to
                    edit headings, duration (such as <code>3 Months</code>), descriptions,
                    outcomes, and call-to-action labels.
                  </p>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-2">
                  <Link
                    href={publicPreviewHref}
                    target="_blank"
                    className="briti-admin-btn-secondary"
                  >
                    <span>Preview Page ({publicPreviewHref}) ↗</span>
                  </Link>
                  <button
                    type="button"
                    className="briti-admin-btn-secondary"
                    onClick={() => void loadSingleInternshipPage(selectedPageKey, token, true)}
                    disabled={contentLoading}
                    data-testid="content-reload-btn"
                  >
                    Load Saved Content
                  </button>
                </div>
              </div>

              {/* Page Selector Controls */}
              <div className="briti-admin-filter-box">
                <div className="row g-3 align-items-end">
                  <div className="col-md-5">
                    <label htmlFor="ic-filter-search" className="form-label">
                      Filter Internship Pages ({filteredInternshipPages.length} available)
                    </label>
                    <input
                      id="ic-filter-search"
                      type="search"
                      className="form-control"
                      placeholder="Filter by title, domain, or slug…"
                      value={pageFilterQuery}
                      onChange={(e) => setPageFilterQuery(e.target.value)}
                    />
                  </div>
                  <div className="col-md-7">
                    <label htmlFor="ic-page-select" className="form-label">
                      Select Internship Page or Program Track
                    </label>
                    <select
                      id="ic-page-select"
                      className="form-select"
                      value={selectedPageKey}
                      onChange={(e) => {
                        const nextKey = e.target.value;
                        setSelectedPageKey(nextKey);
                        void loadSingleInternshipPage(nextKey);
                      }}
                      data-testid="internship-page-selector"
                    >
                      {filteredInternshipPages.map((p) => (
                        <option key={p.page_key} value={p.page_key}>
                          {p.page_type === "overview"
                            ? `★ Main Internships Page (/internships) — [${p.duration}]`
                            : `${p.title} (/internships/${p.page_key}) — [${p.duration}]`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {contentSuccess ? (
                <div
                  className="alert alert-success py-2 small mb-4"
                  role="status"
                  data-testid="content-save-success"
                >
                  {contentSuccess}
                </div>
              ) : null}

              {contentError ? (
                <div
                  className="alert alert-danger py-2 small mb-4"
                  role="alert"
                  data-testid="content-save-error"
                >
                  {contentError}
                </div>
              ) : null}

              {contentLoading || !editorForm ? (
                <p className="text-secondary py-4 mb-0">Loading internship page content…</p>
              ) : (
                <form onSubmit={(e) => void handleInternshipContentSave(e)}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label htmlFor="ic-title" className="form-label">
                        Internship Page Title *
                      </label>
                      <input
                        id="ic-title"
                        type="text"
                        className="form-control"
                        value={editorForm.title}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, title: e.target.value } : prev,
                          )
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="ic-heading" className="form-label">
                        Main Banner Heading *
                      </label>
                      <input
                        id="ic-heading"
                        type="text"
                        className="form-control"
                        value={editorForm.heading}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, heading: e.target.value } : prev,
                          )
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="ic-duration" className="form-label">
                        Internship Duration (e.g. 3 Months) *
                      </label>
                      <input
                        id="ic-duration"
                        type="text"
                        className="form-control"
                        placeholder="e.g. 3 Months"
                        value={editorForm.duration}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, duration: e.target.value } : prev,
                          )
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="ic-cta" className="form-label">
                        Call-to-Action Button Text *
                      </label>
                      <input
                        id="ic-cta"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Apply Now"
                        value={editorForm.cta_button_text}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, cta_button_text: e.target.value } : prev,
                          )
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="ic-description" className="form-label">
                        Internship Description / Overview
                      </label>
                      <textarea
                        id="ic-description"
                        className="form-control"
                        rows={3}
                        value={editorForm.description}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, description: e.target.value } : prev,
                          )
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="ic-intro" className="form-label">
                        Introductory Text
                      </label>
                      <textarea
                        id="ic-intro"
                        className="form-control"
                        rows={2}
                        value={editorForm.introductory_text}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, introductory_text: e.target.value } : prev,
                          )
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="ic-program-details" className="form-label">
                        Internship Program Details / Project Structure
                      </label>
                      <textarea
                        id="ic-program-details"
                        className="form-control"
                        rows={3}
                        value={editorForm.program_details}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, program_details: e.target.value } : prev,
                          )
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="ic-outcomes" className="form-label">
                        Learning Outcomes (one per line)
                      </label>
                      <textarea
                        id="ic-outcomes"
                        className="form-control"
                        rows={5}
                        value={editorForm.learning_outcomes_text}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev
                              ? { ...prev, learning_outcomes_text: e.target.value }
                              : prev,
                          )
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="ic-responsibilities" className="form-label">
                        Responsibilities (one per line)
                      </label>
                      <textarea
                        id="ic-responsibilities"
                        className="form-control"
                        rows={5}
                        value={editorForm.responsibilities_text}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev
                              ? { ...prev, responsibilities_text: e.target.value }
                              : prev,
                          )
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="ic-skills" className="form-label">
                        Skills &amp; Requirements / Tools (one per line)
                      </label>
                      <textarea
                        id="ic-skills"
                        className="form-control"
                        rows={5}
                        value={editorForm.skills_and_requirements_text}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev
                              ? { ...prev, skills_and_requirements_text: e.target.value }
                              : prev,
                          )
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="ic-benefits" className="form-label">
                        Benefits &amp; Features / Certification Details
                      </label>
                      <textarea
                        id="ic-benefits"
                        className="form-control"
                        rows={3}
                        value={editorForm.benefits_and_features}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, benefits_and_features: e.target.value } : prev,
                          )
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="ic-eligibility" className="form-label">
                        Eligibility Information / Available Regions
                      </label>
                      <textarea
                        id="ic-eligibility"
                        className="form-control"
                        rows={3}
                        value={editorForm.eligibility_information}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev
                              ? { ...prev, eligibility_information: e.target.value }
                              : prev,
                          )
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="ic-instructions" className="form-label">
                        Application Instructions
                      </label>
                      <textarea
                        id="ic-instructions"
                        className="form-control"
                        rows={2}
                        value={editorForm.application_instructions}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev
                              ? { ...prev, application_instructions: e.target.value }
                              : prev,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-3 mt-4 pt-3 border-top">
                    <button
                      type="submit"
                      className="briti-admin-btn-primary"
                      disabled={contentSaving}
                      data-testid="content-save-btn"
                    >
                      <i className="ri-save-line" aria-hidden="true" />
                      <span>{contentSaving ? "Saving to PostgreSQL…" : "Save Changes"}</span>
                    </button>
                    <button
                      type="button"
                      className="briti-admin-btn-secondary"
                      onClick={handleCancelUnsavedContentChanges}
                      disabled={contentSaving}
                      data-testid="content-cancel-btn"
                    >
                      Cancel Unsaved Changes
                    </button>
                    <button
                      type="button"
                      className="briti-admin-btn-secondary"
                      onClick={() => void loadSingleInternshipPage(selectedPageKey, token, true)}
                      disabled={contentLoading || contentSaving}
                    >
                      Reload Saved Content
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
