import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Rocket,
  IdCard,
  WalletCards,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Star, Squiggle, Sparkle, PaperClip } from '@/components/Doodles';
import { student } from '@/data/mock';

export type Page =
  | 'dashboard'
  | 'resources'
  | 'attendance'
  | 'opportunities'
  | 'profile'
  | 'wallet'
  | 'health';

type NavItem = {
  id: Page;
  label: string;
  icon: typeof LayoutDashboard;
  color: string;
  rotate: string;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'bg-scrap-yellow', rotate: 'rotate-tilt-l' },
  { id: 'resources', label: 'Study Stuff', icon: BookOpen, color: 'bg-scrap-blue', rotate: 'rotate-tilt-r' },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck, color: 'bg-scrap-sage', rotate: 'rotate-tilt-l' },
  { id: 'opportunities', label: 'Opportunities', icon: Rocket, color: 'bg-scrap-coral', rotate: 'rotate-tilt-r' },
  { id: 'wallet', label: 'Campus Wallet', icon: WalletCards, color: 'bg-scrap-yellow', rotate: 'rotate-tilt-r' },
  { id: 'profile', label: 'My Card', icon: IdCard, color: 'bg-scrap-pink', rotate: 'rotate-tilt-l' },
];

type SidebarProps = {
  page: Page;
  setPage: (p: Page) => void;
};

export function Sidebar({ page, setPage }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="paper-colored btn-press fixed left-4 top-4 z-50 rounded-rough border border-ink/25 bg-scrap-yellow p-2 shadow-paper md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px] md:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={cn(
          'paper fixed left-0 top-0 z-50 h-screen w-72 overflow-y-auto rounded-r-rough rounded-l-none border-r border-y-0 border-l-0 border-ink/25 p-5 transition-transform duration-300 scrollbar-hide',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 rounded-lg p-1 transition-colors hover:bg-ink/10 md:hidden"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Logo — paper piece with tape */}
        <div className="relative mb-6">
          <div className="tape-piece absolute left-1/2 -top-2 h-5 w-16 -translate-x-1/2 -rotate-3" />
          <div className="paper-colored flex items-center gap-2 rounded-rough border border-ink/20 bg-scrap-cream p-3 shadow-paper">
            <div className="group relative">
              <div className="paper-colored flex h-11 w-11 items-center justify-center rounded-rough border border-ink/25 bg-scrap-yellow shadow-sticker-sm transition-transform duration-200 group-hover:rotate-12">
                <span className="cutout-heading text-xl">C</span>
              </div>
              <Star className="absolute -right-2 -top-2 h-5 w-5 animate-float transition-transform duration-300 group-hover:scale-125" />
            </div>
            <div>
              <h1 className="cutout-heading text-xl leading-none">CampusHub</h1>
              <p className="font-hand text-base text-ink/60">your college survival buddy</p>
            </div>
          </div>
        </div>

        <Squiggle className="mb-5 h-5 w-full text-ink/30" />

        {/* Nav — paper tabs with handwritten labels */}
        <nav className="flex flex-col gap-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setOpen(false);
                }}
                className={cn(
                  'paper-colored group relative flex items-center gap-3 rounded-rough border px-4 py-3 text-left transition-all duration-200',
                  active
                    ? `${item.color} border-ink/30 shadow-paper-lg -translate-x-1`
                    : 'border-ink/15 bg-paper-50 shadow-sticker-sm hover:-translate-x-0.5 hover:shadow-paper',
                  !active && item.rotate
                )}
              >
                {/* Tape on active tab */}
                {active && (
                  <div className="tape-piece absolute -top-1.5 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3" />
                )}
                <Icon className={cn('h-5 w-5 shrink-0 transition-transform duration-300', active ? 'animate-wiggle' : 'group-hover:scale-110')} />
                <span className="cutout-heading text-base">{item.label}</span>
                {active && (
                  <span className="ml-auto font-hand text-xl leading-none animate-slide-in">←</span>
                )}
                <Sparkle className={cn(
                  'absolute -right-1 -top-1 h-4 w-4 transition-opacity duration-200',
                  active ? 'opacity-50' : 'opacity-0 group-hover:opacity-40'
                )} />
              </button>
            );
          })}
        </nav>

        {/* Profile mini-card — pinned note */}
        <div className="absolute bottom-5 left-5 right-5">
          <button
            onClick={() => setPage('profile')}
            className="paper-colored group relative w-full rounded-rough border border-ink/20 bg-paper-50 p-4 pt-7 text-center shadow-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-paper-lg"
          >
            {/* Tape */}
            <div className="tape-piece absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3" />
            {/* Paper clip */}
            <PaperClip className="absolute -left-1 top-2 h-8 w-6 opacity-50" />
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 bg-scrap-coral cutout-heading text-base transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {student.initials}
            </div>
            <p className="cutout-heading text-sm">{student.name}</p>
            <p className="font-hand text-base text-ink/60">{student.rollNo}</p>
          </button>
        </div>
      </aside>
    </>
  );
}
