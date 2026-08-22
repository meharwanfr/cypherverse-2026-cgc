import {
  Wallet,
  Car,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  IndianRupee,
  ParkingSquare,
} from 'lucide-react';

import { StickerCard, Badge} from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import { Star, Squiggle } from '@/components/Doodles';
import { student } from '@/data/mock';
import { cn } from '@/lib/utils';

const transactions = [
  {
    id: 1,
    title: 'Campus Canteen',
    date: 'Today · 1:20 PM',
    amount: -120,
    icon: ArrowUpRight,
    color: 'bg-scrap-coral',
  },
  {
    id: 2,
    title: 'Wallet Top-up',
    date: 'Today · 10:05 AM',
    amount: 500,
    icon: ArrowDownLeft,
    color: 'bg-scrap-sage',
  },
  {
    id: 3,
    title: 'Printing Centre',
    date: 'Yesterday · 4:42 PM',
    amount: -45,
    icon: ArrowUpRight,
    color: 'bg-scrap-blue',
  },
];

export function CampusWallet() {
  return (
    <DoodleField density="normal" className="space-y-7">

      {/* Header */}
      <div className="relative">
        <div className="paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 bg-scrap-yellow shadow-paper-lg">

          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />

          <div className="relative p-7 pt-10 md:p-9 md:pt-12">
            <p className="font-hand text-2xl text-ink/60">
              your campus essentials,
            </p>

            <h1 className="cutout-heading text-4xl leading-tight md:text-5xl">
              Campus Wallet
              <span className="ml-2"></span>
            </h1>

            <p className="mt-2 font-hand text-xl text-ink/60">
              one place for your money, ID & campus rides.
            </p>
          </div>
        </div>
      </div>

      {/* Wallet + ID */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

        {/* Wallet */}
        <StickerCard
          color="bg-scrap-mint"
          className="lg:col-span-7"
          rotate="left"
          tape="corner-tr"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                <h2 className="cutout-heading text-xl">
                  Campus Wallet
                </h2>
              </div>

              <p className="mt-1 font-hand text-lg text-ink/55">
                money for the important stuff.
              </p>
            </div>

            <Badge color="bg-paper-50">
              Active
            </Badge>
          </div>

          <div className="mt-6 rounded-rough border border-ink/20 bg-paper-50 p-5 shadow-paper">
            <p className="font-hand text-lg text-ink/55">
              available balance
            </p>

            <div className="mt-1 flex items-center justify-between">
              <p className="cutout-heading text-4xl">
                ₹2,480
              </p>

              <button className="paper-colored btn-press flex items-center gap-1 rounded-rough border border-ink/20 bg-scrap-yellow px-3 py-2 text-sm font-bold shadow-sticker-sm">
                <Plus className="h-4 w-4" />
                Add money
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-dashed border-ink/20 pt-4">
              <span className="font-hand text-base text-ink/55">
                monthly spending
              </span>

              <span className="font-bold">
                ₹1,620
              </span>
            </div>
          </div>
        </StickerCard>

        {/* Student ID */}
        <StickerCard
          color="bg-scrap-pink"
          className="lg:col-span-5"
          rotate="right"
          tape="top"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <h2 className="cutout-heading text-xl">
                Campus ID
              </h2>
            </div>

            <Star className="h-6 w-6" />
          </div>

          <div className="paper-colored rounded-rough border border-ink/20 bg-paper-50 p-4 shadow-paper">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-ink/20 bg-scrap-coral cutout-heading text-xl">
                {student.initials}
              </div>

              <div>
                <p className="cutout-heading text-lg">
                  {student.name}
                </p>

                <p className="font-hand text-base text-ink/55">
                  {student.rollNo}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs font-bold uppercase text-ink/40">
                  Course
                </p>
                <p className="font-semibold">
                  {student.course}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-ink/40">
                  Semester
                </p>
                <p className="font-semibold">
                  {student.semester}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink/20 pt-3">
              <span className="font-hand text-sm text-ink/55">
                Campus access
              </span>

              <Badge color="bg-scrap-sage">
                Valid
              </Badge>
            </div>
          </div>
        </StickerCard>
      </div>

      {/* Vehicle */}
      <StickerCard
        color="bg-scrap-blue"
        rotate="right"
        tape="corner-br"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5" />

              <h2 className="cutout-heading text-xl">
                My Vehicle
              </h2>
            </div>

            <p className="mt-1 font-hand text-lg text-ink/55">
              campus parking pass
            </p>
          </div>

          <ParkingSquare className="h-6 w-6" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">

          <div className="paper-colored rounded-rough border border-ink/15 bg-paper-50 p-4 shadow-sticker-sm">
            <p className="text-xs font-black uppercase text-ink/40">
              Vehicle
            </p>

            <p className="cutout-heading mt-1 text-xl">
              Royal Enfield
            </p>

            <p className="font-hand text-sm text-ink/55">
              Meteor 350
            </p>
          </div>

          <div className="paper-colored rounded-rough border border-ink/15 bg-paper-50 p-4 shadow-sticker-sm">
            <p className="text-xs font-black uppercase text-ink/40">
              Registration
            </p>

            <p className="cutout-heading mt-1 text-xl">
              PB 02 XX 1234
            </p>
          </div>

          <div className="paper-colored rounded-rough border border-ink/15 bg-paper-50 p-4 shadow-sticker-sm">
            <p className="text-xs font-black uppercase text-ink/40">
              Parking
            </p>

            <p className="cutout-heading mt-1 text-xl">
              Slot B-17
            </p>

            <Badge color="bg-scrap-sage">
              Active
            </Badge>
          </div>

        </div>
      </StickerCard>

      {/* Transactions */}
      <StickerCard
        color="bg-paper-50"
        rotate="left"
        tape="corner-tl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="cutout-heading text-xl">
              Recent Transactions
            </h2>

            <p className="font-hand text-lg text-ink/55">
              where did the money go?
            </p>
          </div>

          <IndianRupee className="h-6 w-6" />
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            const positive = transaction.amount > 0;

            return (
              <div
                key={transaction.id}
                className="paper-colored flex items-center gap-3 rounded-rough border border-ink/15 bg-paper-50 p-3 shadow-sticker-sm"
              >
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full border border-ink/15',
                    transaction.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <p className="cutout-heading text-sm">
                    {transaction.title}
                  </p>

                  <p className="font-hand text-sm text-ink/50">
                    {transaction.date}
                  </p>
                </div>

                <p
                  className={cn(
                    'font-bold',
                    positive
                      ? 'text-scrap-sageDeep'
                      : 'text-scrap-coralDeep'
                  )}
                >
                  {positive ? '+' : '-'}₹
                  {Math.abs(transaction.amount)}
                </p>
              </div>
            );
          })}
        </div>

        <Squiggle className="mt-5 h-5 w-40 text-ink/25" />
      </StickerCard>

    </DoodleField>
  );
}