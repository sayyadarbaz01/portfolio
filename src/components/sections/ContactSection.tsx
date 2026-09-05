"use client";

import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import { Section } from "@/components/ui";
import { socialLinks } from "@/data/portfolio";
import { saveContact } from "@/actions/feedback";
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!formData.name.trim() || formData.name.length > 100) return "Please enter your name (max 100 chars).";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.subject.trim() || formData.subject.length > 200) return "Please enter a subject (max 200 chars).";
    if (!formData.message.trim() || formData.message.length > 2000) return "Please enter a message (max 2000 chars).";
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setIsSubmitting(true);
    let emailOk = false;
    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_USER_ID) {
        try {
          const result = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              from_name: formData.name,
              name: formData.name,
              from_email: formData.email,
              email: formData.email,
              reply_to: formData.email,
              subject: formData.subject,
              title: formData.subject,
              message: formData.message,
            },
            EMAILJS_USER_ID
          );
          if (result.status === 200 || result.text === "OK") {
            emailOk = true;
          }
        } catch (emailErr: any) {
          console.error("EmailJS Client Error:", emailErr);
        }
      }

      const res = await saveContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (emailOk || res?.success) {
        toast.success(
          emailOk
            ? "Message dispatched successfully! Check your inbox."
            : "Message received! I will be in touch shortly."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Failed to process message:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" title="Contact & Direct Communication" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Left Column: Direct Info */}
        <div className="space-y-6 text-slate-900 dark:text-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Let&apos;s Build Systems Together
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Open to full stack development and architecture consulting. Reach out directly via email or the form.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-700 dark:text-slate-300">
            <a
              href={`mailto:${socialLinks.email}`}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none hover:border-sky-500 transition-colors"
            >
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-300 text-[10px] font-medium">EMAIL</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{socialLinks.email}</p>
              </div>
            </a>

            <a
              href={`tel:${socialLinks.phone}`}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none hover:border-emerald-500 transition-colors"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-300 text-[10px] font-medium">PHONE / WHATSAPP</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{socialLinks.phone}</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-300 text-[10px] font-medium">LOCATION</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Pune, India (Open to Remote)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <h4 className="font-mono text-xs text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold">
            <MessageSquare className="w-4 h-4" /> Direct Message Form
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label htmlFor="contact-name" className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
                FULL NAME *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="e.g. Sarah Jenkins"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
                EMAIL ADDRESS *
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="e.g. sarah@company.com"
              />
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
                SUBJECT / ROLE *
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="e.g. Full Stack Engineer Role"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
                MESSAGE DETAILS *
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                rows={4}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Details about project, tech stack, or open role..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Message</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </Section>
  );
}


