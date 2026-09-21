import React from "react";
import { siteConfig } from "@/config/site";
import {
  Html5Icon,
  Css3Icon,
  JavaScriptIcon,
  NodeJsIcon,
  PythonIcon,
  CppIcon,
  JavaIcon,
  MusicIcon,
} from "@/components/icons/TechIcons";

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SKILLS: SkillItem[] = [
  { name: "HTML", icon: Html5Icon },
  { name: "CSS", icon: Css3Icon },
  { name: "JavaScript", icon: JavaScriptIcon },
  { name: "Node.js", icon: NodeJsIcon },
  { name: "Python", icon: PythonIcon },
  { name: "C++", icon: CppIcon },
  { name: "Java", icon: JavaIcon },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-6xl mx-auto w-full"
    >
      <div className="border-t border-[#1a1d24] pt-12 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-baseline">
          {/* Section Label */}
          <div className="md:col-span-3">
            <h2
              id="about-heading"
              className="text-xs font-mono uppercase tracking-widest text-[#727785] font-medium"
            >
              {siteConfig.about.heading}
            </h2>
          </div>

          {/* About Statement and Capabilities */}
          <div className="md:col-span-9">
            <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-light text-[#dedfe4] leading-relaxed sm:leading-[1.55] selection:bg-[#232732] selection:text-[#f3f4f6]">
              {siteConfig.about.introduction}
            </p>

            {siteConfig.personal.location && (
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#6c717e]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3e4352]" aria-hidden="true" />
                <span>Based in {siteConfig.personal.location}</span>
              </div>
            )}

            {/* Subtle Skills capability indicators */}
            <div className="mt-12 pt-8 border-t border-[#181a22]">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#6d7280] mb-3.5">
                Core Technologies
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
                {SKILLS.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="group flex flex-col items-center justify-center p-3 rounded-lg border border-[#1e2129] bg-[#121419]/70 hover:bg-[#161821] hover:border-[#2b2f3c] transition-colors duration-300 text-center"
                    >
                      <div className="text-[#888d9b] group-hover:text-[#dedfe4] transition-colors duration-300">
                        <Icon size={18} />
                      </div>
                      <span className="mt-2 text-[11px] font-mono text-[#787d8c] group-hover:text-[#b4b8c4] transition-colors duration-300 tracking-tight">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Understated Secondary Pursuit: Music Making */}
            <div className="mt-6 rounded-xl border border-[#1e2129] bg-[#121419]/40 p-4 sm:p-5 flex items-start gap-3.5">
              <div className="p-2 rounded-md bg-[#161820] text-[#7f8494] shrink-0 mt-0.5 border border-[#1e2129]">
                <MusicIcon size={16} />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8e93a2] font-medium">
                  Creative Side Pursuit &bull; Music Making
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#7a808e] leading-relaxed font-normal">
                  Outside of software engineering, I spend time making music and experimenting with sound and audio production in my spare time as an understated creative outlet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
