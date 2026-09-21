"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on mount
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20 pt-28 pb-16"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle decorative quote indicator */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 mb-6 text-neutral-600
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 border border-neutral-800/80 rounded-full px-3.5 py-1 bg-neutral-900/40">
            Perspective
          </span>
        </div>

        {/* The Quote */}
        <blockquote
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150
            ${
              mounted
                ? "opacity-100 translate-y-0 blur-none"
                : "opacity-0 translate-y-6 blur-[3px]"
            }`}
        >
          <p className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-100 leading-[1.25] sm:leading-[1.18] selection:bg-neutral-800 selection:text-neutral-100">
            &ldquo;{siteConfig.hero.quote}&rdquo;
          </p>
        </blockquote>

        {/* Attribution */}
        {siteConfig.hero.author && (
          <footer
            className={`mt-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <cite className="not-italic text-sm sm:text-base font-normal text-neutral-400 tracking-wide">
              — {siteConfig.hero.author}
            </cite>
          </footer>
        )}
      </div>

      {/* Subtle bottom scroll hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500
          ${mounted ? "opacity-40 hover:opacity-80" : "opacity-0"}`}
      >
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="flex flex-col items-center gap-1.5 text-xs text-neutral-400 font-mono tracking-wider transition-colors hover:text-neutral-200"
        >
          <span className="text-[11px] uppercase tracking-widest">Scroll</span>
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
