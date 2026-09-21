/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION - ANUPAM DHAKAL
 * ==============================================================================
 * 
 * This is the SINGLE source of truth for all personal content on this website.
 * You do NOT need to search through components or edit HTML/React files.
 * Simply edit the values below to update your information, quote, projects,
 * contact details, and social links.
 * 
 * ==============================================================================
 */

export interface ProjectConfig {
  /**
   * The full GitHub repository URL.
   * Example: "https://github.com/anupamdhakal/devtools-web"
   * 
   * The website automatically queries the public GitHub API to retrieve:
   * - Repository name
   * - Description
   * - Primary language
   * - Star count
   * - Topics / tags
   * - Repository link
   */
  github: string;

  /**
   * (Optional) Fallback overrides in case the GitHub API is unavailable,
   * rate-limited, or the project is offline.
   */
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackLanguage?: string;
}

export interface SiteConfig {
  personal: {
    name: string;
    role: string;
    location?: string;
  };
  hero: {
    quote: string;
    author?: string;
  };
  about: {
    heading: string;
    introduction: string;
  };
  projects: {
    heading: string;
    subheading: string;
    items: ProjectConfig[];
  };
  contact: {
    heading: string;
    subheading: string;
    email: string;
    formNote: string;
  };
  social: {
    github: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    spotify: string;
    youtube: string;
    tiktok: string;
  };
  footer: {
    name: string;
    copyrightYear: number;
    tagline: string;
  };
}

export const siteConfig: SiteConfig = {
  // ----------------------------------------------------------------------------
  // 1. PERSONAL DETAILS
  // ----------------------------------------------------------------------------
  personal: {
    name: "Anupam Dhakal",
    role: "Software Developer & Engineering Enthusiast",
    location: "Nepal",
  },

  // ----------------------------------------------------------------------------
  // 2. HERO / INTRO QUOTE
  // ----------------------------------------------------------------------------
  // The Hero section prominently displays this single quote with entrance animation.
  // Edit the quote text below to customize your headline message.
  hero: {
    quote: "Simplicity is prerequisite for reliability, and clarity is the essence of enduring software.",
    author: "Anupam Dhakal",
  },

  // ----------------------------------------------------------------------------
  // 3. ABOUT INTRODUCTION
  // ----------------------------------------------------------------------------
  // A clean, concise introduction. No exaggerated biographies or fake stats.
  about: {
    heading: "About",
    introduction:
      "I am a developer driven by craft, system performance, and thoughtful engineering. I focus on building responsive web applications, privacy-conscious developer tooling, and modular architectures where reliability and clean code come first.",
  },

  // ----------------------------------------------------------------------------
  // 4. PROJECTS (GitHub Repositories)
  // ----------------------------------------------------------------------------
  // Simply paste your GitHub repository URL here to showcase a project.
  // The website will automatically fetch repository statistics, description,
  // language, and stars directly from GitHub.
  // Fallbacks are provided so the page never breaks even if GitHub is offline.
  projects: {
    heading: "Selected Work",
    subheading: "Open-source tools, developer utilities, and software experiments.",
    items: [
      {
        github: "https://github.com/anupamdhakal/devtools-web",
        fallbackTitle: "devtools-web",
        fallbackDescription:
          "A modern, privacy-focused collection of free developer tools for everyday web development, programming, and data-processing tasks. Built with React and TypeScript.",
        fallbackLanguage: "TypeScript",
      },
      {
        github: "https://github.com/anupamdhakal/PortPilot",
        fallbackTitle: "PortPilot",
        fallbackDescription:
          "A lightweight local dashboard for monitoring listening ports, processes, and local network services.",
        fallbackLanguage: "HTML",
      },
      {
        github: "https://github.com/anupamdhakal/URL-Inspector",
        fallbackTitle: "URL-Inspector",
        fallbackDescription:
          "A fast utility for inspecting, parsing, and verifying URL parameters, security redirects, and endpoints.",
        fallbackLanguage: "JavaScript",
      },
      {
        github: "https://github.com/anupamdhakal/FSS_TAP",
        fallbackTitle: "FSS_TAP",
        fallbackDescription:
          "Test automation and protocol utility for streaming architectures and systems.",
        fallbackLanguage: "JavaScript",
      },
    ],
  },

  // ----------------------------------------------------------------------------
  // 5. CONTACT
  // ----------------------------------------------------------------------------
  // All contact form submissions are routed directly to this recipient email.
  contact: {
    heading: "Contact",
    subheading: "Have a question, collaboration inquiry, or engineering challenge?",
    email: "info@anupam-dhakal.com.np",
    formNote: "Messages are delivered directly to info@anupam-dhakal.com.np.",
  },

  // ----------------------------------------------------------------------------
  // 6. SOCIAL LINKS
  // ----------------------------------------------------------------------------
  // Exactly the 7 requested platforms.
  // Replace placeholder URLs with your personal profiles when ready.
  social: {
    github: "https://github.com/anupamdhakal",
    facebook: "https://facebook.com/your-profile", // Replace with your Facebook profile URL
    instagram: "https://instagram.com/your-profile", // Replace with your Instagram profile URL
    linkedin: "https://linkedin.com/in/your-profile", // Replace with your LinkedIn profile URL
    spotify: "https://open.spotify.com/user/your-profile", // Replace with your Spotify profile URL
    youtube: "https://youtube.com/@your-channel", // Replace with your YouTube channel URL
    tiktok: "https://tiktok.com/@your-profile", // Replace with your TikTok profile URL
  },

  // ----------------------------------------------------------------------------
  // 7. FOOTER
  // ----------------------------------------------------------------------------
  // Footer text and copyright year.
  footer: {
    name: "Anupam Dhakal",
    copyrightYear: 2026,
    tagline: "Desktop-first personal portfolio crafted with precision.",
  },
};
