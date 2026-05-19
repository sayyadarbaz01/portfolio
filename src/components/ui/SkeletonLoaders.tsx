/**
 * Skeleton Loaders for database data fetching
 */

export function TestimonialSkeleton() {
  return (
    <div className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl p-4 space-y-4">
      {/* Avatar & Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
          <div className="h-3 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
        <div className="h-3 w-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
      </div>

      {/* Footer */}
      <div className="h-3 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse" />
    </div>
  );
}

export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse" />
      <div className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg animate-pulse" />
    </div>
  );
}

export function ContactTableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg">
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function DataGridSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3 p-4 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg">
          <div className="h-4 w-3/4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-pulse" />
          <div className="h-3 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
