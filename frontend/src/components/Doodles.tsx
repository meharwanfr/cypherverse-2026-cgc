import type { SVGProps } from 'react';

type DoodleProps = SVGProps<SVGSVGElement> & { className?: string };

export function Star({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...props}>
      <path className="doodle-stroke" d="M24 4l5.5 13.5L43 19l-10 9 3 14.5L24 34l-12 8.5 3-14.5-10-9 13.5-1.5z" fill="#f4d35e" />
    </svg>
  );
}

export function Sparkle({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...props}>
      <path className="doodle-stroke" d="M24 4v40M4 24h40M10 10l28 28M38 10L10 38" fill="none" />
    </svg>
  );
}

export function Squiggle({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 40" className={className} {...props}>
      <path className="doodle-stroke" d="M4 20c8-14 16 14 24 0s16 14 24 0 16 14 24 0 16 14 24 0 16 14 24 0" fill="none" />
    </svg>
  );
}

export function Arrow({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 60" className={className} {...props}>
      <path className="doodle-stroke" d="M6 30c20-18 50-18 66 4M56 8c4 12 6 20 16 24-10 4-14 10-18 22" fill="none" />
    </svg>
  );
}

export function Circle({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...props}>
      <path className="doodle-stroke" d="M50 8c28 0 42 16 42 42S72 92 50 92 8 76 8 50 22 8 50 8z" fill="none" />
    </svg>
  );
}

export function Underline({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 20" className={className} preserveAspectRatio="none" {...props}>
      <path className="doodle-stroke" d="M4 12c40-8 90-8 120-2 30 6 50 4 72-4" fill="none" />
    </svg>
  );
}

export function Heart({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 44" className={className} {...props}>
      <path className="doodle-stroke" d="M24 40S6 28 6 16C6 9 11 4 17 4c4 0 7 2 7 6 0-4 3-6 7-6 6 0 11 5 11 12 0 12-18 24-18 24z" fill="#f7c6d3" />
    </svg>
  );
}

export function Cloud({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 60" className={className} {...props}>
      <path className="doodle-stroke" d="M22 50c-10 0-16-6-16-14s6-14 14-14c2-8 10-14 18-14s16 6 18 14c8 0 14 6 14 14s-6 14-14 14z" fill="#faf5ea" />
    </svg>
  );
}

export function Lightning({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 56" className={className} {...props}>
      <path className="doodle-stroke" d="M28 4L10 32h14l-4 20 20-30H26z" fill="#f4d35e" />
    </svg>
  );
}

export function Spiral({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...props}>
      <path className="doodle-stroke" d="M30 30c0-6 6-8 10-4s2 12-6 12-14-6-14-16 12-18 22-18 20 10 20 22" fill="none" />
    </svg>
  );
}

export function Flower({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...props}>
      <g className="doodle-stroke" fill="#f7c6d3">
        <circle cx="30" cy="14" r="9" />
        <circle cx="46" cy="30" r="9" />
        <circle cx="30" cy="46" r="9" />
        <circle cx="14" cy="30" r="9" />
      </g>
      <circle cx="30" cy="30" r="6" fill="#f4d35e" className="doodle-stroke" />
    </svg>
  );
}

export function Smiley({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...props}>
      <circle cx="24" cy="24" r="20" fill="#c5d9bf" className="doodle-stroke" />
      <circle cx="17" cy="20" r="2" fill="#2a2520" />
      <circle cx="31" cy="20" r="2" fill="#2a2520" />
      <path d="M15 29c4 6 14 6 18 0" fill="none" stroke="#2a2520" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function WorriedFace({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...props}>
      <circle cx="24" cy="24" r="20" fill="#f4b8a8" className="doodle-stroke" />
      <circle cx="17" cy="20" r="2" fill="#2a2520" />
      <circle cx="31" cy="20" r="2" fill="#2a2520" />
      <path d="M16 33c3-4 13-4 16 0" fill="none" stroke="#2a2520" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function RunningDoodle({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 100" className={className} {...props}>
      <g className="doodle-stroke" fill="none">
        <circle cx="30" cy="24" r="10" fill="#f4d35e" />
        <path d="M30 34v28M30 62l-14 22M30 62l14 20M30 46l-18-8M30 46l20-6" />
        <path d="M70 86l8-4M82 80l8 6" stroke="#e89888" strokeWidth="3" />
        <path d="M88 50c6 0 10 4 10 10" stroke="#2a2520" strokeWidth="2" strokeDasharray="3 3" />
      </g>
    </svg>
  );
}

export function Bookmark({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 32" className={className} {...props}>
      <path className="doodle-stroke" d="M4 4h16v24l-8-6-8 6z" fill="#f4d989" />
    </svg>
  );
}

export function DashedArrow({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 40" className={className} {...props}>
      <path className="doodle-stroke" d="M6 20h80M70 8l16 12-16 12" fill="none" strokeDasharray="5 5" />
    </svg>
  );
}

export function Tape({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 24" className={className} {...props}>
      <rect x="2" y="2" width="76" height="20" fill="#fff3c8" opacity="0.75" />
      <line x1="2" y1="2" x2="78" y2="2" stroke="#2a2520" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      <line x1="2" y1="22" x2="78" y2="22" stroke="#2a2520" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
    </svg>
  );
}

export function ZigZag({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 30" className={className} preserveAspectRatio="none" {...props}>
      <path className="doodle-stroke" d="M4 15l10-10 10 20 10-20 10 20 10-20 10 20 10-20 10 20 10-20 10 20 10-10" fill="none" />
    </svg>
  );
}

export function SunRays({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...props}>
      <g className="doodle-stroke" fill="none">
        <circle cx="40" cy="40" r="14" fill="#f4d35e" />
        <path d="M40 4v12M40 64v12M4 40h12M64 40h12M14 14l8 8M58 58l8 8M66 14l-8 8M22 58l-8 8" />
      </g>
    </svg>
  );
}

export function Coffee({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...props}>
      <g className="doodle-stroke" fill="none">
        <path d="M10 18h24v12a8 8 0 01-8 8H18a8 8 0 01-8-8z" fill="#f4b8a8" />
        <path d="M34 22h6a4 4 0 010 8h-6" />
        <path d="M16 8c0 4-2 4-2 8M24 8c0 4-2 4-2 8" stroke="#2a2520" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function Planet({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 48" className={className} {...props}>
      <g className="doodle-stroke" fill="none">
        <ellipse cx="32" cy="24" rx="28" ry="6" />
        <circle cx="32" cy="24" r="14" fill="#b8d4e8" />
      </g>
    </svg>
  );
}

export function Checkmark({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...props}>
      <path className="doodle-stroke" d="M8 24l10 10 22-22" fill="none" />
    </svg>
  );
}

// New paper-craft doodles
export function PaperClip({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 60" className={className} {...props}>
      <path className="doodle-stroke" d="M12 8v40a8 8 0 0016 0V16a5 5 0 00-10 0v32a3 3 0 006 0V20" fill="none" stroke="#8a8580" strokeWidth="3" />
    </svg>
  );
}

export function Pin({ className = '', ...props }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 32" className={className} {...props}>
      <circle cx="12" cy="8" r="7" fill="#e89888" className="doodle-stroke" />
      <path d="M12 15v14" className="doodle-stroke" />
      <circle cx="9" cy="6" r="1.5" fill="#2a2520" />
      <circle cx="15" cy="6" r="1.5" fill="#2a2520" />
    </svg>
  );
}
