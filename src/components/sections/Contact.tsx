"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  Send, Mail, Github, Linkedin, FileText, 
  Terminal, ShieldCheck, Copy, Check 
} from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "connecting" | "transmitting" | "success">("idle");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("akash@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Trigger transmission animation sequence
    setStatus("connecting");

    setTimeout(() => {
      setStatus("transmitting");
    }, 1200);

    setTimeout(() => {
      setStatus("success");
      // Trigger canvas confetti explosion
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#3B82F6", "#06B6D4", "#22C55E"]
      });
    }, 2500);
  };

  const handleReset = () => {
    setFormState({ name: "", email: "", message: "" });
    setStatus("idle");
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full relative">
      {/* Background Glow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#3B82F6]/5 blur-[60px] pointer-events-none" />

      {/* Title */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Secure Link <span className="text-[#3B82F6] font-mono">&lt;contact&gt;</span>
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl">
          Establish an encrypted transmission line or fetch credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Info & Socials (Cols 1-5) */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6 text-left">
          
          {/* Glass Card coordinates */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#3B82F6]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#3B82F6]">
                  Operational Comms
                </span>
              </div>

              {/* Email Copier */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-500 uppercase block">Secure Mail</span>
                <div 
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between p-3.5 bg-neutral-950 border border-white/5 hover:border-[#3B82F6]/40 rounded-2xl cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-[#06B6D4] shrink-0" />
                    <span className="text-sm font-mono text-white truncate">akash@example.com</span>
                  </div>
                  {copied ? (
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-500 group-hover:text-white shrink-0 transition-colors" />
                  )}
                </div>
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="space-y-3 mt-8">
              <span className="text-xs font-mono text-neutral-500 uppercase block">Handshake Targets</span>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="https://github.com" 
                  target="_blank"
                  className="flex items-center gap-2 bg-neutral-900 border border-white/5 hover:border-[#3B82F6]/50 px-4 py-2.5 rounded-xl text-xs font-mono text-neutral-300 hover:text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  className="flex items-center gap-2 bg-neutral-900 border border-white/5 hover:border-[#06B6D4]/50 px-4 py-2.5 rounded-xl text-xs font-mono text-neutral-300 hover:text-white transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                <a 
                  href="#contact"
                  className="flex items-center gap-2 bg-neutral-900 border border-[#22C55E]/15 hover:border-[#22C55E]/50 px-4 py-2.5 rounded-xl text-xs font-mono text-[#22C55E] hover:text-white transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume.pdf</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Secure Terminal Form (Cols 6-12) */}
        <div className="md:col-span-7 glass-panel rounded-3xl p-6 md:p-8 border border-white/5 flex flex-col justify-between min-h-[380px]">
          
          <AnimatePresence mode="wait">
            {status === "idle" ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 text-left w-full"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-[#06B6D4]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
                    Transmission Form
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      Operator Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Monkey D. Luffy"
                      className="w-full bg-neutral-950 border border-white/5 focus:border-[#3B82F6]/50 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      Encryption Return (Email)
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="operator@system.org"
                      className="w-full bg-neutral-950 border border-white/5 focus:border-[#3B82F6]/50 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    Payload (Message)
                  </label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Enter secure message packet contents..."
                    className="w-full bg-neutral-950 border border-white/5 focus:border-[#3B82F6]/50 rounded-xl p-4 text-sm text-white font-mono focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Packet</span>
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="status-display"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-6 text-center font-mono space-y-4"
              >
                {status === "connecting" && (
                  <div className="space-y-4">
                    <div className="w-10 h-10 border-2 border-t-[#3B82F6] border-neutral-950 rounded-full animate-spin mx-auto" />
                    <div className="space-y-1 text-sm">
                      <span className="text-[#3B82F6] font-bold block animate-pulse">CONNECTING...</span>
                      <span className="text-neutral-500 text-xs">RESOLVING UPLINK NODE</span>
                    </div>
                  </div>
                )}

                {status === "transmitting" && (
                  <div className="space-y-4">
                    <div className="w-10 h-10 border-2 border-t-[#06B6D4] border-neutral-950 rounded-full animate-spin mx-auto" />
                    <div className="space-y-1 text-sm">
                      <span className="text-[#06B6D4] font-bold block animate-pulse">TRANSMITTING...</span>
                      <span className="text-neutral-500 text-xs">ENCRYPTING & FORWARDING PAYLOAD</span>
                    </div>
                  </div>
                )}

                {status === "success" && (
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                      <ShieldCheck className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <span className="text-[#22C55E] font-bold block">TRANSMISSION COMPLETED</span>
                      <span className="text-neutral-400 text-xs">PACKET ROUTED SUCCESSFULLY.</span>
                    </div>
                    <button 
                      onClick={handleReset}
                      className="px-4 py-2 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white rounded-xl text-xs uppercase"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Footer Details */}
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <p className="text-xs font-mono text-neutral-400">
            akash@portfolio:~$ <span className="text-white font-bold">quote</span>
          </p>
          <p className="text-sm font-sans italic text-neutral-300 font-light">
            &quot;Code with logic. Build with purpose. Secure the future.&quot;
          </p>
        </div>
        
        <div className="text-[10px] font-mono text-neutral-500">
          <span>© 2026 Akash Sharma • All Transmission Rights Reserved</span>
        </div>
      </div>
    </section>
  );
}
