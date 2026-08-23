import { useState, useEffect } from 'react';
import {
  Footprints,
  HeartPulse,
  Droplets,
  Moon,
  Flame,
  Plus,
  Minus,
  Trophy,
  TrendingUp,
} from 'lucide-react';

import {
  StickerCard,
  Badge,
  SectionHeading,
} from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import {
  Star,
  Squiggle,
  SunRays,
} from '@/components/Doodles';
import { api, type HealthActivity } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/Toast';

const DAILY_STEP_GOAL = 10000;

export function Health() {
  const { toast } = useToast();
  const [steps, setSteps] = useState(7842);
  const [water, setWater] = useState(5);
  const [activities, setActivities] = useState<HealthActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthSnapshot, setHealthSnapshot] = useState({
    sleepHours: '7h 20m',
    activeMinutes: '42 min',
    activityLevel: 'Good',
    streak: '6 days',
  });

  useEffect(() => {
    async function load() {
      try {
        const [health, acts] = await Promise.all([
          api.health.get(),
          api.health.activities(),
        ]);
        setSteps(health.steps);
        setWater(health.water);
        setActivities(acts);
        const sleepH = Math.floor(health.sleepHours || 7);
        const sleepM = Math.round(((health.sleepHours || 7) - sleepH) * 60);
        setHealthSnapshot({
          sleepHours: `${sleepH}h ${sleepM}m`,
          activeMinutes: `${health.activeMinutes || 42} min`,
          activityLevel: 'Good',
          streak: `${health.streak || 6} days`,
        });
      } catch (err) {
        console.error('[Health] Failed to load:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <DoodleField density="normal">
        <p className="font-hand text-xl text-ink/50 text-center py-20">loading health data...</p>
      </DoodleField>
    );
  }

  const stepPercentage = Math.min(
    Math.round((steps / DAILY_STEP_GOAL) * 100),
    100
  );

  const remainingSteps = Math.max(
    DAILY_STEP_GOAL - steps,
    0
  );

  function addSteps(amount: number) {
    setSteps((previous) => {
      const next = Math.min(previous + amount, 20000);
      api.health.update({ steps: next }).catch((err) => {
        console.error('[Health] Failed to update steps:', err);
      });
      if (next >= DAILY_STEP_GOAL && previous < DAILY_STEP_GOAL) {
        toast('Steps updated!');
      }
      return next;
    });
  }

  function addWater() {
    setWater((previous) => {
      const next = Math.min(previous + 1, 8);
      api.health.update({ water: next }).catch((err) => {
        console.error('[Health] Failed to update water:', err);
      });
      toast('Water logged!');
      return next;
    });
  }

  function removeWater() {
    setWater((previous) => {
      const next = Math.max(previous - 1, 0);
      api.health.update({ water: next }).catch((err) => {
        console.error('[Health] Failed to update water:', err);
      });
      return next;
    });
  }

  return (
    <DoodleField density="normal" className="space-y-7">

      {/* Header */}
      <div className="relative">
        <div className="paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 bg-scrap-mint shadow-paper-lg">

          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />

          <SunRays className="absolute right-8 top-7 h-14 w-14 opacity-25" />

          <div className="relative p-7 pt-10 md:p-9 md:pt-12">
            <p className="font-hand text-2xl text-ink/60">
              take care of yourself,
            </p>

            <h1 className="cutout-heading text-4xl leading-tight md:text-5xl">
              Health Check
              <span className="ml-2">❤️</span>
            </h1>

            <p className="mt-2 font-hand text-xl text-ink/60">
              because debugging your body is harder than debugging code.
            </p>
          </div>
        </div>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

        {/* Steps */}
        <StickerCard
          color="bg-paper-50"
          className="lg:col-span-7"
          rotate="left"
          tape="corner-tr"
        >
          <div className="mb-5 flex items-start justify-between">
            <SectionHeading
              title="Today's Steps"
              subtitle="keep moving, academic weapon"
              color="bg-scrap-sage"
              className="mb-0"
            />

            <div className="rounded-full border border-ink/20 bg-scrap-yellow px-3 py-1 text-xs font-black">
              {stepPercentage}%
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 md:flex-row">

            {/* Step circle */}
            <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">

              <svg
                viewBox="0 0 120 120"
                className="-rotate-90"
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
                  strokeDasharray={`${(stepPercentage / 100) * 314} 314`}
                  className="transition-all duration-700"
                />
              </svg>

              <div className="absolute text-center">
                <Footprints className="mx-auto mb-1 h-6 w-6" />

                <p className="cutout-heading text-3xl">
                  {steps.toLocaleString()}
                </p>

                <p className="font-hand text-sm text-ink/55">
                  of {DAILY_STEP_GOAL.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Step controls */}
            <div className="flex-1">
              <p className="font-hand text-lg text-ink/60">
                {remainingSteps > 0
                  ? `${remainingSteps.toLocaleString()} steps to go.`
                  : 'Goal smashed! 🎉'}
              </p>

              <div className="mt-4 h-4 overflow-hidden rounded-full border border-ink/15 bg-paper-100">
                <div
                  className="h-full rounded-full bg-scrap-sage transition-all duration-500"
                  style={{ width: `${stepPercentage}%` }}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSteps((prev) => {
                      const next = Math.max(prev - 500, 0);
                      api.health.update({ steps: next }).catch(() => toast('Failed to update steps', 'error'));
                      return next;
                    });
                  }}
                  className="paper-colored btn-press rounded-full border border-ink/20 bg-scrap-coral/30 px-3 py-1.5 text-xs font-bold shadow-sticker-sm"
                >
                  -500
                </button>
                {[500, 1000, 2000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => addSteps(amount)}
                    className="paper-colored btn-press rounded-full border border-ink/20 bg-paper-50 px-3 py-1.5 text-xs font-bold shadow-sticker-sm"
                  >
                    +{amount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </StickerCard>

        {/* Health snapshot */}
        <StickerCard
          color="bg-scrap-pink"
          className="lg:col-span-5"
          rotate="right"
          tape="top"
        >
          <div className="mb-4 flex items-center gap-2">
            <HeartPulse className="h-5 w-5" />
            <h2 className="cutout-heading text-xl">
              Health Snapshot
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="paper-colored rounded-rough border border-ink/15 bg-paper-50 p-4 shadow-sticker-sm">
              <Moon className="mb-2 h-5 w-5" />
              <p className="text-xs font-black uppercase text-ink/45">
                Sleep
              </p>
              <p className="cutout-heading mt-1 text-2xl">
                {healthSnapshot.sleepHours}
              </p>
            </div>

            <div className="paper-colored rounded-rough border border-ink/15 bg-paper-50 p-4 shadow-sticker-sm">
              <Flame className="mb-2 h-5 w-5" />
              <p className="text-xs font-black uppercase text-ink/45">
                Active
              </p>
              <p className="cutout-heading mt-1 text-2xl">
                {healthSnapshot.activeMinutes}
              </p>
            </div>

            <div className="paper-colored rounded-rough border border-ink/15 bg-paper-50 p-4 shadow-sticker-sm">
              <HeartPulse className="mb-2 h-5 w-5" />
              <p className="text-xs font-black uppercase text-ink/45">
                Activity
              </p>
              <p className="cutout-heading mt-1 text-2xl">
                {healthSnapshot.activityLevel}
              </p>
            </div>

            <div className="paper-colored rounded-rough border border-ink/15 bg-paper-50 p-4 shadow-sticker-sm">
              <Trophy className="mb-2 h-5 w-5" />
              <p className="text-xs font-black uppercase text-ink/45">
                Streak
              </p>
              <p className="cutout-heading mt-1 text-2xl">
                {healthSnapshot.streak}
              </p>
            </div>

          </div>
        </StickerCard>
      </div>

      {/* Water + daily goal */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Water */}
        <StickerCard
          color="bg-scrap-blue"
          rotate="left"
          tape="corner-br"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="cutout-heading text-xl">
                Hydration
              </h2>

              <p className="font-hand text-lg text-ink/55">
                drink some water, bro.
              </p>
            </div>

            <Droplets className="h-7 w-7" />
          </div>

          <div className="mt-5 flex items-center gap-4">

            <div className="flex-1">
              <div className="flex items-center gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-10 flex-1 rounded-full border border-ink/15 transition-all',
                      index < water
                        ? 'bg-scrap-blue'
                        : 'bg-paper-300/50'
                    )}
                  />
                ))}
              </div>

              <p className="mt-3 font-hand text-base text-ink/60">
                {water} / 8 glasses
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={addWater}
                className="rounded-full border border-ink/20 bg-paper-50 p-2 shadow-sticker-sm transition-transform hover:scale-110"
                aria-label="add water"
              >
                <Plus className="h-4 w-4" />
              </button>

              <button
                onClick={removeWater}
                className="rounded-full border border-ink/20 bg-paper-50 p-2 shadow-sticker-sm transition-transform hover:scale-110"
                aria-label="remove water"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

          </div>
        </StickerCard>

        {/* Goal */}
        <StickerCard
          color="bg-scrap-yellow"
          rotate="right"
          tape="top"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="cutout-heading text-xl">
                Daily Goal
              </h2>

              <p className="font-hand text-lg text-ink/55">
                small wins count.
              </p>
            </div>

            <TrendingUp className="h-7 w-7" />
          </div>

          <div className="mt-5">
            <div className="flex items-end justify-between">
              <p className="cutout-heading text-4xl">
                {stepPercentage}%
              </p>

              <Badge color="bg-paper-50">
                {stepPercentage >= 100 ? 'Complete!' : 'In progress'}
              </Badge>
            </div>

            <div className="mt-3 h-5 overflow-hidden rounded-full border border-ink/20 bg-paper-50">
              <div
                className="h-full rounded-full bg-scrap-sage transition-all duration-500"
                style={{ width: `${stepPercentage}%` }}
              />
            </div>

            <p className="mt-3 font-hand text-base text-ink/55">
              {stepPercentage >= 100
                ? 'You actually did it. Respect. 🫡'
                : 'A little more movement and you are there.'}
            </p>
          </div>
        </StickerCard>
      </div>

      {/* Activity */}
      <StickerCard
        color="bg-paper-50"
        rotate="right3"
        tape="corner-tl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="cutout-heading text-xl">
              Today's Activity
            </h2>

            <p className="font-hand text-lg text-ink/55">
              where those steps came from.
            </p>
          </div>

          <Star className="h-7 w-7" />
        </div>

        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = Footprints;

            return (
              <div
                key={activity.id}
                className="paper-colored group flex items-center gap-3 rounded-rough border border-ink/15 bg-paper-50 p-3 shadow-sticker-sm transition-all hover:-translate-y-0.5 hover:shadow-paper"
              >
                <div
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-rough border border-ink/15',
                    activity.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <p className="cutout-heading text-sm">
                    {activity.title}
                  </p>

                  <p className="font-hand text-sm text-ink/50">
                    {activity.time}
                  </p>
                </div>

                <span className="text-sm font-black">
                  {activity.stepsText}
                </span>
              </div>
            );
          })}
        </div>

        <Squiggle className="mt-5 h-5 w-40 text-ink/25" />

        <p className="mt-2 font-hand text-lg text-ink/55">
          keep going. tomorrow-you will thank you.
        </p>
      </StickerCard>

    </DoodleField>
  );
}
