import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Continuous scroll-scrubbed section transition.
 *
 * Behavior:
 * - Only one section is meaningfully visible at a time
 * - Incoming content slides up from the bottom while fading in
 * - Outgoing content slides up and fades out early (gone before reaching the sticky nav)
 * - Opacity and position are continuously driven by scroll position (not instant jumps)
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  children,
  className = '',
}) => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 = section top hits viewport bottom (about to enter)
    // 1 = section bottom hits viewport top (fully left)
    offset: ['start end', 'end start'],
  });

  // Steep, early curves so:
  // 1. Enter is a clear slide-up from below
  // 2. Full visibility is brief
  // 3. Exit finishes while content is still well below the nav
  //
  // progress keyframes:  enter → hold → exit
  const opacity = useTransform(
    scrollYProgress,
    [0.02, 0.18, 0.42, 0.58],
    [0, 1, 1, 0]
  );

  // Positive y = below viewport → 0 = in place → negative y = sliding up and away
  const y = useTransform(
    scrollYProgress,
    [0.02, 0.18, 0.42, 0.58],
    [160, 0, 0, -180]
  );

  return (
    <section
      ref={ref}
      id={id}
      className={`relative h-screen flex items-center justify-center overflow-hidden snap-start snap-always ${className}`}
    >
      <motion.div
        style={{ opacity, y }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
};
