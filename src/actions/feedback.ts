"use server";

import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function getFeedbacks() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: feedbacks };
  } catch (error) {
    console.error("Failed to fetch feedbacks:", error);
    return { success: false, error: "Failed to fetch feedbacks" };
  }
}

export async function addFeedback(data: {
  name: string;
  role: string;
  content: string;
  date: string;
  avatarGradient: string;
}) {
  try {
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
    console.error("Failed to add feedback:", error);
    return { success: false, error: "Failed to add feedback" };
  }
}

export async function saveContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const newContact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
    return { success: true, data: newContact };
  } catch (error) {
    console.error("Failed to save contact:", error);
    return { success: false, error: "Failed to save contact" };
  }
}

/**
 * Track portfolio visit
 * Prevents duplicate increments within 24 hours per IP
 */
export async function trackPortfolioVisit() {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || headersList.get("x-real-ip") || "unknown";
    
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
    console.error("Failed to track portfolio visit:", error);
    return { success: false, error: "Failed to track visit" };
  }
}

/**
 * Get portfolio visitor count
 */
export async function getPortfolioVisitorCount() {
  try {
    const analytics = await prisma.portfolioAnalytics.findFirst();
    return { success: true, data: analytics?.totalVisitors || 0 };
  } catch (error) {
    console.error("Failed to fetch visitor count:", error);
    return { success: false, error: "Failed to fetch visitor count" };
  }
}

/**
 * Track resume download
 */
export async function trackResumeDownload() {
  try {
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
    console.error("Failed to track resume download:", error);
    return { success: false, error: "Failed to track download" };
  }
}

/**
 * Get resume download count
 */
export async function getResumeDownloadCount() {
  try {
    const analytics = await prisma.resumeAnalytics.findFirst();
    return { success: true, data: analytics?.totalDownloads || 0 };
  } catch (error) {
    console.error("Failed to fetch download count:", error);
    return { success: false, error: "Failed to fetch download count" };
  }
}
