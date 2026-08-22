import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Footprints,
  Flame,
  Droplets,
  Moon,
  Plus,
  Minus,
  TrendingUp,
  HeartPulse,
} from 'lucide-react';

import { StickerCard, Badge, ProgressBar, SectionHeading } from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import {
  SunRays,
  Squiggle,
  ZigZag,
  Coffee,
  Sparkle,
} from '@/components/Doodles';

const weeklySteps = [
  { day: 'Mon', steps: 6840 },
  { day: 'Tue', steps: 8210 },
  { day: 'Wed', steps: 7430 },
  { day: 'Thu', steps: 9120 },
  { day: 'Fri', steps: 6350 },
  { day: 'Sat', steps: 10420 },
  { day: 'Sun', steps: 7842 },
];

const healthStats = [
  {
    label: 'Calories',
    value: '412',
    unit: 'kcal',
    icon: Flame,
    color: 'bg-scrap-coral',
  },
  {
    label: 'Water',
    value: '5',
    unit: 'glasses',
    icon: Droplets,
    color: 'bg-scrap-blue',
  },
  {
    label: 'Sleep',
    value: '7.2',
    unit: 'hours',
    icon: Moon,
    color: 'bg-scrap-lavender',
  },
];

export function Health() {
  const [steps, setSteps] = useState(7842);
  const [water, setWater] = useState(5);

  const stepGoal = 10000;
  const stepPercentage = Math.min((steps / stepGoal) * 100, 100);

  function addSteps() {
    setSteps((prev) => Math.min(prev + 500, 20000));
  }

  function addWater() {
    setWater((prev) => Math.min(prev + 1, 12));
  }

  function removeWater() {
    setWater((prev) => Math.max(prev - 1, 0));
  }

  return (
    <DoodleField density="normal" className="space-y-7">

      {/* Header */}
      <div className="relative">
        <div className="paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 bg-scrap-sage shadow-paper-lg">

          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />

          <SunRays className="absolute right-8 top-8 h-12 w-12 opacity-25" />
          <Sparkle className="absolute bottom-6 right-24 h-6 w-6 opacity-30" />
          <ZigZag className="absolute bottom-3 left-4 h-4 w-32 opacity-25" />

          <div className="relative p-7 pt-10 md:p-9 md:pt-12">
            <p className="font-hand text-2xl text-ink/65">
              take care of yourself
            </p>

            <h1 className="cutout-heading text-4xl leading-tight md:text-5xl">
              health check 🌱
            </h1>

            <p className="mt-2 font-hand text-xl text-ink/60">
              because surviving college shouldn't require a respawn.
            </p>
          </div>
        </div>
      </div>

      {/* Main step tracker */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

        <StickerCard
          color="bg-paper-50"
          className="lg:col-span-7"
          rotate="left"
          tape="corner-tr"
        >
          <div className="mb-5 flex items-start justify-between">
            <SectionHeading
              title="Footsteps"
              subtitle="keep moving, literally"
              color="bg-scrap-yellow"
              className="mb-0"
            />

            <Badge color="bg-scrap-sage">
              {Math.round(stepPercentage)}%
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-6 md:flex-row">

            {/* Step circle */}
            <div className="relative flex h-48 w-48 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper-50 shadow-paper">

              <svg
                viewBox="0 0 120 120"
                className="absolute h-full w-full -rotate-90"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#2a2520"
                  strokeWidth="8"
                  opacity="0.08"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#9ab89a"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(stepPercentage / 100) * 302} 302`}
                />
              </svg>

              <div className="relative text-center">
                <Footprints className="mx-auto mb-1 h-7 w-7" />

                <p className="cutout-heading text-3xl">
                  {steps.toLocaleString()}
                </p>

                <p className="font-hand text-sm text-ink/55">
                  of {stepGoal.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex-1">
              <p className="font-hand text-xl text-ink/60">
                today's mission
              </p>

              <h2 className="cutout-heading mt-1 text-2xl">
                Hit 10k steps
              </h2>

              <ProgressBar
                value={stepPercentage}
                color="bg-scrap-sage"
                showLabel={false}
                className="mt-5"
              />

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={addSteps}
                  className="paper-colored btn-press flex items-center gap-2 rounded-rough border border-ink/20 bg-scrap-yellow px-4 py-2 font-bold shadow-sticker-sm"
                >
                  <Plus className="h-4 w-4" />
                  +500 steps
                </button>

                <span className="font-hand text-base text-ink/50">
                  nice. keep going.
                </span>
              </div>
            </div>
          </div>
        </StickerCard>

        {/* Today's stats */}
        <StickerCard
          color="bg-scrap-pink"
          className="lg:col-span-5"
          rotate="right"
          tape="top"
        >
          <div className="mb-4 flex items-center gap-2">
            <HeartPulse className="h-5 w-5" />
            <h2 className="cutout-heading text-lg">
              Today, rn
            </h2>
          </div>

          <div className="space-y-3">
            {healthStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="paper-colored flex items-center justify-between rounded-rough border border-ink/15 bg-paper-50 p-3 shadow-sticker-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-rough border border-ink/20 ${stat.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        {stat.label}
                      </p>

                      <p className="font-hand text-sm text-ink/50">
                        today's total
                      </p>
                    </div>
                  </div>

                  <p className="cutout-heading text-xl">
                    {stat.value}
                    <span className="ml-1 font-sans text-xs font-bold">
                      {stat.unit}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </StickerCard>
      </div>

      {/* Weekly activity */}
      <StickerCard
        color="bg-paper-50"
        rotate="right3"
        tape="corner-tl"
      >
        <div className="mb-5 flex items-center justify-between">
          <SectionHeading
            title="Weekly Activity"
            subtitle="proof that you occasionally leave your chair"
            color="bg-scrap-blue"
            className="mb-0"
          />

          <TrendingUp className="h-6 w-6" />
        </div>

        <div className="flex items-end justify-between gap-2 md:gap-5">
          {weeklySteps.map((item) => {
            const height = Math.max(
              (item.steps / 12000) * 160,
              20
            );

            const isToday = item.day === 'Sun';

            return (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="font-hand text-xs text-ink/50">
                  {item.steps >= 10000
                    ? '10k+'
                    : `${Math.round(item.steps / 1000)}k`}
                </span>

                <div
                  className={cn(
                    'w-full max-w-12 rounded-t-rough border border-ink/15 transition-all duration-300 hover:-translate-y-1',
                    isToday
                      ? 'bg-scrap-sage'
                      : 'bg-scrap-blue/60'
                  )}
                  style={{ height }}
                />

                <span
                  className={cn(
                    'font-bold text-xs',
                    isToday && 'cutout-heading'
                  )}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </StickerCard>

      {/* Water + wellness */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Water */}
        <StickerCard
          color="bg-scrap-blue"
          rotate="left"
          tape="corner-br"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="cutout-heading text-lg">
                Hydration
              </h2>

              <p className="font-hand text-base text-ink/55">
                drink some water, genius 💧
              </p>
            </div>

            <Droplets className="h-6 w-6" />
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={`h-9 w-7 rounded-b-full rounded-t-full border border-ink/15 ${
                  index < water
                    ? 'bg-scrap-sage'
                    : 'bg-paper-50'
                }`}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="cutout-heading text-xl">
              {water}/8 glasses
            </p>

            <div className="flex gap-2">
              <button
                onClick={removeWater}
                className="rounded-full border border-ink/20 bg-paper-50 p-2"
              >
                <Minus className="h-4 w-4" />
              </button>

              <button
                onClick={addWater}
                className="rounded-full border border-ink/20 bg-scrap-yellow p-2"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </StickerCard>

        {/* Wellness note */}
        <StickerCard
          color="bg-scrap-yellow"
          rotate="right"
          tape="top"
        >
          <Coffee className="mb-3 h-7 w-7" />

          <h2 className="cutout-heading text-xl">
            tiny reminder
          </h2>

          <p className="mt-2 font-hand text-xl leading-relaxed text-ink/65">
            Drink water. Touch grass. Stretch your back.
            Get some sleep. Your assignments aren't going anywhere.
          </p>

          <Squiggle className="mt-4 h-5 w-40 text-ink/30" />
        </StickerCard>
      </div>
    </DoodleField>
  );
}