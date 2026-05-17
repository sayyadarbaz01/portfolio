import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Mohammed Rizwan | Senior Software Engineer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable, accessible, and user-centric applications.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0f172a",
  openGraph: {
    type: "website",
    title: "Mohammed Rizwan | Senior Software Engineer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
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
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
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
