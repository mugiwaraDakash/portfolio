"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, HardDrive, ShieldAlert, ArrowRight, Github, 
  BookOpen, Layers, Activity, ExternalLink, Terminal
} from "lucide-react";

// Mock log entries for the live console
const MOCK_LOGS = [
  { time: "09:45:12", source: "PLC-01", msg: "Modbus telemetry packet received", level: "INFO" },
  { time: "09:45:14", source: "DIODE-IN", msg: "Data packet isolation validation passed", level: "SUCCESS" },
  { time: "09:45:15", source: "DIODE-OUT", msg: "Forwarding un-idirectional stream", level: "SUCCESS" },
  { time: "09:45:15", source: "GO-PIPE", msg: "Parsing JSON frame checksum=0xAB82", level: "INFO" },
  { time: "09:45:16", source: "OPENSEARCH", msg: "Indexed 1 document in ot-logs-v1", level: "INFO" },
  { time: "09:45:18", source: "PLC-02", msg: "Temperature threshold warning 84.3C", level: "WARN" },
  { time: "09:45:20", source: "PLC-04", msg: "Rotational rate stabilized 1500rpm", level: "INFO" }
];

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState<"architecture" | "dashboard">("architecture");
  const [liveLogs, setLiveLogs] = useState(MOCK_LOGS);
  const [chartPoints, setChartPoints] = useState<number[]>([30, 45, 35, 60, 50, 40, 55, 48]);
  const [plcStatus, setPlcStatus] = useState<"normal" | "warn">("normal");

  // Telemetry loop for the interactive dashboard
  useEffect(() => {
    if (activeTab !== "dashboard") return;

    const interval = setInterval(() => {
      // Rotate logs
      setLiveLogs((prev) => {
        const nextLogs = [...prev];
        nextLogs.shift();
        
        // Randomly pick log structure
        const sources = ["PLC-01", "PLC-02", "PLC-03", "DIODE", "GO-PIPE", "OPENSEARCH"];
        const randomSource = sources[Math.floor(Math.random() * sources.length)];
        let randomMsg = "Synchronized telemetry packet";
        let level = "INFO";

        if (randomSource.startsWith("PLC")) {
          const val = Math.floor(Math.random() * 20) + 70;
          if (val > 85) {
            randomMsg = `Critical warning: heat overload ${val}C`;
            level = "WARN";
            setPlcStatus("warn");
          } else {
            randomMsg = `Telemetry state nominal temp=${val}C`;
            level = "INFO";
            setPlcStatus("normal");
          }
        } else if (randomSource === "DIODE") {
          randomMsg = "Physical layer separation verified";
          level = "SUCCESS";
        } else if (randomSource === "OPENSEARCH") {
          randomMsg = `Indexed logs bulk count=${Math.floor(Math.random() * 10) + 1}`;
          level = "INFO";
        }

        const now = new Date();
        const timeStr = now.toTimeString().split(" ")[0];

        nextLogs.push({
          time: timeStr,
          source: randomSource,
          msg: randomMsg,
          level
        });
        return nextLogs;
      });

      // Update Chart points
      setChartPoints((prev) => {
        const nextPoints = [...prev];
        nextPoints.shift();
        nextPoints.push(Math.floor(Math.random() * 60) + 20); // random value between 20-80
        return nextPoints;
      });

    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full relative">
      
      {/* Title */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Featured Deployment <span className="text-[#3B82F6] font-mono">&lt;projects&gt;</span>
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl">
          Deep-dive into my primary operational platform engineered for secure industrial monitoring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Project Context: Left Column (Cols 1-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full text-xs font-mono text-[#3B82F6]">
              <Layers className="w-3.5 h-3.5" />
              <span>C-DOT Internship Work</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              OT Monitoring Platform
            </h3>

            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Developed an Operational Technology monitoring platform during internship work. The system securely collects industrial log data through a Data Diode, processes incoming telemetry using Go, stores logs in OpenSearch, and visualizes them through an interactive dashboard.
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              The platform focuses on secure one-way communication, log aggregation, and real-time monitoring for air-gapped industrial control environments.
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Go", "React", "OpenSearch", "Docker", "REST API", "Data Diode"].map((tech) => (
                <span 
                  key={tech} 
                  className="text-[10px] font-mono font-medium bg-neutral-900/80 border border-white/5 px-2.5 py-1 rounded-md text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-medium py-3 px-5 rounded-xl transition-all group"
            >
              <Github className="w-4 h-4" />
              <span>Repository</span>
              <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
            </a>

            <a 
              href="#contact" 
              className="flex items-center gap-2 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#3B82F6] hover:text-white text-xs font-medium py-3 px-5 rounded-xl transition-all group"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Interactive Display HUD: Right Column (Cols 6-12) */}
        <div className="lg:col-span-7 flex flex-col glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 min-h-[380px] sm:min-h-[420px]">
          
          {/* Header Sandbox Tabs */}
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-950/80 border-b border-white/5">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Activity className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-white font-bold tracking-tight">OPERATIONAL_SANDBOX</span>
            </div>
            
            <div className="flex gap-1 bg-white/5 p-1 rounded-xl font-mono text-[10px]">
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "architecture" 
                    ? "bg-[#3B82F6] text-white font-bold" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Architecture
              </button>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "dashboard" 
                    ? "bg-[#3B82F6] text-white font-bold" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Telemetry Monitor
              </button>
            </div>
          </div>

          {/* Sandbox content area */}
          <div className="p-6 flex-1 flex flex-col justify-center bg-neutral-950/40 relative">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: ARCHITECTURE FLOW */}
              {activeTab === "architecture" && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full space-y-6"
                >
                  <div className="relative w-full h-[280px] border border-white/5 rounded-2xl p-4 bg-neutral-950/90 overflow-hidden flex flex-col justify-between">
                    
                    {/* Animated packets flow overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* SVG path lines connecting nodes */}
                      <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                        {/* Connecting Line 1 */}
                        <path 
                          d="M 50,75 L 180,75 L 180,180 L 310,180 L 440,180" 
                          fill="none" 
                          stroke="rgba(59, 130, 246, 0.2)" 
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        {/* Connecting Line 2 (Data flow line) */}
                        <path 
                          d="M 50,75 L 180,75 L 180,180 L 310,180 L 440,180" 
                          fill="none" 
                          stroke="#06B6D4" 
                          strokeWidth="2"
                          strokeDasharray="10 150"
                          strokeDashoffset="10"
                          className="animate-[scanline_3s_linear_infinite]"
                          pathLength="200"
                        />
                      </svg>
                    </div>

                    {/* Nodes Row 1 */}
                    <div className="flex justify-between items-center z-10">
                      {/* Industrial Control Node */}
                      <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-white/5 rounded-lg w-[140px]">
                        <Cpu className="w-4 h-4 text-orange-500" />
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] font-bold text-white leading-none">PLC_NODE</span>
                          <span className="text-[8px] font-mono text-neutral-500">Telemetry Out</span>
                        </div>
                      </div>

                      {/* Data Diode Node */}
                      <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-red-500/20 rounded-lg w-[140px] relative shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping m-1" />
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] font-bold text-white leading-none">DATA_DIODE</span>
                          <span className="text-[8px] font-mono text-red-400">One-Way Isolator</span>
                        </div>
                      </div>
                    </div>

                    {/* Mid connector illustration (physical isolator) */}
                    <div className="text-center font-mono text-[9px] text-neutral-600 uppercase tracking-widest z-10 py-1">
                      ── [ Physical Air Gap ] ──
                    </div>

                    {/* Nodes Row 2 */}
                    <div className="flex justify-between items-center z-10">
                      {/* Go Ingestion Pipeline */}
                      <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-[#06B6D4]/30 rounded-lg w-[140px] shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                        <Terminal className="w-4 h-4 text-[#06B6D4]" />
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] font-bold text-white leading-none">GO_PIPELINE</span>
                          <span className="text-[8px] font-mono text-[#06B6D4]">JSON Ingestion</span>
                        </div>
                      </div>

                      {/* OpenSearch Database */}
                      <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-white/5 rounded-lg w-[140px]">
                        <HardDrive className="w-4 h-4 text-purple-500" />
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] font-bold text-white leading-none">OPENSEARCH</span>
                          <span className="text-[8px] font-mono text-neutral-500">Log Indexer</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  
                  <div className="flex items-center gap-2.5 text-[11px] font-mono text-neutral-500 border border-white/5 bg-neutral-950 p-3 rounded-xl">
                    <span className="text-[#3B82F6] font-bold">INFO:</span>
                    <span>Industrial data flows strictly left-to-right. Physical diode isolation prevents back-channel cybersecurity attacks.</span>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: TELEMETRY MONITOR (CONSOLE + CHART) */}
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    
                    {/* Live Ticker Terminal - Left (Cols 1-7) */}
                    <div className="sm:col-span-7 bg-black border border-white/5 rounded-2xl p-4 font-mono text-[10px] h-[210px] flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                        <span className="text-neutral-500">SECURE_INGESTION_LOG</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${plcStatus === "normal" ? "bg-[#22C55E]" : "bg-yellow-500"} animate-pulse`} />
                          <span className="text-neutral-500 text-[8px] uppercase">{plcStatus}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-1.5">
                        {liveLogs.map((log, index) => {
                          let color = "text-neutral-400";
                          if (log.level === "SUCCESS") color = "text-[#22C55E]";
                          if (log.level === "WARN") color = "text-yellow-500 font-bold";
                          return (
                            <div key={index} className="flex gap-1.5 items-start">
                              <span className="text-neutral-600 shrink-0">[{log.time}]</span>
                              <span className="text-[#3B82F6] shrink-0">[{log.source}]</span>
                              <span className={`${color} break-all`}>{log.msg}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Metric Widgets - Right (Cols 8-12) */}
                    <div className="sm:col-span-5 flex flex-col justify-between gap-4">
                      
                      {/* Animated Mini Chart */}
                      <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-3 flex-1 flex flex-col justify-between h-[100px]">
                        <span className="font-mono text-[9px] text-neutral-500 uppercase">
                          Network Bandwidth (KB/s)
                        </span>
                        
                        {/* Dynamic SVG Sparkline */}
                        <div className="h-10 w-full mt-2">
                          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {/* Area Fill */}
                            <path
                              d={`M 0,40 ${chartPoints.map((p, i) => `L ${(i / (chartPoints.length - 1)) * 100},${40 - (p / 100) * 35}`).join(" ")} L 100,40 Z`}
                              fill="url(#chartGlow)"
                            />
                            {/* Stroke path */}
                            <path
                              d={chartPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (chartPoints.length - 1)) * 100},${40 - (p / 100) * 35}`).join(" ")}
                              fill="none"
                              stroke="#06B6D4"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Operational Nodes Status */}
                      <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-3 h-[96px] flex flex-col justify-between">
                        <span className="font-mono text-[9px] text-neutral-500 uppercase">
                          Collector Node Status
                        </span>
                        <div className="grid grid-cols-6 gap-1.5 mt-2">
                          {[1, 2, 3, 4, 5, 6].map((num) => {
                            // plc-02 has temperature warning sometimes
                            const isWarn = num === 2 && plcStatus === "warn";
                            return (
                              <div 
                                key={num} 
                                className={`h-8 rounded-lg flex flex-col items-center justify-center border font-mono text-[9px] transition-all ${
                                  isWarn 
                                    ? "bg-yellow-500/10 border-yellow-500/40 text-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.2)]" 
                                    : "bg-neutral-950 border-white/5 text-[#22C55E]"
                                }`}
                              >
                                <span>{num}</span>
                                <span className={`w-1.5 h-1.5 rounded-full ${isWarn ? "bg-yellow-500" : "bg-[#22C55E]"} mt-0.5`} />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
