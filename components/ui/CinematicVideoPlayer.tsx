'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface CinematicVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  enableMouseScrub?: boolean;
  enableScrollScale?: boolean;
  alt?: string;
}

export function CinematicVideoPlayer({
  src,
  poster,
  className = '',
  enableMouseScrub = false,
  enableScrollScale = false,
  alt = 'Cinematic video player',
}: CinematicVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-play immediately on mount without lazy loading delays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Desktop Mouse Scrubbing via RAF smooth interpolation
  useEffect(() => {
    if (!enableMouseScrub) return;
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHover) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let currentTime = 0;
    let animationFrameId: number;

    const updateVideoTime = () => {
      if (video.duration) {
        currentTime += (targetTime - currentTime) * 0.1; // Smooth lerp
        if (Math.abs(targetTime - currentTime) > 0.01) {
          video.currentTime = currentTime;
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (video.duration) {
        targetTime = progress * video.duration;
      }
    };

    animationFrameId = requestAnimationFrame(updateVideoTime);
    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enableMouseScrub]);

  // Scroll Scale via GSAP ScrollTrigger
  useGSAP(
    () => {
      if (!enableScrollScale || !containerRef.current) return;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        containerRef.current,
        { scale: 0.96 },
        {
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-border-subtle shadow-editorial will-change-transform ${className}`}
    >
      {/* Poster image placeholder during load */}
      {poster && !isLoaded && (
        <img
          src={poster}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700"
        />
      )}

      {/* Video layer - Eagerly loaded */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
      />

      {/* Subtle Dark Vignette Overlay for Contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </div>
  );
}
