import React from 'react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { getAdminSession, getAdminPanelPath } from '@/lib/session';
import { SessionTimeoutGuard } from '@/components/admin/SessionTimeoutGuard';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const adminPath = getAdminPanelPath();

  // If on login page, render unadorned
  if (pathname.endsWith('/login')) {
    return <>{children}</>;
  }

  const session = await getAdminSession();

  const navItems = [
    { label: 'Dashboard', href: `${adminPath}/dashboard`, icon: LayoutDashboard },
    { label: 'Blog CMS', href: `${adminPath}/posts`, icon: FileText },
    { label: 'Inquiries', href: `${adminPath}/inquiries`, icon: Inbox },
    { label: 'Media Library', href: `${adminPath}/media`, icon: ImageIcon },
    { label: 'Settings & Audit', href: `${adminPath}/settings`, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-ink flex flex-col lg:flex-row font-sans antialiased relative">
      <SessionTimeoutGuard />
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white border-r border-black/10 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Brand */}
          <div className="p-6 border-b border-black/5 flex items-center justify-between">
            <Link href={`${adminPath}/dashboard`} className="flex items-center gap-3">
              <div className="bg-ivory border border-black/10 p-2 rounded-xl">
                <Image
                  src="/logo-horizontal-transparent.png"
                  alt="Creativee World"
                  width={120}
                  height={35}
                  priority
                  className="h-7 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono font-bold text-txt-muted uppercase tracking-wider">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-txt-secondary hover:text-ink hover:bg-cream/70 transition-all cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-txt-muted" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="p-4 border-t border-black/5 space-y-3">
          {session && (
            <div className="px-3 py-2 bg-cream/50 rounded-xl border border-black/5 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <p className="text-xs font-semibold text-ink truncate">{session.email}</p>
                <p className="text-[10px] font-mono text-txt-muted uppercase">Authenticated Admin</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pt-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-txt-secondary hover:text-ink hover:bg-cream/60 border border-black/5 transition-all cursor-pointer"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="flex items-center justify-center p-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
