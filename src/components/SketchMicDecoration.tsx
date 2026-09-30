import React from 'react';
import { motion } from 'framer-motion';

/**
 * Sketch-style handheld mic (matches reference doodle).
 * - Mic body shakes like the "Jasmine" greeting text
 * - Sound lines above the head pulse / draw on independently
 */
export const SketchMicDecoration: React.FC = () => {
  return (
    <motion.div
      className="pointer-events-none fixed bottom-4 left-4 z-30 w-[130px] h-[180px] md:w-[160px] md:h-[220px]"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Sound lines above the mic — animate on their own */}
        <motion.line
          x1="48"
          y1="8"
          x2="42"
          y2="18"
          stroke="#f3dfc6"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{ opacity: [0.25, 1, 0.25], pathLength: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        />
        <motion.line
          x1="58"
          y1="4"
          x2="58"
          y2="16"
          stroke="#f3dfc6"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{ opacity: [0.2, 1, 0.2], y: [2, 0, 2] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.line
          x1="68"
          y1="8"
          x2="74"
          y2="18"
          stroke="#f3dfc6"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{ opacity: [0.25, 1, 0.25], pathLength: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Mic + cable group — shakes */}
        <motion.g
          style={{ transformOrigin: '58px 55px' }}
          animate={{
            rotate: [0, -5, 6, -4, 5, -2, 1, 0, 0, 0, 0, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.04, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.5, 0.7, 0.85, 1],
          }}
        >
          {/* Slight tilt of the whole mic to match the doodle */}
          <g transform="rotate(-18 58 70)">
            {/* Mic head (rounded capsule) */}
            <ellipse
              cx="58"
              cy="38"
              rx="18"
              ry="20"
              stroke="#f3dfc6"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Mesh grille — crosshatch sketch */}
            <g stroke="#f3dfc6" strokeWidth="1.4" strokeLinecap="round" opacity="0.9">
              {/* Horizontal-ish mesh bands */}
              <path d="M44 30 Q58 28 72 30" />
              <path d="M43 36 Q58 34 73 36" />
              <path d="M43 42 Q58 40 73 42" />
              <path d="M44 48 Q58 46 72 48" />
              {/* Diagonal hatch */}
              <path d="M48 26 L52 50" opacity="0.55" />
              <path d="M54 25 L56 51" opacity="0.55" />
              <path d="M60 25 L62 51" opacity="0.55" />
              <path d="M66 26 L70 50" opacity="0.55" />
              <path d="M50 50 L54 26" opacity="0.4" />
              <path d="M58 51 L62 25" opacity="0.4" />
              <path d="M64 50 L68 27" opacity="0.4" />
            </g>

            {/* Head → body join */}
            <path
              d="M48 56 Q58 54 68 56"
              stroke="#f3dfc6"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Handle body */}
            <path
              d="M50 56 L48 88 Q58 94 68 88 L66 56"
              stroke="#f3dfc6"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Handle bottom cap */}
            <path
              d="M48 88 Q58 96 68 88"
              stroke="#f3dfc6"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Small U detail on handle */}
            <path
              d="M54 68 Q58 74 62 68"
              stroke="#f3dfc6"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cable from bottom of handle */}
            <path
              d="M58 94 C58 108, 48 112, 42 120 C36 128, 44 132, 52 128 C60 124, 58 136, 58 145"
              stroke="#f3dfc6"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  );
};
