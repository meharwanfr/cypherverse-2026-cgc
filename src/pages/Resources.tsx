import { useEffect, useState } from 'react';
import {
  Search,
  Download,
  Filter,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import {
  StickerCard,
  Badge,
  SectionHeading,
  StickerButton,
} from '@/components/Sticker';
import { DoodleField } from '@/components/DoodleField';
import {
  Squiggle,
  ZigZag,
  SunRays,
  PaperClip,
} from '@/components/Doodles';
import {
  resources as initialResources,
  resourceTypes,
  type Resource,
} from '@/data/mock';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'campushub-resources';

const typeMeta: Record<
  Resource['type'],
  {
    color: string;
    bg: string;
    emoji: string;
    blurb: string;
  }
> = {
  Notes: {
    color: 'bg-scrap-blue',
    bg: 'bg-scrap-blue/30',
    emoji: '📝',
    blurb: 'handwritten & typed',
  },
  Book: {
    color: 'bg-scrap-coral',
    bg: 'bg-scrap-coral/30',
    emoji: '📘',
    blurb: 'physical & library',
  },
  'E-book': {
    color: 'bg-scrap-pink',
    bg: 'bg-scrap-pink/30',
    emoji: '💾',
    blurb: 'downloadable PDFs',
  },
  PYQ: {
    color: 'bg-scrap-lavender',
    bg: 'bg-scrap-lavender/30',
    emoji: '📜',
    blurb: 'previous year papers',
  },
  'Subject Resource': {
    color: 'bg-scrap-sage',
    bg: 'bg-scrap-sage/30',
    emoji: '🗂️',
    blurb: 'slides & extras',
  },
};

export function Resources() {
  const [resourceList, setResourceList] =
    useState<Resource[]>(initialResources);

  const [query, setQuery] = useState('');
  const [activeType, setActiveType] =
    useState<Resource['type'] | 'All'>('All');

  const [bookmarked, setBookmarked] =
    useState<Set<string>>(new Set());

  const [showAddForm, setShowAddForm] = useState(false);

  const [newResource, setNewResource] = useState({
    title: '',
    subject: '',
    author: '',
    type: 'Notes' as Resource['type'],
    pages: '',
  });

  /*
   * Load saved resources
   */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed: Resource[] = JSON.parse(saved);
      setResourceList(parsed);
    } catch {
      console.warn('Could not load saved resources.');
    }
  }, []);

  /*
   * Save resources whenever they change
   */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(resourceList)
    );
  }, [resourceList]);

  const filtered = resourceList.filter((resource) => {
    const search = query.toLowerCase();

    const matchesSearch =
      resource.title.toLowerCase().includes(search) ||
      resource.subject.toLowerCase().includes(search) ||
      resource.author.toLowerCase().includes(search);

    const matchesType =
      activeType === 'All' ||
      resource.type === activeType;

    return matchesSearch && matchesType;
  });

  function toggleBookmark(id: string) {
    setBookmarked((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  function deleteResource(id: string) {
    const confirmed = window.confirm(
      'Delete this resource?'
    );

    if (!confirmed) {
      return;
    }

    setResourceList((previous) =>
      previous.filter((resource) => resource.id !== id)
    );

    setBookmarked((previous) => {
      const next = new Set(previous);
      next.delete(id);
      return next;
    });
  }

  function addResource() {
    const title = newResource.title.trim();
    const subject = newResource.subject.trim();
    const author = newResource.author.trim();

    if (!title || !subject || !author) {
      alert('Please fill in the title, subject and author.');
      return;
    }

    const resource: Resource = {
      id: `custom-${Date.now()}`,
      title,
      type: newResource.type,
      subject,
      author,
      pages: Number(newResource.pages) || 1,
      color: typeMeta[newResource.type].color,
      emoji: typeMeta[newResource.type].emoji,
      isNew: true,
    };

    setResourceList((previous) => [
      resource,
      ...previous,
    ]);

    setNewResource({
      title: '',
      subject: '',
      author: '',
      type: 'Notes',
      pages: '',
    });

    setShowAddForm(false);
  }

  function openResource(resource: Resource) {
    alert(
      `No link is attached to "${resource.title}" yet.`
    );
  }

  return (
    <DoodleField density="normal" className="space-y-7">
      {/* Header */}
      <div className="relative">
        <div className="paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 bg-scrap-blue shadow-paper-lg">
          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />

          <SunRays className="absolute right-6 top-8 h-12 w-12 animate-spin-slow opacity-25" />

          <ZigZag className="absolute bottom-2 left-4 h-4 w-28 opacity-25" />

          <div className="relative p-7 pt-10 md:p-9 md:pt-12">
            <p className="font-hand text-2xl text-ink/65">
              study resources
            </p>

            <h1 className="cutout-heading text-4xl leading-tight md:text-5xl">
              the stuff you probably should&apos;ve opened yesterday
            </h1>

            <Squiggle className="mt-2 h-6 w-56 text-ink/35" />
          </div>
        </div>
      </div>

      {/* Search + Add */}
      <StickerCard
        color="bg-paper-50"
        className="p-5"
        tape="top"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="group relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40 transition-transform duration-300 group-hover:scale-110" />

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="search notes, books, papers..."
                className="w-full rounded-rough border border-ink/25 bg-paper-100 py-3 pl-12 pr-4 font-sans text-base outline-none transition-all duration-200 focus:bg-paper-50 focus:shadow-paper-sm"
              />
            </div>

            <StickerButton
              onClick={() => setShowAddForm(true)}
              color="bg-scrap-yellow"
              className="shrink-0"
            >
              <Plus className="h-4 w-4" />
              add resource
            </StickerButton>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-hand text-lg text-ink/55">
              <Filter className="h-4 w-4" />
              filter:
            </span>

            {(['All', ...resourceTypes] as const).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    'paper-colored btn-press rounded-full border border-ink/20 px-4 py-1.5 text-sm font-bold transition-all duration-200',
                    activeType === type
                      ? 'bg-ink text-paper-50 shadow-sticker-sm'
                      : 'bg-paper-50 hover:-translate-y-0.5 hover:shadow-sticker-sm'
                  )}
                >
                  {type === 'All'
                    ? '✨ all'
                    : `${typeMeta[type].emoji} ${type}`}
                </button>
              )
            )}
          </div>
        </div>
      </StickerCard>

      {/* Add resource form */}
      {showAddForm && (
        <StickerCard
          color="bg-scrap-yellow"
          rotate="left"
          tape="corner-tr"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="cutout-heading text-xl">
                Add a resource
              </h2>

              <p className="font-hand text-lg text-ink/55">
                give future-you something useful
              </p>
            </div>

            <button
              onClick={() => setShowAddForm(false)}
              className="rounded-full p-2 transition-transform hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              value={newResource.title}
              onChange={(event) =>
                setNewResource((previous) => ({
                  ...previous,
                  title: event.target.value,
                }))
              }
              placeholder="Resource title"
              className="rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />

            <input
              value={newResource.subject}
              onChange={(event) =>
                setNewResource((previous) => ({
                  ...previous,
                  subject: event.target.value,
                }))
              }
              placeholder="Subject"
              className="rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />

            <input
              value={newResource.author}
              onChange={(event) =>
                setNewResource((previous) => ({
                  ...previous,
                  author: event.target.value,
                }))
              }
              placeholder="Author / uploaded by"
              className="rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />

            <select
              value={newResource.type}
              onChange={(event) =>
                setNewResource((previous) => ({
                  ...previous,
                  type: event.target.value as Resource['type'],
                }))
              }
              className="rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none"
            >
              {resourceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={newResource.pages}
              onChange={(event) =>
                setNewResource((previous) => ({
                  ...previous,
                  pages: event.target.value,
                }))
              }
              placeholder="Number of pages"
              className="rounded-rough border border-ink/25 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm"
            />
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <StickerButton
              onClick={() => setShowAddForm(false)}
              color="bg-paper-50"
            >
              cancel
            </StickerButton>

            <StickerButton
              onClick={addResource}
              color="bg-scrap-sage"
              rotate="rotate-tilt-r"
            >
              <Plus className="h-4 w-4" />
              add it
            </StickerButton>
          </div>
        </StickerCard>
      )}

      {/* Type cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {resourceTypes.map((type, index) => {
          const meta = typeMeta[type];

          const count = resourceList.filter(
            (resource) => resource.type === type
          ).length;

          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                'paper-colored btn-press group relative rounded-rough border border-ink/20 p-4 text-left transition-all shadow-paper',
                meta.bg,
                activeType === type
                  ? 'shadow-paper-lg -translate-y-0.5'
                  : index % 2 === 0
                    ? 'rotate-tilt-l'
                    : 'rotate-tilt-r'
              )}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                {meta.emoji}
              </span>

              <p className="mt-2 cutout-heading text-base leading-tight">
                {type}
              </p>

              <p className="font-hand text-sm text-ink/55">
                {meta.blurb}
              </p>

              <p className="mt-1 text-xs font-bold tabular-nums">
                {count} items
              </p>
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div>
        <SectionHeading
          title="All Resources"
          subtitle={`${filtered.length} found`}
          color="bg-scrap-yellow"
        />

        {filtered.length === 0 ? (
          <StickerCard
            color="bg-paper-100"
            className="py-16 text-center"
          >
            <p className="font-hand text-3xl text-ink/45">
              nothing here. maybe add something? 👀
            </p>
          </StickerCard>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource, index) => {
              const meta = typeMeta[resource.type];
              const isBookmarked = bookmarked.has(
                resource.id
              );

              return (
                <div
                  key={resource.id}
                  className={cn(
                    'paper-colored paper-hover group relative flex flex-col rounded-rough border border-ink/20 bg-paper-50 p-4 shadow-paper',
                    index % 3 === 0
                      ? 'rotate-tilt-l'
                      : index % 3 === 1
                        ? 'rotate-tilt-r'
                        : 'rotate-tilt-3l'
                  )}
                >
                  <PaperClip className="absolute -right-1 top-2 h-8 w-6 opacity-40" />

                  <div className="mb-3 flex items-start justify-between">
                    <div
                      className={cn(
                        'paper-colored flex h-14 w-14 items-center justify-center rounded-rough border border-ink/20 text-3xl shadow-sticker-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6',
                        meta.color
                      )}
                    >
                      {resource.emoji}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <Badge color={meta.color}>
                        {resource.type}
                      </Badge>

                      {resource.isNew && (
                        <span className="paper-colored rounded-full border border-ink/25 bg-scrap-coral px-2 py-0.5 text-[10px] font-black uppercase">
                          new!
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="cutout-heading text-base leading-tight">
                    {resource.title}
                  </p>

                  <p className="mt-1 font-hand text-base text-ink/55">
                    {resource.subject}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-ink/50">
                    <span>by {resource.author}</span>
                    <span>·</span>
                    <span>{resource.pages}p</span>

                    {resource.year && (
                      <>
                        <span>·</span>
                        <span>{resource.year}</span>
                      </>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openResource(resource)}
                      className="paper-colored btn-press flex flex-1 items-center justify-center gap-1 rounded-rough border border-ink/20 bg-scrap-yellow py-2 text-sm font-bold shadow-sticker-sm"
                    >
                      <Download className="h-4 w-4" />
                      open
                    </button>

                    <button
                      onClick={() =>
                        toggleBookmark(resource.id)
                      }
                      className={cn(
                        'paper-colored btn-press rounded-rough border border-ink/20 p-2 transition-all shadow-sticker-sm',
                        isBookmarked
                          ? 'bg-scrap-coral'
                          : 'bg-paper-50'
                      )}
                      aria-label="bookmark"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={cn(
                          'h-4 w-4',
                          isBookmarked &&
                            'animate-bookmark-pop'
                        )}
                        fill={
                          isBookmarked
                            ? '#2a2520'
                            : 'none'
                        }
                        stroke="#2a2520"
                        strokeWidth="2"
                      >
                        <path
                          d="M6 4h12v16l-6-4-6 4z"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {resource.id.startsWith('custom-') && (
                      <button
                        onClick={() =>
                          deleteResource(resource.id)
                        }
                        className="paper-colored btn-press rounded-rough border border-ink/20 bg-scrap-coral p-2 shadow-sticker-sm"
                        aria-label="delete resource"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DoodleField>
  );
}