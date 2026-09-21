"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  // Scroll detection for backdrop depth
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer to highlight active section as the user scrolls
  useEffect(() => {
    const sectionIds = ["about", "projects", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-30% 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setIsHovered(false);

    const target = document.querySelector(href);
    if (target) {
      const navOffset = 90;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", href);
    }
  };

  const isExpanded = isHovered || isMobileOpen;

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsHovered(false);
          }
        }}
        className={`pointer-events-auto flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          backdrop-blur-xl border select-none
          ${
            scrolled
              ? "bg-neutral-950/90 border-neutral-800 shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
              : "bg-neutral-900/80 border-neutral-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          }
          rounded-full px-4 py-2.5 sm:px-5 sm:py-2.5 max-w-fit`}
      >
        {/* Brand / Name button */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", window.location.pathname);
          }}
          className="flex items-center gap-2.5 text-neutral-100 font-semibold tracking-tight text-sm sm:text-base group whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-full"
        >
          {/* Status beacon dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="transition-colors duration-200 group-hover:text-white">
            {siteConfig.personal.name}
          </span>
        </a>

        {/* Mobile tap toggle icon */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="md:hidden ml-2.5 p-1 text-neutral-400 hover:text-white focus:outline-none"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse navigation menu" : "Expand navigation menu"}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-90 text-white" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isExpanded ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="12" y1="4" x2="20" y2="12" />
                <line x1="12" y1="20" x2="20" y2="12" />
              </>
            )}
          </svg>
        </button>

        {/* Expanding Links Container */}
        <div
          className={`flex items-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              isExpanded
                ? "max-w-[340px] opacity-100 ml-3 sm:ml-4 pl-3 sm:pl-4 border-l border-neutral-800"
                : "max-w-0 opacity-0 ml-0 pl-0 border-transparent pointer-events-none"
            }`}
        >
          <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  tabIndex={isExpanded ? 0 : -1}
                  className={`text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200
                    ${
                      isActive
                        ? "text-white bg-neutral-800 shadow-sm"
                        : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60"
                    }
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
