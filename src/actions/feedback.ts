"use server";

import { neon } from "@neondatabase/serverless";
import { getPrisma } from "@/lib/prisma";

function getSql() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;
  try {
    return neon(dbUrl);
  } catch (err) {
    console.warn("Neon SQL init warning:", err);
    return null;
  }
}

let cachedFeedbacks: any[] = [];
let lastFeedbacksSync = 0;

async function syncFeedbacksFromDb() {
  try {
    const sql = getSql();
    if (sql) {
      const rows = await sql`SELECT * FROM "Feedback" ORDER BY "createdAt" DESC`;
      if (rows) {
        cachedFeedbacks = rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          role: r.role,
          content: r.content,
          date: r.date,
          avatarGradient: r.avatarGradient,
          createdAt: typeof r.createdAt === 'string' ? r.createdAt : new Date(r.createdAt).toISOString(),
        }));
        lastFeedbacksSync = Date.now();
        return;
      }
    }
    const prisma = getPrisma();
    if (prisma) {
      const feedbacks = await prisma.feedback.findMany({
        orderBy: { createdAt: "desc" },
      });
      cachedFeedbacks = feedbacks.map((f) => ({
        ...f,
        createdAt: f.createdAt.toISOString(),
      }));
      lastFeedbacksSync = Date.now();
    }
  } catch (e) {}
}

export async function getFeedbacks() {
  if (lastFeedbacksSync === 0 || Date.now() - lastFeedbacksSync > 30000) {
    await syncFeedbacksFromDb();
  }
  return { success: true, data: cachedFeedbacks };
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
    const sql = getSql();
    if (sql) {
      const id = `feedback-${Date.now()}`;
      const now = new Date().toISOString();
      const rows = await sql`
        INSERT INTO "Feedback" ("id", "name", "role", "content", "date", "avatarGradient", "createdAt")
        VALUES (${id}, ${data.name}, ${data.role}, ${data.content}, ${data.date}, ${data.avatarGradient}, ${now}::timestamp)
        RETURNING *
      `;
      const r = rows[0] || fallbackFeedback;
      return {
        success: true,
        data: {
          ...r,
          createdAt: typeof r.createdAt === 'string' ? r.createdAt : new Date(r.createdAt).toISOString(),
        },
      };
    }

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
    return {
      success: true,
      data: {
        ...newFeedback,
        createdAt: newFeedback.createdAt.toISOString(),
      },
    };
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

  try {
    const sql = getSql();
    if (sql) {
      const id = `contact-${Date.now()}`;
      const now = new Date().toISOString();
      const rows = await sql`
        INSERT INTO "Contact" ("id", "name", "email", "subject", "message", "createdAt")
        VALUES (${id}, ${data.name}, ${data.email}, ${data.subject}, ${data.message}, ${now}::timestamp)
        RETURNING *
      `;
      const r = rows[0] || fallbackContact;
      return {
        success: true,
        data: {
          id: r.id,
          name: r.name,
          email: r.email,
          subject: r.subject,
          message: r.message,
          createdAt: typeof r.createdAt === 'string' ? r.createdAt : new Date(r.createdAt).toISOString(),
        },
      };
    }

    const prisma = getPrisma();
    if (!prisma) {
      return { success: true, data: fallbackContact };
    }
    const newContact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
    return {
      success: true,
      data: {
        id: newContact.id,
        name: newContact.name,
        email: newContact.email,
        subject: newContact.subject,
        message: newContact.message,
        createdAt: newContact.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.warn("Failed to save contact to DB, returning fallback:", error);
    return { success: true, data: fallbackContact };
  }
}

// In-Memory Analytics Cache
let cachedVisitors = 0;
let cachedDownloads = 0;
let lastVisitorSync = 0;
let lastDownloadSync = 0;

async function syncVisitorCountFromDb() {
  try {
    const sql = getSql();
    if (sql) {
      const rows = await sql`SELECT "totalVisitors" FROM "PortfolioAnalytics" LIMIT 1`;
      if (rows && rows[0]?.totalVisitors !== undefined) {
        cachedVisitors = Math.max(cachedVisitors, rows[0].totalVisitors);
        lastVisitorSync = Date.now();
        return;
      }
    }
    const prisma = getPrisma();
    if (prisma) {
      const analytics = await prisma.portfolioAnalytics.findFirst();
      if (analytics?.totalVisitors !== undefined) {
        cachedVisitors = Math.max(cachedVisitors, analytics.totalVisitors);
        lastVisitorSync = Date.now();
      }
    }
  } catch (e) {}
}

async function syncDownloadCountFromDb() {
  try {
    const sql = getSql();
    if (sql) {
      const rows = await sql`SELECT "totalDownloads" FROM "ResumeAnalytics" LIMIT 1`;
      if (rows && rows[0]?.totalDownloads !== undefined) {
        cachedDownloads = Math.max(cachedDownloads, rows[0].totalDownloads);
        lastDownloadSync = Date.now();
        return;
      }
    }
    const prisma = getPrisma();
    if (prisma) {
      const analytics = await prisma.resumeAnalytics.findFirst();
      if (analytics?.totalDownloads !== undefined) {
        cachedDownloads = Math.max(cachedDownloads, analytics.totalDownloads);
        lastDownloadSync = Date.now();
      }
    }
  } catch (e) {}
}

async function bgIncrementVisitor() {
  try {
    const sql = getSql();
    if (sql) {
      const existing = await sql`SELECT * FROM "PortfolioAnalytics" LIMIT 1`;
      if (existing.length === 0) {
        const id = `pa-${Date.now()}`;
        const now = new Date().toISOString();
        await sql`
          INSERT INTO "PortfolioAnalytics" ("id", "totalVisitors", "createdAt", "updatedAt")
          VALUES (${id}, ${cachedVisitors}, ${now}::timestamp, ${now}::timestamp)
        `;
      } else {
        await sql`
          UPDATE "PortfolioAnalytics"
          SET "totalVisitors" = "totalVisitors" + 1, "updatedAt" = NOW()
          WHERE "id" = ${existing[0].id}
        `;
      }
      return;
    }
    const prisma = getPrisma();
    if (prisma) {
      let analytics = await prisma.portfolioAnalytics.findFirst();
      if (!analytics) {
        await prisma.portfolioAnalytics.create({ data: { totalVisitors: 1 } });
      } else {
        await prisma.portfolioAnalytics.update({
          where: { id: analytics.id },
          data: { totalVisitors: { increment: 1 } },
        });
      }
    }
  } catch (e) {}
}

async function bgIncrementDownload() {
  try {
    const sql = getSql();
    if (sql) {
      const existing = await sql`SELECT * FROM "ResumeAnalytics" LIMIT 1`;
      if (existing.length === 0) {
        const id = `ra-${Date.now()}`;
        const now = new Date().toISOString();
        await sql`
          INSERT INTO "ResumeAnalytics" ("id", "totalDownloads", "createdAt", "updatedAt")
          VALUES (${id}, ${cachedDownloads}, ${now}::timestamp, ${now}::timestamp)
        `;
      } else {
        await sql`
          UPDATE "ResumeAnalytics"
          SET "totalDownloads" = "totalDownloads" + 1, "updatedAt" = NOW()
          WHERE "id" = ${existing[0].id}
        `;
      }
      return;
    }
    const prisma = getPrisma();
    if (prisma) {
      let analytics = await prisma.resumeAnalytics.findFirst();
      if (!analytics) {
        await prisma.resumeAnalytics.create({ data: { totalDownloads: 1 } });
      } else {
        await prisma.resumeAnalytics.update({
          where: { id: analytics.id },
          data: { totalDownloads: { increment: 1 } },
        });
      }
    }
  } catch (e) {}
}

export async function trackPortfolioVisit() {
  if (lastVisitorSync === 0) {
    await syncVisitorCountFromDb();
  }
  cachedVisitors += 1;
  bgIncrementVisitor().catch(() => {});
  return { success: true, data: { totalVisitors: cachedVisitors } };
}

export async function getPortfolioVisitorCount() {
  if (lastVisitorSync === 0 || Date.now() - lastVisitorSync > 30000) {
    await syncVisitorCountFromDb();
  }
  return { success: true, data: cachedVisitors };
}

export async function trackResumeDownload() {
  if (lastDownloadSync === 0) {
    await syncDownloadCountFromDb();
  }
  cachedDownloads += 1;
  bgIncrementDownload().catch(() => {});
  return { success: true, data: { totalDownloads: cachedDownloads } };
}

export async function getResumeDownloadCount() {
  if (lastDownloadSync === 0 || Date.now() - lastDownloadSync > 30000) {
    await syncDownloadCountFromDb();
  }
  return { success: true, data: cachedDownloads };
}
