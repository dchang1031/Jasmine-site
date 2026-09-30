import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { FillButton } from './FillButton';

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((index) => (index + 1) % heroImages.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      floatControls.start({
        y: [0, -8, 0],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      });
    };
    const id = requestAnimationFrame(() => requestAnimationFrame(start));
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      floatControls.stop();
    };
  }, [floatControls]);

  return (
    <div className="w-full h-full flex items-center justify-center px-5 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 max-w-7xl w-full">
        {/* Image — first on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2 w-full md:w-1/2 flex justify-center"
        >
          <motion.div
            className="relative w-[200px] h-[280px] sm:w-[240px] sm:h-[340px] md:w-[350px] md:h-[500px] overflow-hidden card-rounded shrink-0"
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

        {/* Text — second on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 w-full md:w-1/2 z-10 flex flex-col items-center text-center"
        >
          <h1 className="font-display text-[42px] sm:text-[56px] md:text-[90px] lg:text-[120px] font-black tracking-tighter text-[#f3dfc6] mb-3 md:mb-6 leading-[0.95]">
            Hi, I'm{' '}
            {/* CSS animation — not blocked by parent framer-motion tree */}
            <span className="inline-block origin-bottom jasmine-shake">Jasmine</span>
            .
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-medium text-[#f3dfc6] mb-5 md:mb-10 max-w-md leading-snug">
            I am a voice actress who brings characters to life with grit, soul, and a splash of magic.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <FillButton variant="solid" onClick={onScrollToSamples} className="!px-6 !py-3 md:!px-8 md:!py-4 text-base md:text-lg">
              Listen Now
            </FillButton>
            <FillButton variant="outline" onClick={onScrollToBooking} className="!px-6 !py-3 md:!px-8 md:!py-4 text-base md:text-lg">
              Book
            </FillButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
