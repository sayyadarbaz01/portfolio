import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function downloadResume() {
  // 1. Get the shareable link of your PDF file from Google Drive (Make sure it's "Anyone with the link can view")
  // 2. The link will look like: https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing
  // 3. Copy just the YOUR_FILE_ID part and paste it below:
  // This special Google Drive URL forces a direct download of a FILE (Not a folder)
  const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${process.env.NEXT_PUBLIC_RESUME_ID}`;

  const link = document.createElement("a");
  link.href = directDownloadUrl;
  link.setAttribute("download", "MRizwan_Resume.pdf");
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
