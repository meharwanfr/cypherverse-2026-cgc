import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  real,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const subjects = pgTable("subjects", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  code: varchar("code", { length: 20 }).notNull(),
  attended: integer("attended").notNull().default(0),
  total: integer("total").notNull().default(0),
  color: varchar("color", { length: 50 }).notNull(),
  emoji: varchar("emoji", { length: 10 }).notNull(),
  instructor: text("instructor").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const deadlines = pgTable("deadlines", {
  id: varchar("id", { length: 50 }).primaryKey(),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  due: varchar("due", { length: 50 }).notNull(),
  daysLeft: integer("days_left").notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  checked: boolean("checked").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const opportunities = pgTable("opportunities", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  category: varchar("category", { length: 30 }).notNull(),
  deadline: varchar("deadline", { length: 50 }).notNull(),
  daysLeft: integer("days_left").notNull(),
  eligibility: text("eligibility").notNull(),
  description: text("description").notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  tag: text("tag").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resources = pgTable("resources", {
  id: varchar("id", { length: 50 }).primaryKey(),
  title: text("title").notNull(),
  type: varchar("type", { length: 30 }).notNull(),
  subject: text("subject").notNull(),
  author: text("author").notNull(),
  pages: integer("pages").notNull().default(0),
  year: integer("year"),
  color: varchar("color", { length: 50 }).notNull(),
  emoji: varchar("emoji", { length: 10 }).notNull(),
  isNew: boolean("is_new").default(false),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const studentProfile = pgTable("student_profile", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  course: varchar("course", { length: 50 }).notNull(),
  branch: text("branch").notNull(),
  year: varchar("year", { length: 20 }).notNull(),
  semester: integer("semester").notNull(),
  rollNo: varchar("roll_no", { length: 20 }).notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  cgpa: real("cgpa").notNull(),
  initials: varchar("initials", { length: 5 }).notNull(),
  avatarColor: varchar("avatar_color", { length: 50 }).notNull(),
  bio: text("bio").notNull(),
  skills: text("skills").notNull(),
  interests: text("interests").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const collegeEvents = pgTable("college_events", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  place: text("place").notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const healthData = pgTable("health_data", {
  id: varchar("id", { length: 50 }).primaryKey(),
  studentId: varchar("student_id", { length: 50 }).notNull(),
  steps: integer("steps").notNull().default(0),
  water: integer("water").notNull().default(0),
  sleepHours: real("sleep_hours").default(0),
  activeMinutes: integer("active_minutes").default(0),
  streak: integer("streak").default(0),
  date: varchar("date", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const healthActivities = pgTable("health_activities", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id", { length: 50 }).notNull(),
  title: text("title").notNull(),
  stepsText: varchar("steps_text", { length: 50 }).notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const walletTransactions = pgTable("wallet_transactions", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id", { length: 50 }).notNull(),
  title: text("title").notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  amount: integer("amount").notNull(),
  type: varchar("type", { length: 10 }).notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const walletBalance = pgTable("wallet_balance", {
  id: varchar("id", { length: 50 }).primaryKey(),
  studentId: varchar("student_id", { length: 50 }).notNull(),
  balance: integer("balance").notNull().default(0),
  monthlySpending: integer("monthly_spending").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const savedOpportunities = pgTable("saved_opportunities", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id", { length: 50 }).notNull(),
  opportunityId: varchar("opportunity_id", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookmarkedResources = pgTable("bookmarked_resources", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id", { length: 50 }).notNull(),
  resourceId: varchar("resource_id", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
