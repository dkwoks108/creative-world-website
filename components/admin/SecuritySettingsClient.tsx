'use client';

import React, { useState } from 'react';
import { Shield, KeyRound, Laptop, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { changePasswordAction, revokeSingleSessionAction, revokeAllOtherSessionsAction } from '@/lib/actions/settings';

interface ActiveSessionData {
  id: string;
  createdAt: Date | string;
  lastActivityAt: Date | string;
  expiresAt: Date | string;
  absoluteExpiresAt: Date | string;
  userAgent: string | null;
  isCurrent: boolean;
}

interface SecuritySettingsClientProps {
  initialSessions: ActiveSessionData[];
}

export function SecuritySettingsClient({ initialSessions }: SecuritySettingsClientProps) {
  const [sessions, setSessions] = useState<ActiveSessionData[]>(initialSessions);
  const [pwState, setPwState] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwStatus, setPwStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePwSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwStatus(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('currentPassword', pwState.currentPassword);
    formData.append('newPassword', pwState.newPassword);
    formData.append('confirmPassword', pwState.confirmPassword);

    try {
      const res = await changePasswordAction(formData);
      if (res.success) {
        setPwStatus({ type: 'success', message: res.message || 'Password updated successfully!' });
        setPwState({ currentPassword: '', newPassword: '', confirmPassword: '' });
        // Keep only current session in state after invalidation
        setSessions((prev) => prev.filter((s) => s.isCurrent));
      } else {
        setPwStatus({ type: 'error', message: res.error || 'Failed to update password.' });
      }
    } catch (err: any) {
      setPwStatus({ type: 'error', message: err.message || 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevokeSingle = async (sessionId: string) => {
    if (!confirm('Are you sure you want to revoke this session?')) return;

    const res = await revokeSingleSessionAction(sessionId);
    if (res.success) {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    }
  };

  const handleRevokeAllOther = async () => {
    if (!confirm('Are you sure you want to log out all other devices?')) return;

    const res = await revokeAllOtherSessionsAction();
    if (res.success) {
      setSessions((prev) => prev.filter((s) => s.isCurrent));
    }
  };

  return (
    <div className="space-y-8">
      {/* Change Password Form */}
      <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-black/10 pb-3">
          <KeyRound className="w-4 h-4 text-brand-blue" />
          <h2 className="text-sm font-semibold text-ink">Change Admin Password</h2>
        </div>

        {pwStatus && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
              pwStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {pwStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{pwStatus.message}</span>
          </div>
        )}

        <form onSubmit={handlePwSubmit} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-ink">Current Password</label>
            <input
              type="password"
              required
              value={pwState.currentPassword}
              onChange={(e) => setPwState({ ...pwState, currentPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-black/15 text-xs focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-ink">New Password (min 12 characters)</label>
            <input
              type="password"
              required
              minLength={12}
              value={pwState.newPassword}
              onChange={(e) => setPwState({ ...pwState, newPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-black/15 text-xs focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-ink">Confirm New Password</label>
            <input
              type="password"
              required
              minLength={12}
              value={pwState.confirmPassword}
              onChange={(e) => setPwState({ ...pwState, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-black/15 text-xs focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-ink text-white rounded-xl text-xs font-semibold hover:bg-black transition cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Updating Password...' : 'Update Password & Revoke Other Sessions'}
          </button>
        </form>
      </div>

      {/* Active Sessions List */}
      <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-brand-violet" />
            <h2 className="text-sm font-semibold text-ink">Active Admin Sessions ({sessions.length})</h2>
          </div>
          {sessions.filter((s) => !s.isCurrent).length > 0 && (
            <button
              onClick={handleRevokeAllOther}
              className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold hover:bg-rose-100 transition cursor-pointer"
            >
              Log Out Other Devices
            </button>
          )}
        </div>

        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="p-3.5 rounded-xl border border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs bg-[#FAF9FC]"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-ink truncate max-w-xs">
                    {s.userAgent || 'Unknown Device / Browser'}
                  </span>
                  {s.isCurrent && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded-full">
                      This Device (Current)
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-txt-muted flex items-center gap-3">
                  <span>Last Active: {new Date(s.lastActivityAt).toLocaleString('en-IN')}</span>
                  <span>Created: {new Date(s.createdAt).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {!s.isCurrent && (
                <button
                  onClick={() => handleRevokeSingle(s.id)}
                  className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Revoke</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
