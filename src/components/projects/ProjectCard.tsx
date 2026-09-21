import React from "react";
import { GitHubRepoData } from "@/lib/github";
import { GitHubIcon } from "@/components/icons/SocialIcons";

interface ProjectCardProps {
  repo: GitHubRepoData;
  index: number;
}

// Map common languages to their authentic brand colors
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  C: "#555555",
  "C++": "#f34b7d",
  Shell: "#89e051",
};

export function ProjectCard({ repo, index }: ProjectCardProps) {
  const languageColor = (repo.language && LANGUAGE_COLORS[repo.language]) || "#a3a3a3";

  return (
    <div className="group relative rounded-2xl border border-neutral-800/90 bg-neutral-900/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/80 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between">
      {/* Subtle top-edge accent highlight on hover */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-600/0 to-transparent transition-opacity duration-300 group-hover:via-neutral-400/40" />

      {/* Main card content */}
      <div className="p-7 sm:p-9 flex-1 flex flex-col">
        {/* Card Header: Language & Stars */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {repo.language && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-neutral-800/80 px-2.5 py-1 rounded-md border border-neutral-700/50">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: languageColor }}
                  aria-hidden="true"
                />
                {repo.language}
              </span>
            )}

            {repo.stars > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 bg-neutral-800/60 px-2.5 py-1 rounded-md border border-neutral-700/40">
                <svg
                  className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
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
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <GitHubIcon size={18} />
          </a>
        </div>

        {/* Project Name */}
        <h3 className="text-xl sm:text-2xl font-semibold text-neutral-100 tracking-tight transition-colors group-hover:text-white">
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
        <p className="mt-3 text-sm sm:text-base text-neutral-400 font-normal leading-relaxed flex-1">
          {repo.description || "Open source project on GitHub."}
        </p>

        {/* Topics / Tags if available */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-[11px] font-mono text-neutral-500 bg-neutral-800/40 px-2 py-0.5 rounded border border-neutral-800"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Masked / Contained Bottom Visual Treatment */}
      <div className="border-t border-neutral-800/80 bg-neutral-950/40 px-7 py-3.5 sm:px-9 flex items-center justify-between text-xs font-mono text-neutral-500">
        <span className="truncate max-w-[240px] sm:max-w-xs">{repo.fullName}</span>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors"
        >
          <span>Repository</span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
