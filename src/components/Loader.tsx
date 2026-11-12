"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "INITIALIZING SECURE PROTOCOL...",
  "ESTABLISHING HANDSHAKE...",
  "DECRYPTING INTERFACE LOGIC...",
  "SYNCHRONIZING TELEMETRY STACK...",
  "BYPASSING OT DATA DIODE...",
  "LOADING NEURAL GRAPHICS...",
  "DECRYPTING LUFFY.SYS...",
  "ACCESS GRANTED."
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 600);
          return 100;
        }
        // Random increment for realistic loading feel
        const diff = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + diff, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Map progress to log messages
    const targetIndex = Math.min(
      Math.floor((progress / 100) * BOOT_LOGS.length),
      BOOT_LOGS.length - 1
    );
    if (targetIndex > logIndex) {
      setLogIndex(targetIndex);
    }
  }, [progress, logIndex]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -50,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6 font-mono"
        >
          {/* Neon Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 scanline pointer-events-none opacity-20" />

          {/* Central Terminal Console */}
          <div className="w-full max-w-lg glass-panel p-6 rounded-2xl relative overflow-hidden">
            {/* Glowing borders */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent animate-pulse" />

            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-[#22C55E]/80" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                Secure Boot v4.19
              </span>
            </div>

            {/* Percentage Display */}
            <div className="text-center my-6">
              <motion.h1 
                className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] tracking-tighter"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {progress}%
              </motion.h1>
            </div>

            {/* Log Output */}
            <div className="h-20 flex flex-col justify-end text-[12px] md:text-[13px] text-neutral-400 space-y-1.5 overflow-hidden">
              {BOOT_LOGS.slice(0, logIndex + 1).map((log, index) => {
                const isLatest = index === logIndex;
                return (
                  <motion.div
                    key={log}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-2 ${
                      isLatest ? "text-[#06B6D4] font-bold" : "text-neutral-500"
                    }`}
                  >
                    <span>{isLatest ? ">" : "√"}</span>
                    <span>{log}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden mt-6">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="absolute bottom-10 text-[10px] text-neutral-600 tracking-[0.3em] uppercase">
            Awwwards Inspired Design // System
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
