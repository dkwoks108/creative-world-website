'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { useInViewAsset } from '@/hooks/useInViewAsset';

interface CinematicVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  interactiveScrub?: boolean;
  scrollLinked?: boolean;
  overlayOpacity?: number;
  grayscale?: boolean;
  contrast?: number;
  scanlines?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
}

export function CinematicVideoPlayer({
  src,
  poster,
  className = '',
  interactiveScrub = false,
  scrollLinked = false,
  overlayOpacity = 0.4,
  grayscale = true,
  contrast = 1.15,
  scanlines = true,
  priority = false,
  children,
}: CinematicVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { isNearViewport, isVisible, hasBeenNear, prefersReducedMotion } = useInViewAsset(containerRef, {
    preloadMargin: priority ? '1200px 0px 1200px 0px' : '600px 0px 600px 0px',
    threshold: 0.15,
  });

  const targetTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const shouldAttachSource = priority || isNearViewport || hasBeenNear;

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Control video playback based on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldAttachSource) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    if (!video.src && src) {
      video.src = src;
      video.load();
    } else if (video.readyState >= 2) {
      setIsLoaded(true);
    }

    if (isVisible && !prefersReducedMotion) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isVisible, shouldAttachSource, prefersReducedMotion, src]);

  // Handle load fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);

    if (video.readyState >= 2) {
      setIsLoaded(true);
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
    };
  }, []);

  // Scroll-linked progress logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Smooth mouse scrubbing logic using requestAnimationFrame ONLY when hovered & visible
  useEffect(() => {
    if (!interactiveScrub || isMobile || prefersReducedMotion || !isVisible || !isHovered) return;

    const video = videoRef.current;
    if (!video) return;

    const updateVideoTime = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.01) {
          video.currentTime += diff * 0.15;
        }
      }
      animationFrameRef.current = requestAnimationFrame(updateVideoTime);
    };

    animationFrameRef.current = requestAnimationFrame(updateVideoTime);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !video || !video.duration) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      targetTimeRef.current = relativeX * video.duration;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (container) container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactiveScrub, isHovered, isVisible, isMobile, prefersReducedMotion]);

  // Scroll-linked seeking update effect
  useEffect(() => {
    if (!scrollLinked || interactiveScrub || isMobile || prefersReducedMotion || !isVisible) return;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration)) {
        video.currentTime = latest * video.duration;
      }
    });

    return () => unsubscribe();
  }, [scrollLinked, interactiveScrub, isMobile, prefersReducedMotion, smoothProgress, isVisible]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor={interactiveScrub ? 'scrub' : undefined}
      className={`relative overflow-hidden bg-black ${className}`}
      style={{ borderRadius: 0 }}
    >
      <video
        ref={videoRef}
        src={shouldAttachSource ? src : undefined}
        poster={poster}
        playsInline
        autoPlay
        muted
        loop
        preload={priority ? 'auto' : 'metadata'}
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          filter: `${grayscale ? 'grayscale(100%)' : ''} contrast(${contrast})`,
        }}
      >
        {shouldAttachSource && <source src={src} type="video/mp4" />}
      </video>

      {/* Monochrome Darkness Overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      />

      {/* Optional Monochrome Scanlines Texture */}
      {scanlines && (
        <div
          className="absolute inset-0 bg-texture-grid opacity-15 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Content overlay inside player */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}



