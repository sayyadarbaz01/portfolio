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
        "rounded-2xl transition-all duration-300",
        glassmorphism &&
          "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10",
        !glassmorphism &&
          "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
        hover &&
          "hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 hover:-translate-y-1",
        className
      )}
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
    <div className={cn("px-6 py-4 border-b border-white/10", className)}>
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
    <div className={cn("px-6 py-4 border-t border-white/10", className)}>
      {children}
    </div>
  );
}
