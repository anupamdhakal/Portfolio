"use client";

import React from "react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-6 sm:px-12 md:px-20 max-w-6xl mx-auto pb-12 pt-4">
      <div className="rounded-xl border border-[#1e2129] bg-[#121419]/50 backdrop-blur-sm p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Name and Copyright */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-3 text-center sm:text-left">
          <span className="font-medium text-sm text-[#eeeff2] tracking-tight">
            {siteConfig.footer.name}
          </span>
          <span className="text-xs font-mono text-[#6c717e]">
            &copy; {siteConfig.footer.copyrightYear}
          </span>
          <span className="hidden sm:inline text-[#383c48]">&bull;</span>
          <span className="text-xs text-[#6c717e] font-normal">
            {siteConfig.footer.tagline}
          </span>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#20232b] bg-[#0e1014]/60 text-xs font-mono text-[#787d8c] hover:text-[#eeeff2] hover:border-[#2b2f3c] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#444a59]"
          aria-label="Back to top of page"
        >
          <span>Top</span>
          <svg
            className="w-3 h-3"
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
