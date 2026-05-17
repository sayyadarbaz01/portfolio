"use client";

import React, { createContext, useContext } from "react";
import { useTheme as useThemeHook } from "@/hooks";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeHook();

  // Always provide context (even before mounted) so useTheme never throws.
  // Components can check `mounted` themselves to avoid hydration mismatches.
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
