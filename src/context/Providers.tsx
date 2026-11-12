"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    // Update ScrollTrigger on Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    // Integrate Lenis RAF loop with GSAP ticker
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);

    // Turn off lag smoothing for smooth GSAP animations
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, []);

  return <>{children}</>;
}
