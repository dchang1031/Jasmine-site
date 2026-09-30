import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section transition:
 * - Incoming section: fades in + rises from below
 * - Outgoing section: quickly moves up + fades out while still on screen
 *   (becomes invisible before reaching the sticky nav)
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  children,
  className = '',
}) => {
  const ref = useRef<HTMLElement>(null);
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const lastY = useRef(0);

  // Trigger while a good portion is still visible so exit happens early
  const isInView = useInView(ref, {
    amount: 0.35,
    once: false,
  });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) > 4) {
        setScrollDir(y > lastY.current ? 'down' : 'up');
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // When leaving: go UP if scrolling down, go DOWN if scrolling up
  const exitY = scrollDir === 'down' ? -120 : 120;

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-screen flex items-center snap-start ${className}`}
    >
      <motion.div
        className="w-full"
        initial={false}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: exitY, scale: 0.98 }
        }
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1], // quick, smooth
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};
