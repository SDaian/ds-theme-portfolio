'use client';
import { MotionConfig } from 'motion/react';

/**
 * Follows the visitor's "reduce motion" setting for every motion component:
 * slides and scales are skipped and only the fades remain. Without the
 * setting, animations run exactly as written.
 */
export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion='user'>{children}</MotionConfig>
);
