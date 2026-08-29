"use client";

import React from "react";
import { cn } from "@/utils/helpers";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "warning";
  children: React.ReactNode;
}

export function Badge({ variant = "primary", className, children }: BadgeProps) {
  const variants = {
    primary: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    secondary:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    outline:
      "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200",
    success:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    warning:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
