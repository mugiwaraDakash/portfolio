"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-full border transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-neutral-950/80 shadow-[0_0_20px_rgba(59,130,246,0.1)] border-white/10 py-3 px-6"
            : "bg-transparent border-transparent py-5 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Terminal Theme */}
          <a href="#home" className="flex items-center gap-2 group cursor-pointer font-mono">
            <Shield className="w-5 h-5 text-[#3B82F6] group-hover:text-[#06B6D4] transition-colors" />
            <span className="text-white font-bold tracking-tight text-sm md:text-base">
              akash<span className="text-[#06B6D4]">@</span>sharma:<span className="text-[#3B82F6]">~#</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Available Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 px-3 py-1.5 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[10px] font-bold font-mono text-[#22C55E] uppercase tracking-wider">
              C-DOT Intern
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden glass-panel bg-neutral-950/95 border border-white/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col gap-4 font-mono text-sm">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-neutral-400 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                >
                  <span className="text-[#06B6D4] mr-2">&gt;</span>
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 px-4 py-2.5 rounded-xl mt-2 justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                  Active Intern @ C-DOT
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
