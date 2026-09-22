import type { Metadata, Viewport } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header, Footer } from "@/components";
import ToasterWrapper from "@/components/ui/Toaster";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://arbazsayyad.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf8f5",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    title: "Arbaz Sayyad | Full Stack Developer (3+ YOE)",
    description:
      "Full Stack Developer with 3+ YOE specializing in React, TypeScript, Node.js, Express, MongoDB, Docker, OpenAI API & RAG pipelines.",
    siteName: "Arbaz Sayyad Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Arbaz Sayyad — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Sayyad | Full Stack Developer (3+ YOE)",
    description: "Full Stack Developer (3+ YOE) | React, Node.js, OpenAI API, RAG & Vector Search",
    images: ["/opengraph-image"],
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
      className={`${geistSans.variable} ${fraunces.variable} light h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t !== 'dark' && t !== 'light') { t = 'light'; localStorage.setItem('theme', t); }
                document.documentElement.classList.toggle('dark', t === 'dark');
                document.documentElement.classList.toggle('light', t !== 'dark');
              } catch (e) {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        {/* Editorial Backdrop — subtle grid + soft glow + film grain */}
        <div className="editorial-bg" aria-hidden="true" />

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
