"use client";

import React, { useState } from "react";
import { History, ArrowLeft, RotateCcw, X, Clock, User } from "lucide-react";

interface Revision {
  id: string;
  title: string;
  content: string;
  seoTitle?: string;
  metaDescription?: string;
  createdBy: string;
  createdAt: string;
}

interface RevisionDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  revisions: Revision[];
  onRestore: (revision: Revision) => void;
}

export default function RevisionDiffModal({
  isOpen,
  onClose,
  revisions,
  onRestore,
}: RevisionDiffModalProps) {
  const [selectedRevision, setSelectedRevision] = useState<Revision | null>(
    revisions[0] || null
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D121F] border border-[#1A2333] rounded-2xl w-full max-w-4xl h-[650px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#1A2333] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Post Revision History Inspector
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Revisions Sidebar */}
          <div className="w-72 bg-[#090D14] border-r border-[#1A2333] p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1E293B]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Saved Checkpoints ({revisions.length})
            </span>
            {revisions.length === 0 ? (
              <p className="text-xs text-slate-500 pt-4">No revisions saved yet.</p>
            ) : (
              revisions.map((rev, idx) => (
                <div
                  key={rev.id || idx}
                  onClick={() => setSelectedRevision(rev)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                    selectedRevision?.id === rev.id
                      ? "bg-amber-500/10 border-amber-500/40 text-white"
                      : "bg-[#141B2B] border-[#222E45] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span>Revision #{revisions.length - idx}</span>
                    <span className="text-[10px] text-amber-400">
                      {new Date(rev.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">{rev.title}</p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    <User size={10} /> {rev.createdBy || "Admin"}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Revision Preview Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs scrollbar-thin scrollbar-thumb-[#1E293B]">
            {selectedRevision ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#141B2B] border border-[#222E45] rounded-xl">
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedRevision.title}</h3>
                    <p className="text-[11px] text-slate-400">
                      Created on {new Date(selectedRevision.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onRestore(selectedRevision);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
                  >
                    <RotateCcw size={14} />
                    <span>Restore This Revision</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-400 uppercase text-[10px]">
                    Content Snapshot
                  </span>
                  <div className="p-4 bg-[#090D14] border border-[#1A2333] rounded-xl font-mono text-slate-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {selectedRevision.content}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center pt-20 text-slate-500 text-xs">
                Select a revision checkpoint from the sidebar to inspect diff & restore.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
