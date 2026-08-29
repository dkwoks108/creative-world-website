'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreativeeLogo } from '@/components/ui/CreativeeLogo';
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { CWButton } from '@/components/ui/CWButton';
import { CWBadge } from '@/components/ui/CWBadge';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const [address, setAddress] = useState('Jaipur, Rajasthan, India');
  const [email, setEmail] = useState('hello@creativeworld.in');
  const [phone, setPhone] = useState('+91 98290 12345');
  const [copyright, setCopyright] = useState(`© ${currentYear} Creativee World. All rights reserved.`);

  useEffect(() => {
    fetch('/api/site-data')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          if (data.settings.company_address) setAddress(data.settings.company_address);
          if (data.settings.company_email) setEmail(data.settings.company_email);
          if (data.settings.company_phone) setPhone(data.settings.company_phone);
          if (data.settings.footer_copyright) setCopyright(data.settings.footer_copyright);
        }
      })
      .catch((err) => console.error('Footer site-data error:', err));
  }, [currentYear]);

  return (
    <footer className="relative bg-[#07090E] text-slate-100 border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Ambient Gradient Glow Field */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-radial from-[#1769FF]/20 via-[#D900FF]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Top CTA Immersion Banner */}
        <div className="cw-glass-card rounded-3xl p-8 sm:p-12 border border-white/15 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950/90 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <CWBadge variant="cyan">
              <Sparkles size={13} />
              <span>Ready for Predictable Growth?</span>
            </CWBadge>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Turn your business into a <span className="text-cw-gradient">digital growth engine.</span>
            </h3>
            <p className="text-sm text-slate-300 max-w-xl font-light">
              Get a custom 15-minute diagnostic detailing traffic bottlenecks, ad efficiency, and web conversion opportunities in Jaipur.
            </p>
          </div>

          <Link href="/growth-audit" className="shrink-0">
            <CWButton variant="gradient" size="lg">
              <span>Start Your Growth Audit</span>
              <ArrowUpRight size={18} />
            </CWButton>
          </Link>
        </div>

        {/* 4 Column Directory Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-6">
          
          {/* Col 1: Studio Identity & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <CreativeeLogo textColor="#ffffff" height={30} />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed font-light max-w-sm">
              Creativee World is a premier digital growth technology studio in Jaipur combining custom web development, short video production, search intelligence, and performance marketing.
            </p>

            <div className="space-y-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#00CFFF]" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#00CFFF]" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#00CFFF]" />
                <span>{phone}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white tracking-wide">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-light">
              <li><Link href="/services/website-development" className="hover:text-[#00CFFF] transition-colors">Web Development</Link></li>
              <li><Link href="/services/seo" className="hover:text-[#00CFFF] transition-colors">SEO & Search Authority</Link></li>
              <li><Link href="/services/google-ads" className="hover:text-[#00CFFF] transition-colors">Google Ads</Link></li>
              <li><Link href="/services/performance-marketing" className="hover:text-[#00CFFF] transition-colors">Meta Performance Ads</Link></li>
              <li><Link href="/services/reels-video-production" className="hover:text-[#00CFFF] transition-colors">Video & Short Reels</Link></li>
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white tracking-wide">
              Sectors
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-light">
              <li><Link href="/industries/ias-upsc-coaching" className="hover:text-[#00CFFF] transition-colors">UPSC Coaching</Link></li>
              <li><Link href="/industries/real-estate" className="hover:text-[#00CFFF] transition-colors">Luxury Real Estate</Link></li>
              <li><Link href="/industries/healthcare-clinics" className="hover:text-[#00CFFF] transition-colors">Healthcare & Clinics</Link></li>
              <li><Link href="/industries/retail-jewelry" className="hover:text-[#00CFFF] transition-colors">Fine Jewelry & Retail</Link></li>
            </ul>
          </div>

          {/* Col 4: Studio */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white tracking-wide">
              Studio
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-light">
              <li><Link href="/about" className="hover:text-[#00CFFF] transition-colors">About Studio</Link></li>
              <li><Link href="/work" className="hover:text-[#00CFFF] transition-colors">Case Studies</Link></li>
              <li><Link href="/insights" className="hover:text-[#00CFFF] transition-colors">Insights & Journal</Link></li>
              <li><Link href="/contact" className="hover:text-[#00CFFF] transition-colors">Contact Studio</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <p>{copyright}</p>
          
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
