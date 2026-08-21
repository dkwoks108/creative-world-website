import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Inbox,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  TrendingUp,
  Image as ImageIcon,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getAdminPanelPath } from '@/lib/session';

export const revalidate = 0; // Dynamic server component

export default async function AdminDashboardPage() {
  const adminPath = getAdminPanelPath();

  // Fetch real counts from SQLite database
  const [
    publishedPostsCount,
    draftPostsCount,
    scheduledPostsCount,
    totalPostsCount,
    newInquiriesCount,
    contactedInquiriesCount,
    qualifiedInquiriesCount,
    closedInquiriesCount,
    totalInquiriesCount,
    recentPosts,
    recentInquiries,
  ] = await Promise.all([
    db.post.count({ where: { status: 'PUBLISHED' } }),
    db.post.count({ where: { status: 'DRAFT' } }),
    db.post.count({ where: { status: 'SCHEDULED' } }),
    db.post.count(),
    db.inquiry.count({ where: { status: 'NEW' } }),
    db.inquiry.count({ where: { status: 'CONTACTED' } }),
    db.inquiry.count({ where: { status: 'QUALIFIED' } }),
    db.inquiry.count({ where: { status: 'CLOSED' } }),
    db.inquiry.count(),
    db.post.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      include: { category: true, author: true },
    }),
    db.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink tracking-tight">
            Executive Control Center
          </h1>
          <p className="text-xs sm:text-sm text-txt-secondary mt-1">
            Surnax Technologies — Web Engineering, Media & Lead Management
          </p>
        </div>

        {/* Quick Action Button */}
        <Link
          href={`${adminPath}/posts/new`}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 bg-ink text-white font-semibold text-sm rounded-xl hover:bg-black/90 active:scale-[0.99] transition-all cursor-pointer shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Blog Post</span>
        </Link>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Published */}
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-txt-muted uppercase tracking-wider">
              Published Posts
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-ink">{publishedPostsCount}</span>
            <span className="text-xs text-txt-muted">/ {totalPostsCount} total</span>
          </div>
        </div>

        {/* Drafts */}
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-txt-muted uppercase tracking-wider">
              Drafts & Reviews
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-ink">{draftPostsCount}</span>
            <span className="text-xs text-txt-muted">in progress</span>
          </div>
        </div>

        {/* New Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-txt-muted uppercase tracking-wider">
              New Inquiries
            </span>
            <AlertCircle className="w-4 h-4 text-brand-blue" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-ink">{newInquiriesCount}</span>
            <span className="text-xs text-txt-muted">unreviewed</span>
          </div>
        </div>

        {/* Qualified Leads */}
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-txt-muted uppercase tracking-wider">
              Qualified Leads
            </span>
            <TrendingUp className="w-4 h-4 text-brand-violet" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-ink">{qualifiedInquiriesCount}</span>
            <span className="text-xs text-txt-muted">/ {totalInquiriesCount} total</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
        <h2 className="text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href={`${adminPath}/posts/new`}
            className="p-4 rounded-xl border border-black/5 bg-[#FAF9FC] hover:bg-cream hover:border-black/20 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-brand-blue group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-ink">New Article</span>
          </Link>

          <Link
            href={`${adminPath}/posts`}
            className="p-4 rounded-xl border border-black/5 bg-[#FAF9FC] hover:bg-cream hover:border-black/20 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <FileText className="w-5 h-5 text-brand-violet group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-ink">Manage CMS</span>
          </Link>

          <Link
            href={`${adminPath}/inquiries`}
            className="p-4 rounded-xl border border-black/5 bg-[#FAF9FC] hover:bg-cream hover:border-black/20 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <Inbox className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-ink">View Inquiries</span>
          </Link>

          <Link
            href={`${adminPath}/media`}
            className="p-4 rounded-xl border border-black/5 bg-[#FAF9FC] hover:bg-cream hover:border-black/20 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <ImageIcon className="w-5 h-5 text-brand-magenta group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-ink">Media Assets</span>
          </Link>
        </div>
      </div>

      {/* Grid: Recent Articles & Latest Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Recent Articles</h2>
            <Link
              href={`${adminPath}/posts`}
              className="text-xs font-medium text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-black/5">
            {recentPosts.map((post) => (
              <div key={post.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink truncate">{post.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono uppercase bg-cream px-2 py-0.5 rounded text-txt-muted">
                      {post.category?.name || 'General'}
                    </span>
                    <span className="text-xs text-txt-muted">
                      {post.updatedAt.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full uppercase shrink-0 ${
                    post.status === 'PUBLISHED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : post.status === 'DRAFT'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Inquiries */}
        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Latest Inquiries</h2>
            <Link
              href={`${adminPath}/inquiries`}
              className="text-xs font-medium text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="py-8 text-center text-xs text-txt-muted">
              No inquiries received yet. You are all caught up!
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink truncate">{inquiry.name}</p>
                    <p className="text-xs text-txt-muted truncate">
                      {inquiry.businessName || inquiry.email} &bull; {inquiry.goal || 'General Enquiry'}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full uppercase shrink-0 ${
                      inquiry.status === 'NEW'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : inquiry.status === 'QUALIFIED'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
