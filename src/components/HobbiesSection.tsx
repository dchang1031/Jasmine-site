import React from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  '#825260',
  '#8e2d56',
  '#f3dfc6',
  '#6d1822',
  '#a6519b',
  '#ebd7da',
  '#c45c7a',
  '#5a3040',
  '#d4a89a',
  '#9b4d6b',
  '#e8c4b8',
  '#7a3d55',
  '#b87a8f',
  '#4a2030',
  '#f0d5c8',
  '#943d5c',
];

/** Casual / random-feeling layout: varied sizes, positions, some overlap */
const BLOCKS = [
  { top: '8%', left: '4%', w: 140, h: 180, rot: -6 },
  { top: '5%', left: '22%', w: 110, h: 130, rot: 4 },
  { top: '12%', left: '38%', w: 160, h: 120, rot: -2 },
  { top: '4%', left: '58%', w: 100, h: 150, rot: 8 },
  { top: '10%', left: '72%', w: 130, h: 160, rot: -5 },
  { top: '18%', left: '88%', w: 90, h: 110, rot: 3 },
  { top: '38%', left: '2%', w: 120, h: 140, rot: 5 },
  { top: '42%', left: '18%', w: 150, h: 110, rot: -8 },
  { top: '35%', left: '40%', w: 100, h: 160, rot: 2 },
  { top: '48%', left: '55%', w: 140, h: 130, rot: -4 },
  { top: '36%', left: '75%', w: 115, h: 145, rot: 7 },
  { top: '55%', left: '8%', w: 95, h: 120, rot: -3 },
  { top: '62%', left: '28%', w: 135, h: 100, rot: 6 },
  { top: '68%', left: '48%', w: 110, h: 150, rot: -7 },
  { top: '58%', left: '68%', w: 125, h: 115, rot: 4 },
  { top: '70%', left: '82%', w: 100, h: 130, rot: -2 },
];

export const HobbiesSection: React.FC = () => {
  return (
    <div className="relative w-full h-full px-6 py-10 overflow-hidden">
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#f3dfc6] mb-6 relative z-20">
        What I love to do outside of work.
      </h2>

      <div className="relative w-full h-[min(60vh,520px)] md:h-[min(65vh,580px)]">
        {BLOCKS.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.08 + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute rounded-[20px] shadow-lg border border-white/10"
            style={{
              top: b.top,
              left: b.left,
              width: b.w,
              height: b.h,
              backgroundColor: COLORS[i % COLORS.length],
              transform: `rotate(${b.rot}deg)`,
              zIndex: (i % 5) + 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};
