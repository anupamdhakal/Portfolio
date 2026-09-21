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
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-6xl mx-auto w-full"
    >
      <div className="border-t border-[#1a1d24] pt-12 sm:pt-16 mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h2
              id="projects-heading"
              className="text-xs font-mono uppercase tracking-widest text-[#727785] font-medium"
            >
              {siteConfig.projects.heading}
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-[#c4c7d0] font-normal">
              {siteConfig.projects.subheading}
            </p>
          </div>

          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs font-mono text-[#787d8c] hover:text-[#eeeff2] transition-colors duration-300"
          >
            <span>View all on GitHub</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {repos.map((repo, idx) => (
          <ProjectCard key={repo.url + idx} repo={repo} index={idx} />
        ))}
      </div>
    </section>
  );
}
