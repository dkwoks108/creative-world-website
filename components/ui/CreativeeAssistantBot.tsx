'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  ArrowUpRight, 
  ExternalLink, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Zap, 
  PhoneCall, 
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Code2,
  Target,
  Search,
  Video,
  BarChart3,
  Headphones,
  Building2,
  Clock,
  Briefcase
} from 'lucide-react';

interface ChatOption {
  label: string;
  action: string;
  type?: string;
}

interface ChatMessage {
  id: string;
  sender: 'operations' | 'user';
  text: string;
  timestamp: string;
  options?: ChatOption[];
  showContactFlow?: boolean;
  showLeadForm?: boolean;
}

export function CreativeeAssistantBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  
  // Lead Form state
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', service: 'Engineering & Marketing' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'operations',
      timestamp: 'Just now',
      text: "Welcome to Creativee World Operations Desk. Select an inquiry domain below or connect directly with our strategic growth architects:",
      options: [
        { label: 'Web Platform Engineering', action: 'web_dev', type: 'code' },
        { label: 'Performance Ads & Scale', action: 'digital_mkt', type: 'target' },
        { label: 'Search & Map Pack SEO', action: 'seo_local', type: 'search' },
        { label: 'Brand Media & Content', action: 'social_reels', type: 'video' },
        { label: 'Verified Client Dossiers', action: 'case_studies', type: 'barchart' },
        { label: 'Request Commercial Audit', action: 'lead_form', type: 'phone' },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const getOptionIcon = (type?: string) => {
    switch (type) {
      case 'code': return <Code2 className="w-3.5 h-3.5 text-[#00CFFF]" />;
      case 'target': return <Target className="w-3.5 h-3.5 text-[#00CFFF]" />;
      case 'search': return <Search className="w-3.5 h-3.5 text-[#00CFFF]" />;
      case 'video': return <Video className="w-3.5 h-3.5 text-[#00CFFF]" />;
      case 'barchart': return <BarChart3 className="w-3.5 h-3.5 text-[#00CFFF]" />;
      case 'phone': return <PhoneCall className="w-3.5 h-3.5 text-[#00CFFF]" />;
      default: return <ChevronRight className="w-3.5 h-3.5 text-[#00CFFF]" />;
    }
  };

  const handleOptionClick = (option: ChatOption) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option.label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let botResponse: ChatMessage;

    switch (option.action) {
      case 'web_dev':
        botResponse = {
          id: `ops-${Date.now()}`,
          sender: 'operations',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'We engineer sub-2-second, high-converting web applications using Next.js App Router, SSR, and custom headless CMS architectures.',
          options: [
            { label: 'View Technical Specifications', action: 'goto_services' },
            { label: 'Request Scope & Proposal', action: 'lead_form' }
          ],
          showContactFlow: true,
        };
        break;
      case 'digital_mkt':
        botResponse = {
          id: `ops-${Date.now()}`,
          sender: 'operations',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Our performance ad systems manage Google Search & Meta campaigns with server-side tracking, custom landing funnels, and real-time ROI reporting.',
          options: [
            { label: 'Request Campaign Audit', action: 'lead_form' },
            { label: 'Speak to Ads Consultant', action: 'contact_flow' }
          ],
          showContactFlow: true,
        };
        break;
      case 'seo_local':
        botResponse = {
          id: `ops-${Date.now()}`,
          sender: 'operations',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'We optimize technical search architecture and Google 3-Pack Map Pack rankings for commercial intent keywords across regional and national markets.',
          showContactFlow: true,
        };
        break;
      case 'social_reels':
        botResponse = {
          id: `ops-${Date.now()}`,
          sender: 'operations',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'We produce short-form video reels, high-impact brand visual assets, and social campaign strategies that establish category authority.',
          showContactFlow: true,
        };
        break;
      case 'case_studies':
        botResponse = {
          id: `ops-${Date.now()}`,
          sender: 'operations',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Review verified performance metrics across education, real estate, healthcare, luxury hospitality, and commercial enterprises.',
          options: [{ label: 'Explore 18 Industry Dossiers →', action: 'goto_work' }],
          showContactFlow: true,
        };
        break;
      case 'lead_form':
        botResponse = {
          id: `ops-${Date.now()}`,
          sender: 'operations',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Submit your contact details below to receive a direct callback from a senior growth partner:',
          showLeadForm: true,
        };
        break;
      case 'goto_work':
        if (typeof window !== 'undefined') {
          window.location.href = '/work';
        }
        return;
      case 'goto_services':
        if (typeof window !== 'undefined') {
          window.location.href = '/services';
        }
        return;
      case 'contact_flow':
      default:
        botResponse = {
          id: `ops-${Date.now()}`,
          sender: 'operations',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "Connect directly with our Operations Desk via WhatsApp or direct phone consultation:",
          showContactFlow: true,
        };
        break;
    }

    setMessages((prev) => [...prev, userMsg, botResponse]);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const lower = userText.toLowerCase();
    let replyText = `Thank you for your message regarding "${userText}". Our senior team will review your requirement.`;

    if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('quote')) {
      replyText = 'Commercial packages are tailored to business scale and technical scope. Submit your details below for a customized quotation:';
    } else if (lower.includes('phone') || lower.includes('contact') || lower.includes('call') || lower.includes('whatsapp')) {
      replyText = 'You can connect directly with our Operations Desk via WhatsApp (+91 7062597062) or request an immediate callback:';
    }

    const botResponse: ChatMessage = {
      id: `ops-${Date.now()}`,
      sender: 'operations',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: replyText,
      showContactFlow: true,
      showLeadForm: true,
    };

    setMessages((prev) => [...prev, userMsg, botResponse]);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/public/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          email: `${leadForm.phone}@ops-desk.creativeworld.in`,
          service: leadForm.service,
          message: `Inquiry registered via Client Operations Desk. Scope: ${leadForm.service}`,
          source: 'Operations Desk',
        }),
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Executive Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#0D121F]/90 border border-white/20 text-white shadow-[0_0_25px_rgba(0,207,255,0.25)] hover:border-[#00CFFF]/50 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-xl"
          aria-label="Toggle Creativee World Client Operations Desk"
        >
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00CFFF] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00CFFF]" />
            </span>
          )}

          {isOpen ? (
            <X size={20} className="text-[#00CFFF]" />
          ) : (
            <>
              <div className="w-7 h-7 rounded-xl bg-[#00CFFF]/15 border border-[#00CFFF]/30 flex items-center justify-center text-[#00CFFF]">
                <Headphones size={15} />
              </div>
              <div className="text-left hidden sm:block pr-1">
                <span className="font-display font-bold text-xs text-white block leading-none tracking-wide">
                  Client Operations
                </span>
                <span className="text-[10px] text-slate-400 font-mono leading-none block mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00CFFF] inline-block" />
                  Direct Desk
                </span>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Operations Desk Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[82vh] rounded-3xl border border-white/15 bg-[#07090E]/95 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Executive Header */}
          <div className="p-4 bg-[#0D121F] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00CFFF]/15 border border-[#00CFFF]/30 flex items-center justify-center text-[#00CFFF]">
                <Building2 size={18} />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-white block tracking-wide">
                  Creativee Operations Desk
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#00CFFF] inline-block animate-pulse" />
                  Direct Client Operations • Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Operations Desk"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 overflow-y-auto space-y-4 flex-1 bg-[#05070B] max-h-[460px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                {/* Chat Bubble */}
                <div
                  className={`p-4 text-xs leading-relaxed max-w-[88%] rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-[#00CFFF] text-black font-semibold shadow-[0_0_20px_rgba(0,207,255,0.25)]'
                      : 'bg-[#0D121F] text-slate-200 border border-white/10 shadow-md font-normal'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[9px] block mt-1.5 font-mono ${msg.sender === 'user' ? 'text-black/60 text-right' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {/* Option Buttons with SVG Icons */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 max-w-[95%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D121F] hover:bg-[#00CFFF] hover:text-black border border-white/10 text-xs font-medium text-slate-300 transition-all duration-200 text-left hover:border-transparent group"
                      >
                        {getOptionIcon(opt.type)}
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Embedded Lead Form */}
                {msg.showLeadForm && (
                  <div className="w-full mt-2 p-4 rounded-2xl border border-[#00CFFF]/30 bg-[#0D121F] space-y-3">
                    {leadSubmitted ? (
                      <div className="text-center py-3 space-y-2">
                        <CheckCircle2 size={26} className="text-[#00CFFF] mx-auto" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">Callback Confirmed</h4>
                        <p className="text-[11px] text-slate-400">An executive partner will contact you on {leadForm.phone}.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-[10px] font-mono text-[#00CFFF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Briefcase size={12} /> Direct Contact Request
                          </span>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#05070B] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00CFFF]"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone / WhatsApp Number"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#05070B] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00CFFF]"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 rounded-xl bg-[#00CFFF] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#33d6ff] transition-all flex items-center justify-center gap-2"
                        >
                          <span>{isSubmitting ? 'Registering...' : 'Request Priority Callback'}</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* Direct Action Connection Channels */}
                {msg.showContactFlow && (
                  <div className="w-full mt-2 p-3.5 rounded-2xl border border-white/15 bg-[#0D121F] space-y-2.5">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider block">
                      Priority Direct Channels
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://wa.me/917062597062?text=Hello%20Creativee%20World%20Operations%20Desk%2C%20I%20have%20an%20inquiry."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-colors"
                      >
                        <MessageSquare size={13} />
                        <span>WhatsApp Desk</span>
                        <ExternalLink size={11} />
                      </a>
                      <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#00CFFF]/10 border border-[#00CFFF]/30 text-[#00CFFF] hover:bg-[#00CFFF]/20 text-xs font-semibold transition-colors"
                      >
                        <PhoneCall size={13} />
                        <span>Book Scope Call</span>
                        <ArrowUpRight size={11} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendCustomMessage}
            className="p-3 border-t border-white/10 bg-[#0D121F] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type your inquiry or message..."
              className="flex-1 px-4 py-2.5 rounded-full bg-[#05070B] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00CFFF]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-[#00CFFF] text-black hover:bg-[#33d6ff] transition-all shadow-[0_0_15px_rgba(0,207,255,0.3)]"
              aria-label="Send Inquiry"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
