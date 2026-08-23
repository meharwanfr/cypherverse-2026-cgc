import { useState } from 'react';
import { Plus, Minus, Pencil, X, Check, Trash2 } from 'lucide-react';
import { StickerCard, Badge, ProgressBar, SectionHeading, StickerButton } from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import { Squiggle, RunningDoodle, Smiley, WorriedFace, Lightning, ZigZag } from '@/components/Doodles';
import type { Dispatch, SetStateAction } from 'react';
import { api, type Subject } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/Toast';

function attendanceState(pct: number) {
  if (pct >= 85) return { label: 'doing great', face: Smiley, color: 'bg-scrap-sage', msg: 'your attendance is doing surprisingly well' };
  if (pct >= 75) return { label: 'safe zone', face: Smiley, color: 'bg-scrap-mint', msg: "you're in the safe zone. barely." };
  if (pct >= 60) return { label: 'uh oh', face: WorriedFace, color: 'bg-scrap-coral', msg: 'uh oh. maybe go to class.' };
  return { label: 'danger!!', face: WorriedFace, color: 'bg-scrap-coralDeep', msg: "bro. seriously. go to class." };
}

type AttendanceProps = {
  subjects: Subject[];
  setSubjects: Dispatch<SetStateAction<Subject[]>>;
};

export function Attendance({ subjects, setSubjects }: AttendanceProps) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState({ attended: 0, total: 0 });
  const [justBumped, setJustBumped] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', code: '', instructor: '' });

  const overall = (subjects.reduce((s, x) => s + x.attended, 0) / subjects.reduce((s, x) => s + x.total, 0)) * 100;
  const state = attendanceState(overall);
  const StateFace = state.face;
  const lowCount = subjects.filter((s) => (s.attended / s.total) * 100 < 75).length;

  function startEdit(s: Subject) {
    setEditing(s.id);
    setDraft({ attended: s.attended, total: s.total });
  }
  function saveEdit(id: string) {
    const attended = Math.min(draft.attended, draft.total);
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, attended, total: draft.total } : s))
    );
    setEditing(null);
    api.subjects.updateAttendance(id, attended, draft.total).then(() => {
      toast('Attendance updated!');
    }).catch((err) => {
      console.error('[Attendance] Failed to save edit:', err);
      toast('Failed to save', 'error');
    });
  }
  function bump(id: string, delta: number) {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const attended = delta > 0 ? s.attended + 1 : s.attended - 1;
        const total = delta > 0 ? s.total + 1 : s.total;
        return { ...s, attended: Math.max(0, attended), total: Math.max(1, total) };
      })
    );
    setJustBumped(id);
    setTimeout(() => setJustBumped(null), 500);
    api.subjects.bump(id, delta).then(() => {
      toast(delta > 0 ? 'Marked present!' : 'Marked bunked');
    }).catch((err) => {
      console.error('[Attendance] Failed to bump:', err);
      toast('Failed to update', 'error');
    });
  }

  return (
    <DoodleField density="busy" className="space-y-7">
      {/* Hero — torn paper */}
      <div className="relative">
        <div className={cn('paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 shadow-paper-lg transition-colors duration-500', state.color)}>
          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />
          <ZigZag className="absolute bottom-2 left-4 h-4 w-32 opacity-25" />
          <div className="relative flex flex-col items-center gap-6 p-7 pt-10 md:flex-row md:justify-between md:p-9 md:pt-12">
            <div>
              <p className="font-hand text-2xl text-ink/65">attendance overview</p>
              <h1 className="cutout-heading text-4xl leading-tight md:text-5xl">{state.msg}</h1>
              <Squiggle className="mt-2 h-6 w-56 text-ink/35" />
            </div>
            <div className="flex items-center gap-4">
              <div className="group relative flex h-40 w-40 items-center justify-center rounded-full border border-ink/20 bg-paper-50 shadow-paper transition-transform duration-500 group-hover:rotate-12">
                <svg viewBox="0 0 120 120" className="absolute h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#2a2520" strokeWidth="6" opacity="0.08" />
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke={overall >= 75 ? '#9ab89a' : '#e89888'} strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${(overall / 100) * 314} 314`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="cutout-heading text-4xl">{Math.round(overall)}%</p>
                  <p className="font-hand text-sm text-ink/55">overall</p>
                </div>
              </div>
              <StateFace className="h-16 w-16 animate-float" />
            </div>
          </div>
        </div>
      </div>

      {/* Low attendance warning — torn paper with doodle */}
      {lowCount > 0 && (
        <StickerCard color="bg-scrap-coral/20" className="border-dashed" rotate="right3" tape="top">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <RunningDoodle className="h-24 w-28 shrink-0 animate-float" />
            <div>
              <p className="cutout-heading text-2xl text-scrap-coralDeep">{lowCount} subjects below 75%!</p>
              <p className="font-hand text-xl text-ink/65">
                you need to attend the next few classes to recover. or don&apos;t, i&apos;m not your mom.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {subjects.filter((s) => (s.attended / s.total) * 100 < 75).map((s) => (
                  <Badge key={s.id} color="bg-scrap-coral">
                    {s.emoji} {s.name} — {Math.round((s.attended / s.total) * 100)}%
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </StickerCard>
      )}

      {/* Add Subject Form */}
      {showAddForm && (
        <StickerCard color="bg-scrap-sage" tape="top">
          <div className="space-y-4">
            <div>
              <p className="cutout-heading text-xl">New Subject</p>
              <p className="font-hand text-sm text-ink/55">one more to survive</p>
            </div>
            <input
              placeholder="Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="w-full rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />
            <input
              placeholder="Code"
              value={newSubject.code}
              onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
              className="w-full rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />
            <input
              placeholder="Instructor"
              value={newSubject.instructor}
              onChange={(e) => setNewSubject({ ...newSubject, instructor: e.target.value })}
              className="w-full rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />
            <div className="flex gap-2">
              <StickerButton onClick={() => { setNewSubject({ name: '', code: '', instructor: '' }); setShowAddForm(false); }}>cancel</StickerButton>
              <StickerButton color="bg-scrap-sage" onClick={() => {
                api.subjects.create(newSubject).then((subject) => {
                  setSubjects((prev) => [...prev, subject]);
                  setNewSubject({ name: '', code: '', instructor: '' });
                  setShowAddForm(false);
                  toast('Subject added!');
                }).catch(() => toast('Failed to add subject', 'error'));
              }}>add it</StickerButton>
            </div>
          </div>
        </StickerCard>
      )}

      {/* Subject-wise — paper note cards */}
      <div>
        <SectionHeading title="Subject-wise Attendance" subtitle="tap + to mark present, − for bunked" color="bg-scrap-sage" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s, i) => {
            const pct = (s.attended / s.total) * 100;
            const st = attendanceState(pct);
            const isEditing = editing === s.id;
            const wasBumped = justBumped === s.id;
            return (
              <StickerCard
                key={s.id}
                color="bg-paper-50"
                rotate={i % 3 === 0 ? 'left' : i % 3 === 1 ? 'right' : 'left3'}
                className={cn('flex flex-col', wasBumped && 'animate-wiggle')}
                tape={i % 2 === 0 ? 'corner-tl' : 'corner-tr'}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl transition-transform duration-300 hover:scale-125">{s.emoji}</span>
                    <div>
                      <p className="cutout-heading text-base leading-tight">{s.name}</p>
                      <p className="font-hand text-sm text-ink/55">{s.code} · {s.instructor}</p>
                    </div>
                  </div>
                  <Badge color={st.color}>{st.label}</Badge>
                </div>

                <ProgressBar
                  value={pct}
                  color={pct >= 75 ? 'bg-scrap-sage' : pct >= 60 ? 'bg-scrap-yellow' : 'bg-scrap-coral'}
                  className="mb-3"
                />

                {isEditing ? (
                  <div className="space-y-2 rounded-rough border border-dashed border-ink/20 bg-paper-100 p-3">
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-semibold">attended</label>
                      <input
                        type="number"
                        value={draft.attended}
                        onChange={(e) => setDraft({ ...draft, attended: Number(e.target.value) })}
                        className="w-20 rounded-rough border border-ink/25 bg-paper-50 px-2 py-1 text-right font-bold outline-none focus:shadow-sticker-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="font-semibold">total</label>
                      <input
                        type="number"
                        value={draft.total}
                        onChange={(e) => setDraft({ ...draft, total: Number(e.target.value) })}
                        className="w-20 rounded-rough border border-ink/25 bg-paper-50 px-2 py-1 text-right font-bold outline-none focus:shadow-sticker-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(s.id)}
                        className="paper-colored btn-press flex flex-1 items-center justify-center gap-1 rounded-rough border border-ink/20 bg-scrap-sage py-1.5 text-sm font-bold shadow-sticker-sm"
                      >
                        <Check className="h-4 w-4" /> save
                      </button>
                      <button onClick={() => setEditing(null)} className="paper-colored btn-press rounded-rough border border-ink/20 bg-paper-50 p-2 shadow-sticker-sm" aria-label="cancel">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-hand text-lg text-ink/60">
                      {s.attended}/{s.total} classes · {Math.round(pct)}%
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => bump(s.id, -1)}
                        className="paper-colored btn-press group flex items-center gap-1 rounded-rough border border-ink/20 bg-scrap-coral/30 px-3 py-1.5 text-sm font-bold transition-all hover:bg-scrap-coral shadow-sticker-sm"
                      >
                        <Minus className="h-4 w-4 transition-transform duration-300 group-hover:scale-125" /> bunked
                      </button>
                      <button
                        onClick={() => bump(s.id, 1)}
                        className="paper-colored btn-press group flex items-center gap-1 rounded-rough border border-ink/20 bg-scrap-sage/30 px-3 py-1.5 text-sm font-bold transition-all hover:bg-scrap-sage shadow-sticker-sm"
                      >
                        <Plus className="h-4 w-4 transition-transform duration-300 group-hover:scale-125" /> present
                      </button>
                      <button onClick={() => startEdit(s)} className="paper-colored btn-press rounded-rough border border-ink/20 bg-paper-50 p-2 shadow-sticker-sm" aria-label="edit">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          api.subjects.delete(s.id).then(() => {
                            setSubjects((prev) => prev.filter((sub) => sub.id !== s.id));
                            toast('Subject removed');
                          }).catch(() => toast('Failed to delete subject', 'error'));
                        }}
                        className="ml-1 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-scrap-coral/30"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </StickerCard>
            );
          })}
        </div>
      </div>

      {/* Quick add — sticky note */}
      <StickerCard color="bg-scrap-yellow" rotate="left3" tape="top">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
          <Lightning className="h-12 w-12 shrink-0 animate-wiggle" />
          <div className="flex-1">
            <p className="cutout-heading text-xl">add a new subject</p>
            <p className="font-hand text-lg text-ink/55">because apparently you signed up for more pain</p>
          </div>
          <StickerButton color="bg-scrap-sage" rotate="rotate-tilt-r" onClick={() => setShowAddForm(true)}>
            <Plus className="h-5 w-5" /> add subject
          </StickerButton>
        </div>
      </StickerCard>
    </DoodleField>
  );
}
