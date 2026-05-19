"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isInView: boolean;
  delay?: number;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  isInView,
  delay = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const update = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(update);
        return;
      }
      const elapsed = now - startTime;
      const totalDuration = duration * 1000;
      const progress = Math.min(elapsed / totalDuration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, target, duration, delay]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}
