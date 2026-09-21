# Anupam Dhakal — Personal Portfolio Website

A desktop-first, single-page personal portfolio website built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**.

Designed with a focus on editorial typography, generous spacing, smooth interaction physics, dynamic GitHub project integration, and production-ready email delivery.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have Node.js 18+ and npm installed on your system.
```bash
node -v # v18.0.0 or higher
npm -v
```

### 2. Install Dependencies
```bash
cd portfolio
npm install
```

### 3. Run Locally (Development Mode)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## ⚙️ Content Configuration & Easy Editing

All personal details, quotes, GitHub projects, contact information, social links, and footer texts are centralized in **ONE** designated configuration file:

📁 **[`src/config/site.ts`](src/config/site.ts)**

You do **not** need to touch any UI components or HTML code to update your website.

### Where to Edit Personal Information & Hero Quote
Open `src/config/site.ts` and edit the `personal`, `hero`, and `about` objects:
```typescript
personal: {
  name: "Anupam Dhakal",
  role: "Software Developer & Engineering Enthusiast",
  location: "Nepal",
},

hero: {
  quote: "Simplicity is prerequisite for reliability, and clarity is the essence of enduring software.",
  author: "Anupam Dhakal",
},

about: {
  heading: "About",
  introduction: "I am a developer driven by craft, system performance, and thoughtful engineering...",
},
```

### Where to Edit GitHub Projects
In `src/config/site.ts`, simply paste your GitHub repository URL into the `projects.items` array:
```typescript
projects: {
  heading: "Selected Work",
  subheading: "Open-source tools, developer utilities, and software experiments.",
  items: [
    {
      github: "https://github.com/anupamdhakal/devtools-web",
      fallbackTitle: "devtools-web",
      fallbackDescription: "A modern, privacy-focused collection of free developer tools...",
      fallbackLanguage: "TypeScript",
    },
    // Add additional repositories here
  ],
}
```
> **Note**: The site automatically fetches live stars, description, primary language, and metadata directly from the public GitHub API, with ISR caching and fallback protection.

### Where to Edit Social Links
All 7 social profiles (GitHub, Facebook, Instagram, LinkedIn, Spotify, YouTube, TikTok) are configured in `src/config/site.ts`:
```typescript
social: {
  github: "https://github.com/anupamdhakal",
  facebook: "https://facebook.com/your-profile",
  instagram: "https://instagram.com/your-profile",
  linkedin: "https://linkedin.com/in/your-profile",
  spotify: "https://open.spotify.com/user/your-profile",
  youtube: "https://youtube.com/@your-channel",
  tiktok: "https://tiktok.com/@your-profile",
}
```

### Where to Edit Footer
In `src/config/site.ts`:
```typescript
footer: {
  name: "Anupam Dhakal",
  copyrightYear: 2026,
  tagline: "Desktop-first personal portfolio crafted with precision.",
}
```

---

## 📬 Contact Form & Production Email Setup

Messages from the contact form are configured to deliver directly to **`info@anupam-dhakal.com.np`**.

The implementation includes:
- Production-grade Next.js serverless API route (`src/app/api/contact/route.ts`).
- Server-side name, email, and message validation.
- Honeypot bot protection.
- Direct email address copy button with unobtrusive "Copied" confirmation.
- Graceful local development / preview mode (logs messages to console if no API key is set).

### Production Email Service: Resend (Recommended for Vercel)
To enable live email delivery to `info@anupam-dhakal.com.np`:

1. Create a free account at [Resend](https://resend.com).
2. Generate an API Key in the Resend dashboard.
3. In your local `.env.local` or in the Vercel Project Settings, set:

```env
RESEND_API_KEY=re_123456789abcdef
CONTACT_DESTINATION_EMAIL=info@anupam-dhakal.com.np
RESEND_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
```

> If you verify your own domain (`anupam-dhakal.com.np`) in Resend, you can change `RESEND_FROM_EMAIL` to `contact@anupam-dhakal.com.np`. For initial testing, Resend's free `onboarding@resend.dev` sender address works immediately.

---

## 🔑 Environment Variables Reference

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Required | Description | Default |
|---|---|---|---|
| `RESEND_API_KEY` | Optional in dev, Recommended in prod | Resend API key for transactional emails | `""` (simulated in dev) |
| `CONTACT_DESTINATION_EMAIL` | Optional | Recipient inbox address | `info@anupam-dhakal.com.np` |
| `RESEND_FROM_EMAIL` | Optional | Verified sender address | `"Portfolio Contact <onboarding@resend.dev>"` |
| `GITHUB_TOKEN` | Optional | GitHub personal token to raise API rate limits | `""` |

---

## ☁️ Deploying to Vercel

This project is built natively for zero-configuration deployment to [Vercel](https://vercel.com).

### Option A: Using the Vercel Dashboard
1. Push your repository to GitHub (`github.com/anupamdhakal/portfolio`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Under **Environment Variables**, add:
   - `RESEND_API_KEY`: Your Resend API key.
4. Click **Deploy**.

### Option B: Using the Vercel CLI
```bash
npm install -g vercel
vercel
vercel --prod
```

---

## 📂 Project Architecture

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts       # Serverless contact submission endpoint
│   │   ├── globals.css            # Ambient dark styling & accessibility rules
│   │   ├── layout.tsx             # Root layout with Geist font & metadata
│   │   └── page.tsx               # Single-page layout assembling all 7 sections
│   ├── components/
│   │   ├── navbar/
│   │   │   └── Navbar.tsx         # Sticky expanding navbar with smooth transitions
│   │   ├── hero/
│   │   │   └── Hero.tsx           # Intro section with quote & entrance animation
│   │   ├── about/
│   │   │   └── About.tsx          # Editorial About section
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx    # Large masked project card with hover states
│   │   │   └── Projects.tsx       # Projects grid section
│   │   ├── contact/
│   │   │   └── Contact.tsx        # Working contact form & email copy component
│   │   ├── social/
│   │   │   └── SocialLinks.tsx    # 7 curated social links with brand icons
│   │   ├── footer/
│   │   │   └── Footer.tsx         # Card-like minimal footer
│   │   └── icons/
│   │       └── SocialIcons.tsx    # Accessible SVG brand icons
│   ├── config/
│   │   └── site.ts                # SINGLE SOURCE OF TRUTH for all content
│   └── lib/
│       └── github.ts              # GitHub API fetcher with ISR caching & fallbacks
├── .env.example                   # Environment variable template
├── next.config.ts                 # Next.js configuration
├── package.json
└── README.md
```

---

## ♿ Accessibility & Performance

- **Semantic HTML**: Semantic landmark tags (`<header>`, `<main>`, `<section>`, `<blockquote>`, `<aside>`, `<footer>`).
- **Reduced Motion**: Automatically honors `prefers-reduced-motion: reduce` for all transitions and scrolling.
- **Keyboard Navigation**: Full tab index and visible focus rings on all interactive elements.
- **Responsive Geometry**: Desktop-first proportions that gracefully adapt to laptops, tablets, and mobile devices.
