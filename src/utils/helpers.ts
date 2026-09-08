import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { trackResumeDownload } from "@/actions/feedback";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadResume() {
  // Fire tracking asynchronously without blocking UI or expiring user gesture token
  trackResumeDownload().catch((error) => {
    console.error("Failed to track download:", error);
  });

  // Trigger download with fallback ID if env variable is not set on Vercel
  const resumeId = process.env.NEXT_PUBLIC_RESUME_ID || "1SU1qaAA4dTp5sVz8k2jLaLR2u3fRkBle";
  const downloadUrl = `https://drive.google.com/file/d/${resumeId}/view?usp=sharing`;
  const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${resumeId}`;

  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      typeof navigator !== "undefined" ? navigator.userAgent : ""
    );

    if (isMobile) {
      // On mobile devices, window.open in new tab works 100% reliably without popup blocker interference
      window.open(downloadUrl, "_blank", "noopener,noreferrer");
    } else {
      const link = document.createElement("a");
      link.href = directDownloadUrl;
      link.setAttribute("download", "Arbaz_Sayyad_Resume.pdf");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (err) {
    window.open(downloadUrl, "_blank", "noopener,noreferrer");
  }
}

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

