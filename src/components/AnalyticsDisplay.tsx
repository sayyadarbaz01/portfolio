"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPortfolioVisitorCount, getResumeDownloadCount } from "@/actions/feedback";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Eye, Download } from "lucide-react";

interface AnalyticsStats {
  visitors: number;
  downloads: number;
  isLoading: boolean;
}

export function useAnalytics() {
  const [stats, setStats] = useState<AnalyticsStats>({
    visitors: 0,
    downloads: 0,
    isLoading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [visitorRes, downloadRes] = await Promise.all([
          getPortfolioVisitorCount(),
          getResumeDownloadCount(),
        ]);

        setStats({
          visitors: visitorRes.success && typeof visitorRes.data === 'number' ? visitorRes.data : 0,
          downloads: downloadRes.success && typeof downloadRes.data === 'number' ? downloadRes.data : 0,
          isLoading: false,
        });
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        setStats((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);

  return stats;
}

interface AnalyticsDisplayProps {
  isInView: boolean;
}

export function AnalyticsDisplay({ isInView }: AnalyticsDisplayProps) {
  const { visitors, downloads, isLoading } = useAnalytics();

  return (
    <div className="flex gap-6 justify-center items-center flex-wrap my-4 font-mono">
      {/* Visitors */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView && !isLoading ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none"
      >
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Eye className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            PORTFOLIO VISITORS
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {isLoading ? "..." : <AnimatedCounter target={visitors} isInView={isInView && !isLoading} />}
          </span>
        </div>
      </motion.div>

      {/* Downloads */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView && !isLoading ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none"
      >
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Download className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            RESUME DOWNLOADS
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {isLoading ? "..." : <AnimatedCounter target={downloads} isInView={isInView && !isLoading} />}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
