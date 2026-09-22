import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="text-center max-w-xl mx-auto py-20">
        <p className="eyebrow mb-4">404 / Not found</p>
        <h1
          className="font-display font-semibold tracking-tight text-section-fluid"
          style={{ color: "var(--text-primary)" }}
        >
          This page wandered off the manuscript.
        </h1>
        <p
          className="text-sm sm:text-base leading-relaxed mt-5"
          style={{ color: "var(--text-secondary)" }}
        >
          The page you are looking for does not exist or was moved. Let&apos;s get you back to the portfolio.
        </p>
        <Link
          href="/"
          className="btn-ink inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-mono font-semibold mt-8"
          style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-base)" }}
        >
          <span className="relative z-[2]">Back to home</span>
        </Link>
      </div>
    </section>
  );
}
