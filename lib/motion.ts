import { type TargetAndTransition, type Transition } from 'framer-motion';

interface FadeInMotionConfig {
  initial: false | TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

interface FadeSlideMotionConfig extends FadeInMotionConfig {
  exit: TargetAndTransition;
}

export const MECHANISM_MOTION = {
  enterDuration: 0.22,
  emphasisDuration: 0.2,
  shiftDistance: 8,
} as const;

export function createMotionTransition(
  shouldReduceMotion: boolean,
  duration = MECHANISM_MOTION.enterDuration,
): Transition {
  return shouldReduceMotion ? { duration: 0 } : { duration, ease: 'easeOut' };
}

export function createFadeInMotion(
  shouldReduceMotion: boolean,
  duration = 0.25,
): FadeInMotionConfig {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: createMotionTransition(shouldReduceMotion, duration),
  };
}

export function createFadeSlideMotion(
  shouldReduceMotion: boolean,
  distance = 8,
  duration = 0.2,
): FadeSlideMotionConfig {
  return {
    initial: shouldReduceMotion ? false : { opacity: 0, y: distance },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    exit: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -distance },
    transition: createMotionTransition(shouldReduceMotion, duration),
  };
}
