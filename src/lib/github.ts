export interface GitHubRepoData {
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage?: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  isFallback?: boolean;
}

/**
 * Parses GitHub repo owner and repo name from a URL.
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const cleaned = url.trim().replace(/\/+$/, "");
    const match = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/i);
    if (!match) return null;
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, ""),
    };
  } catch {
    return null;
  }
}

/**
 * Fetches repository metadata from the public GitHub API.
 * Uses 1-hour ISR revalidation to keep responses lightning-fast and respect rate limits.
 * Gracefully falls back to configuration values on any API or network issue.
 */
export async function fetchGitHubRepo(
  url: string,
  fallback?: {
    title?: string;
    description?: string;
    language?: string;
  }
): Promise<GitHubRepoData> {
  const parsed = parseGitHubUrl(url);

  // Default fallback object
  const fallbackResult: GitHubRepoData = {
    name: fallback?.title || (parsed ? parsed.repo : "Repository"),
    fullName: parsed ? `${parsed.owner}/${parsed.repo}` : "Project",
    description: fallback?.description || "",
    url: url,
    homepage: null,
    language: fallback?.language || null,
    stars: 0,
    forks: 0,
    topics: [],
    updatedAt: new Date().toISOString(),
    isFallback: true,
  };

  if (!parsed) {
    return fallbackResult;
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "AnupamDhakal-Portfolio",
    };

    // If a GitHub token is provided in environment variables, attach it to raise rate limits
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
      headers,
      next: { revalidate: 3600 }, // Cache on Vercel/Next for 1 hour
    });

    if (!res.ok) {
      // Return fallback without throwing
      return fallbackResult;
    }

    const data = await res.json();

    return {
      name: data.name || fallbackResult.name,
      fullName: data.full_name || fallbackResult.fullName,
      description: data.description || fallback?.description || "",
      url: data.html_url || url,
      homepage: data.homepage || null,
      language: data.language || fallback?.language || null,
      stars: typeof data.stargazers_count === "number" ? data.stargazers_count : 0,
      forks: typeof data.forks_count === "number" ? data.forks_count : 0,
      topics: Array.isArray(data.topics) ? data.topics : [],
      updatedAt: data.updated_at || new Date().toISOString(),
      isFallback: false,
    };
  } catch (error) {
    // Network or parse failure: gracefully fallback
    console.warn(`[GitHub API] Failed to fetch data for ${url}. Using fallback.`, error);
    return fallbackResult;
  }
}
