import "dotenv/config";
import express from "express";
import cors from "cors";
import { db, schema } from "./db/index.js";
import { eq, and, desc } from "drizzle-orm";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"], credentials: true }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const level = status >= 400 ? "WARN" : "INFO";
    console.log(`[${level}] ${req.method} ${req.originalUrl} ${status} ${duration}ms`);
  });
  next();
});

const STUDENT_ID = "student-1";

// ─── SUBJECTS ──────────────────────────────────────────────
app.get("/api/subjects", async (req, res) => {
  try {
    console.log("[API] GET /api/subjects");
    const all = await db.select().from(schema.subjects);
    console.log(`[API] Returning ${all.length} subjects`);
    res.json(all);
  } catch (error) {
    console.error("[API] GET /api/subjects error:", error);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});

app.patch("/api/subjects/:id/attendance", async (req, res) => {
  try {
    const { id } = req.params;
    const { attended, total } = req.body;
    console.log(`[API] PATCH /api/subjects/${id}/attendance`, { attended, total });

    if (attended === undefined || total === undefined) {
      return res.status(400).json({ error: "attended and total are required" });
    }

    const updated = await db
      .update(schema.subjects)
      .set({ attended: Math.min(attended, total), total, updatedAt: new Date() })
      .where(eq(schema.subjects.id, id))
      .returning();

    if (updated.length === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }

    console.log(`[API] Updated subject ${id}:`, updated[0]);
    res.json(updated[0]);
  } catch (error) {
    console.error("[API] PATCH /api/subjects/:id/attendance error:", error);
    res.status(500).json({ error: "Failed to update attendance" });
  }
});

app.patch("/api/subjects/:id/attendance/bump", async (req, res) => {
  try {
    const { id } = req.params;
    const { delta } = req.body;
    console.log(`[API] PATCH /api/subjects/${id}/attendance/bump`, { delta });

    const subject = await db.select().from(schema.subjects).where(eq(schema.subjects.id, id)).limit(1);
    if (subject.length === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const s = subject[0];
    let newAttended = s.attended;
    let newTotal = s.total;

    if (delta > 0) {
      newAttended += 1;
      newTotal += 1;
    } else {
      newAttended = Math.max(0, newAttended - 1);
    }

    const updated = await db
      .update(schema.subjects)
      .set({ attended: newAttended, total: newTotal, updatedAt: new Date() })
      .where(eq(schema.subjects.id, id))
      .returning();

    console.log(`[API] Bumped subject ${id}:`, updated[0]);
    res.json(updated[0]);
  } catch (error) {
    console.error("[API] PATCH /api/subjects/:id/attendance/bump error:", error);
    res.status(500).json({ error: "Failed to bump attendance" });
  }
});

app.post("/api/subjects", async (req, res) => {
  try {
    const { name, code, color, emoji, instructor } = req.body;
    console.log("[API] POST /api/subjects", { name, code });

    if (!name || !code) {
      return res.status(400).json({ error: "name and code are required" });
    }

    const id = `subject-${Date.now()}`;
    const inserted = await db
      .insert(schema.subjects)
      .values({
        id,
        name,
        code,
        attended: 0,
        total: 0,
        color: color || "bg-scrap-sage",
        emoji: emoji || "📚",
        instructor: instructor || "TBA",
      })
      .returning();

    console.log(`[API] Created subject:`, inserted[0]);
    res.status(201).json(inserted[0]);
  } catch (error) {
    console.error("[API] POST /api/subjects error:", error);
    res.status(500).json({ error: "Failed to create subject" });
  }
});

app.delete("/api/subjects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[API] DELETE /api/subjects/${id}`);

    const deleted = await db
      .delete(schema.subjects)
      .where(eq(schema.subjects.id, id))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }

    console.log(`[API] Deleted subject ${id}`);
    res.json({ success: true });
  } catch (error) {
    console.error("[API] DELETE /api/subjects/:id error:", error);
    res.status(500).json({ error: "Failed to delete subject" });
  }
});

// ─── DEADLINES ─────────────────────────────────────────────
app.get("/api/deadlines", async (req, res) => {
  try {
    console.log("[API] GET /api/deadlines");
    const all = await db.select().from(schema.deadlines);
    console.log(`[API] Returning ${all.length} deadlines`);
    res.json(all);
  } catch (error) {
    console.error("[API] GET /api/deadlines error:", error);
    res.status(500).json({ error: "Failed to fetch deadlines" });
  }
});

app.post("/api/deadlines", async (req, res) => {
  try {
    const { title, subject, due, daysLeft, color } = req.body;
    console.log("[API] POST /api/deadlines", { title, subject, due });

    if (!title || !subject || !due) {
      return res.status(400).json({ error: "title, subject, and due are required" });
    }

    const id = `custom-${Date.now()}`;
    const inserted = await db
      .insert(schema.deadlines)
      .values({ id, title, subject, due, daysLeft: daysLeft || 0, color: color || "bg-scrap-coral" })
      .returning();

    console.log(`[API] Created deadline:`, inserted[0]);
    res.status(201).json(inserted[0]);
  } catch (error) {
    console.error("[API] POST /api/deadlines error:", error);
    res.status(500).json({ error: "Failed to create deadline" });
  }
});

app.patch("/api/deadlines/:id/check", async (req, res) => {
  try {
    const { id } = req.params;
    const { checked } = req.body;
    console.log(`[API] PATCH /api/deadlines/${id}/check`, { checked });

    const updated = await db
      .update(schema.deadlines)
      .set({ checked: !!checked, updatedAt: new Date() })
      .where(eq(schema.deadlines.id, id))
      .returning();

    if (updated.length === 0) {
      return res.status(404).json({ error: "Deadline not found" });
    }

    console.log(`[API] Updated deadline ${id}:`, updated[0]);
    res.json(updated[0]);
  } catch (error) {
    console.error("[API] PATCH /api/deadlines/:id/check error:", error);
    res.status(500).json({ error: "Failed to update deadline" });
  }
});

app.delete("/api/deadlines/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[API] DELETE /api/deadlines/${id}`);

    const deleted = await db
      .delete(schema.deadlines)
      .where(eq(schema.deadlines.id, id))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({ error: "Deadline not found" });
    }

    console.log(`[API] Deleted deadline ${id}`);
    res.json({ success: true });
  } catch (error) {
    console.error("[API] DELETE /api/deadlines/:id error:", error);
    res.status(500).json({ error: "Failed to delete deadline" });
  }
});

// ─── OPPORTUNITIES ─────────────────────────────────────────
app.get("/api/opportunities", async (req, res) => {
  try {
    console.log("[API] GET /api/opportunities");
    const all = await db.select().from(schema.opportunities);
    console.log(`[API] Returning ${all.length} opportunities`);
    res.json(all);
  } catch (error) {
    console.error("[API] GET /api/opportunities error:", error);
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
});

app.post("/api/saved-opportunities", async (req, res) => {
  try {
    const { opportunityId } = req.body;
    console.log("[API] POST /api/saved-opportunities", { opportunityId });

    if (!opportunityId) {
      return res.status(400).json({ error: "opportunityId is required" });
    }

    // Check if already saved
    const existing = await db
      .select()
      .from(schema.savedOpportunities)
      .where(and(
        eq(schema.savedOpportunities.studentId, STUDENT_ID),
        eq(schema.savedOpportunities.opportunityId, opportunityId)
      ));

    if (existing.length > 0) {
      // Toggle off - unsave
      await db
        .delete(schema.savedOpportunities)
        .where(and(
          eq(schema.savedOpportunities.studentId, STUDENT_ID),
          eq(schema.savedOpportunities.opportunityId, opportunityId)
        ));
      console.log(`[API] Unsaved opportunity ${opportunityId}`);
      return res.json({ saved: false });
    }

    await db.insert(schema.savedOpportunities).values({
      studentId: STUDENT_ID,
      opportunityId,
    });

    console.log(`[API] Saved opportunity ${opportunityId}`);
    res.json({ saved: true });
  } catch (error) {
    console.error("[API] POST /api/saved-opportunities error:", error);
    res.status(500).json({ error: "Failed to save opportunity" });
  }
});

app.get("/api/saved-opportunities", async (req, res) => {
  try {
    console.log("[API] GET /api/saved-opportunities");
    const saved = await db
      .select()
      .from(schema.savedOpportunities)
      .where(eq(schema.savedOpportunities.studentId, STUDENT_ID));
    const ids = saved.map((s) => s.opportunityId);
    console.log(`[API] Returning ${ids.length} saved opportunity IDs`);
    res.json(ids);
  } catch (error) {
    console.error("[API] GET /api/saved-opportunities error:", error);
    res.status(500).json({ error: "Failed to fetch saved opportunities" });
  }
});

// ─── RESOURCES ─────────────────────────────────────────────
app.get("/api/resources", async (req, res) => {
  try {
    console.log("[API] GET /api/resources");
    const all = await db.select().from(schema.resources);
    console.log(`[API] Returning ${all.length} resources`);
    res.json(all);
  } catch (error) {
    console.error("[API] GET /api/resources error:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

app.post("/api/resources", async (req, res) => {
  try {
    const { title, type, subject, author, pages, color, emoji, url } = req.body;
    console.log("[API] POST /api/resources", { title, type, subject, author });

    if (!title || !type || !subject || !author) {
      return res.status(400).json({ error: "title, type, subject, and author are required" });
    }

    const id = `custom-${Date.now()}`;
    const inserted = await db
      .insert(schema.resources)
      .values({
        id,
        title,
        type,
        subject,
        author,
        pages: pages || 1,
        color: color || "bg-crayon-blue",
        emoji: emoji || "📝",
        isNew: true,
        url: url || null,
      })
      .returning();

    console.log(`[API] Created resource:`, inserted[0]);
    res.status(201).json(inserted[0]);
  } catch (error) {
    console.error("[API] POST /api/resources error:", error);
    res.status(500).json({ error: "Failed to create resource" });
  }
});

app.delete("/api/resources/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[API] DELETE /api/resources/${id}`);

    const deleted = await db
      .delete(schema.resources)
      .where(eq(schema.resources.id, id))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({ error: "Resource not found" });
    }

    console.log(`[API] Deleted resource ${id}`);
    res.json({ success: true });
  } catch (error) {
    console.error("[API] DELETE /api/resources/:id error:", error);
    res.status(500).json({ error: "Failed to delete resource" });
  }
});

app.post("/api/bookmarked-resources", async (req, res) => {
  try {
    const { resourceId } = req.body;
    console.log("[API] POST /api/bookmarked-resources", { resourceId });

    if (!resourceId) {
      return res.status(400).json({ error: "resourceId is required" });
    }

    const existing = await db
      .select()
      .from(schema.bookmarkedResources)
      .where(and(
        eq(schema.bookmarkedResources.studentId, STUDENT_ID),
        eq(schema.bookmarkedResources.resourceId, resourceId)
      ));

    if (existing.length > 0) {
      await db
        .delete(schema.bookmarkedResources)
        .where(and(
          eq(schema.bookmarkedResources.studentId, STUDENT_ID),
          eq(schema.bookmarkedResources.resourceId, resourceId)
        ));
      console.log(`[API] Unbookmarked resource ${resourceId}`);
      return res.json({ bookmarked: false });
    }

    await db.insert(schema.bookmarkedResources).values({
      studentId: STUDENT_ID,
      resourceId,
    });

    console.log(`[API] Bookmarked resource ${resourceId}`);
    res.json({ bookmarked: true });
  } catch (error) {
    console.error("[API] POST /api/bookmarked-resources error:", error);
    res.status(500).json({ error: "Failed to bookmark resource" });
  }
});

app.get("/api/bookmarked-resources", async (req, res) => {
  try {
    console.log("[API] GET /api/bookmarked-resources");
    const bookmarks = await db
      .select()
      .from(schema.bookmarkedResources)
      .where(eq(schema.bookmarkedResources.studentId, STUDENT_ID));
    const ids = bookmarks.map((b) => b.resourceId);
    console.log(`[API] Returning ${ids.length} bookmarked resource IDs`);
    res.json(ids);
  } catch (error) {
    console.error("[API] GET /api/bookmarked-resources error:", error);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

// ─── STUDENT PROFILE ───────────────────────────────────────
app.get("/api/student/profile", async (req, res) => {
  try {
    console.log("[API] GET /api/student/profile");
    const profiles = await db
      .select()
      .from(schema.studentProfile)
      .where(eq(schema.studentProfile.id, STUDENT_ID));

    if (profiles.length === 0) {
      return res.status(404).json({ error: "Student profile not found" });
    }

    const profile = {
      ...profiles[0],
      skills: JSON.parse(profiles[0].skills),
      interests: JSON.parse(profiles[0].interests),
    };

    console.log(`[API] Returning profile for ${profile.name}`);
    res.json(profile);
  } catch (error) {
    console.error("[API] GET /api/student/profile error:", error);
    res.status(500).json({ error: "Failed to fetch student profile" });
  }
});

// ─── COLLEGE EVENTS ────────────────────────────────────────
app.get("/api/events", async (req, res) => {
  try {
    console.log("[API] GET /api/events");
    const all = await db.select().from(schema.collegeEvents);
    console.log(`[API] Returning ${all.length} events`);
    res.json(all);
  } catch (error) {
    console.error("[API] GET /api/events error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// ─── HEALTH ────────────────────────────────────────────────
app.get("/api/health", async (req, res) => {
  try {
    console.log("[API] GET /api/health");
    const today = new Date().toISOString().split("T")[0];

    const data = await db
      .select()
      .from(schema.healthData)
      .where(and(
        eq(schema.healthData.studentId, STUDENT_ID),
        eq(schema.healthData.date, today)
      ));

    if (data.length === 0) {
      // Create today's health record
      const created = await db
        .insert(schema.healthData)
        .values({
          id: `health-${STUDENT_ID}-${today}`,
          studentId: STUDENT_ID,
          steps: 0,
          water: 0,
          date: today,
        })
        .returning();
      console.log(`[API] Created health record for ${today}`);
      return res.json(created[0]);
    }

    console.log(`[API] Returning health data for ${today}:`, data[0]);
    res.json(data[0]);
  } catch (error) {
    console.error("[API] GET /api/health error:", error);
    res.status(500).json({ error: "Failed to fetch health data" });
  }
});

app.put("/api/health", async (req, res) => {
  try {
    const { steps, water } = req.body;
    console.log("[API] PUT /api/health", { steps, water });
    const today = new Date().toISOString().split("T")[0];

    const existing = await db
      .select()
      .from(schema.healthData)
      .where(and(
        eq(schema.healthData.studentId, STUDENT_ID),
        eq(schema.healthData.date, today)
      ));

    if (existing.length === 0) {
      const created = await db
        .insert(schema.healthData)
        .values({
          id: `health-${STUDENT_ID}-${today}`,
          studentId: STUDENT_ID,
          steps: steps || 0,
          water: water || 0,
          date: today,
        })
        .returning();
      console.log(`[API] Created health record:`, created[0]);
      return res.json(created[0]);
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (steps !== undefined) updateData.steps = steps;
    if (water !== undefined) updateData.water = water;

    const updated = await db
      .update(schema.healthData)
      .set(updateData)
      .where(eq(schema.healthData.id, existing[0].id))
      .returning();

    console.log(`[API] Updated health data:`, updated[0]);
    res.json(updated[0]);
  } catch (error) {
    console.error("[API] PUT /api/health error:", error);
    res.status(500).json({ error: "Failed to update health data" });
  }
});

app.get("/api/health/activities", async (req, res) => {
  try {
    console.log("[API] GET /api/health/activities");
    const activities = await db
      .select()
      .from(schema.healthActivities)
      .where(eq(schema.healthActivities.studentId, STUDENT_ID));
    console.log(`[API] Returning ${activities.length} activities`);
    res.json(activities);
  } catch (error) {
    console.error("[API] GET /api/health/activities error:", error);
    res.status(500).json({ error: "Failed to fetch health activities" });
  }
});

// ─── WALLET ────────────────────────────────────────────────
app.get("/api/wallet", async (req, res) => {
  try {
    console.log("[API] GET /api/wallet");
    const balance = await db
      .select()
      .from(schema.walletBalance)
      .where(eq(schema.walletBalance.studentId, STUDENT_ID));

    if (balance.length === 0) {
      const created = await db
        .insert(schema.walletBalance)
        .values({ id: `wallet-${STUDENT_ID}`, studentId: STUDENT_ID, balance: 0, monthlySpending: 0 })
        .returning();
      return res.json(created[0]);
    }

    console.log(`[API] Returning wallet balance:`, balance[0]);
    res.json(balance[0]);
  } catch (error) {
    console.error("[API] GET /api/wallet error:", error);
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
});

app.post("/api/wallet/topup", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("[API] POST /api/wallet/topup", { amount });

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "amount must be a positive number" });
    }

    const existing = await db
      .select()
      .from(schema.walletBalance)
      .where(eq(schema.walletBalance.studentId, STUDENT_ID));

    if (existing.length === 0) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const newBalance = existing[0].balance + amount;

    const updated = await db
      .update(schema.walletBalance)
      .set({ balance: newBalance, updatedAt: new Date() })
      .where(eq(schema.walletBalance.id, existing[0].id))
      .returning();

    // Add transaction record
    await db.insert(schema.walletTransactions).values({
      studentId: STUDENT_ID,
      title: "Wallet Top-up",
      date: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }),
      amount,
      type: "in",
      color: "bg-scrap-sage",
    });

    console.log(`[API] Top-up successful. New balance: ${newBalance}`);
    res.json(updated[0]);
  } catch (error) {
    console.error("[API] POST /api/wallet/topup error:", error);
    res.status(500).json({ error: "Failed to top up wallet" });
  }
});

app.get("/api/wallet/transactions", async (req, res) => {
  try {
    console.log("[API] GET /api/wallet/transactions");
    const transactions = await db
      .select()
      .from(schema.walletTransactions)
      .where(eq(schema.walletTransactions.studentId, STUDENT_ID))
      .orderBy(desc(schema.walletTransactions.createdAt));
    console.log(`[API] Returning ${transactions.length} transactions`);
    res.json(transactions);
  } catch (error) {
    console.error("[API] GET /api/wallet/transactions error:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// ─── AI CHATBOT ──────────────────────────────────────────────
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message, history } = req.body;
    console.log("[API] POST /api/chatbot", { message, historyLength: Array.isArray(history) ? history.length : 0 });

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    // Build conversation history for context (last 6 messages before current one)
    const chatHistory: { role: "user" | "assistant"; content: string }[] = Array.isArray(history)
      ? history
          .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
          .slice(-6)
          .map((m: any) => ({ role: m.role as "user" | "assistant", content: String(m.content).slice(0, 1000) }))
      : [];

    // Fetch all user data for context
    const [
      subjects,
      deadlines,
      opportunities,
      resources,
      student,
      events,
      health,
      wallet,
      transactions,
    ] = await Promise.all([
      db.select().from(schema.subjects),
      db.select().from(schema.deadlines),
      db.select().from(schema.opportunities),
      db.select().from(schema.resources),
      db.select().from(schema.studentProfile).where(eq(schema.studentProfile.id, STUDENT_ID)),
      db.select().from(schema.collegeEvents),
      db.select().from(schema.healthData).where(eq(schema.healthData.studentId, STUDENT_ID)),
      db.select().from(schema.walletBalance).where(eq(schema.walletBalance.studentId, STUDENT_ID)),
      db.select().from(schema.walletTransactions).where(eq(schema.walletTransactions.studentId, STUDENT_ID)).orderBy(desc(schema.walletTransactions.createdAt)),
    ]);

    const profile = student[0];
    const healthData = health[0];
    const walletData = wallet[0];

    // Build context string
    const context = `
You are CampusBuddy, a friendly AI assistant for a college student. You have full access to their campus data.
Speak casually, like a helpful senior who knows their schedule. Keep responses concise but warm.

=== STUDENT PROFILE ===
Name: ${profile?.name}
Course: ${profile?.course}
Branch: ${profile?.branch}
Year: ${profile?.year}
Semester: ${profile?.semester}
Roll No: ${profile?.rollNo}
CGPA: ${profile?.cgpa}
Email: ${profile?.email}
Phone: ${profile?.phone}
Bio: ${profile?.bio}
Skills: ${JSON.parse(profile?.skills || "[]").map((s: any) => `${s.name} (${s.level}/5)`).join(", ")}
Interests: ${JSON.parse(profile?.interests || "[]").join(", ")}

=== SUBJECTS & ATTENDANCE ===
${subjects.map((s: any) => `${s.name} (${s.code}): ${s.attended}/${s.total} classes (${Math.round((s.attended/s.total)*100)}%) - ${s.instructor}`).join("\n")}
Overall Attendance: ${Math.round((subjects.reduce((a: number, s: any) => a + s.attended, 0) / subjects.reduce((a: number, s: any) => a + s.total, 0)) * 100)}%

=== DEADLINES ===
${deadlines.map((d: any) => `${d.title} (${d.subject}) - Due: ${d.due} (${d.daysLeft}d left) ${d.checked ? "✓ DONE" : "⏳ PENDING"}`).join("\n") || "No deadlines"}

=== OPPORTUNITIES ===
${opportunities.map((o: any) => `${o.name} [${o.category}] - Deadline: ${o.deadline} (${o.daysLeft}d left) - ${o.tag}`).join("\n") || "No opportunities"}

=== RESOURCES ===
${resources.map((r: any) => `${r.title} [${r.type}] - ${r.subject} by ${r.author} (${r.pages} pages)${r.url ? ` - Link: ${r.url}` : ""}`).join("\n") || "No resources"}

=== COLLEGE EVENTS ===
${events.map((e: any) => `${e.name} - ${e.date} at ${e.time}, ${e.place}`).join("\n") || "No events"}

=== HEALTH ===
Steps: ${healthData?.steps || 0} | Water: ${healthData?.water || 0} glasses | Sleep: ${healthData?.sleepHours || 0}h | Active: ${healthData?.activeMinutes || 0}min | Streak: ${healthData?.streak || 0} days

=== WALLET ===
Balance: ₹${walletData?.balance || 0} | Monthly Spending: ₹${walletData?.monthlySpending || 0}
Recent Transactions:
${transactions.slice(0, 5).map((t: any) => `${t.title} - ₹${t.amount} (${t.type}) on ${t.date}`).join("\n")}

=== CURRENT DATE ===
${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}

=== INSTRUCTIONS ===
- Answer questions about their schedule, deadlines, attendance, health, wallet, opportunities
- Format responses with simple markdown: **bold** for key numbers and names, bullet lists for multiple items, tables for comparisons - it renders beautifully in the app
- Give actionable advice (what to prioritize, when to study, etc.)
- Be encouraging but realistic
- If asked to do something you can't (like actually mark attendance), explain how to do it in the app
- Never make up data - only use what's provided above
- Keep responses under 200 words unless they ask for detail
- Remember the conversation so far and use it - if the user says "what about the second one?" or "explain more", refer back to earlier messages
`;

    // Call Groq API
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.warn("[API] GROQ_API_KEY not set, using fallback response");
      return res.json({ 
        response: "Hey! I'd love to chat, but I need a GROQ_API_KEY environment variable to be set on the server. Ask the admin to add it! For now, I can tell you your data is loaded and ready." 
      });
    }

    const chatPayloadMessages = [
      { role: "system", content: context },
      ...chatHistory,
      { role: "user", content: message },
    ];

    // Try models in order — Groq rotates/deprecates models, so fall back automatically
    const GROQ_MODELS = ["openai/gpt-oss-20b", "openai/gpt-oss-120b", "qwen/qwen3.6-27b"];

    let response: string | null = null;
    let lastError = "";

    for (const model of GROQ_MODELS) {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: chatPayloadMessages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        response = data.choices?.[0]?.message?.content || null;
        if (response) break;
        lastError = "empty completion";
        continue;
      }

      lastError = await groqRes.text();
      console.warn(`[API] Groq model "${model}" failed:`, lastError);

      // Auth/quota errors won't be fixed by trying another model
      if (groqRes.status === 401 || groqRes.status === 403 || groqRes.status === 429) {
        break;
      }
    }

    if (!response) {
      console.error("[API] All Groq models failed:", lastError);
      return res.status(500).json({ error: "AI service error" });
    }

    console.log("[API] Chatbot response sent");
    res.json({ response });
  } catch (error) {
    console.error("[API] POST /api/chatbot error:", error);
    res.status(500).json({ error: "Failed to process chat" });
  }
});

// ─── HEALTH CHECK ──────────────────────────────────────────
app.get("/api/health-check", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── 404 HANDLER ───────────────────────────────────────────
app.use((req, res) => {
  console.warn(`[API] 404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Not found" });
});

// ─── ERROR HANDLER ─────────────────────────────────────────
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`[API] Unhandled error on ${req.method} ${req.originalUrl}:`, err);
  res.status(500).json({ error: "Internal server error" });
});

// ─── START SERVER ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   Cypherverse Backend Server Started    ║
║   Port: ${PORT}                            ║
║   Env:  ${process.env.NODE_ENV || "development"}                  ║
╚══════════════════════════════════════════╝
  `);
  console.log(`[server] API endpoints available at http://localhost:${PORT}/api`);
  console.log(`[server] Health check at http://localhost:${PORT}/api/health-check`);
});

export default app;
