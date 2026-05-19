import React, { Suspense } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazySection({ children, fallback }: LazySectionProps) {
  return (
    <Suspense fallback={fallback || <SectionSkeleton />}>
      {children}
    </Suspense>
  );
}

function SectionSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-gray-900/10 dark:to-gray-900/30">
      <div className="space-y-6 w-full max-w-6xl px-4">
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg animate-pulse" />
          <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
