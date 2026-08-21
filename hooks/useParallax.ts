'use client';

import { useTransform, MotionValue } from 'framer-motion';

export function useParallax(value: MotionValue<number>, distance: number = 100) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
