const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
const TIMEOUT_MS = 5000;

async function request<T>(path: string, options?: RequestInit, timeoutMs: number = TIMEOUT_MS): Promise<T> {
  const url = `${API_BASE}${path}`;
  const method = options?.method || "GET";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    clearTimeout(timer);

    if (!res.ok) {
      const body = await res.text();
      console.error(`[API] ${method} ${url} failed (${res.status}):`, body);
      throw new Error(`API error ${res.status}: ${body}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    clearTimeout(timer);
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn(`[API] ${method} ${url} timed out after ${timeoutMs}ms`);
      throw new Error(`Request timed out: ${path}`);
    }
    console.error(`[API] ${method} ${url} exception:`, error);
    throw error;
  }
}

// ─── Subjects ──────────────────────────────────────────────
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

export const api = {
  subjects: {
    list: () => request<Subject[]>("/api/subjects"),
    create: (data: { name: string; code: string; color?: string; emoji?: string; instructor?: string }) =>
      request<Subject>("/api/subjects", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<{ success: boolean }>(`/api/subjects/${id}`, {
        method: "DELETE",
      }),
    updateAttendance: (id: string, attended: number, total: number) =>
      request<Subject>(`/api/subjects/${id}/attendance`, {
        method: "PATCH",
        body: JSON.stringify({ attended, total }),
      }),
    bump: (id: string, delta: number) =>
      request<Subject>(`/api/subjects/${id}/attendance/bump`, {
        method: "PATCH",
        body: JSON.stringify({ delta }),
      }),
  },

  // ─── Deadlines ───────────────────────────────────────────
  deadlines: {
    list: () => request<Deadline[]>("/api/deadlines"),
    create: (data: { title: string; subject: string; due: string; daysLeft?: number; color?: string }) =>
      request<Deadline>("/api/deadlines", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    check: (id: string, checked: boolean) =>
      request<Deadline>(`/api/deadlines/${id}/check`, {
        method: "PATCH",
        body: JSON.stringify({ checked }),
      }),
    delete: (id: string) =>
      request<{ success: boolean }>(`/api/deadlines/${id}`, {
        method: "DELETE",
      }),
  },

  // ─── Opportunities ───────────────────────────────────────
  opportunities: {
    list: () => request<Opportunity[]>("/api/opportunities"),
    saved: {
      list: () => request<string[]>("/api/saved-opportunities"),
      toggle: (opportunityId: string) =>
        request<{ saved: boolean }>("/api/saved-opportunities", {
          method: "POST",
          body: JSON.stringify({ opportunityId }),
        }),
    },
  },

  // ─── Resources ───────────────────────────────────────────
  resources: {
    list: () => request<Resource[]>("/api/resources"),
    create: (data: { title: string; type: string; subject: string; author: string; pages?: number; color?: string; emoji?: string; url?: string }) =>
      request<Resource>("/api/resources", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<{ success: boolean }>(`/api/resources/${id}`, {
        method: "DELETE",
      }),
    bookmarks: {
      list: () => request<string[]>("/api/bookmarked-resources"),
      toggle: (resourceId: string) =>
        request<{ bookmarked: boolean }>("/api/bookmarked-resources", {
          method: "POST",
          body: JSON.stringify({ resourceId }),
        }),
    },
  },

  // ─── Student Profile ─────────────────────────────────────
  student: {
    profile: () => request<StudentProfile>("/api/student/profile"),
  },

  // ─── Events ──────────────────────────────────────────────
  events: {
    list: () => request<CollegeEvent[]>("/api/events"),
  },

  // ─── Health ──────────────────────────────────────────────
  health: {
    get: () => request<HealthData>("/api/health"),
    update: (data: { steps?: number; water?: number }) =>
      request<HealthData>("/api/health", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    activities: () => request<HealthActivity[]>("/api/health/activities"),
  },

  // ─── Wallet ──────────────────────────────────────────────
  wallet: {
    get: () => request<WalletBalance>("/api/wallet"),
    topup: (amount: number) =>
      request<WalletBalance>("/api/wallet/topup", {
        method: "POST",
        body: JSON.stringify({ amount }),
      }),
    transactions: () => request<WalletTransaction[]>("/api/wallet/transactions"),
  },

  // ─── Chatbot ─────────────────────────────────────────────
  chatbot: {
    send: (message: string, history: { role: "user" | "assistant"; content: string }[] = []) =>
      request<{ response: string }>(
        "/api/chatbot",
        {
          method: "POST",
          body: JSON.stringify({ message, history }),
        },
        30000
      ),
  },
};

// ─── Types ─────────────────────────────────────────────────
export type Deadline = {
  id: string;
  title: string;
  subject: string;
  due: string;
  daysLeft: number;
  color: string;
  checked?: boolean;
};

export type Opportunity = {
  id: string;
  name: string;
  category: "Scholarship" | "Hackathon" | "Internship" | "Competition" | "Event";
  deadline: string;
  daysLeft: number;
  eligibility: string;
  description: string;
  color: string;
  tag: string;
};

export type Resource = {
  id: string;
  title: string;
  type: "Notes" | "Book" | "E-book" | "PYQ" | "Subject Resource";
  subject: string;
  author: string;
  pages: number;
  year?: number;
  color: string;
  emoji: string;
  isNew?: boolean;
  url?: string;
};

export type StudentProfile = {
  id: string;
  name: string;
  course: string;
  branch: string;
  year: string;
  semester: number;
  rollNo: string;
  email: string;
  phone: string;
  cgpa: number;
  initials: string;
  avatarColor: string;
  bio: string;
  skills: { name: string; level: number }[];
  interests: string[];
};

export type CollegeEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  place: string;
  color: string;
};

export type HealthData = {
  id: string;
  studentId: string;
  steps: number;
  water: number;
  sleepHours: number;
  activeMinutes: number;
  streak: number;
  date: string;
};

export type HealthActivity = {
  id: number;
  studentId: string;
  title: string;
  stepsText: string;
  time: string;
  color: string;
};

export type WalletBalance = {
  id: string;
  studentId: string;
  balance: number;
  monthlySpending: number;
};

export type WalletTransaction = {
  id: number;
  studentId: string;
  title: string;
  date: string;
  amount: number;
  type: string;
  color: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};
