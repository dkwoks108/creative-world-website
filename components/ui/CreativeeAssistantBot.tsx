'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowUpRight, ExternalLink, Send, Bot, Sparkles } from 'lucide-react';
import { CWButton } from '@/components/ui/CWButton';
import { CWBadge } from '@/components/ui/CWBadge';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: string }[];
  showContactFlow?: boolean;
}

export function CreativeeAssistantBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Hello! Welcome to Creativee World. I'm your digital growth assistant. How can we accelerate your business today?",
      options: [
        { label: 'Website Development', action: 'web_dev' },
        { label: 'Digital Marketing & Ads', action: 'digital_mkt' },
        { label: 'SEO & Local Search', action: 'seo_local' },
        { label: 'Social Media & Reels', action: 'social_reels' },
        { label: 'Verified Case Studies', action: 'case_studies' },
        { label: 'Contact Creativee World', action: 'contact_flow' },
      ],
    },
  ]);

  const handleOptionClick = (option: { label: string; action: string }) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option.label,
    };

    let botResponse: ChatMessage;

    switch (option.action) {
      case 'web_dev':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'We engineer high-converting, sub-2-second custom websites built with Next.js App Router, SSR, and modern headless web architectures in Jaipur.',
          showContactFlow: true,
        };
        break;
      case 'digital_mkt':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Our performance marketing systems combine Google Ads and Meta Ads (Instagram & Facebook) to drive high-intent commercial buyers and leads.',
          showContactFlow: true,
        };
        break;
      case 'seo_local':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'We dominate Google 3-Pack Map Pack rankings and technical organic search for high-value commercial keywords in Jaipur and Rajasthan.',
          showContactFlow: true,
        };
        break;
      case 'social_reels':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'We produce short-form video reels, custom social branding, and high-impact graphic content that builds commercial market authority.',
          showContactFlow: true,
        };
        break;
      case 'case_studies':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Explore how Creativee World drives pipeline growth across education, real estate, healthcare, retail, and regional Jaipur businesses.',
          options: [{ label: 'View Verified Case Studies →', action: 'goto_work' }],
          showContactFlow: true,
        };
        break;
      case 'goto_work':
        if (typeof window !== 'undefined') {
          window.location.href = '/work';
        }
        return;
      case 'contact_flow':
      default:
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Great! Let's connect you with the Creativee World strategic growth team to discuss your project.",
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
    };

    const botResponse: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `Thanks for reaching out! To get customized details regarding "${userText}", let's connect directly with our strategic growth consultants:`,
      showContactFlow: true,
    };

    setMessages((prev) => [...prev, userMsg, botResponse]);
  };

  return (
    <>
      {/* Floating Spectrum Gradient Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center p-4 bg-cw-gradient text-white rounded-full shadow-cw-glow hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
          aria-label="Toggle Creativee World Assistant Bot"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00CFFF] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00CFFF]" />
          </span>

          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <div className="flex items-center gap-2.5 px-1">
              <Bot size={22} className="text-white" />
              <span className="font-display font-semibold text-xs text-white hidden sm:inline-block">
                Creativee Assistant
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window Popup Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[82vh] cw-glass-card rounded-3xl border border-white/20 bg-[#07090E]/95 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center p-1.5 backdrop-blur-md">
                <Image
                  src="/brand/symbol-only-transparent.png"
                  alt="Creativee World"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-white block">
                  Creativee Assistant
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-light">
                  <span className="w-2 h-2 rounded-full bg-[#00CFFF] inline-block animate-pulse" />
                  Online • Digital Growth Bot
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Assistant Bot"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 overflow-y-auto space-y-4 flex-1 bg-slate-950/60 max-h-[460px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                {/* Chat Bubble */}
                <div
                  className={`p-3.5 text-xs font-sans leading-relaxed max-w-[85%] rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-cw-gradient text-white font-medium shadow-cw-glow'
                      : 'bg-slate-900 text-slate-200 border border-white/10 shadow-md font-light'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Option Buttons */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 max-w-[95%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-cw-gradient hover:text-white border border-white/15 text-xs font-medium text-slate-300 transition-all duration-200 text-left hover:border-transparent hover:shadow-cw-glow"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Contact and Direct Connection Sequence */}
                {msg.showContactFlow && (
                  <div className="w-full mt-3 p-4 rounded-2xl border border-white/15 bg-slate-900/90 space-y-3">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[#00CFFF] font-semibold uppercase tracking-wider block">
                        Step 1 • Growth Audit & Intake
                      </span>
                      <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between w-full p-2.5 rounded-xl bg-cw-gradient text-white hover:opacity-90 transition-opacity text-xs font-semibold"
                      >
                        <span>Contact Creativee World</span>
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider block">
                        Connect Directly With Strategic Consultants
                      </span>
                      <div className="flex flex-col gap-2">
                        <a
                          href="https://wa.me/917062597062?text=Hello%20Creativee%20World%20team%2C%20I%27m%20interested%20in%20your%20services.%20I%27d%20like%20to%20discuss%20my%20project."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#00CFFF] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span>WhatsApp Direct</span>
                          </span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendCustomMessage}
            className="p-3 border-t border-white/10 bg-slate-900/90 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask Creativee World AI anything..."
              className="flex-1 px-4 py-2.5 rounded-full bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00CFFF]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-cw-gradient text-white hover:opacity-90 transition-opacity shadow-cw-glow"
              aria-label="Send Message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
