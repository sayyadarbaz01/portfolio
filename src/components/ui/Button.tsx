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
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary: "text-white",
    secondary: "text-white",
    outline: "border",
    ghost: "",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const variantStyles: React.CSSProperties =
    variant === "primary" || variant === "secondary"
      ? { backgroundColor: "var(--text-primary)", color: "var(--bg-base)" }
      : variant === "outline"
        ? {
            backgroundColor: "transparent",
            borderColor: "var(--card-border)",
            color: "var(--text-primary)",
          }
        : { backgroundColor: "transparent", color: "var(--text-secondary)" };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      style={variantStyles}
      {...props}
    >
      {children}
    </button>
  );
}
