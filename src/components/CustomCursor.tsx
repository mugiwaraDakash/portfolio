"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Set initial coordinates off screen
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring settings for the outer cybernetic circle delay
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide mouse default cursor on mounting
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".magnetic-btn") ||
        target.classList.contains("clickable")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "default";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny Instant Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#06B6D4] rounded-full pointer-events-none z-[99999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: clicked ? 0.6 : 1.0,
          backgroundColor: hovered ? "#22C55E" : "#06B6D4"
        }}
      />

      {/* Lagging outer cyber target reticle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-dashed pointer-events-none z-[99998] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.6 : 1.0,
          rotate: hovered ? 90 : 0,
          borderColor: clicked ? "#22C55E" : hovered ? "#06B6D4" : "#3B82F6",
          borderWidth: hovered ? "2px" : "1px",
          borderStyle: hovered ? "solid" : "dashed"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Cyber Crosshairs */}
        <span className={`absolute w-[5px] h-[1px] top-0 left-1/2 -translate-x-1/2 ${clicked ? "bg-[#22C55E]" : hovered ? "bg-[#06B6D4]" : "bg-[#3B82F6]"}`} />
        <span className={`absolute w-[5px] h-[1px] bottom-0 left-1/2 -translate-x-1/2 ${clicked ? "bg-[#22C55E]" : hovered ? "bg-[#06B6D4]" : "bg-[#3B82F6]"}`} />
        <span className={`absolute w-[1px] h-[5px] left-0 top-1/2 -translate-y-1/2 ${clicked ? "bg-[#22C55E]" : hovered ? "bg-[#06B6D4]" : "bg-[#3B82F6]"}`} />
        <span className={`absolute w-[1px] h-[5px] right-0 top-1/2 -translate-y-1/2 ${clicked ? "bg-[#22C55E]" : hovered ? "bg-[#06B6D4]" : "bg-[#3B82F6]"}`} />
      </motion.div>
    </>
  );
}
