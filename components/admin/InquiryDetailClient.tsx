'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Building,
  Target,
  DollarSign,
  MessageSquare,
  Plus,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { updateInquiryStatusAction, addInquiryNoteAction, deleteInquiryAction } from '@/lib/actions/inquiries';

interface InquiryNoteItem {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string | Date;
}

interface InquiryDetailProps {
  inquiry: any;
  adminPath: string;
}

export function InquiryDetailClient({ inquiry, adminPath }: InquiryDetailProps) {
  const [status, setStatus] = useState(inquiry.status);
  const [notes, setNotes] = useState<InquiryNoteItem[]>(inquiry.notes || []);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdatingStatus(true);
    setStatus(newStatus);
    try {
      const res = await updateInquiryStatusAction(inquiry.id, newStatus);
      if (res.success) {
        setToast(`Status updated to ${newStatus}`);
      }
    } catch {
      setToast('Failed to update status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await addInquiryNoteAction(inquiry.id, newNoteContent);
      if (res.success && res.note) {
        setNotes([res.note, ...notes]);
        setNewNoteContent('');
        setToast('Internal note saved!');
      }
    } catch {
      setToast('Failed to save note.');
    } finally {
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href={`${adminPath}/inquiries`}
            className="p-2 bg-white border border-black/10 rounded-xl text-txt-secondary hover:text-ink transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-ink">{inquiry.name}</h1>
            <p className="text-xs font-mono text-txt-muted">
              Submitted: {new Date(inquiry.createdAt).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-txt-muted uppercase">Status:</label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdatingStatus}
            className="h-10 px-3 bg-white border border-black/10 rounded-xl text-xs font-semibold text-ink focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="NEW">New</option>
            <option value="READ">Read</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="CLOSED">Closed</option>
            <option value="SPAM">Spam</option>
          </select>
        </div>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Grid: Left Details, Right Internal Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Contact & Message (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Information Cards */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <h2 className="text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">
              Contact & Business Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-black/5 flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <div>
                  <span className="text-[10px] text-txt-muted uppercase font-mono block">Email</span>
                  <a href={`mailto:${inquiry.email}`} className="font-semibold text-ink hover:underline">
                    {inquiry.email}
                  </a>
                </div>
              </div>

              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-black/5 flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-txt-muted uppercase font-mono block">Phone</span>
                  <span className="font-semibold text-ink">{inquiry.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-black/5 flex items-center gap-3">
                <Building className="w-4 h-4 text-brand-violet shrink-0" />
                <div>
                  <span className="text-[10px] text-txt-muted uppercase font-mono block">Business Name</span>
                  <span className="font-semibold text-ink">{inquiry.businessName || 'Individual'}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-black/5 flex items-center gap-3">
                <Globe className="w-4 h-4 text-brand-magenta shrink-0" />
                <div>
                  <span className="text-[10px] text-txt-muted uppercase font-mono block">Website URL</span>
                  {inquiry.websiteUrl ? (
                    <a
                      href={inquiry.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-blue hover:underline truncate block"
                    >
                      {inquiry.websiteUrl}
                    </a>
                  ) : (
                    <span className="text-txt-muted">No website listed</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-black/5 flex items-center gap-3">
                <Target className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-txt-muted uppercase font-mono block">Primary Goal</span>
                  <span className="font-semibold text-ink">{inquiry.goal || 'General Growth'}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF9FC] rounded-xl border border-black/5 flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-txt-muted uppercase font-mono block">Project Budget</span>
                  <span className="font-semibold text-ink">{inquiry.budget || 'Undisclosed'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Message */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-3">
            <h2 className="text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">
              Enquiry Message / Project Requirements
            </h2>
            <div className="p-4 bg-[#FAF9FC] border border-black/5 rounded-xl text-xs text-ink leading-relaxed whitespace-pre-wrap font-sans">
              {inquiry.message || 'No detailed message supplied.'}
            </div>
          </div>
        </div>

        {/* Right Internal Notes Column (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-blue" />
              <h2 className="text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">
                Private Internal Notes
              </h2>
            </div>
            <p className="text-[11px] text-txt-muted">
              Notes are stored privately in database logs and are NEVER visible to clients.
            </p>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-3 pt-2">
              <textarea
                rows={3}
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Add private note (e.g. Called client on Aug 15. Scheduled strategy call for Tuesday)..."
                className="w-full p-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text"
              />
              <button
                type="submit"
                disabled={isAddingNote || !newNoteContent.trim()}
                className="w-full h-9 bg-ink text-white font-semibold text-xs rounded-xl hover:bg-black/90 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingNote ? 'Saving...' : 'Add Private Note'}</span>
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-3 pt-4 border-t border-black/5">
              {notes.length === 0 ? (
                <div className="text-center py-4 text-xs text-txt-muted">No internal notes yet.</div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="p-3 bg-cream/40 rounded-xl border border-black/5 text-xs space-y-1">
                    <p className="text-ink leading-relaxed">{note.content}</p>
                    <div className="flex items-center justify-between text-[10px] text-txt-muted font-mono pt-1">
                      <span>{note.createdBy}</span>
                      <span>{new Date(note.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
