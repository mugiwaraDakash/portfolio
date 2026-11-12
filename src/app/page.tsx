"use client";

import React, { useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/BentoGrid";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Experience from "@/components/sections/Experience";
import CompProgramming from "@/components/sections/CompProgramming";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Interactive terminal boot sequence pre-loader */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Main website layout - mounted once loader resolves */}
      {loaded && (
        <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#3B82F6]/30 overflow-hidden font-sans">
          {/* Neon mesh background highlights */}
          <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3B82F6]/10 blur-[100px] gpu" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#06B6D4]/10 blur-[100px] gpu" />
          </div>

          {/* Core Page Utilities */}
          <ScrollProgress />
          <Navbar />

          {/* Section stack */}
          <main className="relative z-10 w-full flex flex-col items-center">
            <Hero />
            <BentoGrid />
            <ProjectShowcase />
            <Experience />
            <CompProgramming />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}
