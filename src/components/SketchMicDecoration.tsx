import React from 'react';
import { motion } from 'framer-motion';

/**
 * Sketch-style microphone with cute radiating sound waves.
 * Mic shakes in a greeting wave (same rhythm as the "Jasmine" text).
 * Loops continuously while visible.
 */
export const SketchMicDecoration: React.FC = () => {
  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 left-6 z-30 w-[120px] h-[140px] md:w-[150px] md:h-[170px]"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Radiating sound waves — expand and fade in a loop */}
        {[0, 1, 2].map((i) => (
          <motion.g key={i}>
            {/* Right-side arcs */}
            <motion.path
              d="M78 48 C92 42, 100 55, 100 70 C100 85, 92 98, 78 92"
              stroke="#f3dfc6"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.75, 1.15, 1.35],
              }}
              transition={{
                duration: 2.4,
                delay: i * 0.7,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{ transformOrigin: '70px 70px' }}
            />
            {/* Left-side arcs */}
            <motion.path
              d="M42 48 C28 42, 20 55, 20 70 C20 85, 28 98, 42 92"
              stroke="#f3dfc6"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.75, 1.15, 1.35],
              }}
              transition={{
                duration: 2.4,
                delay: i * 0.7,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{ transformOrigin: '50px 70px' }}
            />
          </motion.g>
        ))}

        {/* Mic body — shakes like "Jasmine" text */}
        <motion.g
          style={{ transformOrigin: '60px 70px' }}
          animate={{
            rotate: [0, -4, 5, -3, 4, -2, 1, 0, 0, 0, 0, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.04, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.5, 0.7, 0.85, 1],
          }}
        >
          {/* Mic capsule (sketch outline) */}
          <rect
            x="46"
            y="28"
            width="28"
            height="48"
            rx="14"
            stroke="#f3dfc6"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Horizontal grille lines (sketch) */}
          {[36, 44, 52, 60].map((y) => (
            <line
              key={y}
              x1="50"
              y1={y}
              x2="70"
              y2={y}
              stroke="#f3dfc6"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.75"
            />
          ))}

          {/* Stand stem */}
          <line
            x1="60"
            y1="76"
            x2="60"
            y2="100"
            stroke="#f3dfc6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Stand base arc */}
          <path
            d="M42 108 Q60 98 78 108"
            stroke="#f3dfc6"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Base bar */}
          <line
            x1="38"
            y1="110"
            x2="82"
            y2="110"
            stroke="#f3dfc6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Tiny sketch highlight on capsule */}
          <path
            d="M52 34 Q54 32 56 34"
            stroke="#f3dfc6"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};
