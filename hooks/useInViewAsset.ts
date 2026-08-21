'use client';

import { useState, useEffect, RefObject } from 'react';

interface UseInViewAssetOptions {
  preloadMargin?: string;
  unloadMargin?: string;
  threshold?: number | number[];
  disabled?: boolean;
}

interface UseInViewAssetResult {
  isNearViewport: boolean;
  isVisible: boolean;
  isFarFromViewport: boolean;
  hasBeenNear: boolean;
  isSlowNetwork: boolean;
  prefersReducedMotion: boolean;
}

export function useInViewAsset<T extends HTMLElement = HTMLDivElement>(
  targetRef: RefObject<T>,
  options: UseInViewAssetOptions = {}
): UseInViewAssetResult {
  const {
    preloadMargin = '600px 0px 600px 0px',
    unloadMargin = '2000px 0px 2000px 0px',
    threshold = 0.15,
    disabled = false,
  } = options;

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFarFromViewport, setIsFarFromViewport] = useState(true);
  const [hasBeenNear, setHasBeenNear] = useState(false);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check network capabilities and reduced-motion preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Check network connection status
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection) {
      const slow = Boolean(connection.saveData) || connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';
      setIsSlowNetwork(slow);
    }

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Set up IntersectionObservers for preload, visibility, and hysteresis unload
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;
    const element = targetRef.current;
    if (!element) return;

    // 1. Preload Observer (600px margin by default)
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        const near = entry.isIntersecting;
        setIsNearViewport(near);
        if (near) {
          setHasBeenNear(true);
          setIsFarFromViewport(false);
        }
      },
      { rootMargin: preloadMargin, threshold: 0 }
    );

    // 2. Visibility Observer (triggers play/pause threshold)
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    // 3. Unload Observer (2000px margin hysteresis for distant unloading)
    const unloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsFarFromViewport(true);
          setIsNearViewport(false);
        } else {
          setIsFarFromViewport(false);
        }
      },
      { rootMargin: unloadMargin, threshold: 0 }
    );

    preloadObserver.observe(element);
    visibilityObserver.observe(element);
    unloadObserver.observe(element);

    return () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
      unloadObserver.disconnect();
    };
  }, [targetRef, preloadMargin, unloadMargin, threshold, disabled]);

  return {
    isNearViewport,
    isVisible,
    isFarFromViewport,
    hasBeenNear,
    isSlowNetwork,
    prefersReducedMotion,
  };
}
