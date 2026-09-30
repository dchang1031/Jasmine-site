import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AboutSectionProps {
  /** 0 = title only, 1–3 = images revealed, 4 = images gone + final copy */
  step: number;
}

const WORK_IMAGES = [
  '/src/assets/images/work1.jpg',
  '/src/assets/images/work2.jpg',
  '/src/assets/images/work3.jpg',
];

const IMAGE_TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const AboutSection: React.FC<AboutSectionProps> = ({ step }) => {
  const showImages = step >= 1 && step <= 3;
  const showFinal = step >= 4;
  const visibleCount = Math.min(Math.max(step, 0), 3);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
      {/* Title — behind the images */}
      <AnimatePresence mode="wait">
        {!showFinal ? (
          <motion.h2
            key="intro-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={IMAGE_TRANSITION}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#f3dfc6] text-center max-w-4xl leading-tight relative z-0"
          >
            I've worked in several projects you might've heard of...
          </motion.h2>
        ) : (
          <motion.div
            key="final-copy"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={IMAGE_TRANSITION}
            className="text-center relative z-0 max-w-3xl"
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#f3dfc6] leading-tight">
              Yep, I was in all of them.
            </h2>
            <p className="mt-6 text-xl md:text-2xl text-[#f3dfc6] font-medium">
              I do animes, games, and commercials.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Work images — on top of the text */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="flex items-end justify-center gap-4 md:gap-8 px-4 w-full max-w-5xl">
          {WORK_IMAGES.map((src, i) => {
            const isVisible = showImages && i < visibleCount;
            return (
              <AnimatePresence key={src}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: '50%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-40%' }}
                    transition={IMAGE_TRANSITION}
                    className="flex-1 max-w-[200px] md:max-w-[240px]"
                    style={{ aspectRatio: '3 / 4' }}
                  >
                    <img
                      src={src}
                      alt={`Project ${i + 1}`}
                      className="w-full h-full object-cover rounded-[24px] shadow-2xl"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/** Number of internal steps in the about section (0..4 inclusive = 5 steps) */
export const ABOUT_MAX_STEP = 4;
