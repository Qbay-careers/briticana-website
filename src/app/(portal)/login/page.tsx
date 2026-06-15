"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container mw-1345 py-5">
      <div className="row justify-content-center align-items-center g-5 py-lg-4">
        <div className="col-lg-5 d-none d-lg-block">
          <div className="position-relative z-1">
            <h2>
              Welcome back to <span>Briticana</span>
            </h2>
            <p className="text-secondary mt-3 mb-4 col-xl-10">
              Sign in to track your internship milestones, mentor reviews, and submission window.
            </p>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li className="d-flex align-items-center gap-2">
                <i className="ri-checkbox-circle-fill text-success" />
                <span>Structured, mentor-led programs</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="ri-checkbox-circle-fill text-success" />
                <span>Real-world startup-style projects</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="ri-checkbox-circle-fill text-success" />
                <span>Verifiable certificate on completion</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-5 col-md-8">
          <div className="bg-white rounded-4 shadow p-4 p-sm-5">
            <div className="text-center mb-4">
              <Link href="/" className="navbar-brand fw-bold m-0 d-inline-block">
                <span>Briti</span>cana
              </Link>
              <p className="text-secondary mt-2 mb-0">Sign in to your student portal</p>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} noValidate>
              {error ? (
                <div className="alert alert-danger py-2 small mb-3" role="alert">
                  {error}
                </div>
              ) : null}

              <div className="mb-3">
                <label htmlFor="login-email" className="form-label fw-semibold">
                  Email address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="ri-mail-line" />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="login-password" className="form-label fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="ri-lock-line" />
                  </span>
                  <input
                    id="login-password"
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check mb-0">
                  <input className="form-check-input" type="checkbox" id="login-remember" defaultChecked />
                  <label className="form-check-label" htmlFor="login-remember">
                    Remember me
                  </label>
                </div>
                <Link href="/login" className="text-decoration-none small">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="main-btn w-100 justify-content-center" disabled={submitting}>
                {submitting ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
