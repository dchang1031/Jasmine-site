import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { VoiceSamplesSection } from './components/VoiceSamplesSection';
import { HobbiesSection } from './components/HobbiesSection';
import { BookingSection } from './components/BookingSection';

const SECTION_IDS = ['hero', 'about', 'samples', 'hobbies', 'booking'] as const;
type SectionId = (typeof SECTION_IDS)[number];

const TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = down/next, -1 = up/prev
  const indexRef = useRef(0);
  const locked = useRef(false);
  const touchStartY = useRef<number | null>(null);

  indexRef.current = index;

  const goTo = useCallback((next: number) => {
    if (locked.current) return;
    const current = indexRef.current;
    const clamped = Math.max(0, Math.min(SECTION_IDS.length - 1, next));
    if (clamped === current) return;

    locked.current = true;
    setDirection(clamped > current ? 1 : -1);
    setIndex(clamped);

    window.setTimeout(() => {
      locked.current = false;
    }, TRANSITION.duration * 1000 + 50);
  }, []);

  const goToId = useCallback(
    (id: SectionId) => {
      const i = SECTION_IDS.indexOf(id);
      if (i !== -1) goTo(i);
    },
    [goTo]
  );

  // Mouse wheel / trackpad
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (locked.current) return;

      if (e.deltaY > 12) goTo(indexRef.current + 1);
      else if (e.deltaY < -12) goTo(indexRef.current - 1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [goTo]);

  // Touch swipe
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current == null || locked.current) return;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      if (Math.abs(dy) < 40) return;
      if (dy > 0) goTo(indexRef.current + 1);
      else goTo(indexRef.current - 1);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [goTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goTo(indexRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goTo(indexRef.current - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo]);

  // Lock native document scroll
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? '50%' : '-50%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? '-40%' : '40%',
      opacity: 0,
    }),
  };

  const sections: Record<SectionId, React.ReactNode> = {
    hero: (
      <Hero
        onScrollToSamples={() => goToId('samples')}
        onScrollToBooking={() => goToId('booking')}
      />
    ),
    about: <AboutSection />,
    samples: <VoiceSamplesSection />,
    hobbies: <HobbiesSection />,
    booking: <BookingSection />,
  };

  const currentId = SECTION_IDS[index];

  return (
    <div className="bg-[#6d1822] text-[#1a1a1a] selection:bg-[#e65c26] selection:text-white h-screen overflow-hidden">
      <Navbar
        onNavigate={goToId}
        onDirectBooking={() => goToId('booking')}
      />

      {/* Full-viewport stage. Content never scrolls under the nav. */}
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={currentId}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={TRANSITION}
            className="absolute inset-0 pt-28 box-border flex items-center justify-center"
          >
            <div className="w-full h-full flex items-center justify-center overflow-y-auto">
              {sections[currentId]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
