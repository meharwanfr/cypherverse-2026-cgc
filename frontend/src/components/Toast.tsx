import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';
import { CheckCircle, AlertTriangle, X, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  toast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => dismiss(latest.id), 3000);
    return () => clearTimeout(timer);
  }, [toasts, dismiss]);

  const iconMap = {
    success: <CheckCircle className="h-4 w-4 shrink-0" />,
    error: <AlertTriangle className="h-4 w-4 shrink-0" />,
    info: <Info className="h-4 w-4 shrink-0" />,
  };

  const colorMap = {
    success: 'bg-scrap-sage border-scrap-sageDeep/40',
    error: 'bg-scrap-coral border-scrap-coralDeep/40',
    info: 'bg-scrap-blue border-scrap-blue/60',
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 md:bottom-8 md:right-8">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'paper-colored animate-slide-up flex items-center gap-2.5 rounded-rough border px-4 py-3 shadow-paper-lg',
              colorMap[t.type]
            )}
          >
            {iconMap[t.type]}
            <span className="font-hand text-base text-ink">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="ml-2 rounded-full p-0.5 transition-transform hover:scale-110"
              aria-label="dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
