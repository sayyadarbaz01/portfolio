"use client";

import React from "react";
import { cn } from "@/utils/helpers";
import { Reveal } from "./Motion";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  id?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section({ children, title, subtitle, eyebrow, className, id, ...props }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative py-14 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24", className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto">
          {(title || subtitle || eyebrow) && (
            <Reveal className="mb-8 sm:mb-12 text-left">
              {eyebrow && (
                <p className="eyebrow mb-3">{eyebrow}</p>
              )}
              {title && (
                <h2 className="font-display text-section-fluid font-semibold tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm sm:text-base max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                  {subtitle}
                </p>
              )}
            </Reveal>
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
