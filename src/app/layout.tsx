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
  title: "Arbaz Sayyad | Senior Full Stack Developer",
  description:
    "Senior Full Stack Developer with 5+ years architecting scalable, enterprise-grade applications using React.js, Node.js, Express.js, SQL, MongoDB, and Redux Toolkit. Delivered measurable BFSI performance gains through AI integration, code splitting, and CI/CD excellence.",
  keywords: [
    "Arbaz Sayyad",
    "Senior Full Stack Engineer",
    "AI Integration Engineer",
    "React Developer",
    "Node.js Developer",
    "Full Stack Developer",
    "MERN Stack",
    "TypeScript",
    "OpenAI API",
    "RAG",
    "Vector Search",
    "FinTech",
    "Pune",
    "India",
    "Remote Developer",
  ],
  authors: [{ name: "Arbaz Sayyad", url: "https://github.com/sayyadarbaz01" }],
  creator: "Arbaz Sayyad",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arbaz Sayyad | Senior Full Stack Developer",
    description:
      "Senior Full Stack Developer specializing in React, Node.js, OpenAI API, RAG, and modern web technologies. Building scalable, high-performance applications.",
    siteName: "Arbaz Sayyad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Sayyad | Senior Full Stack Developer",
    description: "Senior Full Stack Developer | React · Node.js · OpenAI API · RAG · TypeScript",
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
        {/* Animated Blobs Background */}
        <div className="animated-blobs-container">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ToasterWrapper />
            <ScrollToTop />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
