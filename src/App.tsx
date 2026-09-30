import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection, ABOUT_MAX_STEP } from './components/AboutSection';
import { VoiceSamplesSection } from './components/VoiceSamplesSection';
import { HobbiesSection } from './components/HobbiesSection';
import { BookingSection } from './components/BookingSection';
import { SketchMicDecoration } from './components/SketchMicDecoration';

const SECTION_IDS = ['hero', 'about', 'samples', 'hobbies', 'booking'] as const;
type SectionId = (typeof SECTION_IDS)[number];

const TRANSITION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

/**
 * Section backgrounds — purple/maroon family, cream text + nav still readable.
 * Samples (warm rose-maroon) vs Hobbies (cool deep purple) are intentionally far apart.
 */
const SECTION_BG: Record<SectionId, string> = {
  hero: '#6d1822', // deep wine
  about: '#5a1a38', // berry plum
  samples: '#6b2040', // warm rose-maroon
  hobbies: '#2a1a4a', // cool deep purple
  booking: '#521c2e', // dusty rosewood
};

const BG_TRANSITION = {
  duration: 1.4,
  ease: [0.4, 0, 0.2, 1] as const,
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [aboutStep, setAboutStep] = useState(0);
  const indexRef = useRef(0);
  const aboutStepRef = useRef(0);
  const locked = useRef(false);
  const touchStartY = useRef<number | null>(null);

  indexRef.current = index;
  aboutStepRef.current = aboutStep;

  const lock = useCallback(() => {
    locked.current = true;
    window.setTimeout(() => {
      locked.current = false;
    }, TRANSITION.duration * 1000 + 50);
  }, []);

  const goToSection = useCallback(
    (next: number) => {
      if (locked.current) return;
      const current = indexRef.current;
      const clamped = Math.max(0, Math.min(SECTION_IDS.length - 1, next));
      if (clamped === current) return;

      lock();
      setDirection(clamped > current ? 1 : -1);
      setIndex(clamped);

      if (SECTION_IDS[clamped] === 'about') {
        setAboutStep(clamped > current ? 0 : ABOUT_MAX_STEP);
      }
    },
    [lock]
  );

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (locked.current) return;

      const currentId = SECTION_IDS[indexRef.current];

      if (currentId === 'about') {
        const step = aboutStepRef.current;
        if (dir === 1 && step < ABOUT_MAX_STEP) {
          lock();
          setAboutStep(step + 1);
          return;
        }
        if (dir === -1 && step > 0) {
          lock();
          setAboutStep(step - 1);
          return;
        }
      }

      goToSection(indexRef.current + dir);
    },
    [goToSection, lock]
  );

  const goToId = useCallback(
    (id: SectionId) => {
      const i = SECTION_IDS.indexOf(id);
      if (i !== -1) goToSection(i);
    },
    [goToSection]
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (locked.current) return;
      if (e.deltaY > 12) advance(1);
      else if (e.deltaY < -12) advance(-1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [advance]);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current == null || locked.current) return;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(dy) < 40) return;
      advance(dy > 0 ? 1 : -1);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [advance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        advance(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        advance(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance]);

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
    about: <AboutSection step={aboutStep} />,
    samples: <VoiceSamplesSection />,
    hobbies: <HobbiesSection />,
    booking: <BookingSection />,
  };

  const currentId = SECTION_IDS[index];
  const sectionKey = currentId === 'about' ? 'about' : currentId;
  const showMic = currentId === 'about' || currentId === 'samples';

  return (
    <motion.div
      className="text-[#1a1a1a] selection:bg-[#e65c26] selection:text-white h-screen overflow-hidden"
      initial={false}
      animate={{ backgroundColor: SECTION_BG[currentId] }}
      transition={BG_TRANSITION}
    >
      <Navbar
        onNavigate={goToId}
        onDirectBooking={() => goToId('booking')}
      />

      <div className="relative h-screen overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={sectionKey}
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

      <AnimatePresence>
        {showMic && <SketchMicDecoration key="sketch-mic" />}
      </AnimatePresence>
    </motion.div>
  );
}
