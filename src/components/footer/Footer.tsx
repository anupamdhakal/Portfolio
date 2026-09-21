"use client";

import React from "react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-6 sm:px-12 md:px-20 max-w-7xl mx-auto pb-12 pt-4">
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Name and Copyright */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-3 text-center sm:text-left">
          <span className="font-medium text-sm text-neutral-200 tracking-tight">
            {siteConfig.footer.name}
          </span>
          <span className="text-xs font-mono text-neutral-500">
            &copy; {siteConfig.footer.copyrightYear}
          </span>
          <span className="hidden sm:inline text-neutral-700">&bull;</span>
          <span className="text-xs text-neutral-500 font-normal">
            {siteConfig.footer.tagline}
          </span>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/60 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          aria-label="Back to top of page"
        >
          <span>Top</span>
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
