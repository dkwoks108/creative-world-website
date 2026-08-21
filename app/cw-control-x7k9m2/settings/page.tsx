import React from 'react';
import { History, Sliders, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/db';
import { getAdminSession, getAdminPanelPath, getActiveSessionsForUser } from '@/lib/session';
import { SecuritySettingsClient } from '@/components/admin/SecuritySettingsClient';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const adminPath = getAdminPanelPath();
  const session = await getAdminSession();
  const activeSessions = session ? await getActiveSessionsForUser(session.userId) : [];

  const auditLogs = await db.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-ink tracking-tight">
          System Settings & Security Management
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary mt-0.5">
          View system configuration, manage active admin sessions, update password, and inspect security audit logs
        </p>
      </div>

      {/* Security & Password Settings */}
      <SecuritySettingsClient initialSessions={activeSessions} />

      {/* System Configuration Status */}
      <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-black/10 pb-3">
          <Sliders className="w-4 h-4 text-brand-blue" />
          <h2 className="text-sm font-semibold text-ink">Active System Environment</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#FAF9FC] rounded-xl border border-black/5 space-y-1">
            <span className="text-[10px] font-mono text-txt-muted uppercase">Agency Brand</span>
            <p className="font-semibold text-ink">Ceativee World Digital Growth Agency</p>
          </div>

          <div className="p-4 bg-[#FAF9FC] rounded-xl border border-black/5 space-y-1">
            <span className="text-[10px] font-mono text-txt-muted uppercase">Admin Secret Route</span>
            <p className="font-mono font-semibold text-brand-blue">{adminPath}</p>
          </div>

          <div className="p-4 bg-[#FAF9FC] rounded-xl border border-black/5 space-y-1">
            <span className="text-[10px] font-mono text-txt-muted uppercase">Session Security Policy</span>
            <p className="font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>30m Idle / 12h Hard Cap (Active)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center gap-2 border-b border-black/10 pb-3">
          <History className="w-4 h-4 text-brand-violet" />
          <h2 className="text-sm font-semibold text-ink">Security Audit & Activity Logs</h2>
        </div>

        {auditLogs.length === 0 ? (
          <div className="py-8 text-center text-xs text-txt-muted">No security events logged yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF9FC] border-b border-black/10 text-[10px] font-mono font-bold text-txt-muted uppercase tracking-wider">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Resource</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-cream/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] text-txt-muted whitespace-nowrap">
                      {log.createdAt.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-ink whitespace-nowrap">
                      {log.action}
                    </td>
                    <td className="py-3 px-3 font-medium text-txt-secondary whitespace-nowrap">
                      {log.resource}
                    </td>
                    <td className="py-3 px-3 text-txt-secondary">
                      {log.details || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
