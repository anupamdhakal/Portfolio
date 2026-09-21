import React from "react";
import { GitHubRepoData } from "@/lib/github";
import { GitHubIcon } from "@/components/icons/SocialIcons";

interface ProjectCardProps {
  repo: GitHubRepoData;
  index: number;
}

// Map common languages to subtle, restrained indicator colors
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#e5a93c",
  HTML: "#d34423",
  CSS: "#663399",
  Python: "#3572A5",
  Rust: "#ce8a67",
  Go: "#00ADD8",
  C: "#6e7381",
  "C++": "#d83b6f",
  Shell: "#72b347",
};

export function ProjectCard({ repo }: ProjectCardProps) {
  const languageColor = (repo.language && LANGUAGE_COLORS[repo.language]) || "#787d8c";

  return (
    <div className="group relative rounded-xl border border-[#1e2129] bg-[#121419]/70 backdrop-blur-sm overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-[#2b2f3c] hover:bg-[#151821] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] flex flex-col justify-between">
      {/* Main card content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Card Header: Language & Stars */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            {repo.language && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8a8f9d] bg-[#161820] px-2.5 py-1 rounded-md border border-[#20232c]">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: languageColor }}
                  aria-hidden="true"
                />
                {repo.language}
              </span>
            )}

            {repo.stars > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-[#8a8f9d] bg-[#161820] px-2.5 py-1 rounded-md border border-[#20232c]">
                <svg
                  className="w-3.5 h-3.5 text-amber-400/90 fill-amber-400/90"
                  viewBox="0 0 24 24"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {repo.stars}
              </span>
            )}
          </div>

          {/* GitHub external link button */}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${repo.name} repository on GitHub`}
            className="p-1.5 rounded-lg text-[#6e7382] hover:text-[#eeeff2] hover:bg-[#1b1e27] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#444a59]"
          >
            <GitHubIcon size={17} />
          </a>
        </div>

        {/* Project Name */}
        <h3 className="text-lg sm:text-xl font-medium text-[#eeeff2] tracking-tight transition-colors duration-300 group-hover:text-white">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-none focus-visible:underline"
          >
            {repo.name}
          </a>
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm text-[#858a97] font-normal leading-relaxed flex-1">
          {repo.description || "Open source project on GitHub."}
        </p>

        {/* Topics / Tags if available */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-[11px] font-mono text-[#6c717e] bg-[#161820] px-2 py-0.5 rounded border border-[#1f222b]"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Contained Bottom Repository Reference Bar */}
      <div className="border-t border-[#1a1d24] bg-[#0e1014]/50 px-6 sm:px-7 py-3 flex items-center justify-between text-xs font-mono text-[#5e6371]">
        <span className="truncate max-w-[200px] sm:max-w-xs">{repo.fullName}</span>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#787d8c] hover:text-[#eeeff2] transition-colors duration-300"
        >
          <span>Repository</span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}
