import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090a0c",
};

export const metadata: Metadata = {
  title: `${siteConfig.personal.name} — Portfolio`,
  description: siteConfig.hero.quote,
  keywords: [
    siteConfig.personal.name,
    "Software Developer",
    "Portfolio",
    "Open Source",
    "Web Engineering",
  ],
  authors: [{ name: siteConfig.personal.name }],
  openGraph: {
    title: `${siteConfig.personal.name} — Portfolio`,
    description: siteConfig.hero.quote,
    type: "website",
    siteName: siteConfig.personal.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#090a0c] text-neutral-100 flex flex-col relative selection:bg-neutral-800 selection:text-white">
        <div className="ambient-mesh" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
