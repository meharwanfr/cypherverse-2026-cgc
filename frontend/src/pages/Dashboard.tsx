import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import {
  CheckCircle,
  Plus,
  Flag,
  Sparkles,
  ArrowRight,
  Calendar,
  MapPin,
  Trash2,
  X,
  Download,
  HeartPulse,
} from 'lucide-react';
import {
  StickerCard,
  Badge,
  ProgressBar,
  SectionHeading,
  StickerButton,
} from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import {
  Star,
  ZigZag,
  SunRays,
  Planet,
  Sparkle,
  Coffee,
  Pin,
  PaperClip,
} from '@/components/Doodles';
import {
  api,
  type Subject,
  type Deadline,
  type Opportunity,
  type Resource,
  type StudentProfile,
  type CollegeEvent,
} from '@/lib/api';
import type { Page } from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/Toast';

type DashboardProps = {
  setPage: (page: Page) => void;
  subjects: Subject[];
  deadlines: Deadline[];
  setDeadlines: Dispatch<SetStateAction<Deadline[]>>;
};

const quickActions = [
  {
    label: 'Mark attendance',
    icon: CheckCircle,
    color: 'bg-scrap-sage',
    rotate: 'rotate-tilt-l',
  },
  {
    label: 'Add resource',
    icon: Plus,
    color: 'bg-scrap-blue',
    rotate: 'rotate-tilt-r',
  },
  {
    label: 'New deadline',
    icon: Flag,
    color: 'bg-scrap-coral',
    rotate: 'rotate-tilt-l',
  },
  {
    label: 'Find opp',
    icon: Sparkles,
    color: 'bg-scrap-lavender',
    rotate: 'rotate-tilt-r',
  },
  {
    label: 'Health check',
    icon: HeartPulse,
    color: 'bg-scrap-sage',
    rotate: 'rotate-tilt-l',
  },
];

export function Dashboard({
  setPage,
  subjects,
  deadlines,
  setDeadlines,
}: DashboardProps) {
  const { toast } = useToast();
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<Set<string>>(() => new Set(deadlines.filter(d => d.checked).map(d => d.id)));
  const [showDeadlineForm, setShowDeadlineForm] = useState(false);

  const [newDeadline, setNewDeadline] = useState({
    title: '',
    subject: '',
    due: '',
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [collegeEvents, setCollegeEvents] = useState<CollegeEvent[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [student, setStudent] = useState<StudentProfile>({
    id: '',
    name: '',
    course: '',
    branch: '',
    year: '',
    semester: 0,
    rollNo: '',
    email: '',
    phone: '',
    cgpa: 0,
    initials: '',
    avatarColor: '',
    bio: '',
    skills: [],
    interests: [],
  });

  useEffect(() => { setChecked(new Set(deadlines.filter(d => d.checked).map(d => d.id))); }, [deadlines]);

  useEffect(() => {
    async function load() {
      try {
        const [opps, events, res, stu] = await Promise.all([
          api.opportunities.list(),
          api.events.list(),
          api.resources.list(),
          api.student.profile(),
        ]);
        setOpportunities(opps);
        setCollegeEvents(events);
        setResources(res);
        setStudent(stu);
      } catch (err) {
        console.error('[Dashboard] Failed to load data:', err);
      }
    }
    load();
  }, []);

  const overallAttendance =
    (subjects.reduce((sum, subject) => sum + subject.attended, 0) /
      subjects.reduce((sum, subject) => sum + subject.total, 0)) *
    100;

  const lowAttendance = subjects.filter(
    (subject) => (subject.attended / subject.total) * 100 < 75
  );

  const featuredOpps = opportunities.slice(0, 4);
  const recentResources = resources.filter((r) => r.isNew).slice(0, 3);

  function toggleBookmark(id: string) {
    setBookmarked((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
    api.resources.bookmarks.toggle(id).then((res) => { toast(res.bookmarked ? 'Bookmarked!' : 'Bookmark removed'); }).catch(() => toast('Failed to update bookmark', 'error'));
  }

  function toggleDeadline(id: string) {
    setChecked((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });

    const deadline = deadlines.find((d) => d.id === id);
    if (deadline) {
      api.deadlines.check(id, !checked.has(id)).then(() => toast(checked.has(id) ? 'Marked incomplete' : 'Marked complete')).catch((err) => {
        console.error('[Dashboard] Failed to toggle deadline:', err);
        toast('Failed to update deadline', 'error');
      });
    }
  }

  function handleQuickAction(label: string) {
    switch (label) {
      case 'Mark attendance':
        setPage('attendance');
        break;

      case 'Add resource':
        setPage('resources');
        break;

      case 'Find opp':
        setPage('opportunities');
        break;

      case 'New deadline':
        setShowDeadlineForm(true);
        break;
      case 'Health check':
        setPage('health');
        break;
    }
  }
  function getDaysLeft(date: string) {
    const today = new Date();

    const deadlineDate = new Date(
      `${date}T23:59:59`
    );

    const difference =
      deadlineDate.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  }

  function addDeadline() {
    if (
      !newDeadline.title.trim() ||
      !newDeadline.subject.trim() ||
      !newDeadline.due
    ) {
      alert('Please fill in all deadline fields.');
      return;
    }

    const deadline: Deadline = {
      id: `custom-${Date.now()}`,
      title: newDeadline.title.trim(),
      subject: newDeadline.subject.trim(),
      due: new Date(
        `${newDeadline.due}T00:00:00`
      ).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      }),
      daysLeft: getDaysLeft(newDeadline.due),
      color: 'bg-scrap-coral',
    };

    setDeadlines((previous) => [
      ...previous,
      deadline,
    ]);

    api.deadlines.create({
      title: deadline.title,
      subject: deadline.subject,
      due: deadline.due,
      daysLeft: deadline.daysLeft,
      color: deadline.color,
    }).then((created) => {
      setDeadlines((previous) =>
        previous.map((d) => (d.id === deadline.id ? { ...d, id: created.id } : d))
      );
      toast('Deadline added!');
    }).catch((err) => {
      console.error('[Dashboard] Failed to create deadline:', err);
      toast('Failed to add deadline', 'error');
    });

    setNewDeadline({
      title: '',
      subject: '',
      due: '',
    });

    setShowDeadlineForm(false);
  }

  function deleteDeadline(id: string) {
    setDeadlines((previous) =>
      previous.filter(
        (deadline) => deadline.id !== id
      )
    );

    setChecked((previous) => {
      const next = new Set(previous);
      next.delete(id);
      return next;
    });

    toast('Deadline removed');

    api.deadlines.delete(id).catch((err) => {
      console.error('[Dashboard] Failed to delete deadline:', err);
      toast('Failed to delete deadline', 'error');
    });
  }


  return (
    <DoodleField density="busy" className="space-y-7">
      {/* Hero */}
      <div className="relative">
        <div className="paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 bg-scrap-pink shadow-paper-lg">
          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />

          <SunRays className="absolute right-8 top-8 h-14 w-14 animate-spin-slow opacity-30" />
          <Planet className="absolute -bottom-1 right-1/3 h-10 w-14 opacity-20" />
          <ZigZag className="absolute bottom-3 left-4 h-4 w-32 opacity-25" />

          <div className="relative flex flex-col gap-5 p-7 pt-10 md:flex-row md:items-center md:justify-between md:p-10 md:pt-12">
            <div className="max-w-xl">
              <p className="font-hand text-2xl text-ink/65">welcome back,</p>

              <h1 className="cutout-heading text-4xl leading-[1.05] md:text-6xl">
                academic weapon
                <span className="ml-2 inline-block animate-wiggle">⚡</span>
              </h1>

              <p className="mt-3 font-hand text-2xl text-ink/65">
                let&apos;s pretend we have our life together
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge color="bg-paper-50">Sem {student?.semester}</Badge>
                <Badge color="bg-paper-50">CGPA {student?.cgpa}</Badge>
                <Badge color="bg-paper-50">
                  {student?.branch.split(' ')[0]}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="group relative">
                <div className="paper-colored flex h-24 w-24 items-center justify-center rounded-rough border border-ink/25 bg-paper-50 cutout-heading text-4xl shadow-paper-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  {student?.initials}
                </div>

                <Star className="absolute -right-3 -top-3 h-8 w-8 animate-float transition-transform duration-300 group-hover:scale-125" />
                <Sparkle className="absolute -bottom-2 -left-3 h-6 w-6 animate-wiggle" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* New deadline form */}
      {showDeadlineForm && (
        <StickerCard
          color="bg-scrap-coral"
          rotate="right"
          tape="top"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="cutout-heading text-xl">
                New deadline
              </h2>

              <p className="font-hand text-lg text-ink/55">
                future-you says thanks
              </p>
            </div>

            <button
              onClick={() => setShowDeadlineForm(false)}
              className="rounded-full p-2 transition-transform hover:rotate-90"
              aria-label="close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <input
              value={newDeadline.title}
              onChange={(event) =>
                setNewDeadline((previous) => ({
                  ...previous,
                  title: event.target.value,
                }))
              }
              placeholder="Deadline title"
              className="rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />

            <input
              value={newDeadline.subject}
              onChange={(event) =>
                setNewDeadline((previous) => ({
                  ...previous,
                  subject: event.target.value,
                }))
              }
              placeholder="Subject"
              className="rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />

            <input
              type="date"
              value={newDeadline.due}
              onChange={(event) =>
                setNewDeadline((previous) => ({
                  ...previous,
                  due: event.target.value,
                }))
              }
              className="rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none"
            />
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <StickerButton
              onClick={() => setShowDeadlineForm(false)}
              color="bg-paper-50"
            >
              cancel
            </StickerButton>

            <StickerButton
              onClick={addDeadline}
              color="bg-scrap-sage"
              rotate="rotate-tilt-r"
            >
              <Plus className="h-4 w-4" />
              add deadline
            </StickerButton>
          </div>
        </StickerCard>
      )}
      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.label)}
              className={cn(
                'paper-colored btn-press group flex items-center gap-2.5 rounded-rough border border-ink/20 p-4 text-left font-semibold shadow-paper',
                action.color,
                action.rotate
              )}
            >
              <Icon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
              <span className="cutout-heading text-sm">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Attendance + Deadlines */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <StickerCard
          color="bg-paper-50"
          className="lg:col-span-8"
          rotate="left"
          tape="corner-tr"
        >
          <div className="mb-5 flex items-start justify-between">
            <SectionHeading
              title="Attendance"
              subtitle="your attendance is doing surprisingly well"
              color="bg-scrap-sage"
              className="mb-0"
            />

            <StickerButton
              onClick={() => setPage('attendance')}
              color="bg-scrap-sage"
              rotate="rotate-tilt-r"
              className="text-sm"
            >
              view all
              <ArrowRight className="h-4 w-4" />
            </StickerButton>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="group relative flex h-40 w-40 shrink-0 items-center justify-center self-center rounded-full border border-ink/20 bg-paper-50 shadow-paper">
              <svg
                viewBox="0 0 120 120"
                className="h-full w-full -rotate-90 transition-transform duration-500 group-hover:rotate-[-100deg]"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#2a2520"
                  strokeWidth="8"
                  opacity="0.08"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#9ab89a"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(overallAttendance / 100) * 314} 314`}
                  className="transition-all duration-1000"
                />
              </svg>

              <div className="absolute text-center">
                <p className="cutout-heading text-3xl">
                  {Math.round(overallAttendance)}%
                </p>
                <p className="font-hand text-sm text-ink/60">overall</p>
              </div>

              <Coffee className="absolute -right-4 -top-2 h-7 w-7 animate-float opacity-60" />
            </div>

            <div className="flex-1 space-y-2.5">
              {subjects.slice(0, 4).map((subject) => {
                const percentage =
                  (subject.attended / subject.total) * 100;

                return (
                  <div
                    key={subject.id}
                    className="group flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-paper-100/50"
                  >
                    <span className="text-lg transition-transform duration-300 group-hover:scale-125">
                      {subject.emoji}
                    </span>

                    <span className="w-28 truncate text-sm font-semibold">
                      {subject.name}
                    </span>

                    <ProgressBar
                      value={percentage}
                      color={
                        percentage >= 75
                          ? 'bg-scrap-sage'
                          : 'bg-scrap-coral'
                      }
                      showLabel={false}
                      className="flex-1"
                    />

                    <span className="w-10 text-right text-sm font-bold tabular-nums">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}

              {lowAttendance.length > 0 && (
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-scrap-coralDeep/50 bg-scrap-coral/15 px-3 py-2">
                  <span className="text-lg">🏃</span>

                  <p className="font-hand text-base text-scrap-coralDeep">
                    uh oh. {lowAttendance.length} subject
                    {lowAttendance.length > 1 ? 's' : ''} below 75%.
                    maybe go to class.
                  </p>
                </div>
              )}
            </div>
          </div>
        </StickerCard>
        <div className="lg:col-span-4">
          <StickerCard
            rotate="right3"
            className="h-full"
            tape="top"
            notebook
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="cutout-heading text-lg">Deadlines</h2>
                <p className="font-hand text-lg text-ink/55">
                  the stuff due soon (yikes)
                </p>
              </div>

              <button
                onClick={() => setShowDeadlineForm(true)}
                className="rounded-full border border-ink/20 bg-scrap-yellow p-2 shadow-sticker-sm transition-transform hover:scale-110"
                aria-label="add deadline"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {deadlines.map((deadline) => {
                const isDone = checked.has(deadline.id);

                return (
                  <div
                    key={deadline.id}
                    className={cn(
                      "paper-colored group flex items-start gap-2.5 rounded-rough border border-ink/15 bg-paper-50/80 p-3 shadow-sticker-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-paper",
                      isDone && "opacity-55"
                    )}
                  >
                    <button
                      onClick={() => toggleDeadline(deadline.id)}
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink/25",
                        isDone
                          ? "bg-scrap-sage"
                          : "bg-paper-50 group-hover:scale-110"
                      )}
                      aria-label="complete deadline"
                    >
                      {isDone && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </button>

                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm font-bold leading-tight",
                          isDone && "line-through"
                        )}
                      >
                        {deadline.title}
                      </p>

                      <p className="mt-0.5 font-hand text-base text-ink/55">
                        {deadline.subject} · due {deadline.due}
                      </p>
                    </div>

                    <span
                      className={cn(
                        "shrink-0 rounded-full border border-ink/25 px-2 py-0.5 text-xs font-black",
                        deadline.daysLeft <= 3
                          ? "bg-scrap-coral"
                          : "bg-scrap-yellow"
                      )}
                    >
                      {deadline.daysLeft}d
                    </span>

                    <button
                      onClick={() => deleteDeadline(deadline.id)}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="delete deadline"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </StickerCard>
        </div>
      </div>

      {/* Opportunities */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <SectionHeading
            title="Opportunities"
            subtitle="free money? hello??"
            color="bg-scrap-coral"
            className="mb-0"
          />

          <StickerButton
            onClick={() => setPage('opportunities')}
            color="bg-scrap-coral"
            rotate="rotate-tilt-l"
            className="text-sm"
          >
            see all
            <ArrowRight className="h-4 w-4" />
          </StickerButton>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {featuredOpps.map((opportunity, index) => (
            <div
              key={opportunity.id}
              className={cn(
                'paper-colored paper-hover group relative flex w-72 shrink-0 flex-col rounded-rough border border-ink/20 bg-paper-50 p-4 shadow-paper',
                index % 2 === 0
                  ? 'rotate-tilt-l'
                  : 'rotate-tilt-r'
              )}
            >
              <Pin className="absolute -top-2 left-1/2 h-6 w-5 -translate-x-1/2" />

              <div className="mb-2 flex items-center justify-between">
                <Badge color={opportunity.color}>
                  {opportunity.category}
                </Badge>

                <span className="font-hand text-base text-ink/50">
                  {opportunity.daysLeft}d left
                </span>
              </div>

              <p className="cutout-heading text-base leading-tight">
                {opportunity.name}
              </p>

              <p className="mt-1 font-hand text-base text-ink/55">
                {opportunity.tag}
              </p>

              <div className="mt-3 flex items-center gap-1 text-xs text-ink/50">
                <Calendar className="h-3 w-3" />
                {opportunity.deadline}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events + profile */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <StickerCard
          color="bg-scrap-blue"
          className="lg:col-span-7"
          rotate="left"
          tape="corner-tl"
        >
          <div className="mb-4 flex items-center gap-2">
            <h2 className="cutout-heading text-lg">College Events</h2>

            <span className="font-hand text-base text-ink/55">
              — touch grass challenge
            </span>
          </div>

          <div className="space-y-2.5">
            {collegeEvents.map((event) => (
              <div
                key={event.id}
                className="paper-colored group flex items-center gap-3 rounded-rough border border-ink/15 bg-paper-50 p-3 shadow-sticker-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-paper"
              >
                <div
                  className={cn(
                    'paper-colored flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-rough border border-ink/20 border-dashed text-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6',
                    event.color
                  )}
                >
                  <span className="text-[8px] font-bold uppercase leading-none">
                    {event.date.split(' ')[0]}
                  </span>

                  <span className="cutout-heading text-base leading-none">
                    {event.date.split(' ')[1]}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="cutout-heading text-sm leading-tight">
                    {event.name}
                  </p>

                  <p className="font-hand text-base text-ink/55">
                    {event.time} · {event.place}
                  </p>
                </div>

                <MapPin className="h-4 w-4 text-ink/35 transition-transform duration-300 group-hover:scale-125" />
              </div>
            ))}
          </div>
        </StickerCard>

        <StickerCard
          color="bg-scrap-mint"
          className="lg:col-span-5"
          rotate="right"
          tape="corner-br"
        >
          <div className="mb-4 flex items-center gap-2">
            <h2 className="cutout-heading text-lg">You, rn</h2>
          </div>

          <div className="space-y-2.5">
            <div className="paper-colored group flex items-center justify-between rounded-rough border border-ink/15 bg-paper-50 px-4 py-2.5 shadow-sticker-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-paper">
              <span className="text-sm font-semibold">CGPA</span>
              <span className="cutout-heading text-2xl">
                {student?.cgpa}
              </span>
            </div>

            <div className="paper-colored group flex items-center justify-between rounded-rough border border-ink/15 bg-paper-50 px-4 py-2.5 shadow-sticker-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-paper">
              <span className="text-sm font-semibold">Semester</span>
              <span className="cutout-heading text-2xl">
                {student?.semester}
              </span>
            </div>

            <div className="paper-colored group flex items-center justify-between rounded-rough border border-ink/15 bg-paper-50 px-4 py-2.5 shadow-sticker-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-paper">
              <span className="text-sm font-semibold">Branch</span>
              <span className="font-hand text-lg">
                {student?.branch.split(' ')[0]}
              </span>
            </div>

            <StickerButton
              onClick={() => setPage('profile')}
              color="bg-scrap-pink"
              rotate="rotate-tilt-l"
              className="mt-1 w-full"
            >
              view my card
              <ArrowRight className="h-4 w-4" />
            </StickerButton>
          </div>
        </StickerCard>
      </div>

      {/* Fresh resources */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <SectionHeading
            title="Fresh Resources"
            subtitle="the stuff you probably should've opened yesterday"
            color="bg-scrap-blue"
            className="mb-0"
          />

          <StickerButton
            onClick={() => setPage('resources')}
            color="bg-scrap-blue"
            rotate="rotate-tilt-r"
            className="text-sm"
          >
            browse
            <ArrowRight className="h-4 w-4" />
          </StickerButton>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {recentResources.map((resource, index) => {
            const isBookmarked = bookmarked.has(resource.id);

            return (
              <div
                key={resource.id}
                className={cn(
                  'paper-colored paper-hover group relative flex flex-col rounded-rough border border-ink/20 bg-paper-50 p-4 shadow-paper',
                  index === 0
                    ? 'rotate-tilt-l'
                    : index === 1
                      ? 'rotate-tilt-r'
                      : 'rotate-tilt-3l'
                )}
              >
                <PaperClip className="absolute -right-1 top-2 h-8 w-6 opacity-40" />

                <div className="mb-3 flex items-start justify-between">
                  <div
                    className={cn(
                      'paper-colored flex h-14 w-14 items-center justify-center rounded-rough border border-ink/20 text-3xl shadow-sticker-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6',
                      resource.color
                    )}
                  >
                    {resource.emoji}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <Badge color={resource.color}>
                      {resource.type}
                    </Badge>

                    {resource.isNew && (
                      <span className="paper-colored rounded-full border border-ink/25 bg-scrap-coral px-2 py-0.5 text-[10px] font-black uppercase">
                        new!
                      </span>
                    )}
                  </div>
                </div>

                <p className="cutout-heading text-sm leading-tight">
                  {resource.title}
                </p>

                <p className="mt-1 font-hand text-base text-ink/55">
                  {resource.subject}
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setPage('resources')}
                    className="paper-colored btn-press flex flex-1 items-center justify-center gap-1 rounded-rough border border-ink/20 bg-scrap-yellow py-2 text-sm font-bold shadow-sticker-sm"
                  >
                    <Download className="h-4 w-4" />
                    open
                  </button>

                  <button
                    onClick={() => toggleBookmark(resource.id)}
                    className={cn(
                      'paper-colored btn-press rounded-rough border border-ink/20 p-2 transition-all shadow-sticker-sm',
                      isBookmarked
                        ? 'bg-scrap-coral'
                        : 'bg-paper-50'
                    )}
                    aria-label="bookmark"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={cn(
                        'h-4 w-4',
                        isBookmarked && 'animate-bookmark-pop'
                      )}
                      fill={isBookmarked ? '#2a2520' : 'none'}
                      stroke="#2a2520"
                      strokeWidth="2"
                    >
                      <path
                        d="M6 4h12v16l-6-4-6 4z"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </DoodleField>
  );
}
