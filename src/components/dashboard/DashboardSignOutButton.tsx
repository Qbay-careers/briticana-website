"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardSignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    try {
      await fetch("/api/auth/demo-logout", { method: "POST", credentials: "include" });
    } finally {
      setBusy(false);
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <button type="button" className="main-btn black" disabled={busy} onClick={() => void signOut()}>
      Sign out
    </button>
  );
}
