/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  touchAdminSessionAction,
  logoutServerAction,
  getAdminPanelPathAction,
} from '@/lib/actions/auth-server';

export function SessionTimeoutGuard() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Periodic session check every 2 minutes & on focus
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkSession = async () => {
      try {
        const isValid = await touchAdminSessionAction();
        if (!isValid) {
          const adminPath = await getAdminPanelPathAction();
          router.push(`${adminPath}/login`);
        }
      } catch {
        // network issue or invalid session
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkSession();
      }
    };

    window.addEventListener('focus', checkSession);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Run check every 2 minutes
    timer = setInterval(checkSession, 2 * 60 * 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', checkSession);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router]);

  const handleContinue = async () => {
    setIsRefreshing(true);
    try {
      await touchAdminSessionAction();
      setShowWarning(false);
    } catch {
      const adminPath = await getAdminPanelPathAction();
      router.push(`${adminPath}/login`);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    await logoutServerAction();
  };

  if (!showWarning) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-950/90 border-b border-amber-500/50 backdrop-blur-md px-6 py-3 text-amber-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-2xl">
      <div className="flex items-center space-x-3">
        <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
        <span>Inactivity Warning: Your admin session will expire soon due to inactivity.</span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={handleContinue}
          disabled={isRefreshing}
          className="px-3 py-1 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition cursor-pointer"
        >
          {isRefreshing ? 'Extending...' : 'Continue Session'}
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-zinc-800 text-zinc-300 font-semibold rounded hover:bg-zinc-700 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
