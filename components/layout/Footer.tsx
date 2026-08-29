'use client';

import React from 'react';
import Link from 'next/link';
import { CreativeeLogo } from '@/components/ui/CreativeeLogo';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#07090E] border-t border-slate-800/80 text-slate-400 pt-16 pb-12">
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
                <span>Malviya Nagar, Jaipur, Rajasthan 302017</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#00CFFF]" />
                <span>contact@creativeeworld.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#00CFFF]" />
                <span>+91 98280 00000</span>
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

          {/* Column 3: Industries */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Focus Sectors</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/industries#coaching" className="hover:text-white transition-colors">Coaching & Education</Link></li>
              <li><Link href="/industries#realestate" className="hover:text-white transition-colors">Real Estate & Developers</Link></li>
              <li><Link href="/industries#jewelry" className="hover:text-white transition-colors">Retail & Luxury Jewelry</Link></li>
              <li><Link href="/industries#healthcare" className="hover:text-white transition-colors">Hospitals & Clinics</Link></li>
              <li><Link href="/industries#hospitality" className="hover:text-white transition-colors">Hotels & Hospitality</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Audit */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">Studio</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/work" className="hover:text-white transition-colors">Case Studies & Dossier</Link></li>
              <li><Link href="/packages" className="hover:text-white transition-colors">Investment Packages</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Agency Philosophy</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">Growth Insights</Link></li>
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
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Creativee World Digital Growth Studio. All rights reserved. Jaipur, Rajasthan.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
