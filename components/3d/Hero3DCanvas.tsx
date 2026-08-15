'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { StaticFallbackGraphic } from './StaticFallbackGraphic';

// Dynamically import Three.js scene with zero SSR payload
const GrowthCoreScene = dynamic(
  () => import('./GrowthCoreScene').then((mod) => mod.GrowthCoreScene),
  {
    ssr: false,
    loading: () => <StaticFallbackGraphic />,
  }
);

export function Hero3DCanvas() {
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [particleCount, setParticleCount] = useState<number>(600);

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    // Detect WebGL rendering support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setIsWebGLSupported(false);
    } catch {
      setIsWebGLSupported(false);
    }

    // Set GPU particle tier based on viewport width
    if (window.innerWidth < 768) {
      setParticleCount(250);
    } else if (window.innerWidth > 1440) {
      setParticleCount(900);
    }
  }, []);

  if (!isWebGLSupported || isReducedMotion) {
    return <StaticFallbackGraphic />;
  }

  return <GrowthCoreScene particleCount={particleCount} />;
}
