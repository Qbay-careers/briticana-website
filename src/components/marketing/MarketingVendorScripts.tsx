"use client";

import { useEffect } from "react";

const SCRIPT_BASE = "/edumove/js";

/** Same order as template index.html (MeanMenu, Owl, GSAP in custom.js, etc.). */
const SCRIPT_FILES = [
  "jquery.min.js",
  "bootstrap.bundle.min.js",
  "plugin.js",
  "jquery.meanmenu.js",
  "owl.carousel.min.js",
  "magnific-popup.min.js",
  "counterup.min.js",
  "waypoints.min.js",
  "scrollcue.js",
  "custom.js",
] as const;

function hideHomePreloader() {
  document.querySelectorAll(".preloader").forEach((el) => {
    el.classList.add("preloader-deactivate");
  });
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-marketing-vendor="${src}"]`)) {
      resolve();
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.async = true;
    el.dataset.marketingVendor = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

function runScrollCueUpdate(): void {
  requestAnimationFrame(() => {
    hideHomePreloader();
    const g = globalThis as unknown as { scrollCue?: { update: () => void } };
    g.scrollCue?.update?.();
  });
}

type MarketingWindow = typeof window & {
  briticanaInitMeanMenu?: () => void;
  briticanaMarketingInit?: () => void;
};

export default function MarketingVendorScripts() {
  useEffect(() => {
    let cancelled = false;

    const startChain = () => {
      (async () => {
        try {
          if (cancelled) return;
          // Step 1: Load jQuery first
          await loadScript(`${SCRIPT_BASE}/jquery.min.js`);
          if (cancelled) return;

          // Step 2: Load dependent plugins in parallel
          await Promise.all([
            loadScript(`${SCRIPT_BASE}/bootstrap.bundle.min.js`),
            loadScript(`${SCRIPT_BASE}/plugin.js`),
            loadScript(`${SCRIPT_BASE}/jquery.meanmenu.js`),
            loadScript(`${SCRIPT_BASE}/owl.carousel.min.js`),
            loadScript(`${SCRIPT_BASE}/magnific-popup.min.js`),
            loadScript(`${SCRIPT_BASE}/counterup.min.js`),
            loadScript(`${SCRIPT_BASE}/waypoints.min.js`),
            loadScript(`${SCRIPT_BASE}/scrollcue.js`),
          ]);
          if (cancelled) return;

          // Step 3: Run custom template init once all plugins are active
          await loadScript(`${SCRIPT_BASE}/custom.js`);
        } catch (e) {
          console.error("[MarketingVendorScripts] script chain", e);
        } finally {
          runScrollCueUpdate();
          const globalWindow = window as MarketingWindow;
          globalWindow.briticanaInitMeanMenu?.();
          globalWindow.briticanaMarketingInit?.();
        }
      })();
    };

    let idleId: number | null = null;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(startChain, { timeout: 1500 });
    } else {
      timerId = setTimeout(startChain, 100);
    }

    return () => {
      cancelled = true;
      if (idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };
  }, []);

  return null;
}

