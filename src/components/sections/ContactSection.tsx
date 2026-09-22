"use client";

import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import { Section } from "@/components/ui";
import { Reveal } from "@/components/ui/Motion";
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
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || name.length > 100) return "Please enter your name (max 100 chars).";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (!subject || subject.length > 200) return "Please enter a subject (max 200 chars).";
    if (!message || message.length > 2000) return "Please enter a message (max 2000 chars).";
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

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_e5d4csq";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_pm5nmwq";
  const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "iStpH3q--1G4-Oy-b";

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
    const cleanData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_USER_ID) {
        try {
          const result = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              from_name: cleanData.name,
              name: cleanData.name,
              from_email: cleanData.email,
              email: cleanData.email,
              reply_to: cleanData.email,
              subject: cleanData.subject,
              title: cleanData.subject,
              message: cleanData.message,
            },
            EMAILJS_USER_ID
          );
          if (result.status === 200 || result.text === "OK") {
            emailOk = true;
          }
        } catch (emailErr: unknown) {
          console.error("EmailJS Client Error:", emailErr);
        }
      }

      const res = await saveContact(cleanData);

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

  const inputStyle = {
    backgroundColor: "var(--bg-elevated)",
    border: "1px solid var(--input-border)",
    color: "var(--text-primary)",
  } as React.CSSProperties;

  return (
    <Section id="contact" eyebrow="Contact" title="Contact & Direct Communication" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Left Column: Direct Info */}
        <Reveal className="space-y-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Let&apos;s Build Systems Together
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Open to full stack development and architecture consulting. Reach out directly via email or the form.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
            <a
              href={`mailto:${socialLinks.email}`}
              className="theme-card lift-hover flex items-center gap-3 p-3.5"
            >
              <div className="p-2 rounded-xl" style={{ backgroundColor: "rgba(15, 118, 110, 0.1)", color: "var(--accent-teal)" }}>
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>EMAIL</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{socialLinks.email}</p>
              </div>
            </a>

            <a
              href={`tel:${socialLinks.phone}`}
              className="theme-card lift-hover flex items-center gap-3 p-3.5"
            >
              <div className="p-2 rounded-xl" style={{ backgroundColor: "rgba(4, 120, 87, 0.1)", color: "var(--accent-emerald)" }}>
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>PHONE / WHATSAPP</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{socialLinks.phone}</p>
              </div>
            </a>

            <div className="theme-card flex items-center gap-3 p-3.5">
              <div className="p-2 rounded-xl" style={{ backgroundColor: "var(--bg-muted)", color: "var(--text-muted)" }}>
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>LOCATION</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Pune, India (Open to Remote)</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Contact Form */}
        <Reveal delay={0.08}>
          <div className="theme-card p-6 space-y-4" style={{ color: "var(--text-primary)" }}>
            <h4 className="font-mono text-xs uppercase tracking-wider mb-2 flex items-center gap-2 font-semibold" style={{ color: "var(--accent-teal)" }}>
              <MessageSquare className="w-4 h-4" /> Direct Message Form
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label htmlFor="contact-name" className="block mb-1 font-medium" style={{ color: "var(--text-secondary)" }}>
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
                  autoComplete="name"
                  autoCapitalize="words"
                  className="w-full px-3.5 py-2.5 rounded-xl placeholder:opacity-60 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={inputStyle}
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block mb-1 font-medium" style={{ color: "var(--text-secondary)" }}>
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
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  className="w-full px-3.5 py-2.5 rounded-xl placeholder:opacity-60 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={inputStyle}
                  placeholder="e.g. sarah@company.com"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block mb-1 font-medium" style={{ color: "var(--text-secondary)" }}>
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
                  autoComplete="off"
                  className="w-full px-3.5 py-2.5 rounded-xl placeholder:opacity-60 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={inputStyle}
                  placeholder="e.g. Full Stack Engineer Role"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block mb-1 font-medium" style={{ color: "var(--text-secondary)" }}>
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
                  autoComplete="off"
                  className="w-full px-3.5 py-2.5 rounded-xl placeholder:opacity-60 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                  style={inputStyle}
                  placeholder="Details about project, tech stack, or open role..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-ink w-full py-3 rounded-full font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--accent-teal)" }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin relative z-[2]" />
                    <span className="relative z-[2]">Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 relative z-[2]" />
                    <span className="relative z-[2]">Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </Reveal>

      </div>
    </Section>
  );
}
