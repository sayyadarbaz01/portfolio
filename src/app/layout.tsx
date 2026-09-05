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
  title: "Arbaz Sayyad | Full Stack Developer (3+ YOE) | React · Node.js · AI/RAG",
  description:
    "Full Stack Developer with 3+ YOE architecting enterprise web apps, resilient microservices, and AI workflows. Reduced page load times (4s→2s), cut dev overhead by 25%, analyst write-up time by 35%, and vector retrieval latency by 40% for 500+ daily users.",
  keywords: [
    "Arbaz Sayyad",
    "Full Stack Developer",
    "Senior Full Stack Engineer",
    "React Developer",
    "TypeScript Engineer",
    "Node.js Developer",
    "Redux Toolkit",
    "MUI",
    "Tailwind CSS",
    "Express.js",
    "MongoDB",
    "SQL",
    "JWT",
    "RBAC",
    "Docker",
    "Microservices",
    "CI/CD",
    "OpenAI API",
    "RAG Architecture",
    "Vector Search",
    "Prompt Engineering",
    "Full Stack Developer 3+ YOE",
  ],
  authors: [{ name: "Arbaz Sayyad", url: "https://github.com/sayyadarbaz01" }],
  creator: "Arbaz Sayyad",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arbaz Sayyad | Full Stack Developer (3+ YOE)",
    description:
      "Full Stack Developer with 3+ YOE specializing in React, TypeScript, Node.js, Express, MongoDB, Docker, OpenAI API & RAG pipelines.",
    siteName: "Arbaz Sayyad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Sayyad | Full Stack Developer (3+ YOE)",
    description: "Full Stack Developer (3+ YOE) | React, Node.js, OpenAI API, RAG & Vector Search",
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
      className={`${geistSans.variable} dark h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                localStorage.setItem('theme', 'dark');
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
              } catch (e) {}
            `,
          }}
        />
      </head>
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
