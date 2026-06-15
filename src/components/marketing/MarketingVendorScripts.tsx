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
    el.async = false;
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

export default function MarketingVendorScripts() {
  useEffect(() => {
    let cancelled = false;
 
    (async () => {
      try {
        for (const file of SCRIPT_FILES) {
          if (cancelled) return;
          await loadScript(`${SCRIPT_BASE}/${file}`);
        }
      } catch (e) {
        console.error("[MarketingVendorScripts] script chain", e);
      } finally {
        runScrollCueUpdate();
        const globalWindow = window as typeof window & { briticanaMarketingInit?: () => void };
        globalWindow.briticanaMarketingInit?.();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

