import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, X } from 'lucide-react';

interface ToastContextType {
  showComingSoon: (featureName?: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showComingSoon: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ id: number; message: string; subtext?: string } | null>(null);

  const showComingSoon = useCallback((featureName?: string) => {
    const id = Date.now();
    setToast({
      id,
      message: 'link coming soon.',
      subtext: featureName ? `Jasmine is currently updating ${featureName}` : 'Portfolio assets & booking pipeline finalizing',
    });

    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showComingSoon }}>
      {children}
      
      {/* Interactive Message Bubble Pop-up */}
      <AnimatePresence>
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 pointer-events-auto max-w-sm sm:max-w-md w-full px-4 sm:px-0">
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4a042b] via-[#350b38] to-[#6b21a8] p-[1.5px] shadow-[0_10px_35px_-5px_rgba(168,85,247,0.5)] border border-pink-500/30 backdrop-blur-xl"
            >
              <div className="bg-[#1b061d]/95 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-rose-600 flex items-center justify-center text-white shadow-inner">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tracking-wide text-pink-200 capitalize">
                      {toast.message}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-pink-400/80 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-800/40">
                      <Clock className="w-3 h-3" /> in progress
                    </span>
                  </div>
                  {toast.subtext && (
                    <p className="mt-1 text-xs text-purple-200/70 truncate">
                      {toast.subtext}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setToast(null)}
                  className="text-pink-300/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Animated bottom progress line */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3.2, ease: 'linear' }}
                className="h-1 bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-500"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};
