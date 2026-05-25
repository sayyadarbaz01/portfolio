"use client";

import React from "react";
import { cn } from "@/utils/helpers";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/50 focus:ring-blue-500",
    secondary:
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 focus:ring-purple-500",
    outline:
      "border text-[var(--text-primary)] focus:ring-[var(--accent-blue)]",
    ghost:
      "text-[var(--text-secondary)] focus:ring-[var(--accent-blue)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const outlineStyle = (variant === 'outline' || variant === 'ghost')
    ? { borderColor: 'var(--border-base)' } as React.CSSProperties
    : undefined;

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      style={outlineStyle}
      {...props}
    >
      {children}
    </button>
  );
}
