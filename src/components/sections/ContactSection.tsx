"use client";

import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks";
import { Section, Card, CardBody, Button } from "@/components/ui";
import { socialLinks } from "@/data/portfolio";
import { saveContact } from "@/actions/feedback";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

// lucide-react doesn't ship Github or LinkedIn icons in this version
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-side validation
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

  // EmailJS config
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setIsSubmitting(true);
    try {
      // Send email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
        },
        EMAILJS_USER_ID
      );

      // Save to database
      const result = await saveContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Message sent but failed to save to database.");
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const socialIcons = [
    {
      icon: GithubIcon,
      href: socialLinks.github,
      label: "GitHub",
      color: "hover:text-gray-700 dark:hover:text-gray-300",
    },
    {
      icon: LinkedinIcon,
      href: socialLinks.linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      icon: Mail,
      href: `mailto:${socialLinks.email}`,
      label: "Email",
      color: "hover:text-red-600 dark:hover:text-red-400",
    },
    {
      icon: Phone,
      href: `tel:${socialLinks.phone}`,
      label: "Phone",
      color: "hover:text-green-600 dark:hover:text-green-400",
    },
    {
      icon: WhatsAppIcon,
      href: socialLinks.whatsapp,
      label: "WhatsApp",
      color: "hover:text-emerald-500 dark:hover:text-emerald-400",
    },
  ];

  return (
    <Section id="contact" title="Let's Work Together" ref={ref}>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Contact Info */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Get In Touch
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say
              hello, feel free to reach out!
            </p>
          </div>

          {/* Contact Details */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Email */}
            <motion.div variants={itemVariants}>
              <a
                href={`mailto:${socialLinks.email}`}
                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 dark:bg-blue-500/5 group-hover:bg-blue-500/20 transition-all">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Email
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {socialLinks.email}
                  </p>
                </div>
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants}>
              <a
                href={`tel:${socialLinks.phone}`}
                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 dark:bg-green-500/5 group-hover:bg-green-500/20 transition-all">
                  <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Phone
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {socialLinks.phone}
                  </p>
                </div>
              </a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div variants={itemVariants}>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/5 group-hover:bg-emerald-500/20 transition-all">
                  <WhatsAppIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    WhatsApp
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {socialLinks.phone}
                  </p>
                </div>
              </a>
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants}>
              <div className="group flex items-start gap-4 p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10 dark:bg-red-500/5">
                  <MapPin className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Location
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Maharashtra, India
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card hover glassmorphism>
            <CardBody className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Subject"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Status handled by toast notifications */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}
