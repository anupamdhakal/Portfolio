import { siteConfig } from "@/config/site";
import { fetchGitHubRepo, GitHubRepoData } from "@/lib/github";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Projects } from "@/components/projects/Projects";
import { Contact } from "@/components/contact/Contact";
import { SocialLinks } from "@/components/social/SocialLinks";
import { Footer } from "@/components/footer/Footer";

// Revalidate GitHub data cache every hour
export const revalidate = 3600;

export default async function Home() {
  // Retrieve public GitHub metadata for each project configured in siteConfig
  const repoPromises = siteConfig.projects.items.map((item) =>
    fetchGitHubRepo(item.github, {
      title: item.fallbackTitle,
      description: item.fallbackDescription,
      language: item.fallbackLanguage,
    })
  );

  const repos: GitHubRepoData[] = await Promise.all(repoPromises);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* 1. Sticky Expanding Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero / Intro */}
        <Hero />

        {/* 3. About */}
        <About />

        {/* 4. Projects */}
        <Projects repos={repos} />

        {/* 5. Contact */}
        <Contact />

        {/* 6. Social Links */}
        <SocialLinks />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
