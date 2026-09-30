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
 * - Sections are viewport-tall with top padding so content sits below the sticky nav
 * - When snapped in view (progress ~0.5) opacity is fully 1
 * - Enter: slides up from below while fading in
 * - Exit: slides up and fades out before content can reach the nav
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  children,
  className = '',
}) => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 = section top at viewport bottom
    // ~0.5 = section filling the viewport (snapped)
    // 1 = section bottom at viewport top
    offset: ['start end', 'end start'],
  });

  // Hold range must include ~0.5 so a snapped section is fully opaque.
  // Enter finishes before 0.5; exit starts after 0.5 and completes early.
  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.28, 0.72, 0.9],
    [0, 1, 1, 0]
  );

  // Slide up from below on enter; slide further up on exit
  const y = useTransform(
    scrollYProgress,
    [0.05, 0.28, 0.72, 0.9],
    [140, 0, 0, -160]
  );

  return (
    <section
      ref={ref}
      id={id}
      // pt-28 (~7rem) clears the sticky nav (top-4 + h-20)
      // so content is vertically centered in the visible area below the nav
      className={`relative h-screen pt-28 box-border flex items-center justify-center overflow-hidden snap-start snap-always ${className}`}
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
