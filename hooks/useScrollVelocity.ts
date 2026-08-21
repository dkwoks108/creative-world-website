'use client';

import { useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

export function useScrollVelocity(sensitivity: number = 0.05) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 30,
  });

  const velocityFactor = useTransform(smoothVelocity, [-1000, 1000], [-sensitivity, sensitivity]);

  return { velocityFactor, scrollVelocity: smoothVelocity };
}
