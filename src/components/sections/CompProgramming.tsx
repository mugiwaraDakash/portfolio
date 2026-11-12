"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Award, Target, Zap, TrendingUp, Brain, Code2 } from "lucide-react";

const CP_PLATFORMS = [
  { name: "LeetCode", solved: "500+", rating: "Active", color: "#F59E0B" },
  { name: "Codeforces", solved: "200+", rating: "Specialist", color: "#3B82F6" },
  { name: "CodeChef", solved: "150+", rating: "4★", color: "#22C55E" },
];

const PROBLEM_CATEGORIES = [
  { name: "Arrays & Strings", count: 120, percentage: 85 },
  { name: "Trees & Graphs", count: 95, percentage: 72 },
  { name: "Dynamic Programming", count: 80, percentage: 65 },
  { name: "Binary Search", count: 60, percentage: 78 },
  { name: "Greedy Algorithms", count: 55, percentage: 70 },
  { name: "Stack & Queue", count: 45, percentage: 82 },
];

const STATS = [
  { icon: Target, label: "Problems Solved", value: "500+", color: "#3B82F6" },
  { icon: Zap, label: "Contests", value: "50+", color: "#F59E0B" },
  { icon: TrendingUp, label: "Max Streak", value: "45 Days", color: "#22C55E" },
  { icon: Brain, label: "Strategy", value: "Divide & Conquer", color: "#06B6D4" },
];

export default function CompProgramming() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Code Rainfall Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const codePhrases = [
      "0", "1", "O(logN)", "O(1)", "vector", "dp", "dfs", "bfs", "std::sort",
      "fast_io", "int", "main()", "#include", "const", "return 0;", "map", "set"
    ];

    const fontSize = 11;
    const columns = Math.floor(canvas.width / 55);
    const drops: number[] = [];
    const phrases: string[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      phrases[i] = codePhrases[Math.floor(Math.random() * codePhrases.length)];
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(6, 182, 212, 0.2)";
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const text = phrases[i];
        const x = i * 65;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          phrases[i] = codePhrases[Math.floor(Math.random() * codePhrases.length)];
        }

        drops[i] += 0.8;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full relative">

      {/* Background Canvas Rainfall */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 overflow-hidden rounded-3xl">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Title */}
      <div className="mb-12 text-center md:text-left relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Algorithmic Engine <span className="text-[#3B82F6] font-mono">&lt;coding&gt;</span>
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl">
          Strengthening analytical capacity through competitive programming and algorithmic problem solving.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 relative z-10">
        {STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 flex flex-col gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{
                backgroundColor: `${stat.color}10`,
                borderColor: `${stat.color}30`,
              }}
            >
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-white font-mono block leading-tight">
                {stat.value}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mt-0.5 block">
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

        {/* Platform Cards - Left (Cols 1-5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-[#06B6D4]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
              Platforms
            </h3>
          </div>

          {CP_PLATFORMS.map((platform, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border font-mono text-sm font-bold"
                  style={{
                    backgroundColor: `${platform.color}15`,
                    borderColor: `${platform.color}30`,
                    color: platform.color,
                  }}
                >
                  {platform.name.charAt(0)}
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-white block">{platform.name}</span>
                  <span className="text-[10px] font-mono text-neutral-500">{platform.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-white font-mono">{platform.solved}</span>
                <span className="text-[9px] font-mono text-neutral-500 block uppercase">solved</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Problem Breakdown - Right (Cols 6-12) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-5">
            <Code2 className="w-4 h-4 text-[#3B82F6]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#3B82F6]">
              Problem Solving Breakdown
            </h3>
          </div>

          <div className="space-y-4">
            {PROBLEM_CATEGORIES.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs sm:text-sm text-neutral-300 font-medium">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-500">{category.count} solved</span>
                    <span className="text-xs font-mono font-bold text-white">{category.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full relative"
                    style={{
                      background: `linear-gradient(90deg, #3B82F6, #06B6D4)`,
                    }}
                  >
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ boxShadow: "0 0 8px rgba(59,130,246,0.5)" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom mini-stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/5">
            <div className="text-center">
              <span className="text-lg font-extrabold text-white font-mono block">O(log n)</span>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Target Complexity</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-extrabold text-[#06B6D4] font-mono block">&lt; 1s</span>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Execution Goal</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-extrabold text-[#22C55E] font-mono block">C++</span>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Primary Lang</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
