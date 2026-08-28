'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { loginAction } from '@/lib/actions/auth';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await loginAction(formData);
      if (res && !res.success) {
        setError(res.error || 'Invalid credentials.');
      }
    } catch {
      setError('Connection failed. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl border border-black/10 shadow-xl p-8 sm:p-10 space-y-8">
        {/* Header & Official Logo */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center bg-ivory border border-black/10 p-3 rounded-2xl shadow-sm">
            <Image
              src="/logo-horizontal-transparent.png"
              alt="Creativee World Official Logo"
              width={160}
              height={45}
              priority
              className="h-9 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-ink tracking-tight">
              Control Panel Authentication
            </h1>
            <p className="text-xs font-mono text-txt-secondary mt-1 uppercase tracking-wider">
              Private Agency CMS & Inquiry Portal
            </p>
          </div>
        </div>

        {/* Security Warning Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            Authorized admin personnel only. All access attempts and security events are logged.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 text-xs font-medium text-red-700 animate-fade-in">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-txt-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                placeholder="admin@creativeeworld.com"
                className="w-full h-11 pl-10 pr-4 bg-[#FAF9FC] border border-black/10 rounded-xl text-sm text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink focus:bg-white transition-all cursor-text"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-txt-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-11 bg-[#FAF9FC] border border-black/10 rounded-xl text-sm text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink focus:bg-white transition-all cursor-text"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-txt-muted hover:text-ink transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-ink text-white font-semibold text-sm rounded-xl hover:bg-black/90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Control Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-2 border-t border-black/5">
          <p className="text-[11px] text-txt-muted">
            Creativee World Digital Growth Agency &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
