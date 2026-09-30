import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

interface HeroProps {
  onScrollToSamples: () => void;
  onScrollToBooking: () => void;
}

const heroImages = [
  '/src/assets/images/hero_jasmine_portrait_1790733232771.jpg',
  '/src/assets/images/hero_jasmine_2.jpg',
  '/src/assets/images/hero_jasmine_3.jpg',
];

export const Hero: React.FC<HeroProps> = ({ onScrollToSamples, onScrollToBooking }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const floatControls = useAnimationControls();

  // Image carousel — runs independently of motion tree
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((index) => (index + 1) % heroImages.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  // Explicitly start the float loop after mount so it isn't blocked by the
  // parent full-page AnimatePresence enter (which prevented it on first load).
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      floatControls.start({
        y: [0, -10, 0],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      });
    };
    // Double rAF: wait until after the first paint / parent layout
    const id = requestAnimationFrame(() => requestAnimationFrame(start));
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      floatControls.stop();
    };
  }, [floatControls]);

  return (
    <div className="flex flex-col items-center w-full pb-10">
      <div className="flex flex-col md:flex-row items-center gap-0 max-w-7xl px-6">
        {/* Editorial Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 z-10 flex flex-col items-center text-center"
        >
          <h1 className="font-display text-[120px] font-black tracking-tighter text-[#f3dfc6] mb-6 leading-none">
            Hi, I'm{' '}
            {/* Continuous shake loop (shake → rest → shake) — no remount needed */}
            <motion.span
              className="inline-block origin-bottom"
              initial={{ rotate: 0 }}
              animate={{
                rotate: [0, -4, 5, -3, 4, -2, 1, 0, 0, 0, 0, 0],
              }}
              transition={{
                duration: 3,
                ease: 'easeInOut',
                times: [0, 0.04, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.5, 0.7, 0.85, 1],
                repeat: Infinity,
              }}
            >
              Jasmine
            </motion.span>
            .
          </h1>
          <p className="text-xl font-medium text-[#f3dfc6] mb-10 max-w-md">
            I am a voice actress who brings characters to life with grit, soul, and a splash of magic.
          </p>
          <div className="flex gap-4">
            <button
              onClick={onScrollToSamples}
              className="bg-[#f3dfc6] text-[#6d1822] px-8 py-4 font-bold text-lg hover:bg-gray-100 rounded-full"
            >
              Listen Now
            </button>
            <button
              onClick={onScrollToBooking}
              className="border-2 border-[#f3dfc6] text-[#f3dfc6] px-8 py-4 font-bold text-lg hover:bg-[#f3dfc6] hover:text-[#6d1822] rounded-full"
            >
              Book
            </button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full md:w-1/2 flex justify-center -ml-20 md:ml-0 mt-32 md:mt-20"
        >
          <motion.div
            className="relative w-[350px] h-[500px] overflow-hidden card-rounded"
            initial={{ y: 0 }}
            animate={floatControls}
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={heroImages[currentImage]}
                src={heroImages[currentImage]}
                alt="Jasmine"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
