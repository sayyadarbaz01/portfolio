"use server";

import { neon } from "@neondatabase/serverless";
import { getPrisma } from "@/lib/prisma";

// Cached Singleton SQL Connection to eliminate instantiation overhead
let sqlInstance: any = null;

function getSql(): any {
  if (sqlInstance) return sqlInstance;
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;
  try {
    sqlInstance = neon(dbUrl);
    return sqlInstance;
  } catch (err) {
    console.warn("Neon SQL init warning:", err);
    return null;
  }
}

// ==========================================
// IN-MEMORY HIGH-SPEED STALE-WHILE-REVALIDATE CACHE
// ==========================================
// Pre-seeded with production baseline so first renders execute in <1ms without blocking
let cachedVisitors: number = 160;
let cachedDownloads: number = 9;
let cachedFeedbacks: any[] | null = null;

let lastVisitorSync = 0;
let lastDownloadSync = 0;
let lastFeedbacksSync = 0;
let isSyncingAnalytics = false;

// High-speed combined non-blocking DB sync for Visitors & Downloads
async function syncAnalyticsFromDb() {
  if (isSyncingAnalytics) return;
  isSyncingAnalytics = true;
  try {
    const sql = getSql();
    if (sql) {
      const rows = (await sql`
        SELECT 
          (SELECT "totalVisitors" FROM "PortfolioAnalytics" LIMIT 1) AS "visitors",
          (SELECT "totalDownloads" FROM "ResumeAnalytics" LIMIT 1) AS "downloads"
      `) as any[];
      if (rows && rows.length > 0) {
        if (typeof rows[0]?.visitors === "number") cachedVisitors = rows[0].visitors;
        if (typeof rows[0]?.downloads === "number") cachedDownloads = rows[0].downloads;
      }
      lastVisitorSync = Date.now();
      lastDownloadSync = Date.now();
      return;
    }
    const prisma = getPrisma();
    if (prisma) {
      const [vAnalytics, dAnalytics] = await Promise.all([
        prisma.portfolioAnalytics.findFirst(),
        prisma.resumeAnalytics.findFirst(),
      ]);
      if (typeof vAnalytics?.totalVisitors === "number") cachedVisitors = vAnalytics.totalVisitors;
      if (typeof dAnalytics?.totalDownloads === "number") cachedDownloads = dAnalytics.totalDownloads;
      lastVisitorSync = Date.now();
      lastDownloadSync = Date.now();
    }
  } catch (e) {
    console.warn("Async analytics background sync warning:", e);
  } finally {
    isSyncingAnalytics = false;
  }
}

// Non-blocking Async Sync helper for Feedbacks
async function syncFeedbacksFromDb() {
  try {
    const sql = getSql();
    if (sql) {
      const rows = (await sql`SELECT * FROM "Feedback" ORDER BY "createdAt" DESC`) as any[];
      if (rows) {
        cachedFeedbacks = rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          role: r.role,
          content: r.content,
          date: r.date,
          avatarGradient: r.avatarGradient,
          createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date(r.createdAt).toISOString(),
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
  } catch (e) {
    console.error("Error syncing feedbacks from DB:", e);
    if (cachedFeedbacks === null) cachedFeedbacks = [];
    lastFeedbacksSync = Date.now();
  }
}

// Background DB Writer for Visitor Increment
async function bgIncrementVisitor() {
  try {
    const sql = getSql();
    if (sql) {
      const existing = (await sql`SELECT "id" FROM "PortfolioAnalytics" LIMIT 1`) as any[];
      if (existing && existing.length > 0) {
        const rows = (await sql`
          UPDATE "PortfolioAnalytics"
          SET "totalVisitors" = "totalVisitors" + 1, "updatedAt" = NOW()
          WHERE "id" = ${existing[0].id}
          RETURNING "totalVisitors"
        `) as any[];
        if (rows && rows[0]?.totalVisitors !== undefined) {
          cachedVisitors = rows[0].totalVisitors;
        }
      } else {
        const id = `pa-${Date.now()}`;
        const now = new Date().toISOString();
        const rows = (await sql`
          INSERT INTO "PortfolioAnalytics" ("id", "totalVisitors", "createdAt", "updatedAt")
          VALUES (${id}, 1, ${now}::timestamp, ${now}::timestamp)
          RETURNING "totalVisitors"
        `) as any[];
        cachedVisitors = rows[0]?.totalVisitors ?? 1;
      }
      lastVisitorSync = Date.now();
      return;
    }
    const prisma = getPrisma();
    if (prisma) {
      let analytics = await prisma.portfolioAnalytics.findFirst();
      if (!analytics) {
        analytics = await prisma.portfolioAnalytics.create({ data: { totalVisitors: 1 } });
      } else {
        analytics = await prisma.portfolioAnalytics.update({
          where: { id: analytics.id },
          data: { totalVisitors: { increment: 1 } },
        });
      }
      cachedVisitors = analytics.totalVisitors;
      lastVisitorSync = Date.now();
    }
  } catch (e) {
    console.error("Error incrementing visitor in DB:", e);
  }
}

// Background DB Writer for Download Increment
async function bgIncrementDownload() {
  try {
    const sql = getSql();
    if (sql) {
      const existing = (await sql`SELECT "id" FROM "ResumeAnalytics" LIMIT 1`) as any[];
      if (existing && existing.length > 0) {
        const rows = (await sql`
          UPDATE "ResumeAnalytics"
          SET "totalDownloads" = "totalDownloads" + 1, "updatedAt" = NOW()
          WHERE "id" = ${existing[0].id}
          RETURNING "totalDownloads"
        `) as any[];
        if (rows && rows[0]?.totalDownloads !== undefined) {
          cachedDownloads = rows[0].totalDownloads;
        }
      } else {
        const id = `ra-${Date.now()}`;
        const now = new Date().toISOString();
        const rows = (await sql`
          INSERT INTO "ResumeAnalytics" ("id", "totalDownloads", "createdAt", "updatedAt")
          VALUES (${id}, 1, ${now}::timestamp, ${now}::timestamp)
          RETURNING "totalDownloads"
        `) as any[];
        cachedDownloads = rows[0]?.totalDownloads ?? 1;
      }
      lastDownloadSync = Date.now();
      return;
    }
    const prisma = getPrisma();
    if (prisma) {
      let analytics = await prisma.resumeAnalytics.findFirst();
      if (!analytics) {
        analytics = await prisma.resumeAnalytics.create({ data: { totalDownloads: 1 } });
      } else {
        analytics = await prisma.resumeAnalytics.update({
          where: { id: analytics.id },
          data: { totalDownloads: { increment: 1 } },
        });
      }
      cachedDownloads = analytics.totalDownloads;
      lastDownloadSync = Date.now();
    }
  } catch (e) {
    console.error("Error incrementing download in DB:", e);
  }
}

// ==========================================
// FEEDBACK ACTIONS (High-speed Instant Responses)
// ==========================================

export async function getFeedbacks() {
  if (cachedFeedbacks === null) {
    await syncFeedbacksFromDb();
  } else if (Date.now() - lastFeedbacksSync > 60000) {
    syncFeedbacksFromDb().catch(() => {});
  }
  return { success: true, data: cachedFeedbacks || [] };
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
      const rows = (await sql`
        INSERT INTO "Feedback" ("id", "name", "role", "content", "date", "avatarGradient", "createdAt")
        VALUES (${id}, ${data.name}, ${data.role}, ${data.content}, ${data.date}, ${data.avatarGradient}, ${now}::timestamp)
        RETURNING *
      `) as any[];
      const r = rows[0] || fallbackFeedback;
      const newFB = {
        ...r,
        createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date(r.createdAt).toISOString(),
      };
      cachedFeedbacks = [newFB, ...(cachedFeedbacks || [])];
      return { success: true, data: newFB };
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
    const formatted = {
      ...newFeedback,
      createdAt: newFeedback.createdAt.toISOString(),
    };
    cachedFeedbacks = [formatted, ...(cachedFeedbacks || [])];
    return { success: true, data: formatted };
  } catch (error) {
    console.warn("Failed to add feedback to DB, returning fallback:", error);
    return { success: true, data: fallbackFeedback };
  }
}

// ==========================================
// CONTACT ACTIONS
// ==========================================

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
      const rows = (await sql`
        INSERT INTO "Contact" ("id", "name", "email", "subject", "message", "createdAt")
        VALUES (${id}, ${data.name}, ${data.email}, ${data.subject}, ${data.message}, ${now}::timestamp)
        RETURNING *
      `) as any[];
      const r = rows[0] || fallbackContact;
      return {
        success: true,
        data: {
          id: r.id,
          name: r.name,
          email: r.email,
          subject: r.subject,
          message: r.message,
          createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date(r.createdAt).toISOString(),
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

// ==========================================
// HIGH-SPEED ANALYTICS ACTIONS (< 1ms execution when cached)
// ==========================================

export async function getPortfolioVisitorCount() {
  if (Date.now() - lastVisitorSync > 60000) {
    syncAnalyticsFromDb().catch(() => {});
  }
  return { success: true, data: cachedVisitors };
}

export async function trackPortfolioVisit() {
  cachedVisitors = cachedVisitors + 1;
  bgIncrementVisitor().catch((err) => console.error("bgIncrementVisitor error:", err));
  return { success: true, data: { totalVisitors: cachedVisitors } };
}

export async function getResumeDownloadCount() {
  if (Date.now() - lastDownloadSync > 60000) {
    syncAnalyticsFromDb().catch(() => {});
  }
  return { success: true, data: cachedDownloads };
}

export async function trackResumeDownload() {
  cachedDownloads = cachedDownloads + 1;
  bgIncrementDownload().catch((err) => console.error("bgIncrementDownload error:", err));
  return { success: true, data: { totalDownloads: cachedDownloads } };
}
