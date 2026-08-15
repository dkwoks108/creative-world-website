import React from 'react';
import Link from 'next/link';
import { Search, Filter, Inbox, Eye, Mail, Phone, Calendar } from 'lucide-react';
import { db } from '@/lib/db';
import { getAdminPanelPath } from '@/lib/session';

export const revalidate = 0;

interface InquiriesPageProps {
  searchParams?: {
    q?: string;
    status?: string;
  };
}

export default async function AdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const adminPath = getAdminPanelPath();

  const query = searchParams?.q || '';
  const statusFilter = searchParams?.status || 'ALL';

  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query } },
      { email: { contains: query } },
      { businessName: { contains: query } },
      { websiteUrl: { contains: query } },
    ];
  }

  if (statusFilter !== 'ALL') {
    where.status = statusFilter;
  }

  const inquiries = await db.inquiry.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-ink tracking-tight">
          Inquiries & Growth Submissions
        </h1>
        <p className="text-xs sm:text-sm text-txt-secondary mt-0.5">
          Manage client audit requests, contact enquiries, and lead qualification
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-black/10 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-txt-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            defaultValue={query}
            placeholder="Search by client name, email, or business..."
            className="w-full h-10 pl-10 pr-4 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink focus:bg-white transition-all cursor-text"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'NEW', 'READ', 'CONTACTED', 'QUALIFIED', 'CLOSED'].map((st) => (
            <Link
              key={st}
              href={st === 'ALL' ? `${adminPath}/inquiries` : `${adminPath}/inquiries?status=${st}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-cream text-txt-secondary hover:text-ink'
              }`}
            >
              {st}
            </Link>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Inbox className="w-8 h-8 text-txt-muted mx-auto opacity-40" />
            <p className="text-sm font-semibold text-ink">No inquiries found</p>
            <p className="text-xs text-txt-muted max-w-sm mx-auto">
              Inquiries from the Growth Audit form and Contact page will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF9FC] border-b border-black/10 text-[10px] font-mono font-bold text-txt-muted uppercase tracking-wider">
                  <th className="py-3 px-4">Client Name & Business</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Goal / Subject</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted Date</th>
                  <th className="py-3 px-4 text-right">View Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-xs">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-cream/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <Link
                        href={`${adminPath}/inquiries/${inquiry.id}`}
                        className="font-semibold text-ink hover:text-brand-blue block truncate cursor-pointer"
                      >
                        {inquiry.name}
                      </Link>
                      <span className="text-[11px] text-txt-muted truncate block">
                        {inquiry.businessName || 'Individual / Local Brand'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-txt-muted whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-txt-muted shrink-0" />
                        <span className="truncate">{inquiry.email}</span>
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center gap-1.5 mt-0.5 font-mono text-[11px]">
                          <Phone className="w-3.5 h-3.5 text-txt-muted shrink-0" />
                          <span>{inquiry.phone}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-txt-secondary whitespace-nowrap">
                      {inquiry.goal || 'General Inquiry'}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                          inquiry.status === 'NEW'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : inquiry.status === 'QUALIFIED'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : inquiry.status === 'CONTACTED'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : inquiry.status === 'CLOSED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-txt-muted font-mono text-[11px] whitespace-nowrap">
                      {inquiry.createdAt.toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`${adminPath}/inquiries/${inquiry.id}`}
                        className="p-1.5 text-txt-secondary hover:text-ink hover:bg-cream rounded-lg transition-colors inline-block cursor-pointer"
                        title="View Inquiry Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
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
