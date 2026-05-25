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
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h2>
              )}
              {subtitle && (
                <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
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
