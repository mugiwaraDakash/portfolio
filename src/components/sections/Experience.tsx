"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Milestone, ShieldCheck } from "lucide-react";

const TIMELINE_EVENTS = [
  { year: "2024", title: "Started B.Tech", desc: "Computer Science (Cybersecurity & AI/ML)" },
  { year: "2024", title: "Learned C++", desc: "Mastered core systems syntax and object-oriented programming" },
  { year: "2024", title: "Data Structures & Algorithms", desc: "Strengthened core analytical problem-solving skills" },
  { year: "2025", title: "Web Development", desc: "Created modern interactive web interfaces with React & Tailwind" },
  { year: "2025", title: "Backend Development", desc: "Engineered scalable REST APIs using Node.js & Express" },
  { year: "2025", title: "Cybersecurity focus", desc: "Specialized in network security, packet analysis, and cryptography" },
  { year: "2026", title: "C-DOT Internship", desc: "Engineered one-way industrial data diodes and telemetry pipelines in Go" },
  { year: "2026", title: "Building Real World Projects", desc: "Fusing secure systems engineering with full stack architectures" }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register scrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !laserRef.current) return;

    // Animate the laser line height as user scrolls
    const laserAnim = gsap.fromTo(
      laserRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 55%",
          scrub: 0.8,
        }
      }
    );

    // Fade in milestones
    const elements = containerRef.current.querySelectorAll(".milestone-card");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => {
      laserAnim.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full relative">
      {/* Title */}
      <div className="mb-14 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Career Log <span className="text-[#3B82F6] font-mono">&lt;experience&gt;</span>
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl">
          A trace of my educational progress, skill acquisitions, and professional work at C-DOT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* C-DOT Internship Focus Card (Cols 1-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 relative overflow-hidden border border-white/5 shadow-xl">
            {/* Pulsing indicator */}
            <div className="absolute top-0 right-0 m-4 sm:m-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Active Intern</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#3B82F6]" />
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">C-DOT Internship</h3>
                <span className="text-xs font-mono text-neutral-500">Government R&D Centre</span>
              </div>
            </div>

            <div className="space-y-4 font-sans font-light text-sm md:text-[15px] text-neutral-300 leading-relaxed text-left">
              <p>
                Worked on an **OT Monitoring Platform** focused on secure industrial communication. Contributed to backend development in Go, log processing pipelines, OpenSearch integration, and dashboard visualization.
              </p>
              <p>
                Gained deep operational experience in industrial cybersecurity concepts (specifically hardware-layer unidirectional Data Diodes), scalable backend systems, and real-world software engineering practices.
              </p>
            </div>

            {/* Bullet achievements */}
            <div className="space-y-2 mt-6 pt-6 border-t border-white/5">
              {[
                "Developed Go pipelines parsing high-frequency industrial logs",
                "Integrated OpenSearch indexing for milliseconds search speeds",
                "Engineered responsive telemetry components in React",
                "Audited Modbus registers for potential buffer vulnerabilities"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-400 text-left">
                  <ShieldCheck className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* B.Tech Journey Timeline (Cols 6-12) */}
        <div className="lg:col-span-7 relative" ref={containerRef}>
          
          {/* Vertical Connecting Lines */}
          <div className="absolute left-4 top-3 bottom-3 w-[2px] bg-neutral-900 pointer-events-none">
            {/* Glowing active laser line controlled by GSAP */}
            <div 
              ref={laserRef}
              className="w-[2px] bg-gradient-to-b from-[#3B82F6] to-[#06B6D4] shadow-[0_0_8px_#06B6D4] absolute top-0 left-0"
              style={{ height: "0%" }}
            />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-5 sm:space-y-6 relative">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div 
                key={idx}
                className="flex items-start relative w-full"
              >
                {/* Central Node Indicator */}
                <div className="absolute left-4 -translate-x-1/2 top-4 w-3 h-3 rounded-full bg-neutral-950 border-2 border-neutral-700 z-20" />

                {/* Card container */}
                <div className="w-full pl-10">
                  <div className="milestone-card glass-panel rounded-2xl p-4 md:p-5 relative border border-white/5 bg-neutral-950/70 hover:border-[#3B82F6]/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.08)] transition-all text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-[#06B6D4] tracking-widest">
                        {event.year}
                      </span>
                      <Milestone className="w-3.5 h-3.5 text-neutral-600" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
