'use client';

import { useRef, useEffect, useState } from 'react';

export function useVideoScrub(interactiveScrub: boolean = true) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const targetTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!interactiveScrub || isMobile) return;

    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.01) {
          video.currentTime += diff * 0.18;
        }
      }
      animFrameRef.current = requestAnimationFrame(updateTime);
    };

    animFrameRef.current = requestAnimationFrame(updateTime);

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
  }, [interactiveScrub, isMobile]);

  return { containerRef, videoRef, isMobile };
}
