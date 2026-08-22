import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StickerCardProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  rotate?: 'none' | 'left' | 'right' | 'left3' | 'right3' | 'left5' | 'right5';
  hover?: boolean;
  onClick?: () => void;
  tape?: 'none' | 'top' | 'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br';
  notebook?: boolean;
};

const rotateMap = {
  none: '',
  left: 'rotate-tilt-l',
  right: 'rotate-tilt-r',
  left3: 'rotate-tilt-3l',
  right3: 'rotate-tilt-3r',
  left5: 'rotate-tilt-5l',
  right5: 'rotate-tilt-5r',
};

function TapePiece({ position }: { position: NonNullable<StickerCardProps['tape']> }) {
  const positions: Record<string, string> = {
    'top': 'left-1/2 -top-2.5 -translate-x-1/2 -rotate-2 h-6 w-20',
    'corner-tl': '-left-3 -top-3 -rotate-12 h-5 w-12',
    'corner-tr': '-right-3 -top-3 rotate-12 h-5 w-12',
    'corner-bl': '-left-3 -bottom-3 rotate-12 h-5 w-12',
    'corner-br': '-right-3 -bottom-3 -rotate-12 h-5 w-12',
  };
  return (
    <div
      className={cn('tape-piece z-10', positions[position])}
      aria-hidden
    />
  );
}

export function StickerCard({
  children,
  className = '',
  color = '',
  rotate = 'none',
  hover = true,
  onClick,
  tape = 'none',
  notebook = false,
}: StickerCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'paper relative rounded-rough p-5',
        notebook ? 'notebook-paper' : color && 'paper-colored',
        color,
        rotateMap[rotate],
        hover && 'paper-hover cursor-default',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {tape !== 'none' && <TapePiece position={tape} />}
      {children}
    </div>
  );
}

type BadgeProps = {
  children: ReactNode;
  color?: string;
  textColor?: string;
  className?: string;
};

export function Badge({
  children,
  color = 'bg-scrap-yellow',
  textColor = 'text-ink',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'paper-colored inline-flex items-center gap-1 rounded-full border border-ink/30 px-3 py-0.5 text-xs font-bold uppercase tracking-wide shadow-sticker-sm transition-transform duration-200 hover:scale-105',
        color,
        textColor,
        className
      )}
    >
      {children}
    </span>
  );
}

type ProgressBarProps = {
  value: number;
  color?: string;
  className?: string;
  showLabel?: boolean;
  animated?: boolean;
};

export function ProgressBar({
  value,
  color = 'bg-scrap-sage',
  className = '',
  showLabel = true,
  animated = true,
}: ProgressBarProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative h-4 flex-1 overflow-hidden rounded-full border border-ink/25 bg-paper-50">
        <div
          className={cn('paper-colored h-full rounded-full transition-all duration-1000 ease-out', animated && 'transition-all duration-1000 ease-out', color)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="cutout-heading text-sm tabular-nums">{Math.round(value)}%</span>
      )}
    </div>
  );
}

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
  color?: string;
};

export function SectionHeading({ title, subtitle, className = '', color = 'bg-scrap-yellow' }: SectionHeadingProps) {
  return (
    <div className={cn('mb-5', className)}>
      <div className="relative inline-block">
        {/* Torn paper strip heading with handwritten marker font */}
        <h2 className={cn(
          'paper-colored cutout-heading torn-strip relative inline-block px-5 py-1.5 text-xl md:text-2xl',
          color
        )}>
          {title}
        </h2>
      </div>
      {subtitle && <p className="mt-2 font-hand text-xl text-ink/65">{subtitle}</p>}
    </div>
  );
}

type StickerButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  color?: string;
  className?: string;
  rotate?: string;
};

export function StickerButton({
  children,
  onClick,
  color = 'bg-scrap-yellow',
  className = '',
  rotate = '',
}: StickerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'paper-colored btn-press cutout-heading inline-flex items-center justify-center gap-1.5 rounded-rough border border-ink/25 px-4 py-2 shadow-paper',
        color,
        rotate,
        className
      )}
    >
      {children}
    </button>
  );
}
