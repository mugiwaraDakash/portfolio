"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, Terminal, MapPin, Github, 
  Linkedin, Mail, FileText, CheckCircle
} from "lucide-react";

// SimpleIcons CDN Helper
const getIconUrl = (slug: string, color: string = "3B82F6") => {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
};

const SKILLS_DATA = {
  programming: [
    { name: "Go", slug: "go", color: "00ADD8" },
    { name: "C++", slug: "cplusplus", color: "00599C" },
    { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
    { name: "TypeScript", slug: "typescript", color: "3178C6" },
    { name: "SQL", slug: "sqlite", color: "003B57" }
  ],
  frontend: [
    { name: "React", slug: "react", color: "61DAFB" },
    { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
    { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
    { name: "HTML5", slug: "html5", color: "E34F26" },
    { name: "CSS3", slug: "css3", color: "1572B6" }
  ],
  backend: [
    { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
    { name: "Express", slug: "express", color: "FFFFFF" },
    { name: "REST APIs", slug: "fastapi", color: "009688" }
  ],
  database: [
    { name: "MongoDB", slug: "mongodb", color: "47A248" },
    { name: "OpenSearch", slug: "opensearch", color: "005EB8" },
    { name: "MySQL", slug: "mysql", color: "4479A1" }
  ],
  cybersecurity: [
    { name: "Network Security", slug: "wireshark", color: "167EC6" },
    { name: "Linux Security", slug: "linux", color: "FCC624" },
    { name: "Wireshark", slug: "wireshark", color: "167EC6" },
    { name: "Nmap", slug: "linux", color: "FCC624" },
    { name: "SIEM Basics", slug: "splunk", color: "F58220" },
    { name: "OT Security", slug: "fortinet", color: "EE3124" }
  ],
  tools: [
    { name: "Git", slug: "git", color: "F05032" },
    { name: "Docker", slug: "docker", color: "2496ED" },
    { name: "VS Code", slug: "visualstudiocode", color: "007ACC" },
    { name: "Postman", slug: "postman", color: "FF6C37" },
    { name: "Linux OS", slug: "linux", color: "FCC624" }
  ]
};

const STATS_DATA = [
  { label: "C-DOT Intern", value: "1", suffix: " Active" },
  { label: "Cyber Projects", value: "12", suffix: "+" },
  { label: "DSA Solved", value: "500", suffix: "+" },
  { label: "Security Audits", value: "8", suffix: "+" }
];

export default function BentoGrid() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof SKILLS_DATA>("programming");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full relative">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Intel Capsule <span className="text-[#3B82F6] font-mono">&lt;about&gt;</span>
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl">
          A clean snapshot of my engineering background, core skill matrix, and operational values.
        </p>
      </div>

      {/* Grid container — simplified layout for proper fitting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* About Bio Card */}
        <div className="glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle circuit background */}
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#3B82F6]/5 blur-[60px] pointer-events-none" />
          
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[#06B6D4]" />
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#06B6D4]">
                Biographic Profile
              </h3>
            </div>

            <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-sans font-light">
              I&apos;m Akash Sharma, a Computer Science student specializing in Cybersecurity and AI/ML. I enjoy building secure, scalable software that solves real-world problems. My interests span full-stack development, distributed systems, backend engineering, OT security, and competitive programming.
            </p>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-sans font-light">
              I constantly push myself to learn modern technologies and create impactful solutions. Currently, I&apos;m gaining practical experience through my internship at C-DOT while building projects that combine software engineering with cybersecurity.
            </p>
          </div>

          {/* Stats sub-grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-5 border-t border-white/5">
            {STATS_DATA.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {stat.value}
                  <span className="text-[#3B82F6]">{stat.suffix}</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Card */}
        <div id="skills" className="glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col overflow-hidden">
          <div className="space-y-4 w-full h-full flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-[#3B82F6]" />
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#3B82F6]">
                Security & Stack
              </h3>
            </div>

            {/* Tab navigation */}
            <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-xl font-mono text-[10px]">
              {Object.keys(SKILLS_DATA).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category as keyof typeof SKILLS_DATA)}
                  className={`flex-1 min-w-[50px] px-2 py-1.5 rounded-lg text-center capitalize transition-all ${
                    activeCategory === category 
                      ? "bg-[#3B82F6] text-white font-bold" 
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {category.slice(0, 5)}
                </button>
              ))}
            </div>

            {/* Skill list with simple icons */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 mt-3">
              {SKILLS_DATA[activeCategory].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-2.5 sm:p-3 bg-neutral-900/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors group/skill cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-950 flex items-center justify-center p-1.5 border border-white/5 group-hover/skill:border-[#3B82F6]/30 transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={getIconUrl(skill.slug, skill.color)} 
                        alt={`${skill.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-neutral-300 group-hover/skill:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  {/* Cyber glowing indicator */}
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover/skill:bg-[#06B6D4] group-hover/skill:shadow-[0_0_8px_#06B6D4] transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Geo/Time Card */}
        <div className="glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-[#06B6D4]/5 blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#06B6D4]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Location
              </span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_8px_#22C55E]" />
          </div>

          <div className="my-4">
            <h4 className="text-xl font-extrabold text-white">India</h4>
            <p className="text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
              IST (Asia/Kolkata)
            </p>
          </div>

          {/* Glowing Clock */}
          <div className="font-mono text-xs text-[#06B6D4] text-glow-cyan border-t border-white/5 pt-3 mt-1 flex justify-between items-center">
            <span>CLOCK_STATE:</span>
            <span className="font-bold tracking-widest">{currentTime || "00:00:00"}</span>
          </div>
        </div>

        {/* Social Links + Why Me combined */}
        <div className="flex flex-col gap-5">
          {/* Social Link Card */}
          <div className="glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
              <a 
                href="https://github.com" 
                target="_blank" 
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/10 hover:scale-[1.03] transition-all group"
              >
                <Github className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors mb-1.5" />
                <span className="text-[10px] font-mono uppercase text-neutral-500 group-hover:text-white transition-colors">
                  GitHub
                </span>
              </a>
              
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 hover:scale-[1.03] transition-all group"
              >
                <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors mb-1.5" />
                <span className="text-[10px] font-mono uppercase text-neutral-500 group-hover:text-white transition-colors">
                  LinkedIn
                </span>
              </a>

              <a 
                href="#contact" 
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/10 hover:scale-[1.03] transition-all group"
              >
                <Mail className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors mb-1.5" />
                <span className="text-[10px] font-mono uppercase text-neutral-500 group-hover:text-white transition-colors">
                  Email
                </span>
              </a>

              <a 
                href="#contact" 
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-[#22C55E]/50 hover:bg-[#22C55E]/10 hover:scale-[1.03] transition-all group"
              >
                <FileText className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors mb-1.5" />
                <span className="text-[10px] font-mono uppercase text-neutral-500 group-hover:text-white transition-colors">
                  Resume
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Why Me Card — Full Width */}
      <div className="glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl p-5 sm:p-6 mt-5 flex flex-col justify-between overflow-hidden relative">
        <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#06B6D4]/5 blur-[60px] pointer-events-none" />

        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-[#22C55E]" />
          <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#22C55E]">
            Core Professional Attributes
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { title: "Secure Software Development", desc: "Security first architecture" },
            { title: "Backend Engineering", desc: "High performance APIs in Go/Node" },
            { title: "Problem Solving", desc: "Analytical algorithmic mindset" },
            { title: "Scalable Architecture", desc: "Distributed system concepts" },
            { title: "Cybersecurity Mindset", desc: "Proactive threat vector analysis" },
            { title: "Continuous Learning", desc: "Constantly upgrading stack" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-3 bg-neutral-900/50 border border-white/5 rounded-xl hover:border-white/10 transition-colors"
            >
              <h4 className="text-xs font-bold text-white mb-0.5">{item.title}</h4>
              <p className="text-[10px] text-neutral-500 font-mono">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
