import { useEffect } from "react";
import { trackPortfolioVisit } from "@/actions/feedback";

export function useTrackVisit() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await trackPortfolioVisit();
      } catch (error) {
        console.error("Failed to track visit:", error);
      }
    };

    trackVisit();
  }, []);
}
