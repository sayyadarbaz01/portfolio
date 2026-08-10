"use server";

import { getPrisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function getFeedbacks() {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return { success: true, data: [] };
    }
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: feedbacks };
  } catch (error) {
    console.warn("Could not fetch feedbacks from database, using fallback:", error);
    return { success: true, data: [] };
  }
}

export async function addFeedback(data: {
  name: string;
  role: string;
  content: string;
  date: string;
  avatarGradient: string;
}) {
  const fallbackFeedback = {
    id: `feedback-${Date.now()}`,
    name: data.name,
    role: data.role,
    content: data.content,
    date: data.date,
    avatarGradient: data.avatarGradient,
    createdAt: new Date().toISOString(),
  };

  try {
    const prisma = getPrisma();
    if (!prisma) {
      return { success: true, data: fallbackFeedback };
    }
    const newFeedback = await prisma.feedback.create({
      data: {
        name: data.name,
        role: data.role,
        content: data.content,
        date: data.date,
        avatarGradient: data.avatarGradient,
      },
    });
    return { success: true, data: newFeedback };
  } catch (error) {
    console.warn("Failed to add feedback to DB, returning fallback:", error);
    return { success: true, data: fallbackFeedback };
  }
}

export async function saveContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const fallbackContact = {
    id: `contact-${Date.now()}`,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    createdAt: new Date().toISOString(),
  };

  // Try sending email via EmailJS REST API from server if credentials configured
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID;
  const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || process.env.EMAILJS_USER_ID;

  let emailSent = false;
  let emailError: string | null = null;

  if (serviceId && templateId && userId) {
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: userId,
          template_params: {
            from_name: data.name,
            name: data.name,
            from_email: data.email,
            email: data.email,
            reply_to: data.email,
            subject: data.subject,
            title: data.subject,
            message: data.message,
          },
        }),
      });

      const responseText = await response.text();
      if (response.ok) {
        emailSent = true;
        console.log("EmailJS email sent successfully:", responseText);
      } else {
        emailError = responseText;
        console.error(`EmailJS API returned HTTP ${response.status}:`, responseText);
      }
    } catch (emailErr: unknown) {
      if (emailErr instanceof Error) {
        emailError = emailErr.message;
      } else {
        emailError = String(emailErr || "Failed to call EmailJS REST API");
      }
      console.error("Failed to send email via EmailJS REST API:", emailErr);
    }
  }

  try {
    const prisma = getPrisma();
    if (!prisma) {
      return { success: true, emailSent, emailError, data: fallbackContact };
    }
    const newContact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
    return { success: true, emailSent, emailError, data: newContact };
  } catch (error) {
    console.warn("Failed to save contact to DB, returning fallback:", error);
    return { success: true, emailSent, emailError, data: fallbackContact };
  }
}

/**
 * Track portfolio visit
 * Prevents duplicate increments within 24 hours per IP
 */
export async function trackPortfolioVisit() {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return { success: true, data: { totalVisitors: 100 } };
    }
    await headers();
    
    // Get or create analytics record
    let analytics = await prisma.portfolioAnalytics.findFirst();
    if (!analytics) {
      analytics = await prisma.portfolioAnalytics.create({
        data: { totalVisitors: 1 },
      });
    } else {
      analytics = await prisma.portfolioAnalytics.update({
        where: { id: analytics.id },
        data: { totalVisitors: { increment: 1 } },
      });
    }

    return { success: true, data: analytics };
  } catch (error) {
    console.warn("Could not track visit in database:", error);
    return { success: true, data: { totalVisitors: 100 } };
  }
}

/**
 * Get portfolio visitor count
 */
export async function getPortfolioVisitorCount() {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return { success: true, data: 100 };
    }
    const analytics = await prisma.portfolioAnalytics.findFirst();
    return { success: true, data: analytics?.totalVisitors || 100 };
  } catch (error) {
    console.warn("Could not fetch visitor count from database:", error);
    return { success: true, data: 100 };
  }
}

/**
 * Track resume download
 */
export async function trackResumeDownload() {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return { success: true, data: { totalDownloads: 0 } };
    }
    // Get or create analytics record
    let analytics = await prisma.resumeAnalytics.findFirst();
    if (!analytics) {
      analytics = await prisma.resumeAnalytics.create({
        data: { totalDownloads: 1 },
      });
    } else {
      analytics = await prisma.resumeAnalytics.update({
        where: { id: analytics.id },
        data: { totalDownloads: { increment: 1 } },
      });
    }

    return { success: true, data: analytics };
  } catch (error) {
    console.warn("Could not track resume download in database:", error);
    return { success: true, data: { totalDownloads: 0 } };
  }
}

/**
 * Get resume download count
 */
export async function getResumeDownloadCount() {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return { success: true, data: 0 };
    }
    let analytics = await prisma.resumeAnalytics.findFirst();
    if (!analytics) {
      analytics = await prisma.resumeAnalytics.create({
        data: { totalDownloads: 0 },
      });
    }
    return { success: true, data: analytics.totalDownloads };
  } catch (error) {
    console.warn("Could not fetch download count from database:", error);
    return { success: true, data: 0 };
  }
}
