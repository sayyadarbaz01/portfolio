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
        className="max-w-5xl mx-auto space-y-12"
      >
        <motion.p variants={itemVariants} className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Have we worked together? I&apos;d love to hear your thoughts! Drop a quick note about your experience collaborating with me.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Form Section */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card glassmorphism>
              <CardBody>
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Leave Feedback</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="feedback-name" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="feedback-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="block w-full pl-9 pr-3 py-2.5 text-sm bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:text-white outline-none"
                        placeholder="John Doe"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="feedback-role" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role &amp; Company (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="feedback-role"
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="block w-full pl-9 pr-3 py-2.5 text-sm bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:text-white outline-none"
                        placeholder="e.g. Product Manager at TechCorp"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="feedback-content" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Feedback
                    </label>
                    <textarea
                      id="feedback-content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={5}
                      className="block w-full px-3 py-2.5 text-sm bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none dark:text-white outline-none"
                      placeholder="What was it like working together?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button type="submit" className="w-full justify-center py-2.5" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="animate-pulse">Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Post Feedback
                      </>
                    )}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>

          {/* Live Feed Section */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 px-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Feed
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
                    className="text-center py-12 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl"
                  >
                    <MessageSquare className="w-8 h-8 mx-auto text-gray-300 dark:text-gray-700 mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No feedback yet.</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Be the first to leave a review using the form!</p>
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
                      <Card glassmorphism hover>
                        <CardBody className="p-4 sm:p-5">
                          <div className="flex gap-4">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatarGradient} flex items-center justify-center text-white font-bold shrink-0 shadow-inner`}
                            >
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {item.role}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                  <Clock className="w-3 h-3" />
                                  {item.date}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 leading-relaxed italic">
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
                                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2 transition-colors"
                                >
                                  {expandedIds.has(item.id) ? "Show Less ↑" : "Show More ↓"}
                                </button>
                              )}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
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
