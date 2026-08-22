import { useState } from 'react';
import {
  IdCard,
  Download,
  ExternalLink,
  WalletCards,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Github,
  Linkedin,
  Mail,
  MapPin,
  BriefcaseBusiness,
  FileText,
  Code2,
  Sparkles,
} from 'lucide-react';

import { StickerCard, Badge, SectionHeading } from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import { Star, PaperClip, Squiggle, ZigZag } from '@/components/Doodles';
import { student } from '@/data/mock';
import { cn } from '@/lib/utils';

const transactions = [
  {
    id: 1,
    title: 'Campus Cafeteria',
    date: 'Today · 1:20 PM',
    amount: '- ₹120',
    type: 'out',
  },
  {
    id: 2,
    title: 'Wallet Top-up',
    date: 'Yesterday · 6:42 PM',
    amount: '+ ₹1,000',
    type: 'in',
  },
  {
    id: 3,
    title: 'Printing Centre',
    date: 'Aug 21 · 11:10 AM',
    amount: '- ₹45',
    type: 'out',
  },
];

export function Profile() {
  const [activeSection, setActiveSection] = useState<'resume' | 'portfolio'>(
    'resume'
  );

  return (
    <DoodleField density="normal" className="space-y-7">

      {/* Header */}
      <div className="relative">
        <div className="paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 bg-scrap-pink shadow-paper-lg">

          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />

          <ZigZag className="absolute bottom-3 left-5 h-4 w-32 opacity-25" />

          <div className="relative p-7 pt-10 md:p-9 md:pt-12">
            <p className="font-hand text-2xl text-ink/65">
              this is me
            </p>

            <h1 className="cutout-heading text-4xl leading-tight md:text-5xl">
              My Card
            </h1>

            <p className="mt-2 font-hand text-xl text-ink/60">
              your student identity + professional corner.
            </p>
          </div>
        </div>
      </div>

      {/* Student identity card */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

        <StickerCard
          color="bg-paper-50"
          className="relative overflow-hidden lg:col-span-7"
          rotate="left"
          tape="corner-tr"
        >
          <PaperClip className="absolute right-2 top-3 h-9 w-7 opacity-35" />

          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            {/* Avatar */}
            <div className="relative flex shrink-0 justify-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-rough border-2 border-ink/20 bg-scrap-yellow shadow-paper-lg">
                <span className="cutout-heading text-5xl">
                  {student.initials}
                </span>
              </div>

              <Star className="absolute -right-3 -top-4 h-8 w-8" />
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge color="bg-scrap-sage">
                  {student.course}
                </Badge>

                <Badge color="bg-scrap-blue">
                  {student.year}
                </Badge>
              </div>

              <h2 className="cutout-heading mt-3 text-3xl">
                {student.name}
              </h2>

              <p className="mt-1 font-hand text-xl text-ink/55">
                {student.branch}
              </p>

              <div className="mt-4 space-y-2 text-sm text-ink/65">
                <div className="flex items-center gap-2">
                  <IdCard className="h-4 w-4" />
                  {student.rollNo}
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {student.email}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Campus student
                </div>
              </div>
            </div>
          </div>

          <Squiggle className="mt-6 h-5 w-44 text-ink/25" />

          <p className="mt-3 font-hand text-lg leading-relaxed text-ink/60">
            {student.bio}
          </p>
        </StickerCard>

        {/* Academic snapshot */}
        <StickerCard
          color="bg-scrap-mint"
          className="lg:col-span-5"
          rotate="right"
          tape="top"
        >
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <h2 className="cutout-heading text-lg">
              Academic snapshot
            </h2>
          </div>

          <div className="space-y-3">

            <div className="paper-colored flex items-center justify-between rounded-rough border border-ink/15 bg-paper-50 px-4 py-3 shadow-sticker-sm">
              <span className="text-sm font-semibold">
                CGPA
              </span>

              <span className="cutout-heading text-2xl">
                {student.cgpa}
              </span>
            </div>

            <div className="paper-colored flex items-center justify-between rounded-rough border border-ink/15 bg-paper-50 px-4 py-3 shadow-sticker-sm">
              <span className="text-sm font-semibold">
                Semester
              </span>

              <span className="cutout-heading text-2xl">
                {student.semester}
              </span>
            </div>

            <div className="paper-colored flex items-center justify-between rounded-rough border border-ink/15 bg-paper-50 px-4 py-3 shadow-sticker-sm">
              <span className="text-sm font-semibold">
                Branch
              </span>

              <span className="font-hand text-lg">
                CSE
              </span>
            </div>
          </div>
        </StickerCard>
      </div>

      {/* Professional identity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

        <StickerCard
          color="bg-paper-50"
          className="lg:col-span-7"
          rotate="right3"
          tape="corner-tl"
        >
          <SectionHeading
            title="Professional Stuff"
            subtitle="the serious-looking part of the page"
            color="bg-scrap-blue"
          />

          {/* Tabs */}
          <div className="mb-5 flex gap-2">
            <button
              onClick={() => setActiveSection('resume')}
              className={cn(
                'paper-colored btn-press flex items-center gap-2 rounded-rough border border-ink/20 px-4 py-2 text-sm font-bold shadow-sticker-sm',
                activeSection === 'resume'
                  ? 'bg-scrap-yellow'
                  : 'bg-paper-50'
              )}
            >
              <FileText className="h-4 w-4" />
              Resume
            </button>

            <button
              onClick={() => setActiveSection('portfolio')}
              className={cn(
                'paper-colored btn-press flex items-center gap-2 rounded-rough border border-ink/20 px-4 py-2 text-sm font-bold shadow-sticker-sm',
                activeSection === 'portfolio'
                  ? 'bg-scrap-yellow'
                  : 'bg-paper-50'
              )}
            >
              <Code2 className="h-4 w-4" />
              Portfolio
            </button>
          </div>

          {activeSection === 'resume' ? (
            <div className="paper-colored rounded-rough border border-ink/15 bg-paper-100 p-5 shadow-sticker-sm">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="cutout-heading text-xl">
                    {student.name}
                  </h3>

                  <p className="mt-1 font-hand text-lg text-ink/55">
                    {student.branch}
                  </p>
                </div>

                <FileText className="h-7 w-7 opacity-50" />
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-ink/45">
                    Skills
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {student.skills.slice(0, 5).map((skill) => (
                      <Badge key={skill.name} color="bg-scrap-sage">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-ink/45">
                    Education
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {student.course} · {student.branch}
                  </p>
                </div>
              </div>

              <button className="paper-colored btn-press mt-5 flex w-full items-center justify-center gap-2 rounded-rough border border-ink/20 bg-scrap-yellow py-2.5 text-sm font-bold shadow-sticker-sm">
                <Download className="h-4 w-4" />
                Download Resume
              </button>
            </div>
          ) : (
            <div className="paper-colored rounded-rough border border-ink/15 bg-paper-100 p-5 shadow-sticker-sm">

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="cutout-heading text-xl">
                    My Portfolio
                  </h3>

                  <p className="mt-1 font-hand text-lg text-ink/55">
                    projects, experiments & things I've built.
                  </p>
                </div>

                <BriefcaseBusiness className="h-7 w-7 opacity-50" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-rough border border-ink/15 bg-scrap-blue p-4">
                  <p className="cutout-heading text-lg">
                    Web Dev
                  </p>

                  <p className="mt-1 font-hand text-sm text-ink/55">
                    React · Node · APIs
                  </p>
                </div>

                <div className="rounded-rough border border-ink/15 bg-scrap-pink p-4">
                  <p className="cutout-heading text-lg">
                    AI / ML
                  </p>

                  <p className="mt-1 font-hand text-sm text-ink/55">
                    experiments & projects
                  </p>
                </div>

                <div className="rounded-rough border border-ink/15 bg-scrap-yellow p-4">
                  <p className="cutout-heading text-lg">
                    UI / UX
                  </p>

                  <p className="mt-1 font-hand text-sm text-ink/55">
                    Figma · interfaces
                  </p>
                </div>

                <div className="rounded-rough border border-ink/15 bg-scrap-sage p-4">
                  <p className="cutout-heading text-lg">
                    Open Source
                  </p>

                  <p className="mt-1 font-hand text-sm text-ink/55">
                    contributions
                  </p>
                </div>
              </div>

              <button className="paper-colored btn-press mt-5 flex w-full items-center justify-center gap-2 rounded-rough border border-ink/20 bg-scrap-blue py-2.5 text-sm font-bold shadow-sticker-sm">
                <ExternalLink className="h-4 w-4" />
                Open Portfolio
              </button>
            </div>
          )}
        </StickerCard>

        {/* Campus Wallet */}
        <StickerCard
          color="bg-scrap-yellow"
          className="lg:col-span-5"
          rotate="left"
          tape="corner-br"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="cutout-heading text-xl">
                Campus Wallet
              </h2>

              <p className="font-hand text-base text-ink/55">
                money stuff, minus the boring bank app.
              </p>
            </div>

            <WalletCards className="h-7 w-7" />
          </div>

          {/* Balance */}
          <div className="paper-colored rounded-rough border border-ink/20 bg-paper-50 p-5 shadow-paper">
            <p className="text-xs font-black uppercase tracking-wide text-ink/45">
              Available balance
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="cutout-heading text-4xl">
                ₹2,450
              </p>

              <CreditCard className="h-8 w-8 opacity-45" />
            </div>
          </div>

          {/* Transactions */}
          <div className="mt-4 space-y-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="paper-colored flex items-center gap-3 rounded-rough border border-ink/15 bg-paper-50 p-3 shadow-sticker-sm"
              >
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15',
                    transaction.type === 'in'
                      ? 'bg-scrap-sage'
                      : 'bg-scrap-coral'
                  )}
                >
                  {transaction.type === 'in' ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {transaction.title}
                  </p>

                  <p className="font-hand text-sm text-ink/50">
                    {transaction.date}
                  </p>
                </div>

                <span className="text-sm font-black">
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>

          <button className="paper-colored btn-press mt-4 flex w-full items-center justify-center gap-2 rounded-rough border border-ink/20 bg-paper-50 py-2.5 text-sm font-bold shadow-sticker-sm">
            View all transactions
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </StickerCard>
      </div>

      {/* Skills + interests */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <StickerCard
          color="bg-scrap-blue"
          rotate="left"
          tape="top"
        >
          <SectionHeading
            title="Skills"
            subtitle="things I can actually do"
            color="bg-paper-50"
          />

          <div className="space-y-3">
            {student.skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-bold">
                    {skill.name}
                  </span>

                  <span className="text-xs font-black">
                    {skill.level}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full border border-ink/15 bg-paper-50">
                  <div
                    className="h-full rounded-full bg-scrap-yellow transition-all"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </StickerCard>

        <StickerCard
          color="bg-scrap-mint"
          rotate="right"
          tape="corner-tr"
        >
          <SectionHeading
            title="Interests"
            subtitle="currently obsessed with"
            color="bg-paper-50"
          />

          <div className="flex flex-wrap gap-2">
            {student.interests.map((interest) => (
              <Badge
                key={interest}
                color="bg-paper-50"
              >
                {interest}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              className="paper-colored btn-press flex items-center gap-2 rounded-full border border-ink/20 bg-paper-50 px-4 py-2 text-sm font-bold shadow-sticker-sm"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <a
              href="#"
              className="paper-colored btn-press flex items-center gap-2 rounded-full border border-ink/20 bg-paper-50 px-4 py-2 text-sm font-bold shadow-sticker-sm"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </StickerCard>
      </div>
    </DoodleField>
  );
}