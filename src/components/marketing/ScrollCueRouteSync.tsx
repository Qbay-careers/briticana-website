"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function runScrollCueUpdate(): void {
  requestAnimationFrame(() => {
    const g = globalThis as unknown as { scrollCue?: { update: () => void } };
    g.scrollCue?.update?.();
  });
}

/**
 * ScrollCue applies opacity:0 to `[data-cue]` children until `update()` runs. After App Router navigations
 * (or query-only changes), the vendor script effect does not re-run, so cue nodes stay invisible.
 */
export default function ScrollCueRouteSync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams?.toString() ?? "";

  useEffect(() => {
    runScrollCueUpdate();
  }, [pathname, searchKey]);

  return null;
}
