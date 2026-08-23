import type { ReactNode } from 'react';
import { Star, Sparkle, Squiggle, Arrow, Heart, Lightning, Spiral, Flower, DashedArrow, ZigZag, SunRays, Planet } from '@/components/Doodles';
import { cn } from '@/lib/utils';

type DoodleFieldProps = {
  children: ReactNode;
  className?: string;
  density?: 'sparse' | 'normal' | 'busy';
};

const doodles = [Star, Sparkle, Squiggle, Arrow, Heart, Lightning, Spiral, Flower, DashedArrow, ZigZag, SunRays, Planet];

const positions = [
  { top: '2%', left: '4%', size: 'h-7 w-7', rotate: 'rotate-12', anim: 'animate-float', delay: '0s' },
  { top: '8%', right: '5%', size: 'h-9 w-9', rotate: '-rotate-6', anim: 'animate-float', delay: '0.5s' },
  { bottom: '6%', left: '8%', size: 'h-10 w-10', rotate: 'rotate-6', anim: 'animate-wiggle', delay: '1s' },
  { bottom: '15%', right: '4%', size: 'h-7 w-7', rotate: '-rotate-12', anim: 'animate-float', delay: '1.5s' },
  { top: '35%', left: '2%', size: 'h-8 w-8', rotate: 'rotate-3', anim: 'animate-float', delay: '0.8s' },
  { top: '55%', right: '3%', size: 'h-8 w-8', rotate: '-rotate-3', anim: 'animate-wiggle', delay: '0.3s' },
  { bottom: '35%', left: '6%', size: 'h-6 w-6', rotate: 'rotate-12', anim: 'animate-float', delay: '2s' },
  { top: '75%', right: '8%', size: 'h-9 w-9', rotate: '-rotate-6', anim: 'animate-float', delay: '1.2s' },
];

export function DoodleField({ children, className = '', density = 'normal' }: DoodleFieldProps) {
  const count = density === 'sparse' ? 3 : density === 'busy' ? 8 : 5;

  return (
    <div className={cn('relative', className)}>
      {Array.from({ length: count }).map((_, i) => {
        const Doodle = doodles[(i * 3) % doodles.length];
        const pos = positions[i % positions.length];
        return (
          <Doodle
            key={i}
            className={cn('pointer-events-none absolute opacity-25', pos.size, pos.rotate, pos.anim)}
            style={{ animationDelay: pos.delay, ...pos }}
          />
        );
      })}
      {children}
    </div>
  );
}
