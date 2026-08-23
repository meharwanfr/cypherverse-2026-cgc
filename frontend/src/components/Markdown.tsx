import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { cn } from '@/lib/utils';

/**
 * Scrapbook-themed markdown renderer for AI chat responses.
 * Maps markdown elements to the app's paper/sticker aesthetic:
 * headings use the cutout display font, body keeps the handwritten
 * Caveat style, code gets notebook-paper blocks, etc.
 */

const components: Components = {
  h1: ({ children }) => (
    <h1 className="cutout-heading mt-4 mb-2 text-xl leading-snug first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="cutout-heading mt-4 mb-2 text-lg leading-snug first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="cutout-heading mt-3 mb-1.5 text-base leading-snug first:mt-0">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="cutout-heading mt-3 mb-1.5 text-sm leading-snug first:mt-0">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="my-1.5 font-hand text-2xl font-bold leading-snug first:mt-0 last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-extrabold text-scrap-lavenderDeep" style={{ textShadow: '0.5px 0.5px 0 rgba(42,37,32,0.25)' }}>{children}</strong>
  ),
  em: ({ children }) => <em className="font-semibold italic">{children}</em>,
  del: ({ children }) => <del className="text-ink/50 line-through decoration-2">{children}</del>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-scrap-lavenderDeep underline decoration-wavy decoration-from-font underline-offset-4 transition-colors hover:text-ink"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-1.5 list-disc space-y-0.5 pl-6 marker:text-scrap-lavenderDeep first:mt-0 last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-1.5 list-decimal space-y-0.5 pl-6 marker:font-bold marker:text-scrap-lavenderDeep first:mt-0 last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 font-hand text-2xl font-bold leading-snug marker:font-hand">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-4 border-dashed border-scrap-lavenderDeep/60 pl-3 font-hand text-2xl font-bold italic text-ink/70">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-t-2 border-dashed border-ink/20" />,
  code: ({ className, children, ...rest }) => {
    const isBlock = /language-/.test(className || '');
    if (isBlock) {
      return (
        <code className={cn('block overflow-x-auto p-0 font-mono text-sm', className)} {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded border border-ink/15 bg-paper-200 px-1.5 py-0.5 font-mono text-[0.85em] font-bold"
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="notebook-paper my-2 overflow-x-auto rounded-rough border border-ink/20 p-3 shadow-sticker-sm first:mt-0 last:mb-0">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto rounded-rough border border-ink/20 shadow-sticker-sm">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-scrap-lavender/60">{children}</thead>,
  th: ({ children }) => (
    <th className="cutout-heading border-b border-ink/20 px-2.5 py-1.5 text-xs uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-dashed border-ink/10 px-2.5 py-1.5 font-hand text-xl font-bold align-top last:border-b-0 [&>p]:my-0">
      {children}
    </td>
  ),
};

type MarkdownProps = {
  content: string;
  className?: string;
};

function MarkdownContentImpl({ content, className }: MarkdownProps) {
  return (
    <div className={cn('text-ink', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export const Markdown = memo(MarkdownContentImpl);
