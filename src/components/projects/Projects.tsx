import React from "react";
import { siteConfig } from "@/config/site";
import { GitHubRepoData } from "@/lib/github";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
  repos: GitHubRepoData[];
}

export function Projects({ repos }: ProjectsProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full"
    >
      <div className="border-t border-neutral-800/80 pt-12 sm:pt-16 mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h2
              id="projects-heading"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-medium"
            >
              {siteConfig.projects.heading}
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-neutral-300 font-normal">
              {siteConfig.projects.subheading}
            </p>
          </div>

          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span>View all on GitHub</span>
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>

      {/* Projects Grid: 2 columns on desktop, 1 column on mobile/tablet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {repos.map((repo, idx) => (
          <ProjectCard key={repo.url + idx} repo={repo} index={idx} />
        ))}
      </div>
    </section>
  );
}
