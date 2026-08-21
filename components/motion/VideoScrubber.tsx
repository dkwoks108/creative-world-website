'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { useInViewAsset } from '@/hooks/useInViewAsset';

interface VideoScrubberProps {
  src: string;
  poster?: string;
  className?: string;
  overlayOpacity?: number;
  grayscale?: boolean;
  contrast?: number;
  scanlines?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
}

export function VideoScrubber({
  src,
  poster,
  className = '',
  overlayOpacity = 0.35,
  grayscale = true,
  contrast = 1.2,
  scanlines = true,
  priority = false,
  children,
}: VideoScrubberProps) {
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
  const animFrameRef = useRef<number | null>(null);

  const shouldAttachSource = priority || isNearViewport || hasBeenNear;

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setIsMobile(isTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Viewport playback control & initial source load
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldAttachSource) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Force load if source is attached and video is not initialized
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

  // Mobile scroll fallback progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Mobile scroll seeking
  useEffect(() => {
    if (!isMobile || !isVisible || prefersReducedMotion) return;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration) && !video.seeking) {
        video.currentTime = latest * video.duration;
      }
    });

    return () => unsubscribe();
  }, [isMobile, isVisible, prefersReducedMotion, smoothProgress]);

  // Desktop mouse scrub seeking with lerp ONLY when hovered & visible
  useEffect(() => {
    if (isMobile || !isVisible || !isHovered || prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const updateVideoTime = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        if (!video.seeking) {
          const diff = targetTimeRef.current - video.currentTime;
          if (Math.abs(diff) > 0.005) {
            video.currentTime += diff * 0.08;
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(updateVideoTime);
    };

    animFrameRef.current = requestAnimationFrame(updateVideoTime);

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
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (container) container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, isMobile, isVisible, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="scrub"
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

      {/* Darkness Overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      />

      {/* Monochrome Scanline Grid */}
      {scanlines && (
        <div
          className="absolute inset-0 bg-texture-grid opacity-15 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}


