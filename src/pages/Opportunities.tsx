import { useState } from 'react';
import { Search, ArrowRight, Calendar, Users } from 'lucide-react';
import { StickerCard, Badge, SectionHeading, StickerButton } from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import { Squiggle, Lightning, ZigZag, SunRays, Planet, Pin, PaperClip } from '@/components/Doodles';
import { opportunities, type Opportunity } from '@/data/mock';
import { cn } from '@/lib/utils';

const categories = ['All', 'Scholarship', 'Hackathon', 'Internship', 'Competition', 'Event'] as const;
type Category = (typeof categories)[number];

const catMeta: Record<Opportunity['category'], { color: string; emoji: string }> = {
  Scholarship: { color: 'bg-scrap-sage', emoji: '💸' },
  Hackathon: { color: 'bg-scrap-coral', emoji: '🚀' },
  Internship: { color: 'bg-scrap-blue', emoji: '💼' },
  Competition: { color: 'bg-scrap-yellow', emoji: '🏆' },
  Event: { color: 'bg-scrap-pink', emoji: '🎉' },
};

const catTagline: Record<Opportunity['category'], string> = {
  Scholarship: 'free money? hello??',
  Hackathon: 'go build something silly',
  Internship: 'the big one',
  Competition: 'flex on them',
  Event: 'vibes only',
};

export function Opportunities() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Category>('All');
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered = opportunities.filter((o) => {
    const matchQuery =
      o.name.toLowerCase().includes(query.toLowerCase()) ||
      o.description.toLowerCase().includes(query.toLowerCase());
    const matchCat = active === 'All' || o.category === active;
    return matchQuery && matchCat;
  });

  function toggleSave(id: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <DoodleField density="busy" className="space-y-7">
      {/* Hero — torn paper banner */}
      <div className="relative">
        <div className="paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 bg-scrap-coral shadow-paper-lg">
          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />
          <SunRays className="absolute right-6 top-8 h-12 w-12 animate-spin-slow opacity-25" />
          <Planet className="absolute -bottom-1 right-1/4 h-10 w-14 opacity-20" />
          <ZigZag className="absolute bottom-2 left-4 h-4 w-32 opacity-25" />
          <div className="relative p-7 pt-10 md:p-9 md:pt-12">
            <p className="font-hand text-2xl text-ink/65">opportunities board</p>
            <h1 className="cutout-heading text-4xl leading-tight md:text-5xl">go build something silly</h1>
            <Squiggle className="mt-2 h-6 w-48 text-ink/35" />
            <p className="mt-3 max-w-xl font-hand text-xl text-ink/65">
              scholarships, hackathons, internships, competitions, events — all the stuff that looks great on a resume and feels impossible to apply for. we made it easier.
            </p>
          </div>
        </div>
      </div>

      {/* Category tabs — paper tabs */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((c, i) => {
          const meta = c === 'All' ? null : catMeta[c as Opportunity['category']];
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                'paper-colored btn-press cutout-heading group flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 transition-all duration-200 shadow-sticker-sm',
                isActive ? 'bg-ink text-paper-50 shadow-paper-lg' : 'bg-paper-50',
                !isActive && (i % 2 === 0 ? 'rotate-tilt-l' : 'rotate-tilt-r')
              )}
            >
              {meta && <span className="text-lg transition-transform duration-300 group-hover:scale-125">{meta.emoji}</span>}
              {c}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <StickerCard color="bg-paper-50" className="p-4" tape="top">
        <div className="group relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40 transition-transform duration-300 group-hover:scale-110" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search opportunities..."
            className="w-full rounded-rough border border-ink/25 bg-paper-100 py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:bg-paper-50 focus:shadow-paper-sm"
          />
        </div>
      </StickerCard>

      {/* Results — pinned paper notes */}
      {filtered.length === 0 ? (
        <StickerCard color="bg-paper-100" className="py-16 text-center">
          <p className="font-hand text-3xl text-ink/45">no matches. maybe invent your own opportunity? 🤷</p>
        </StickerCard>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((o, i) => {
            const meta = catMeta[o.category];
            const urgent = o.daysLeft <= 14;
            const isSaved = saved.has(o.id);
            return (
              <div
                key={o.id}
                className={cn(
                  'paper-colored paper-hover group relative flex flex-col rounded-rough border border-ink/20 bg-paper-50 p-5 shadow-paper',
                  i % 3 === 0 ? 'rotate-tilt-l' : i % 3 === 1 ? 'rotate-tilt-r' : 'rotate-tilt-3l'
                )}
              >
                {/* Pin at top */}
                <Pin className="absolute -top-2 left-1/2 h-6 w-5 -translate-x-1/2" />
                {/* Paper clip */}
                <PaperClip className="absolute -right-1 top-2 h-8 w-6 opacity-40" />

                <div className="mb-3 flex items-start justify-between">
                  <div className={cn('paper-colored flex h-16 w-16 items-center justify-center rounded-rough border border-ink/20 text-3xl shadow-sticker-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12', meta.color)}>
                    {meta.emoji}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Badge color={meta.color}>{o.category}</Badge>
                    <span className={cn(
                      'paper-colored rounded-full border border-ink/25 px-2.5 py-0.5 text-[10px] font-black uppercase tabular-nums transition-transform duration-300 group-hover:scale-105',
                      urgent ? 'bg-scrap-coral' : 'bg-scrap-yellow'
                    )}>
                      {o.daysLeft}d left
                    </span>
                  </div>
                </div>

                <h3 className="cutout-heading text-lg leading-tight">{o.name}</h3>
                <p className="mt-1 font-hand text-lg text-ink/55">{catTagline[o.category]}</p>

                <p className="mt-2 text-sm text-ink/75">{o.description}</p>

                <div className="mt-3 space-y-1.5 text-xs text-ink/55">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>deadline: <span className="font-bold text-ink">{o.deadline}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    <span>{o.eligibility}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="paper-colored btn-press group/btn flex flex-1 items-center justify-center gap-1.5 rounded-rough border border-ink/20 bg-scrap-yellow py-2.5 font-bold shadow-sticker-sm transition-all">
                    view details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                  <button
                    onClick={() => toggleSave(o.id)}
                    className={cn('paper-colored btn-press rounded-rough border border-ink/20 p-2.5 transition-all shadow-sticker-sm', isSaved ? 'bg-scrap-coral' : 'bg-paper-50')}
                    aria-label="save"
                  >
                    <svg viewBox="0 0 24 24" className={cn('h-5 w-5', isSaved && 'animate-bookmark-pop')} fill={isSaved ? '#2a2520' : 'none'} stroke="#2a2520" strokeWidth="2">
                      <path d="M6 4h12v16l-6-4-6 4z" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DoodleField>
  );
}
