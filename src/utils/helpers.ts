import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function downloadResume() {
  const link = document.createElement("a");
  link.href = "/resume.pdf";
  link.setAttribute("download", "Mohammed_Rizwan_Resume.pdf");
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
