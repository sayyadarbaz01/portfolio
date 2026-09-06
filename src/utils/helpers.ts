import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { trackResumeDownload } from "@/actions/feedback";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadResume() {
  // Track the download in database
  try {
    await trackResumeDownload();
  } catch (error) {
    console.error("Failed to track download:", error);
  }

  // Trigger download with fallback ID if env variable is not set on Vercel
  const resumeId = process.env.NEXT_PUBLIC_RESUME_ID || "1eb60XrobRG9EaK8uLfCWmvfXIffN5JUq";
  const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${resumeId}`;
  const link = document.createElement("a");
  link.href = directDownloadUrl;
  link.setAttribute("download", "Arbaz_Sayyad_Resume.pdf");
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

