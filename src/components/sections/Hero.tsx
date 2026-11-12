"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Terminal, ArrowRight, Send } from "lucide-react";

const WORDS = [
  "Building Secure Systems",
  "Go Developer",
  "React Developer",
  "OpenSearch Enthusiast",
  "Problem Solver"
];

// Typing animation component
function TypingText() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === WORDS[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000); // Wait 2s before backspacing
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  return (
    <span className="font-mono text-[#06B6D4] font-bold text-glow-cyan">
      {WORDS[index].substring(0, subIndex)}
      <span className="animate-pulse font-light">|</span>
    </span>
  );
}

// Magnetic Hover Button Wrapper
function MagneticButton({ 
  children, 
  className, 
  href 
}: { 
  children: React.ReactNode; 
  className?: string; 
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const element = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href} className="inline-block">{element}</a>;
  }
  return element;
}

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen w-full flex flex-col justify-center items-center relative py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background radial gradient overlay to pull focus to center */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center z-20">
        
        {/* Text Information - Left Side (Cols 1-7) */}
        <div className="md:col-span-7 flex flex-col text-left space-y-6 select-none order-2 md:order-1">
          
          {/* Cyber Status Tagline */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2.5 bg-neutral-900/60 border border-white/5 w-fit py-1.5 px-3 rounded-full"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
              {"// Securing The Digital Horizon"}
            </span>
          </motion.div>

          {/* Massive Display Title */}
          <div className="space-y-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs font-mono tracking-[0.4em] text-neutral-500 uppercase"
            >
              System Architect
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none font-sans"
            >
              Akash Sharma
            </motion.h1>
          </div>

          {/* Subtitles & Typed Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-2 font-mono"
          >
            <div className="flex flex-wrap gap-2 text-xs md:text-sm text-neutral-400">
              <span className="text-white font-medium">Cybersecurity Engineer</span>
              <span>•</span>
              <span className="text-white font-medium">Full Stack Developer</span>
              <span>•</span>
              <span className="text-white font-medium">Competitive Programmer</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm md:text-base text-neutral-300 mt-1">
              <Terminal className="w-4 h-4 text-[#3B82F6]" />
              <span>akash@root:~$ </span>
              <TypingText />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <MagneticButton href="#projects" className="w-full sm:w-auto">
              <div className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 px-6 rounded-xl font-medium transition-all group/btn shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                View Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </div>
            </MagneticButton>

            <MagneticButton href="#contact" className="w-full sm:w-auto">
              <div className="flex items-center justify-center gap-2 bg-neutral-900/80 border border-white/10 hover:border-[#06B6D4]/50 text-white py-3 px-6 rounded-xl font-medium transition-all group/btn backdrop-blur-md">
                Secure Uplink
                <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </div>
            </MagneticButton>
          </motion.div>

        </div>

        {/* HUD Luffy Avatar - Right Side (Cols 8-12) */}
        <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center select-none"
          >
            {/* Concentric Rotating Outer HUD Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#3B82F6]/30 animate-spin-slow" />
            
            {/* Counter-rotating Inner HUD Ring */}
            <div className="absolute inset-4 rounded-full border border-double border-spacing-2 border-[#06B6D4]/40 animate-spin-reverse-slow" />
            
            {/* Glowing Shadow Background */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#3B82F6]/20 to-[#06B6D4]/20 blur-xl opacity-80" />

            {/* Futuristic ticks or reticles */}
            <div className="absolute -inset-1 border border-transparent border-t-[#06B6D4]/40 border-b-[#06B6D4]/40 rounded-full animate-[spin_8s_linear_infinite]" />
            <div className="absolute -inset-2 border border-transparent border-l-[#3B82F6]/30 border-r-[#3B82F6]/30 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

            {/* Profile Avatar Frame */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full overflow-hidden border-[3px] border-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.4)] bg-neutral-950">
              <Image
                src="/luffy.png"
                alt="Akash Sharma - Cyber Luffy Avatar"
                fill
                priority
                sizes="(max-width: 768px) 176px, (max-width: 1200px) 208px, 224px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Mini HUD Stats Tags around circle */}
            <div className="absolute bottom-2 right-2 glass-panel border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-neutral-400">
              ID: AKASH_S
            </div>
            <div className="absolute top-2 left-2 glass-panel border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-neutral-400">
              SYS: OK
            </div>
          </motion.div>
        </div>

      </div>

      {/* Floating Interactive Mouse Scroll Prompt */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none"
      >
        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-4 h-7 border border-neutral-600 rounded-full flex justify-center p-1">
          <span className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full animate-[bounce_1.2s_infinite]" />
        </div>
      </motion.div>
    </section>
  );
}
