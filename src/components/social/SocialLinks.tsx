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
    },
    {
      name: "Facebook",
      url: siteConfig.social.facebook,
      icon: FacebookIcon,
    },
    {
      name: "Instagram",
      url: siteConfig.social.instagram,
      icon: InstagramIcon,
    },
    {
      name: "LinkedIn",
      url: siteConfig.social.linkedin,
      icon: LinkedInIcon,
    },
    {
      name: "Spotify",
      url: siteConfig.social.spotify,
      icon: SpotifyIcon,
    },
    {
      name: "YouTube",
      url: siteConfig.social.youtube,
      icon: YouTubeIcon,
    },
    {
      name: "TikTok",
      url: siteConfig.social.tiktok,
      icon: TikTokIcon,
    },
  ];

  return (
    <section
      id="social"
      aria-label="Social Profiles"
      className="py-16 sm:py-20 px-6 sm:px-12 md:px-20 max-w-6xl mx-auto w-full"
    >
      <div className="border-t border-[#1a1d24] pt-10 sm:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#727785] font-medium">
              Network &amp; Channels
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#7e8391]">
              Profiles across development, media, and communication platforms.
            </p>
          </div>
        </div>

        {/* The 7 Social Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {socials.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${platform.name} profile (opens in new tab)`}
                className="group flex flex-col items-center justify-center gap-2.5 p-3.5 sm:p-4 rounded-xl border border-[#1e2129] bg-[#121419]/60 text-[#7a7f8e] backdrop-blur-sm transition-all duration-300 hover:bg-[#161821] hover:border-[#2b2f3c] hover:text-[#eeeff2] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#444a59]"
              >
                <div className="text-[#767b8a] group-hover:text-[#dedfe4] transition-colors duration-300">
                  <Icon size={19} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-mono text-[#6c717e] group-hover:text-[#c2c5ce] transition-colors duration-300">
                    {platform.name}
                  </span>
                  <svg
                    className="w-2.5 h-2.5 opacity-0 -translate-x-0.5 translate-y-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#828694]"
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
