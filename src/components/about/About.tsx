import React from "react";
import { siteConfig } from "@/config/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto w-full"
    >
      <div className="border-t border-neutral-800/80 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-baseline">
          {/* Section Label */}
          <div className="md:col-span-3">
            <h2
              id="about-heading"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-medium"
            >
              {siteConfig.about.heading}
            </h2>
          </div>

          {/* About Statement */}
          <div className="md:col-span-9">
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-200 leading-relaxed sm:leading-relaxed selection:bg-neutral-800">
              {siteConfig.about.introduction}
            </p>

            {siteConfig.personal.location && (
              <div className="mt-8 flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-600" />
                <span>Based in {siteConfig.personal.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
