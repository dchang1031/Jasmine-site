import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Full-viewport section with scroll-linked enter/exit animation.
 * - Enters from below (fade + rise)
 * - Exits upward and fades out early so it disappears before reaching the sticky nav
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  children,
  className = '',
}) => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 when section top hits bottom of viewport
    // 1 when section bottom hits top of viewport
    offset: ['start end', 'end start'],
  });

  // Tight ranges so the exit completes well before the section reaches the nav
  // Enter: 0 → ~0.18 | Hold: ~0.18 → ~0.72 | Exit: ~0.72 → 1
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.72, 0.92],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.14, 0.72, 0.92],
    [90, 0, 0, -110]
  );

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-screen flex items-center snap-start snap-always ${className}`}
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
