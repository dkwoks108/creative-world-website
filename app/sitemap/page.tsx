import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { caseStudiesData } from '@/data/case-studies';
import { insightsData } from '@/data/insights';
import { ArrowUpRight, Compass, ShieldCheck, FileText, Cpu, Briefcase, Zap, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Sitemap | Creativee World Jaipur',
  description: 'Complete visual index of all capabilities, case studies, insights, growth packages, and legal policies across Creativee World.',
  openGraph: {
    title: 'HTML Sitemap | Creativee World Digital Growth Studio',
    description: 'Explore the full architectural index of Creativee World services, growth playbooks, and insights.',
  },
};

export default function HTMLSitemapPage() {
  const mainPages = [
    { name: 'Home', href: '/', desc: 'Primary landing & growth engine portal' },
    { name: 'Services & Capabilities', href: '/services', desc: 'Connected SEO, performance ads, video production & Next.js web engineering' },
    { name: 'Client Work & Playbooks', href: '/work', desc: 'Verified client dossier, case studies, and ROI metrics' },
    { name: 'Growth Investment Packages', href: '/packages', desc: 'Transparent starter, growth, and scale monthly retainer packages' },
    { name: 'About Agency Philosophy', href: '/about', desc: 'Our engineering-led performance marketing ethos in Jaipur' },
    { name: 'Insights & Thought Leadership', href: '/insights', desc: 'Deep-dive articles on SEO, performance marketing & CRO' },
    { name: 'Free Growth Audit', href: '/growth-audit', desc: 'Request a diagnostic review of your search and ad performance' },
    { name: 'Contact Strategy Team', href: '/contact', desc: 'Direct email, WhatsApp & studio location details' },
  ];

  const legalPages = [
    { name: 'Privacy Policy', href: '/privacy-policy', desc: 'Data governance, audit enquiry handling, and privacy standards' },
    { name: 'Terms of Service', href: '/terms-of-service', desc: 'Commercial terms, media spend disclaimers, and project governance' },
    { name: 'XML Machine Sitemap', href: '/sitemap.xml', desc: 'Raw search engine crawler index (XML format)' },
  ];

  return (
    <main className="min-h-screen bg-[#07090E] text-white pt-32 pb-24 px-6 sm:px-10 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#00CFFF]/10 via-[#8B5CF6]/10 to-[#EC4899]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-white/10 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/25 text-[#00CFFF] text-xs font-mono font-semibold uppercase tracking-widest">
            <Compass size={14} />
            <span>ARCHITECTURE INDEX</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Visual Website <span className="bg-gradient-to-r from-[#00CFFF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">Sitemap</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-light">
            Comprehensive navigational index of all core growth portals, service capabilities, client playbooks, insights, and legal governance policies across Creativee World.
          </p>
        </div>

        {/* Grid Section 1: Main Portals */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[#00CFFF]">
              <Zap size={20} />
            </div>
            <h2 className="font-display font-bold text-2xl text-white">Main Growth Portals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-5 rounded-2xl border border-white/10 bg-[#0B0F1A]/80 hover:bg-[#0E1526] hover:border-[#00CFFF]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-white group-hover:text-[#00CFFF] transition-colors">
                      {page.name}
                    </span>
                    <ArrowUpRight size={18} className="text-slate-500 group-hover:text-[#00CFFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {page.desc}
                  </p>
                </div>
                <span className="mt-4 text-[11px] font-mono text-cyan-400/70 group-hover:text-cyan-300">
                  {page.href}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Grid Section 2: Detailed Capabilities */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Cpu size={20} />
            </div>
            <h2 className="font-display font-bold text-2xl text-white">Service Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesData.map((s) => (
              <Link
                key={s.id}
                href={`/services#${s.id}`}
                className="group p-5 rounded-2xl border border-white/10 bg-[#0B0F1A]/80 hover:bg-[#0E1526] hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                      {s.title}
                    </span>
                    <ArrowUpRight size={16} className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2">
                    {s.description}
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-mono text-purple-400/70 group-hover:text-purple-300">
                  /services#{s.id}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Grid Section 3: Verified Case Studies & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Case Studies Column */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Briefcase size={20} />
              </div>
              <h2 className="font-display font-bold text-2xl text-white">Verified Client Case Studies</h2>
            </div>
            <div className="space-y-3">
              {caseStudiesData.map((cs) => (
                <Link
                  key={cs.id}
                  href={`/work/${cs.slug}`}
                  className="group p-4 rounded-xl border border-white/10 bg-[#0B0F1A]/80 hover:bg-[#0E1526] hover:border-emerald-500/50 transition-all duration-300 flex items-center justify-between"
                >
                  <div>
                    <span className="font-display font-semibold text-sm text-white group-hover:text-emerald-300 transition-colors">
                      {cs.title}
                    </span>
                    <span className="text-xs text-slate-400 block font-mono">
                      {cs.industryPlaceholder} • {cs.metrics[0]?.label || 'Case Study'}
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500 group-hover:text-emerald-400 shrink-0" />
                </Link>
              ))}
            </div>
          </section>

          {/* Thought Leadership Insights Column */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <FileText size={20} />
              </div>
              <h2 className="font-display font-bold text-2xl text-white">Growth Insights & Articles</h2>
            </div>
            <div className="space-y-3">
              {insightsData.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="group p-4 rounded-xl border border-white/10 bg-[#0B0F1A]/80 hover:bg-[#0E1526] hover:border-pink-500/50 transition-all duration-300 flex items-center justify-between"
                >
                  <div>
                    <span className="font-display font-semibold text-sm text-white group-hover:text-pink-300 transition-colors">
                      {article.title}
                    </span>
                    <span className="text-xs text-slate-400 block font-mono">
                      {article.category} • {article.readTime}
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500 group-hover:text-pink-400 shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Grid Section 4: Governance & Legal */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <ShieldCheck size={20} />
            </div>
            <h2 className="font-display font-bold text-2xl text-white">Legal & Governance Policies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {legalPages.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="group p-5 rounded-2xl border border-white/10 bg-[#0B0F1A]/80 hover:bg-[#0E1526] hover:border-blue-400/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                      {policy.name}
                    </span>
                    <ArrowUpRight size={16} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {policy.desc}
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-mono text-blue-400/70 group-hover:text-blue-300">
                  {policy.href}
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
