"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const handleRaf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(handleRaf);
    };

    requestAnimationFrame(handleRaf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
