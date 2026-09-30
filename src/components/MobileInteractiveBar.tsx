import React from 'react';
import { Play, Dices, Mail } from 'lucide-react';

interface MobileInteractiveBarProps {
  onScrollToSamples: () => void;
  onScrollToHobbies: () => void;
  onScrollToBooking: () => void;
}

export const MobileInteractiveBar: React.FC<MobileInteractiveBarProps> = ({
  onScrollToSamples,
  onScrollToHobbies,
  onScrollToBooking,
}) => {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 md:hidden w-[92%] max-w-sm pointer-events-auto">
      <div className="bg-[#240622]/90 backdrop-blur-lg border border-pink-500/40 rounded-full py-1.5 px-3 shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex items-center justify-between gap-1 text-[11px] font-semibold text-white">
        
        <button
          onClick={onScrollToSamples}
          className="flex-1 py-1.5 px-2 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-fuchsia-700/40 flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Play className="w-3 h-3 text-pink-400 fill-pink-400" />
          <span className="truncate">Samples</span>
        </button>

        <button
          onClick={onScrollToHobbies}
          className="flex-1 py-1.5 px-2 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-fuchsia-700/40 flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Dices className="w-3.5 h-3.5 text-fuchsia-300" />
          <span className="truncate">DnD & Dice</span>
        </button>

        <button
          onClick={onScrollToBooking}
          className="flex-1 py-1.5 px-2 rounded-full bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Mail className="w-3 h-3 text-white" />
          <span className="truncate">Book</span>
        </button>

      </div>
    </div>
  );
};
