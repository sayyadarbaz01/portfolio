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
  const currentCountRef = useRef(0);
  const animatedTargetRef = useRef<number | null>(null);

  useEffect(() => {
    currentCountRef.current = count;
  }, [count]);

  useEffect(() => {
    if (!isInView) return;
    if (animatedTargetRef.current === target) return;

    animatedTargetRef.current = target;
    const startVal = currentCountRef.current;
    const startTime = Date.now() + delay * 1000;
    const totalDuration = duration * 1000;

    let animationFrameId: number;

    const update = () => {
      const now = Date.now();
      if (now < startTime) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextCount = Math.floor(startVal + eased * (target - startVal));
      setCount(nextCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, target, duration, delay]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}
