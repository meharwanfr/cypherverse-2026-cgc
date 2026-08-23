import "dotenv/config";
import { db, schema } from "./index.js";

const STUDENT_ID = "student-1";

async function seed() {
  console.log("[seed] Starting database seed...");

  try {
    console.log("[seed] Clearing existing data...");
    await db.delete(schema.bookmarkedResources);
    await db.delete(schema.savedOpportunities);
    await db.delete(schema.walletBalance);
    await db.delete(schema.walletTransactions);
    await db.delete(schema.healthActivities);
    await db.delete(schema.healthData);
    await db.delete(schema.collegeEvents);
    await db.delete(schema.studentProfile);
    await db.delete(schema.resources);
    await db.delete(schema.opportunities);
    await db.delete(schema.deadlines);
    await db.delete(schema.subjects);

    console.log("[seed] Seeding subjects...");
    await db.insert(schema.subjects).values([
      { id: "s1", name: "Data Structures", code: "CS301", attended: 38, total: 42, color: "bg-crayon-blue", emoji: "\u{1F333}", instructor: "Prof. Mehta" },
      { id: "s2", name: "Operating Systems", code: "CS302", attended: 29, total: 40, color: "bg-crayon-orange", emoji: "\u{1F5A5}\uFE0F", instructor: "Dr. Iyer" },
      { id: "s3", name: "DBMS", code: "CS303", attended: 22, total: 38, color: "bg-crayon-pink", emoji: "\u{1F5C4}\uFE0F", instructor: "Prof. Rao" },
      { id: "s4", name: "Computer Networks", code: "CS304", attended: 35, total: 36, color: "bg-crayon-green", emoji: "\u{1F310}", instructor: "Dr. Nair" },
      { id: "s5", name: "Theory of Computation", code: "CS305", attended: 18, total: 34, color: "bg-crayon-plum", emoji: "\u{1F916}", instructor: "Prof. Banerjee" },
      { id: "s6", name: "Software Engineering", code: "CS306", attended: 31, total: 35, color: "bg-crayon-yellow", emoji: "\u{1F9E9}", instructor: "Dr. Kulkarni" },
    ]);

    console.log("[seed] Seeding deadlines...");
    await db.insert(schema.deadlines).values([
      { id: "d1", title: "DBMS Project Submission", subject: "DBMS", due: "Aug 24", daysLeft: 2, color: "bg-crayon-pink" },
      { id: "d2", title: "OS Assignment 3", subject: "Operating Systems", due: "Aug 27", daysLeft: 5, color: "bg-crayon-orange" },
      { id: "d3", title: "TOC Quiz", subject: "Theory of Computation", due: "Aug 29", daysLeft: 7, color: "bg-crayon-plum" },
      { id: "d4", title: "SE Lab Report", subject: "Software Engineering", due: "Sep 2", daysLeft: 11, color: "bg-crayon-yellow" },
    ]);

    console.log("[seed] Seeding opportunities...");
    await db.insert(schema.opportunities).values([
      { id: "o1", name: "Google Generation Scholarship", category: "Scholarship", deadline: "Sep 15", daysLeft: 24, eligibility: "2nd-4th year, CS/IT, CGPA 7.5+", description: "A $2,500 award for students from underrepresented groups in tech. Includes a Google mentor.", color: "bg-crayon-green", tag: "free money? hello??" },
      { id: "o2", name: "HackTheNorth 36-Hour Hackathon", category: "Hackathon", deadline: "Sep 30", daysLeft: 39, eligibility: "All UG students, teams of 2-4", description: "Build something silly (or serious) in 36 hours. Prizes worth $10k. Free pizza at 2am.", color: "bg-crayon-orange", tag: "go build something silly" },
      { id: "o3", name: "Microsoft Engage Internship", category: "Internship", deadline: "Oct 5", daysLeft: 44, eligibility: "3rd year, CGPA 8+", description: "12-week summer internship on a real product team. Remote-friendly. Mentorship guaranteed.", color: "bg-crayon-blue", tag: "the big one" },
      { id: "o4", name: "Smart India Hackathon", category: "Competition", deadline: "Sep 8", daysLeft: 17, eligibility: "All UG/PG, teams of 6", description: "Solve real government problem statements in 36 hours. National finals in Delhi.", color: "bg-crayon-yellow", tag: "for the country!" },
      { id: "o5", name: "TechFest 2026 - IIT Bombay", category: "Event", deadline: "Dec 18", daysLeft: 118, eligibility: "Open to all students", description: "Asia's largest tech fest. Robo-wars, drone racing, exhibitions, and a concert night.", color: "bg-crayon-pink", tag: "road trip??" },
      { id: "o6", name: "Adobe Women in Tech Scholarship", category: "Scholarship", deadline: "Oct 20", daysLeft: 59, eligibility: "Women in 2nd-4th year, CS/IT", description: "$5,000 award plus a guaranteed Adobe internship interview. Essay-based application.", color: "bg-crayon-plum", tag: "apply, like, yesterday" },
      { id: "o7", name: "CodeChef SnackDown", category: "Competition", deadline: "Sep 12", daysLeft: 21, eligibility: "All students, solo or duo", description: "Global competitive programming contest. Bragging rights + swag for life.", color: "bg-crayon-teal", tag: "flex on them" },
      { id: "o8", name: "Campus Cultural Night", category: "Event", deadline: "Aug 30", daysLeft: 8, eligibility: "Everyone, free entry", description: "Music, dance, food stalls, and a surprise headliner. Bring your whole squad.", color: "bg-crayon-lime", tag: "vibes only" },
    ]);

    console.log("[seed] Seeding resources...");
    await db.insert(schema.resources).values([
      { id: "r1", title: "DSA Complete Handwritten Notes", type: "Notes", subject: "Data Structures", author: "Ananya R.", pages: 84, color: "bg-crayon-blue", emoji: "\u{1F4DD}", isNew: true },
      { id: "r2", title: "Operating System Concepts", type: "Book", subject: "Operating Systems", author: "Silberschatz", pages: 944, year: 2018, color: "bg-crayon-orange", emoji: "\u{1F4D8}" },
      { id: "r3", title: "DBMS Lab Manual (E-book)", type: "E-book", subject: "DBMS", author: "Dept. of CSE", pages: 120, color: "bg-crayon-pink", emoji: "\u{1F4BE}", isNew: true },
      { id: "r4", title: "TOC Previous Year Papers (2019-2024)", type: "PYQ", subject: "Theory of Computation", author: "Exam Cell", pages: 60, year: 2024, color: "bg-crayon-plum", emoji: "\u{1F4DC}" },
      { id: "r5", title: "Computer Networks - Lecture Slides", type: "Subject Resource", subject: "Computer Networks", author: "Dr. Nair", pages: 210, color: "bg-crayon-green", emoji: "\u{1F310}" },
      { id: "r6", title: "Software Engineering - A Practitioner's Approach", type: "Book", subject: "Software Engineering", author: "Pressman", pages: 816, year: 2020, color: "bg-crayon-yellow", emoji: "\u{1F9E9}" },
      { id: "r7", title: "DBMS PYQ Bundle (2020-2024)", type: "PYQ", subject: "DBMS", author: "Exam Cell", pages: 48, year: 2024, color: "bg-crayon-pink", emoji: "\u{1F4CB}" },
      { id: "r8", title: "OS Crash Course Notes (1 night before)", type: "Notes", subject: "Operating Systems", author: "Karan M.", pages: 32, color: "bg-crayon-orange", emoji: "\u26A1", isNew: true },
      { id: "r9", title: "Introduction to Algorithms (CLRS)", type: "E-book", subject: "Data Structures", author: "Cormen et al.", pages: 1312, year: 2022, color: "bg-crayon-blue", emoji: "\u{1F4D7}" },
      { id: "r10", title: "CN Formula Sheet + Mind Maps", type: "Subject Resource", subject: "Computer Networks", author: "Study Club", pages: 14, color: "bg-crayon-green", emoji: "\u{1F5FA}\uFE0F" },
      { id: "r11", title: "TOC Cheatsheet (NFA to DFA to RE)", type: "Notes", subject: "Theory of Computation", author: "Priya S.", pages: 8, color: "bg-crayon-plum", emoji: "\u{1F9E0}" },
      { id: "r12", title: "SE Case Study: Build-a-Bazaar", type: "Subject Resource", subject: "Software Engineering", author: "Dr. Kulkarni", pages: 40, color: "bg-crayon-yellow", emoji: "\u{1F3D7}\uFE0F" },
    ]);

    console.log("[seed] Seeding student profile...");
    await db.insert(schema.studentProfile).values({
      id: STUDENT_ID,
      name: "Aarav Sharma",
      course: "B.Tech",
      branch: "Computer Science & Engineering",
      year: "3rd Year",
      semester: 5,
      rollNo: "CSE21042",
      email: "aarav.s@campus.edu",
      phone: "+91 98765 43210",
      cgpa: 8.42,
      initials: "AS",
      avatarColor: "bg-crayon-orange",
      bio: "Professional procrastinator, part-time academic weapon. Will debug your code for snacks.",
      skills: JSON.stringify([
        { name: "React", level: 85 },
        { name: "Python", level: 78 },
        { name: "C++", level: 72 },
        { name: "Figma", level: 64 },
        { name: "Node.js", level: 58 },
        { name: "SQL", level: 70 },
      ]),
      interests: JSON.stringify(["Web Dev", "Game Design", "AI/ML", "Open Source", "UI/UX", "Hackathons", "Indie Games", "Music Production"]),
    });

    console.log("[seed] Seeding college events...");
    await db.insert(schema.collegeEvents).values([
      { id: "e1", name: "HackNight v6", date: "Aug 25", time: "6 PM", place: "Lab 3", color: "bg-crayon-orange" },
      { id: "e2", name: "Career Fair", date: "Sep 3", time: "10 AM", place: "Auditorium", color: "bg-crayon-blue" },
      { id: "e3", name: "Open Mic Friday", date: "Aug 29", time: "5 PM", place: "Quad", color: "bg-crayon-pink" },
    ]);

    console.log("[seed] Seeding health data...");
    const today = new Date().toISOString().split("T")[0];
    await db.insert(schema.healthData).values({
      id: `health-${STUDENT_ID}-${today}`,
      studentId: STUDENT_ID,
      steps: 7842,
      water: 5,
      sleepHours: 7.33,
      activeMinutes: 42,
      streak: 6,
      date: today,
    });

    console.log("[seed] Seeding health activities...");
    await db.insert(schema.healthActivities).values([
      { studentId: STUDENT_ID, title: "Morning walk", stepsText: "2,340 steps", time: "8:10 AM", color: "bg-scrap-sage" },
      { studentId: STUDENT_ID, title: "College commute", stepsText: "3,120 steps", time: "11:25 AM", color: "bg-scrap-blue" },
      { studentId: STUDENT_ID, title: "Evening walk", stepsText: "2,382 steps", time: "7:15 PM", color: "bg-scrap-yellow" },
    ]);

    console.log("[seed] Seeding wallet balance...");
    await db.insert(schema.walletBalance).values({
      id: `wallet-${STUDENT_ID}`,
      studentId: STUDENT_ID,
      balance: 2480,
      monthlySpending: 1620,
    });

    console.log("[seed] Seeding wallet transactions...");
    await db.insert(schema.walletTransactions).values([
      { studentId: STUDENT_ID, title: "Campus Canteen", date: "Today 1:20 PM", amount: -120, type: "out", color: "bg-scrap-coral" },
      { studentId: STUDENT_ID, title: "Wallet Top-up", date: "Today 10:05 AM", amount: 500, type: "in", color: "bg-scrap-sage" },
      { studentId: STUDENT_ID, title: "Printing Centre", date: "Yesterday 4:42 PM", amount: -45, type: "out", color: "bg-scrap-blue" },
    ]);

    console.log("[seed] Seed completed successfully!");
  } catch (error) {
    console.error("[seed] Seed failed:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
