import { useState } from 'react';
import { StickerCard, Badge, ProgressBar, SectionHeading, StickerButton } from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import { Star, Squiggle, Heart, Flower, Sparkle, DashedArrow, ZigZag, PaperClip } from '@/components/Doodles';
import { student } from '@/data/mock';
import { cn } from '@/lib/utils';

const skillColor = (i: number) => {
  const colors = ['bg-scrap-blue', 'bg-scrap-coral', 'bg-scrap-sage', 'bg-scrap-pink', 'bg-scrap-lavender', 'bg-scrap-mint'];
  return colors[i % colors.length];
};

export function Profile() {
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

  return (
    <DoodleField density="busy" className="space-y-7">
      {/* ID Card — paper card with tape */}
      <div className="relative">
        <StickerCard color="bg-scrap-yellow" rotate="left3" className="overflow-hidden p-0" tape="top">
          {/* Header strip — torn paper */}
          <div className="paper-colored torn-strip border-b border-ink/20 bg-scrap-yellowDeep/50 p-5 text-center">
            <p className="cutout-heading text-sm uppercase tracking-[0.3em]">CampusHub Student ID</p>
          </div>
          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-start">
            {/* Avatar — paper piece with paper clip */}
            <div className="flex flex-col items-center gap-2">
              <div className="group relative">
                <PaperClip className="absolute -left-2 -top-2 h-8 w-6 opacity-50" />
                <div className="paper-colored flex h-28 w-28 items-center justify-center rounded-rough border border-ink/25 bg-scrap-coral cutout-heading text-5xl shadow-paper-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  {student.initials}
                </div>
                <Star className="absolute -right-3 -top-3 h-8 w-8 animate-float transition-transform duration-300 group-hover:scale-125" />
                <Sparkle className="absolute -bottom-2 -left-3 h-6 w-6 animate-wiggle" />
              </div>
              <Badge color="bg-scrap-sage">verified student</Badge>
            </div>

            {/* Info — paper fields */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="font-hand text-2xl text-ink/55">name</p>
                <h1 className="cutout-heading text-3xl leading-none">{student.name}</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'course', value: student.course },
                  { label: 'year', value: student.year },
                  { label: 'branch', value: student.branch, small: true },
                  { label: 'roll no', value: student.rollNo },
                ].map((field) => (
                  <div key={field.label} className="paper-colored group rounded-rough border border-ink/15 bg-paper-50 px-3 py-2 shadow-sticker-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-paper">
                    <p className="font-hand text-sm text-ink/45">{field.label}</p>
                    <p className={cn('cutout-heading', field.small ? 'text-sm leading-tight' : '')}>{field.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge color="bg-scrap-coral">CGPA {student.cgpa}</Badge>
                <Badge color="bg-scrap-blue">Sem {student.semester}</Badge>
                <Badge color="bg-scrap-pink">{student.email}</Badge>
              </div>
            </div>
          </div>

          {/* Barcode strip */}
          <div className="flex h-10 items-end gap-0.5 border-t border-dashed border-ink/20 bg-paper-50 px-4">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="bg-ink" style={{ width: `${i % 3 === 0 ? 3 : 1.5}px`, height: `${60 + (i % 4) * 10}%` }} />
            ))}
          </div>
        </StickerCard>
      </div>

      {/* Bio — paper note with flower */}
      <StickerCard color="bg-paper-50" rotate="right" tape="corner-tl">
        <div className="flex items-start gap-3">
          <Flower className="h-10 w-10 shrink-0 animate-float" />
          <div>
            <SectionHeading title="About Me" subtitle="a totally professional bio" color="bg-scrap-pink" className="mb-1" />
            <p className="font-hand text-2xl leading-snug text-ink/75">&ldquo;{student.bio}&rdquo;</p>
          </div>
        </div>
      </StickerCard>

      {/* Skills + Interests — asymmetric paper pieces */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Skills — col-span-7, blue paper */}
        <StickerCard color="bg-scrap-blue" className="lg:col-span-7" rotate="left" tape="corner-tr">
          <SectionHeading title="Skills" subtitle="stuff you can sorta do" color="bg-scrap-blue" />
          <div className="space-y-3">
            {student.skills.map((s, i) => (
              <div key={s.name} className="group">
                <div className="mb-1 flex items-center justify-between">
                  <span className="cutout-heading transition-transform duration-300 group-hover:translate-x-1">{s.name}</span>
                  <span className="font-hand text-base text-ink/55">{s.level}%</span>
                </div>
                <ProgressBar value={s.level} color={skillColor(i)} showLabel={false} />
              </div>
            ))}
          </div>
        </StickerCard>

        {/* Interests — col-span-5, pink paper */}
        <StickerCard color="bg-scrap-pink" className="lg:col-span-5" rotate="right3" tape="corner-bl">
          <SectionHeading title="Interests" subtitle="things that spark joy" color="bg-scrap-pink" />
          <div className="flex flex-wrap gap-2">
            {student.interests.map((interest, i) => (
              <button
                key={interest}
                onClick={() => setSelectedInterest(selectedInterest === interest ? null : interest)}
                className={cn(
                  'paper-colored btn-press cutout-heading rounded-full border border-ink/20 px-4 py-1.5 text-sm transition-all duration-200 hover:animate-wiggle shadow-sticker-sm',
                  skillColor(i),
                  selectedInterest === interest && 'ring-2 ring-ink/40 ring-offset-2'
                )}
              >
                {interest}
              </button>
            ))}
          </div>
          <DashedArrow className="mt-4 h-8 w-32 text-ink/35" />
          <p className="font-hand text-lg text-ink/55">
            {selectedInterest ? `find your people in ${selectedInterest} →` : 'tap one to find your people →'}
          </p>
        </StickerCard>
      </div>

      {/* Contact strip — sticky note */}
      <StickerCard color="bg-scrap-mint" rotate="left3" tape="top">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Heart className="h-10 w-10 animate-float" />
            <div>
              <p className="cutout-heading text-xl">need to reach me?</p>
              <p className="font-hand text-lg text-ink/55">{student.phone} · {student.email}</p>
            </div>
          </div>
          <StickerButton color="bg-scrap-coral" rotate="rotate-tilt-r">
            edit my card
          </StickerButton>
        </div>
      </StickerCard>
    </DoodleField>
  );
}
