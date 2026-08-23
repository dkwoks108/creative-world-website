'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, X, ArrowRight, ExternalLink, Send, Bot, CheckCircle2, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: string }[];
  showContactFlow?: boolean;
}

export function SurnaxAssistantBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Hello! Welcome to Surnax. I'm your digital growth assistant. How can we accelerate your business today?",
      options: [
        { label: 'Website Development', action: 'web_dev' },
        { label: 'Digital Marketing', action: 'digital_mkt' },
        { label: 'Automation', action: 'automation' },
        { label: 'AI Solutions', action: 'ai_solutions' },
        { label: 'Case Studies', action: 'case_studies' },
        { label: 'Contact Surnax', action: 'contact_flow' },
      ],
    },
  ]);

  const handleOptionClick = (option: { label: string; action: string }) => {
    // Add user selection message
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
          text: 'We engineer high-converting, lightning-fast custom websites built with Next.js, TypeScript, and modern headless architectures.',
          showContactFlow: true,
        };
        break;
      case 'digital_mkt':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Our performance marketing systems combine Meta Ads, Google Ads, and local SEO to drive high-intent commercial buyers.',
          showContactFlow: true,
        };
        break;
      case 'automation':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'We build custom workflow automations, CRM integrations, and sales lead routing to eliminate manual overhead.',
          showContactFlow: true,
        };
        break;
      case 'ai_solutions':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'We deploy AI search intelligence (GEO/AEO), custom chatbots, and automated content engines tailored for your enterprise.',
          showContactFlow: true,
        };
        break;
      case 'case_studies':
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Explore how Surnax drove ₹14.8Cr+ in pipeline growth across real estate, education, and e-commerce clients.',
          options: [{ label: 'View All Case Studies →', action: 'goto_work' }],
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
          text: "Great! Let's connect you with the Surnax strategic team to discuss your project.",
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
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center p-4 bg-black text-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
          aria-label="Toggle Surnax Assistant Bot"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>

          {isOpen ? (
            <X size={24} strokeWidth={2.5} />
          ) : (
            <div className="flex items-center gap-2.5">
              <Bot size={22} strokeWidth={2} />
              <span className="font-mono text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
                SURNAX BOT
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window Popup Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[80vh] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-black text-white border-b-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 border border-white/40 bg-neutral-900">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest block text-white">
                  SURNAX ASSISTANT
                </span>
                <span className="font-mono text-[10px] text-neutral-400 block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  ONLINE // REAL-TIME GROWTH BOT
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close Assistant Bot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 overflow-y-auto space-y-4 flex-1 bg-neutral-50 max-h-[460px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                {/* Bubble */}
                <div
                  className={`p-3.5 text-xs font-serifBody leading-relaxed max-w-[85%] border-2 border-black ${
                    msg.sender === 'user'
                      ? 'bg-black text-white font-medium'
                      : 'bg-white text-black shadow-sm'
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
                        className="px-3 py-1.5 bg-white hover:bg-black hover:text-white border-2 border-black text-[11px] font-mono font-bold uppercase tracking-wider transition-colors duration-150 text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Contact and Social Connection Sequence */}
                {msg.showContactFlow && (
                  <div className="w-full mt-3 p-4 border-2 border-black bg-white space-y-4">
                    {/* Step 1: Visit Contact Page */}
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-widest block">
                        STEP 1 // CONTACT FORM
                      </span>
                      <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between w-full p-2.5 bg-black text-white border-2 border-black hover:bg-neutral-800 transition-colors text-xs font-mono font-bold uppercase tracking-wider"
                      >
                        <span>Contact Surnax →</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Step 2: Direct Connections */}
                    <div className="space-y-2 pt-2 border-t border-neutral-200">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest block text-black">
                        CONNECT WITH SURNAX DIRECTLY
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <a
                          href="https://wa.me/917062597062?text=Hello%20Surnax%20team%2C%20I%27m%20interested%20in%20your%20services.%20I%27d%20like%20to%20discuss%20my%20project."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 bg-neutral-100 hover:bg-black hover:text-white border-2 border-black text-xs font-mono font-bold uppercase transition-colors"
                        >
                          <span>WhatsApp →</span>
                          <ExternalLink size={13} />
                        </a>

                        <a
                          href="https://www.linkedin.com/company/surnax-technologies/?viewAsMember=true"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 bg-neutral-100 hover:bg-black hover:text-white border-2 border-black text-xs font-mono font-bold uppercase transition-colors"
                        >
                          <span>LinkedIn →</span>
                          <ExternalLink size={13} />
                        </a>

                        <a
                          href="https://www.instagram.com/surnaxtech"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 bg-neutral-100 hover:bg-black hover:text-white border-2 border-black text-xs font-mono font-bold uppercase transition-colors"
                        >
                          <span>Instagram →</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>

                    {/* Step 3: Linktree */}
                    <div className="space-y-2 pt-2 border-t border-neutral-200">
                      <span className="font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-widest block">
                        MORE WAYS TO CONNECT
                      </span>
                      <a
                        href="https://linktr.ee/surnax?utm_source=linktree_profile_share&ltsid=5a627716-4538-4b6e-906c-64ed173b75ac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full p-2.5 bg-neutral-200 text-black border-2 border-black hover:bg-black hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-wider"
                      >
                        <span>Explore More Ways to Connect →</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendCustomMessage}
            className="p-3 border-t-2 border-black bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask Surnax AI anything..."
              className="flex-1 px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-neutral-50"
            />
            <button
              type="submit"
              className="p-2 bg-black text-white border-2 border-black hover:bg-neutral-800 transition-colors"
              aria-label="Send Message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
