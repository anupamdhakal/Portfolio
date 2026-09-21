import React from "react";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20 pt-28 pb-16"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle decorative quote indicator */}
        <div className="animate-hero-tag mb-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#787d8c] border border-[#1e2129] rounded-full px-3.5 py-1 bg-[#121419]/70">
            Perspective
          </span>
        </div>

        {/* The Quote - calm, no artificial blur or harsh scaling */}
        <blockquote className="animate-hero-quote">
          <p className="text-3xl sm:text-5xl lg:text-[3.35rem] font-light tracking-tight text-[#eeeff2] leading-[1.28] sm:leading-[1.2] selection:bg-[#232732] selection:text-[#f3f4f6]">
            &ldquo;{siteConfig.hero.quote}&rdquo;
          </p>
        </blockquote>

        {/* Attribution */}
        {siteConfig.hero.author && (
          <footer className="animate-hero-author mt-8">
            <cite className="not-italic text-sm sm:text-base font-normal text-[#8a8f9d] tracking-wide">
              — {siteConfig.hero.author}
            </cite>
          </footer>
        )}
      </div>

      {/* Understated bottom scroll hint - calm, non-bouncing */}
      <div className="animate-hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="group flex flex-col items-center gap-1.5 text-xs text-[#707583] font-mono tracking-wider transition-colors duration-300 hover:text-[#c4c8d3]"
        >
          <span className="text-[10px] uppercase tracking-widest text-[#626774] group-hover:text-[#a0a5b4] transition-colors duration-300">
            Scroll
          </span>
          <svg
            className="w-3.5 h-3.5 text-[#626774] group-hover:text-[#a0a5b4] transition-transform duration-300 ease-out group-hover:translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
