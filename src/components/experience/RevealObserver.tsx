"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll(".briticana-experience-page .reveal");

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("visible"));
      document.querySelectorAll(".briticana-experience-page video").forEach((v) => {
        (v as HTMLVideoElement).pause();
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
