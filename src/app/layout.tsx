import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header, Footer } from "@/components";
import ToasterWrapper from "@/components/ui/Toaster";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Mohammed Rizwan | Senior Software Engineer",
  description:
    "Senior Software Engineer specializing in React, Next.js, Node.js, TypeScript, and modern web technologies. Building scalable, accessible, and high-performance applications. Available for full-time roles and freelance projects.",
  keywords: [
    "Mohammed Rizwan",
    "Senior Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "MERN Stack",
    "TypeScript",
    "Web Accessibility",
    "WCAG",
    "Frontend Engineer",
    "Node.js Developer",
    "Hyderabad",
    "India",
    "Remote Developer",
  ],
  authors: [{ name: "Mohammed Rizwan", url: "https://github.com/mohammedrizwan6477" }],
  creator: "Mohammed Rizwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mohammed Rizwan | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable, accessible applications.",
    siteName: "Mohammed Rizwan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Rizwan | Senior Software Engineer",
    description: "Senior Software Engineer | React · Next.js · Node.js · TypeScript · WCAG Accessibility",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToasterWrapper />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
