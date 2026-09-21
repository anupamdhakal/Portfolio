import React from "react";
import { siteConfig } from "@/config/site";
import {
  GitHubIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  SpotifyIcon,
  YouTubeIcon,
  TikTokIcon,
} from "@/components/icons/SocialIcons";

export function SocialLinks() {
  const socials = [
    {
      name: "GitHub",
      url: siteConfig.social.github,
      icon: GitHubIcon,
      hoverClass: "hover:border-neutral-500 hover:text-white",
    },
    {
      name: "Facebook",
      url: siteConfig.social.facebook,
      icon: FacebookIcon,
      hoverClass: "hover:border-[#1877F2]/60 hover:text-[#1877F2]",
    },
    {
      name: "Instagram",
      url: siteConfig.social.instagram,
      icon: InstagramIcon,
      hoverClass: "hover:border-[#E1306C]/60 hover:text-[#E1306C]",
    },
    {
      name: "LinkedIn",
      url: siteConfig.social.linkedin,
      icon: LinkedInIcon,
      hoverClass: "hover:border-[#0A66C2]/60 hover:text-[#0A66C2]",
    },
    {
      name: "Spotify",
      url: siteConfig.social.spotify,
      icon: SpotifyIcon,
      hoverClass: "hover:border-[#1DB954]/60 hover:text-[#1DB954]",
    },
    {
      name: "YouTube",
      url: siteConfig.social.youtube,
      icon: YouTubeIcon,
      hoverClass: "hover:border-[#FF0000]/60 hover:text-[#FF0000]",
    },
    {
      name: "TikTok",
      url: siteConfig.social.tiktok,
      icon: TikTokIcon,
      hoverClass: "hover:border-neutral-400 hover:text-white",
    },
  ];

  return (
    <section
      id="social"
      aria-label="Social Profiles"
      className="py-16 sm:py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full"
    >
      <div className="border-t border-neutral-800/80 pt-10 sm:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-medium">
              Network &amp; Channels
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Profiles across development, media, and social platforms.
            </p>
          </div>
        </div>

        {/* The 7 Social Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {socials.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${platform.name} profile (opens in new tab)`}
                className={`group flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 text-neutral-400 backdrop-blur-sm transition-all duration-300 hover:bg-neutral-900/80 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${platform.hoverClass}`}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-inherit transition-colors">
                    {platform.name}
                  </span>
                  <svg
                    className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
