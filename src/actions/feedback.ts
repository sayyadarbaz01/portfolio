"use server";

import { PrismaClient } from "@prisma/client";

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
