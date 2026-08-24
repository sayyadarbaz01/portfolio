"use client";

import React from "react";
import { cn } from "@/utils/helpers";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  id?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section({ children, title, subtitle, className, id, ...props }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative py-12 sm:py-20 px-3 sm:px-6 lg:px-8", className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto">
          {(title || subtitle) && (
            <div className="mb-8 sm:mb-12 text-center">
              {title && (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3 font-mono">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  }
);

export function Container({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  );
}
