import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Parse "09:00 AM" → { hours: 9, minutes: 0 }
function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [clock, period] = timeStr.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
}

// Format a local Date to an ISO string with IST offset (+05:30)
function formatIST(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:00+05:30`
  );
}

// Guaranteed fallback — unique Jitsi Meet room (no API key needed)
function generateJitsiLink(name: string, date: string, time: string): string {
  const slug = `portfolio-${name}-${date}-${time}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return `https://meet.jit.si/${slug}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, topic } = body;

    if (!name || !email || !date || !time || !topic) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ── Auth ──────────────────────────────────────────────────────────────────
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    if (!privateKey || !clientEmail) {
      return NextResponse.json(
        { error: "Google Calendar is not configured on the server." },
        { status: 503 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/meetings.space.created",
      ],
    });

    // ── Step 1: Get a video call link ─────────────────────────────────────────
    // Try Google Meet API first; fall back to Jitsi (always works, no API key).
    let meetLink: string;
    let meetProvider: "google" | "jitsi";

    try {
      const meetClient = google.meet({ version: "v2", auth });
      const space = await meetClient.spaces.create({ requestBody: {} });
      const uri = space.data.meetingUri;
      if (!uri) throw new Error("No meetingUri in Meet API response");
      meetLink = uri;
      meetProvider = "google";
      console.log("[schedule-meeting] ✅ Google Meet space created:", meetLink);
    } catch (meetErr) {
      // Google Meet API not enabled → fall back to Jitsi
      const msg = meetErr instanceof Error ? meetErr.message : String(meetErr);
      console.warn(
        "[schedule-meeting] ⚠️  Google Meet API unavailable, using Jitsi fallback. Reason:", msg
      );
      meetLink = generateJitsiLink(name, date, time);
      meetProvider = "jitsi";
      console.log("[schedule-meeting] ✅ Jitsi room generated:", meetLink);
    }

    // ── Step 2: Build times ───────────────────────────────────────────────────
    const [year, month, day] = date.split("-").map(Number);
    const { hours, minutes } = parseTime(time);
    const startDate = new Date(year, month - 1, day, hours, minutes, 0);
    const endDate   = new Date(startDate.getTime() + 60 * 60 * 1000);

    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    // ── Step 3: Create Calendar Event ─────────────────────────────────────────
    const providerLabel = meetProvider === "google" ? "🎥 Google Meet" : "🎥 Video Call (Jitsi)";

    const event = await google.calendar({ version: "v3", auth }).events.insert({
      calendarId,
      sendUpdates: "none",
      requestBody: {
        summary: `📅 1-on-1 with ${name} — Portfolio Meeting`,
        // Setting location to the meet URL makes Google Calendar
        // render a "Join meeting" button directly on the event card
        location: meetLink,
        description: [
          `👤 Guest : ${name}`,
          `📧 Email : ${email}`,
          `📞 Phone : ${phone}`,
          ``,
          `📝 Topic :`,
          topic,
          ``,
          `${providerLabel} : ${meetLink}`,
        ].join("\n"),
        start: { dateTime: formatIST(startDate), timeZone: "Asia/Kolkata" },
        end:   { dateTime: formatIST(endDate),   timeZone: "Asia/Kolkata" },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email" as const, minutes: 60 },
            { method: "popup" as const, minutes: 15 },
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      meetLink,
      meetProvider,
      eventId: event.data.id,
      startTime: formatIST(startDate),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[schedule-meeting] ❌ Error:", message);
    return NextResponse.json(
      { error: "Failed to create meeting", details: message },
      { status: 500 }
    );
  }
}
