'use client';

import React from 'react';
import Link from 'next/link';
import { CreativeeLogo } from '@/components/ui/CreativeeLogo';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#07090E] border-t border-slate-800/80 text-slate-400 pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Agency Brand & Mission */}
          <div className="lg:col-span-2 space-y-6">
            <CreativeeLogo textColor="#ffffff" height={34} />
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Creativee World is Jaipur’s leading digital growth & creative technology studio. We engineer high-conversion Meta reels, authority SEO, intent Google Ads, and sub-2s web software for commercial growth.
            </p>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#00CFFF]" />
                <span>C-Scheme, Jaipur, Rajasthan 302001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#00CFFF]" />
                <a href="mailto:marketing.creativeworld@gmail.com" className="hover:text-white transition-colors">marketing.creativeworld@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#00CFFF]" />
                <a href="tel:+917357159122" className="hover:text-white transition-colors">+91 73571 59122</a>
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services#seo" className="hover:text-white transition-colors">Connected Search SEO</Link></li>
              <li><Link href="/services#performance" className="hover:text-white transition-colors">Performance Ads (Meta/Google)</Link></li>
              <li><Link href="/services#web" className="hover:text-white transition-colors">Next.js Web Engineering</Link></li>
              <li><Link href="/services#reels" className="hover:text-white transition-colors">High-Converting Video Production</Link></li>
              <li><Link href="/services#gmb" className="hover:text-white transition-colors">Local GMB Dominance</Link></li>
            </ul>
          </div>

          {/* Column 3: Growth Systems */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Growth Systems</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Growth Capabilities</Link></li>
              <li><Link href="/packages" className="hover:text-white transition-colors">Growth Packages</Link></li>
              <li><Link href="/work" className="hover:text-white transition-colors">Client Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Agency Overview</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Strategy Team</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Audit */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Studio</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/work" className="hover:text-white transition-colors">Case Studies & Dossier</Link></li>
              <li><Link href="/packages" className="hover:text-white transition-colors">Investment Packages</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Agency Philosophy</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Insights</Link></li>
              <li>
                <Link href="/growth-audit" className="inline-flex items-center gap-1 text-[#00CFFF] font-semibold hover:underline">
                  <span>Free Growth Audit</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <span>© {new Date().getFullYear()} Creativee World Digital Growth Studio. All rights reserved. Jaipur, Rajasthan.</span>
            <div className="flex items-center space-x-4 text-slate-400">
              <span className="hidden sm:inline text-slate-700">•</span>
              <Link href="/privacy-policy" className="hover:text-[#00CFFF] transition-colors">Privacy Policy</Link>
              <span className="text-slate-700">•</span>
              <Link href="/terms-of-service" className="hover:text-[#00CFFF] transition-colors">Terms of Service</Link>
              <span className="text-slate-700">•</span>
              <Link href="/sitemap" className="hover:text-[#00CFFF] transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
