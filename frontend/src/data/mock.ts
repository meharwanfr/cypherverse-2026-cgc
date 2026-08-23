export type Subject = {
  id: string;
  name: string;
  code: string;
  attended: number;
  total: number;
  color: string;
  emoji: string;
  instructor: string;
};

export const subjects: Subject[] = [
  { id: 's1', name: 'Data Structures', code: 'CS301', attended: 38, total: 42, color: 'bg-crayon-blue', emoji: '🌳', instructor: 'Prof. Mehta' },
  { id: 's2', name: 'Operating Systems', code: 'CS302', attended: 29, total: 40, color: 'bg-crayon-orange', emoji: '🖥️', instructor: 'Dr. Iyer' },
  { id: 's3', name: 'DBMS', code: 'CS303', attended: 22, total: 38, color: 'bg-crayon-pink', emoji: '🗄️', instructor: 'Prof. Rao' },
  { id: 's4', name: 'Computer Networks', code: 'CS304', attended: 35, total: 36, color: 'bg-crayon-green', emoji: '🌐', instructor: 'Dr. Nair' },
  { id: 's5', name: 'Theory of Computation', code: 'CS305', attended: 18, total: 34, color: 'bg-crayon-plum', emoji: '🤖', instructor: 'Prof. Banerjee' },
  { id: 's6', name: 'Software Engineering', code: 'CS306', attended: 31, total: 35, color: 'bg-crayon-yellow', emoji: '🧩', instructor: 'Dr. Kulkarni' },
];

export type Deadline = {
  id: string;
  title: string;
  subject: string;
  due: string;
  daysLeft: number;
  color: string;
};

export const deadlines: Deadline[] = [
  { id: 'd1', title: 'DBMS Project Submission', subject: 'DBMS', due: 'Aug 24', daysLeft: 2, color: 'bg-crayon-pink' },
  { id: 'd2', title: 'OS Assignment 3', subject: 'Operating Systems', due: 'Aug 27', daysLeft: 5, color: 'bg-crayon-orange' },
  { id: 'd3', title: 'TOC Quiz', subject: 'Theory of Computation', due: 'Aug 29', daysLeft: 7, color: 'bg-crayon-plum' },
  { id: 'd4', title: 'SE Lab Report', subject: 'Software Engineering', due: 'Sep 2', daysLeft: 11, color: 'bg-crayon-yellow' },
];

export type Opportunity = {
  id: string;
  name: string;
  category: 'Scholarship' | 'Hackathon' | 'Internship' | 'Competition' | 'Event';
  deadline: string;
  daysLeft: number;
  eligibility: string;
  description: string;
  color: string;
  tag: string;
};

export const opportunities: Opportunity[] = [
  {
    id: 'o1',
    name: 'Google Generation Scholarship',
    category: 'Scholarship',
    deadline: 'Sep 15',
    daysLeft: 24,
    eligibility: '2nd–4th year, CS/IT, CGPA 7.5+',
    description: 'A $2,500 award for students from underrepresented groups in tech. Includes a Google mentor.',
    color: 'bg-crayon-green',
    tag: 'free money? hello??',
  },
  {
    id: 'o2',
    name: 'HackTheNorth 36-Hour Hackathon',
    category: 'Hackathon',
    deadline: 'Sep 30',
    daysLeft: 39,
    eligibility: 'All UG students, teams of 2–4',
    description: 'Build something silly (or serious) in 36 hours. Prizes worth $10k. Free pizza at 2am.',
    color: 'bg-crayon-orange',
    tag: 'go build something silly',
  },
  {
    id: 'o3',
    name: 'Microsoft Engage Internship',
    category: 'Internship',
    deadline: 'Oct 5',
    daysLeft: 44,
    eligibility: '3rd year, CGPA 8+',
    description: '12-week summer internship on a real product team. Remote-friendly. Mentorship guaranteed.',
    color: 'bg-crayon-blue',
    tag: 'the big one',
  },
  {
    id: 'o4',
    name: 'Smart India Hackathon',
    category: 'Competition',
    deadline: 'Sep 8',
    daysLeft: 17,
    eligibility: 'All UG/PG, teams of 6',
    description: 'Solve real government problem statements in 36 hours. National finals in Delhi.',
    color: 'bg-crayon-yellow',
    tag: 'for the country!',
  },
  {
    id: 'o5',
    name: 'TechFest 2026 — IIT Bombay',
    category: 'Event',
    deadline: 'Dec 18',
    daysLeft: 118,
    eligibility: 'Open to all students',
    description: 'Asia’s largest tech fest. Robo-wars, drone racing, exhibitions, and a concert night.',
    color: 'bg-crayon-pink',
    tag: 'road trip??',
  },
  {
    id: 'o6',
    name: 'Adobe Women in Tech Scholarship',
    category: 'Scholarship',
    deadline: 'Oct 20',
    daysLeft: 59,
    eligibility: 'Women in 2nd–4th year, CS/IT',
    description: '$5,000 award plus a guaranteed Adobe internship interview. Essay-based application.',
    color: 'bg-crayon-plum',
    tag: 'apply, like, yesterday',
  },
  {
    id: 'o7',
    name: 'CodeChef SnackDown',
    category: 'Competition',
    deadline: 'Sep 12',
    daysLeft: 21,
    eligibility: 'All students, solo or duo',
    description: 'Global competitive programming contest. Bragging rights + swag for life.',
    color: 'bg-crayon-teal',
    tag: 'flex on them',
  },
  {
    id: 'o8',
    name: 'Campus Cultural Night',
    category: 'Event',
    deadline: 'Aug 30',
    daysLeft: 8,
    eligibility: 'Everyone, free entry',
    description: 'Music, dance, food stalls, and a surprise headliner. Bring your whole squad.',
    color: 'bg-crayon-lime',
    tag: 'vibes only',
  },
];

export type Resource = {
  id: string;
  title: string;
  type: 'Notes' | 'Book' | 'E-book' | 'PYQ' | 'Subject Resource';
  subject: string;
  author: string;
  pages: number;
  year?: number;
  color: string;
  emoji: string;
  isNew?: boolean;
};

export const resources: Resource[] = [
  { id: 'r1', title: 'DSA Complete Handwritten Notes', type: 'Notes', subject: 'Data Structures', author: 'Ananya R.', pages: 84, color: 'bg-crayon-blue', emoji: '📝', isNew: true },
  { id: 'r2', title: 'Operating System Concepts', type: 'Book', subject: 'Operating Systems', author: 'Silberschatz', pages: 944, year: 2018, color: 'bg-crayon-orange', emoji: '📘' },
  { id: 'r3', title: 'DBMS Lab Manual (E-book)', type: 'E-book', subject: 'DBMS', author: 'Dept. of CSE', pages: 120, color: 'bg-crayon-pink', emoji: '💾', isNew: true },
  { id: 'r4', title: 'TOC Previous Year Papers (2019–2024)', type: 'PYQ', subject: 'Theory of Computation', author: 'Exam Cell', pages: 60, year: 2024, color: 'bg-crayon-plum', emoji: '📜' },
  { id: 'r5', title: 'Computer Networks — Lecture Slides', type: 'Subject Resource', subject: 'Computer Networks', author: 'Dr. Nair', pages: 210, color: 'bg-crayon-green', emoji: '🌐' },
  { id: 'r6', title: 'Software Engineering — A Practitioner’s Approach', type: 'Book', subject: 'Software Engineering', author: 'Pressman', pages: 816, year: 2020, color: 'bg-crayon-yellow', emoji: '🧩' },
  { id: 'r7', title: 'DBMS PYQ Bundle (2020–2024)', type: 'PYQ', subject: 'DBMS', author: 'Exam Cell', pages: 48, year: 2024, color: 'bg-crayon-pink', emoji: '📋' },
  { id: 'r8', title: 'OS Crash Course Notes (1 night before)', type: 'Notes', subject: 'Operating Systems', author: 'Karan M.', pages: 32, color: 'bg-crayon-orange', emoji: '⚡', isNew: true },
  { id: 'r9', title: 'Introduction to Algorithms (CLRS)', type: 'E-book', subject: 'Data Structures', author: 'Cormen et al.', pages: 1312, year: 2022, color: 'bg-crayon-blue', emoji: '📗' },
  { id: 'r10', title: 'CN Formula Sheet + Mind Maps', type: 'Subject Resource', subject: 'Computer Networks', author: 'Study Club', pages: 14, color: 'bg-crayon-green', emoji: '🗺️' },
  { id: 'r11', title: 'TOC Cheatsheet (NFA → DFA → RE)', type: 'Notes', subject: 'Theory of Computation', author: 'Priya S.', pages: 8, color: 'bg-crayon-plum', emoji: '🧠' },
  { id: 'r12', title: 'SE Case Study: Build-a-Bazaar', type: 'Subject Resource', subject: 'Software Engineering', author: 'Dr. Kulkarni', pages: 40, color: 'bg-crayon-yellow', emoji: '🏗️' },
];

export const resourceTypes = ['Notes', 'Book', 'E-book', 'PYQ', 'Subject Resource'] as const;

export const student = {
  name: 'Aarav Sharma',
  course: 'B.Tech',
  branch: 'Computer Science & Engineering',
  year: '3rd Year',
  semester: 5,
  rollNo: 'CSE21042',
  email: 'aarav.s@campus.edu',
  phone: '+91 98765 43210',
  cgpa: 8.42,
  initials: 'AS',
  avatarColor: 'bg-crayon-orange',
  skills: [
    { name: 'React', level: 85 },
    { name: 'Python', level: 78 },
    { name: 'C++', level: 72 },
    { name: 'Figma', level: 64 },
    { name: 'Node.js', level: 58 },
    { name: 'SQL', level: 70 },
  ],
  interests: ['Web Dev', 'Game Design', 'AI/ML', 'Open Source', 'UI/UX', 'Hackathons', 'Indie Games', 'Music Production'],
  bio: 'Professional procrastinator, part-time academic weapon. Will debug your code for snacks.',
};

export const collegeEvents = [
  { id: 'e1', name: 'HackNight v6', date: 'Aug 25', time: '6 PM', place: 'Lab 3', color: 'bg-crayon-orange' },
  { id: 'e2', name: 'Career Fair', date: 'Sep 3', time: '10 AM', place: 'Auditorium', color: 'bg-crayon-blue' },
  { id: 'e3', name: 'Open Mic Friday', date: 'Aug 29', time: '5 PM', place: 'Quad', color: 'bg-crayon-pink' },
];

export const quickActions = [
  { id: 'q1', label: 'Mark attendance', icon: 'check', color: 'bg-crayon-green' },
  { id: 'q2', label: 'Add resource', icon: 'plus', color: 'bg-crayon-blue' },
  { id: 'q3', label: 'New deadline', icon: 'flag', color: 'bg-crayon-orange' },
  { id: 'q4', label: 'Find opp', icon: 'sparkles', color: 'bg-crayon-plum' },
];
