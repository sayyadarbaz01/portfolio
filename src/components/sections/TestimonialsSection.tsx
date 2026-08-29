"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody, Button } from "@/components/ui";
import { TestimonialSkeleton } from "@/components/ui/SkeletonLoaders";
import { MessageSquare, Send, User, Briefcase, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { getFeedbacks, addFeedback } from "@/actions/feedback";

type Feedback = {
  id: string;
  name: string;
  role: string;
  content: string;
  date: string;
  avatarGradient: string;
};

const GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-rose-500 to-red-500",
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({ name: "", role: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load from database
  useEffect(() => {
    async function loadFeedbacks() {
      try {
        setIsLoading(true);
        const res = await getFeedbacks();
        if (res.success && res.data) {
          setFeedbacks(res.data as unknown as Feedback[]);
        }
      } catch (error) {
        console.error("Failed to load feedbacks:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeedbacks();
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, wordLimit: number = 20): { truncated: string; isTruncated: boolean } => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return { truncated: text, isTruncated: false };
    }
    return { truncated: words.slice(0, wordLimit).join(" "), isTruncated: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) {
      toast.error("Please fill in your name and feedback");
      return;
    }

    setIsSubmitting(true);

    const newFeedbackData = {
      name: formData.name.trim(),
      role: formData.role.trim() || "Colleague / Collaborator",
      content: formData.content.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      avatarGradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
    };

    const res = await addFeedback(newFeedbackData);

    if (res.success && res.data) {
      setFeedbacks([res.data as unknown as Feedback, ...feedbacks]);
      setFormData({ name: "", role: "", content: "" });
      toast.success("Feedback submitted! Thanks for sharing.");
    } else {
      toast.error("Failed to submit feedback. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <Section id="testimonials" title="Colleague Feedback" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto space-y-12 text-left"
      >
        <motion.p variants={itemVariants} className="text-center text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Have we worked together? I&apos;d love to hear your thoughts! Drop a quick note about your experience collaborating with me.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Form Section */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-sans">Leave Feedback</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label htmlFor="feedback-name" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    YOUR NAME *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <input
                      id="feedback-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                      placeholder="e.g. John Doe"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback-role" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    ROLE & COMPANY (OPTIONAL)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <input
                      id="feedback-role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                      placeholder="e.g. Product Lead at Synechron"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback-content" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    YOUR FEEDBACK *
                  </label>
                  <textarea
                    id="feedback-content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    className="block w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none outline-none"
                    placeholder="What was it like working together?"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post Feedback</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Live Feed Section */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 px-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Verified Feedback Feed
            </h3>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pb-2">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  // Show skeleton loaders while loading
                  [1, 2, 3].map((i) => <TestimonialSkeleton key={`skeleton-${i}`} />)
                ) : feedbacks.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 px-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl"
                  >
                    <MessageSquare className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-600 mb-3" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">No feedback yet.</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 font-mono">Be the first to leave a review using the form!</p>
                  </motion.div>
                ) : (
                  feedbacks.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm dark:shadow-none space-y-3">
                        <div className="flex gap-4">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatarGradient} flex items-center justify-center text-white font-bold shrink-0 shadow-inner`}
                          >
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate font-sans">
                                  {item.name}
                                </h4>
                                <p className="text-xs font-mono text-sky-600 dark:text-sky-400 truncate">
                                  {item.role}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 font-medium">
                                <Clock className="w-3 h-3" />
                                {item.date}
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-3 leading-relaxed italic">
                              &ldquo;
                              {expandedIds.has(item.id)
                                ? item.content
                                : truncateText(item.content).truncated}
                              {truncateText(item.content).isTruncated && !expandedIds.has(item.id) && "..."}
                              &rdquo;
                            </p>
                            {truncateText(item.content).isTruncated && (
                              <button
                                onClick={() => toggleExpanded(item.id)}
                                className="text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 hover:underline mt-2 transition-colors"
                              >
                                {expandedIds.has(item.id) ? "Show Less ↑" : "Show More ↓"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
