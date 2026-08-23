import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Trash2, LoaderCircle } from 'lucide-react';
import { DoodleField } from '@/components/DoodleField';
import { StickerCard, SectionHeading, StickerButton } from '@/components/Sticker';
import { api, type ChatMessage } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { cn } from '@/lib/utils';

export function Chatbot() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hey! I'm CampusBuddy 🤖 — your AI campus companion. I know your schedule, deadlines, attendance, wallet, health stats, and opportunities. What do you need help with?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, questionOverride?: string) => {
    e?.preventDefault();
    const question = questionOverride ?? input;
    if (!question.trim() || loading) return;

    const userMessage = question.trim();
    // Derive history synchronously from current state BEFORE updating it.
    // (Doing this inside a setMessages updater is unreliable - React defers
    // updater execution, so the fetch would receive stale/empty history.)
    // Last 12 messages = previous 6 user+assistant exchanges for context.
    const history = messages.slice(-12).map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, { role: 'user', content: userMessage, timestamp: Date.now() }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.chatbot.send(userMessage, history);
      setMessages((prev) => [...prev, { role: 'assistant', content: res.response, timestamp: Date.now() }]);
    } catch (err) {
      console.error('[Chatbot] Failed:', err);
      setMessages((prev) => [...prev, { role: 'assistant', content: "Oops! Something went wrong. Is the backend running? Check console for details.", timestamp: Date.now() }]);
      toast('Failed to get response', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      { role: 'assistant', content: "Chat cleared! How can I help you now?", timestamp: Date.now() }
    ]);
    setShowClearConfirm(false);
  };

  return (
    <DoodleField density="normal" className="space-y-7">
      {/* Header */}
      <div className="relative">
        <div className="paper-colored torn-bottom relative overflow-hidden rounded-rough border border-ink/25 bg-scrap-lavender shadow-paper-lg">
          <div className="tape-piece absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 -rotate-2" />
          <Sparkles className="absolute right-8 top-7 h-14 w-14 opacity-25 animate-spin-slow" />

          <div className="relative p-7 pt-10 md:p-9 md:pt-12">
            <p className="font-hand text-2xl text-ink/60">your campus ai buddy,</p>
            <h1 className="cutout-heading text-4xl leading-tight md:text-5xl">
              CampusBuddy
              <span className="ml-2 animate-float">🤖</span>
            </h1>
            <p className="mt-2 font-hand text-xl text-ink/60">knows your stats. just ask.</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <StickerCard color="bg-paper-50" className="h-[60vh] md:h-[70vh] flex flex-col" rotate="none" tape="corner-tl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-scrap-lavenderDeep" />
            <h2 className="cutout-heading text-xl">Conversation</h2>
          </div>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="rounded-full border border-ink/20 bg-paper-50 p-2 shadow-sticker-sm transition-transform hover:scale-110 hover:bg-scrap-coral/30"
            aria-label="clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4" style={{ scrollBehavior: 'smooth' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                'flex gap-3 animate-slide-up',
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20',
                  msg.role === 'user' ? 'bg-scrap-yellow' : 'bg-scrap-lavender'
                )}
              >
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={cn(
                  'max-w-[80%] paper-colored rounded-rough border border-ink/15 p-3 shadow-sticker-sm',
                  msg.role === 'user'
                    ? 'bg-scrap-yellow border-scrap-yellowDeep/40'
                    : 'bg-paper-50'
                )}
              >
                <p className="font-hand text-2xl font-bold leading-snug text-ink whitespace-pre-wrap">{msg.content}</p>
                <p className="mt-1 text-[11px] font-semibold text-ink/40 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 animate-slide-up">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-scrap-lavender">
                <Bot className="h-4 w-4" />
              </div>
              <div className="paper-colored flex items-center gap-1.5 rounded-rough border border-ink/15 px-4 py-3 shadow-sticker-sm bg-paper-50">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="h-2 w-2 rounded-full bg-scrap-lavenderDeep animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-dashed border-ink/20 pt-4">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ask about attendance, deadlines, wallet, health, opportunities..."
              className="flex-1 rounded-rough border border-ink/20 bg-paper-50 px-4 py-3 outline-none focus:shadow-paper-sm font-hand text-xl font-semibold text-ink placeholder:text-ink/40"
              disabled={loading}
              aria-label="chat input"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="paper-colored btn-press flex items-center justify-center rounded-rough border border-ink/20 bg-scrap-lavender px-5 py-3 shadow-sticker-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="send message"
            >
              <LoaderCircle
                className={cn('h-5 w-5 animate-spin', loading ? 'opacity-100' : 'hidden')}
              />
              <Send className={cn('h-5 w-5', loading ? 'hidden' : 'opacity-100')} />
            </button>
          </form>

          <p className="mt-2 font-hand text-xs text-center text-ink/50">
            try: "what's my attendance?" · "upcoming deadlines?" · "how much money left?" · "should i study or sleep?"
          </p>
        </div>
      </StickerCard>

      {/* Quick Actions */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <SectionHeading title="Quick Questions" subtitle="tap to ask instantly" color="bg-scrap-blue" className="mb-0" />
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "My attendance?", q: "What's my overall attendance and which subjects are below 75%?" },
            { label: "Upcoming deadlines", q: "What are my upcoming deadlines this week?" },
            { label: "Wallet balance", q: "How much money do I have in my wallet and what did I spend recently?" },
            { label: "Health check", q: "How am I doing on steps, water, and sleep?" },
            { label: "Best opportunities", q: "Which opportunities should I apply to this month?" },
            { label: "Study priority", q: "Based on my attendance and deadlines, what should I focus on today?" },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(undefined, item.q)}
              disabled={loading}
              className={cn(
                'paper-colored btn-press rounded-rough border border-ink/20 bg-paper-50 px-4 py-2.5 text-sm font-bold shadow-sticker-sm transition-all disabled:opacity-50',
                idx % 3 === 0 && 'rotate-tilt-l',
                idx % 3 === 1 && 'rotate-tilt-r',
                idx % 3 === 2 && 'rotate-tilt-3l'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Confirm Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={() => setShowClearConfirm(false)}>
          <div className="paper-colored relative max-w-sm rounded-rough border border-ink/25 bg-paper-50 p-6 shadow-paper-lg" onClick={(e) => e.stopPropagation()}>
            <h3 className="cutout-heading text-xl mb-2">Clear conversation?</h3>
            <p className="font-hand text-base text-ink/60 mb-5">this will delete all messages. can't undo!</p>
            <div className="flex gap-3">
              <StickerButton onClick={handleClear} color="bg-scrap-coral" className="flex-1">yes, clear it</StickerButton>
              <StickerButton onClick={() => setShowClearConfirm(false)} color="bg-paper-50" className="flex-1">cancel</StickerButton>
            </div>
          </div>
        </div>
      )}
    </DoodleField>
  );
}