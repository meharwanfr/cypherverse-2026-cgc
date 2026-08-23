-- Cypherverse Database Schema
-- Drop existing tables if they exist, then create fresh

DROP TABLE IF EXISTS bookmarked_resources CASCADE;
DROP TABLE IF EXISTS saved_opportunities CASCADE;
DROP TABLE IF EXISTS wallet_balance CASCADE;
DROP TABLE IF EXISTS wallet_transactions CASCADE;
DROP TABLE IF EXISTS health_activities CASCADE;
DROP TABLE IF EXISTS health_data CASCADE;
DROP TABLE IF EXISTS college_events CASCADE;
DROP TABLE IF EXISTS student_profile CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS deadlines CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;

CREATE TABLE subjects (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  code VARCHAR(20) NOT NULL,
  attended INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  color VARCHAR(50) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  instructor TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE deadlines (
  id VARCHAR(50) PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  due VARCHAR(50) NOT NULL,
  days_left INTEGER NOT NULL,
  color VARCHAR(50) NOT NULL,
  checked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE opportunities (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  category VARCHAR(30) NOT NULL,
  deadline VARCHAR(50) NOT NULL,
  days_left INTEGER NOT NULL,
  eligibility TEXT NOT NULL,
  description TEXT NOT NULL,
  color VARCHAR(50) NOT NULL,
  tag TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE resources (
  id VARCHAR(50) PRIMARY KEY,
  title TEXT NOT NULL,
  type VARCHAR(30) NOT NULL,
  subject TEXT NOT NULL,
  author TEXT NOT NULL,
  pages INTEGER NOT NULL DEFAULT 0,
  year INTEGER,
  color VARCHAR(50) NOT NULL,
  emoji VARCHAR(10) NOT NULL,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE student_profile (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  course VARCHAR(50) NOT NULL,
  branch TEXT NOT NULL,
  year VARCHAR(20) NOT NULL,
  semester INTEGER NOT NULL,
  roll_no VARCHAR(20) NOT NULL,
  email TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  cgpa REAL NOT NULL,
  initials VARCHAR(5) NOT NULL,
  avatar_color VARCHAR(50) NOT NULL,
  bio TEXT NOT NULL,
  skills TEXT NOT NULL,
  interests TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE college_events (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  date VARCHAR(50) NOT NULL,
  time VARCHAR(20) NOT NULL,
  place TEXT NOT NULL,
  color VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE health_data (
  id VARCHAR(50) PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  steps INTEGER NOT NULL DEFAULT 0,
  water INTEGER NOT NULL DEFAULT 0,
  sleep_hours REAL DEFAULT 0,
  active_minutes INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  date VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE health_activities (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  steps_text VARCHAR(50) NOT NULL,
  time VARCHAR(20) NOT NULL,
  color VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE wallet_transactions (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  date VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  type VARCHAR(10) NOT NULL,
  color VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE wallet_balance (
  id VARCHAR(50) PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  balance INTEGER NOT NULL DEFAULT 0,
  monthly_spending INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE saved_opportunities (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  opportunity_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE bookmarked_resources (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  resource_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
