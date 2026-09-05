import { useEffect } from "react";
import { trackPortfolioVisit } from "@/actions/feedback";

export function useTrackVisit() {
  useEffect(() => {
    const timer = setTimeout(() => {
      trackPortfolioVisit().catch((error) => {
        console.error("Failed to track visit:", error);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);
}
