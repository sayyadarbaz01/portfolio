"use client";

import React from "react";
import { cn } from "@/utils/helpers";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  glassmorphism?: boolean;
}

export function Card({
  children,
  hover = false,
  glassmorphism = true,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl sm:rounded-2xl transition-all duration-300",
        glassmorphism &&
          "backdrop-blur-md border",
        !glassmorphism &&
          "border",
        hover &&
          "hover:-translate-y-1",
        className
      )}
      style={{
        background: glassmorphism ? undefined : 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        boxShadow: hover ? undefined : 'var(--card-shadow)',
        ...(glassmorphism
          ? { background: 'var(--card-bg)', backdropFilter: 'blur(16px) saturate(1.4)' }
          : {}),
      }}
      onMouseEnter={hover ? (e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--card-hover-shadow)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(56,189,248,0.25)';
      } : undefined}
      onMouseLeave={hover ? (e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--card-shadow)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)';
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4 border-b border-slate-200 dark:border-slate-800/80", className)}>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4 border-t border-slate-200 dark:border-slate-800/80", className)}>
      {children}
    </div>
  );
}
