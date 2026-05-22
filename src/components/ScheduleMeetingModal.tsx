"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  CheckCircle,
  Video,
  Copy,
  ExternalLink,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MeetingResult {
  meetLink: string | null;
  meetProvider?: "google" | "jitsi";
  eventId: string;
  date: string;
  time: string;
  name: string;
  email: string;
}

const availableSlots = [
  { time: "09:00 AM", label: "9:00 AM – 10:00 AM" },
  { time: "10:00 AM", label: "10:00 AM – 11:00 AM" },
  { time: "11:00 AM", label: "11:00 AM – 12:00 PM" },
  { time: "02:00 PM", label: "2:00 PM – 3:00 PM" },
  { time: "03:00 PM", label: "3:00 PM – 4:00 PM" },
  { time: "04:00 PM", label: "4:00 PM – 5:00 PM" },
];

// ─── Step labels ─────────────────────────────────────────────────────────────
const STEP_LABELS = ["Your Info", "Date & Time", "Topic", "Confirmed!"];

export function ScheduleMeetingModal({
  isOpen,
  onClose,
}: ScheduleMeetingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    topic: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<MeetingResult | null>(null);

  // ── Next 5 weekdays ────────────────────────────────────────────────────────
  const getNextDays = () => {
    const days: { date: string; label: string }[] = [];
    const today = new Date();
    let checked = 0;
    while (days.length < 5) {
      checked++;
      const d = new Date(today);
      d.setDate(today.getDate() + checked);
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        days.push({
          date: d.toISOString().split("T")[0],
          label: d.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
        });
      }
    }
    return days;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (): string | null => {
    if (step === 1) {
      if (!formData.name.trim()) return "Please enter your name";
      if (!/^\S+@\S+\.\S+$/.test(formData.email))
        return "Please enter a valid email";
      if (!formData.phone.trim()) return "Please enter your phone number";
    }
    if (step === 2) {
      if (!formData.date) return "Please select a date";
      if (!formData.time) return "Please select a time";
    }
    if (step === 3) {
      if (!formData.topic.trim()) return "Please enter the meeting topic";
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { toast.error(err); return; }
    setStep((s) => s + 1);
  };

  // ── Submit — creates Google Meet via API, then emails both parties ──────────
  const handleSubmit = async () => {
    const err = validateStep();
    if (err) { toast.error(err); return; }

    setIsSubmitting(true);
    try {
      // 1. Create the Google Calendar event + Meet room
      const res = await fetch("/api/schedule-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          topic: formData.topic,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      const meetLink: string = data.meetLink || "(link will be sent separately)";
      const SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "";
      const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const USER_KEY = process.env.NEXT_PUBLIC_EMAILJS_USER_ID     || "";

      const providerLabel = data.meetProvider === "google" ? "🎥 Google Meet" : "🎥 Video Call";

      const meetingBody = [
        `📅 Date: ${formData.date}`,
        `🕐 Time: ${formData.time} IST`,
        `📞 Phone: ${formData.phone}`,
        ``,
        `📝 Topic: ${formData.topic}`,
        ``,
        `${providerLabel}: ${meetLink}`,
      ].join("\n");

      // 2. Notify owner
      await emailjs.send(SERVICE, TEMPLATE, {
        name: formData.name,
        email: formData.email,
        title: `📅 New Meeting Request from ${formData.name} — ${formData.date} at ${formData.time}`,
        message: meetingBody,
      }, USER_KEY);

      // 3. Confirm to visitor (reply_to so they can also reply)
      await emailjs.send(SERVICE, TEMPLATE, {
        name: "Mohammed Rizwan",
        email: formData.email,          // send TO the visitor
        title: `✅ Your Meeting is Confirmed — ${formData.date} at ${formData.time} IST`,
        message: [
          `Hi ${formData.name},`,
          ``,
          `Your 1-on-1 meeting with Mohammed Rizwan has been confirmed!`,
          ``,
          meetingBody,
          ``,
          `See you then! 🙌`,
        ].join("\n"),
      }, USER_KEY);

      // 4. Show success state
      setResult({
        meetLink: data.meetLink,
        meetProvider: data.meetProvider,
        eventId: data.eventId,
        date: formData.date,
        time: formData.time,
        name: formData.name,
        email: formData.email,
      });
      setStep(4);
      toast.success("Meeting confirmed! Emails sent to both parties 📧");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to schedule meeting: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Reset & close ──────────────────────────────────────────────────────────
  const handleClose = () => {
    onClose();
    // Delay reset so exit animation finishes
    setTimeout(() => {
      setStep(1);
      setResult(null);
      setFormData({ name: "", email: "", phone: "", date: "", time: "", topic: "" });
    }, 300);
  };

  const copyMeetLink = () => {
    if (result?.meetLink) {
      navigator.clipboard.writeText(result.meetLink);
      toast.success("Meet link copied!");
    }
  };

  const nextDays = getNextDays();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-none">
                      Schedule a Meeting
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Google Meet • 1 hour • IST
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Progress Steps (only steps 1–3) */}
              {step < 4 && (
                <div className="flex items-center px-6 pt-5 pb-3 gap-2">
                  {[1, 2, 3].map((s, i) => (
                    <React.Fragment key={s}>
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{
                            backgroundColor: "rgb(229,231,235)",
                            color: "rgb(107,114,128)",
                          }}
                          animate={{
                            backgroundColor:
                              step > s
                                ? "#22c55e"
                                : step === s
                                ? "rgb(59,130,246)"
                                : "rgb(229,231,235)",
                            color:
                              step >= s ? "rgb(255,255,255)" : "rgb(107,114,128)",
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                        >
                          {step > s ? "✓" : s}
                        </motion.div>
                        <span className="text-[10px] mt-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {STEP_LABELS[s - 1]}
                        </span>
                      </div>
                      {i < 2 && (
                        <div
                          className={`flex-1 h-0.5 mb-4 rounded ${
                            step > s
                              ? "bg-green-400"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* ── Content ─────────────────────────────────────────────── */}
              <div className="px-6 py-4 min-h-72">
                <AnimatePresence mode="wait">

                  {/* Step 1 — Your Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {[
                        { label: "Your Name", name: "name", type: "text", placeholder: "Enter your full name" },
                        { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
                        { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            {f.label}
                          </label>
                          <input
                            type={f.type}
                            name={f.name}
                            value={formData[f.name as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={f.placeholder}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 2 — Date & Time */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          Select Date
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {nextDays.map((day) => (
                            <motion.button
                              key={day.date}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() =>
                                setFormData((p) => ({ ...p, date: day.date }))
                              }
                              className={`p-2.5 rounded-lg text-sm font-medium transition-all border ${
                                formData.date === day.date
                                  ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300"
                              }`}
                            >
                              {day.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          <Clock className="w-4 h-4 text-blue-500" />
                          Select Time (IST)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {availableSlots.map((slot) => (
                            <motion.button
                              key={slot.time}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() =>
                                setFormData((p) => ({ ...p, time: slot.time }))
                              }
                              className={`p-2.5 rounded-lg text-sm font-medium transition-all border ${
                                formData.time === slot.time
                                  ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300"
                              }`}
                            >
                              {slot.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 — Topic + Summary */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Meeting Topic
                        </label>
                        <textarea
                          name="topic"
                          value={formData.topic}
                          onChange={handleChange}
                          rows={4}
                          placeholder="What would you like to discuss? (e.g., job opportunity, project collaboration, tech questions…)"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm"
                        />
                      </div>

                      {/* Booking summary */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl p-4 space-y-2 text-sm">
                        <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                          📋 Booking Summary
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Name:</span>{" "}
                          {formData.name}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Email:</span>{" "}
                          {formData.email}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Date & Time:</span>{" "}
                          {new Date(formData.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          at {formData.time} IST
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                          🎥 A Google Meet link will be created and emailed to
                          both parties.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4 — Success */}
                  {step === 4 && result && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-2 space-y-5"
                    >
                      {/* Success icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                      >
                        <CheckCircle className="w-9 h-9 text-green-500" />
                      </motion.div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Meeting Confirmed! 🎉
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Calendar invites sent to both{" "}
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {result.email}
                          </span>{" "}
                          and Mohammed Rizwan.
                        </p>
                      </div>

                      {/* Meeting details */}
                      <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-left space-y-2 text-sm">
                        <p className="text-gray-700 dark:text-gray-300">
                          📅{" "}
                          {new Date(result.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          🕐 {result.time} IST (1 hour)
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          📧 Invite sent to your email
                        </p>
                      </div>

                      {/* Meet link */}
                      {result.meetLink ? (
                        <div className="w-full space-y-2">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {result.meetProvider === "google" ? "Google Meet Link" : "Video Call Link"}
                          </p>
                          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-xl px-4 py-3">
                            <Video className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm text-blue-700 dark:text-blue-300 truncate flex-1 font-mono">
                              {result.meetLink}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={copyMeetLink}
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                              Copy Link
                            </button>
                            <a
                              href={result.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Join Call
                            </a>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          The video call link will arrive in your email invite shortly.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                {step < 4 ? (
                  <>
                    <button
                      onClick={() => {
                        if (step > 1) setStep((s) => s - 1);
                        else handleClose();
                      }}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {step > 1 ? "Back" : "Cancel"}
                    </button>
                    <button
                      onClick={step === 3 ? handleSubmit : handleNext}
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : step === 3 ? (
                        <>
                          <Video className="w-4 h-4" />
                          Schedule &amp; Create Meet
                        </>
                      ) : (
                        "Next →"
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
