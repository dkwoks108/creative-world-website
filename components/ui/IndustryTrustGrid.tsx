'use client';

import React from 'react';
import { 
  GraduationCap, 
  Landmark, 
  Stethoscope, 
  Building2, 
  Compass, 
  TrendingUp, 
  Dumbbell, 
  UtensilsCrossed, 
  Shirt, 
  Video, 
  Briefcase, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

interface SectorDomain {
  name: string;
  tagline: string;
  icon: React.ReactNode;
  countText: string;
}

const DOMAIN_SECTORS: SectorDomain[] = [
  { name: 'Education & Academics', tagline: 'Coaching, Colleges & EdTech', icon: <GraduationCap className="w-6 h-6 text-[#00CFFF]" />, countText: '2 Sectors' },
  { name: 'Government & Leadership', tagline: 'Campaigns & Procurement Vaults', icon: <Landmark className="w-6 h-6 text-[#00CFFF]" />, countText: '2 Sectors' },
  { name: 'Healthcare & Medical', tagline: 'Doctors, Clinics & Rehab Systems', icon: <Stethoscope className="w-6 h-6 text-[#00CFFF]" />, countText: '2 Sectors' },
  { name: 'Hospitality & Luxury', tagline: 'Hotels, Resorts & Event Venues', icon: <Building2 className="w-6 h-6 text-[#00CFFF]" />, countText: '1 Sector' },
  { name: 'Travel & Tourism', tagline: 'Itineraries & DMC Booking Engines', icon: <Compass className="w-6 h-6 text-[#00CFFF]" />, countText: '1 Sector' },
  { name: 'Finance & Trading', tagline: 'Stock Academies & Masterclass Funnels', icon: <TrendingUp className="w-6 h-6 text-[#00CFFF]" />, countText: '1 Sector' },
  { name: 'Health & Fitness', tagline: 'Gyms, Fitness Clubs & Trainers', icon: <Dumbbell className="w-6 h-6 text-[#00CFFF]" />, countText: '1 Sector' },
  { name: 'Food & Beverage', tagline: 'Cafés, Dining & QR Table Ordering', icon: <UtensilsCrossed className="w-6 h-6 text-[#00CFFF]" />, countText: '1 Sector' },
  { name: 'Fashion & Boutique', tagline: 'Apparel Brands & Lookbook Checkout', icon: <Shirt className="w-6 h-6 text-[#00CFFF]" />, countText: '1 Sector' },
  { name: 'Creators & Influencers', tagline: 'Vloggers, Instagram Tutors & Media Kits', icon: <Video className="w-6 h-6 text-[#00CFFF]" />, countText: '2 Sectors' },
  { name: 'Professional Services', tagline: 'Lawyers, Studios & Artists', icon: <Briefcase className="w-6 h-6 text-[#00CFFF]" />, countText: '2 Sectors' },
  { name: 'Consumer & Organic Brands', tagline: 'Sustainable Products & Subscriptions', icon: <ShoppingBag className="w-6 h-6 text-[#00CFFF]" />, countText: '1 Sector' }
];

export function IndustryTrustGrid() {
  return (
    <div className="space-y-12 text-white">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 font-mono text-xs uppercase tracking-widest font-semibold bg-slate-900/80 text-slate-300 backdrop-blur-md">
          <span>CROSS-INDUSTRY SYSTEM CAPABILITY</span>
        </div>
        <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-tight leading-none text-white uppercase">
          Built For Real-World Business Challenges
        </h2>
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
          From civil service academies to luxury hotels, law practices, and sustainable consumer brands—Creativee World constructs custom digital systems around real operational needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {DOMAIN_SECTORS.map((domain, idx) => (
          <div 
            key={idx}
            className="group p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md hover:border-[#00CFFF]/40 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl border border-white/10 bg-slate-800/80 group-hover:bg-[#00CFFF]/10 transition-colors">
                  {domain.icon}
                </div>
                <span className="font-mono text-[10px] uppercase font-semibold tracking-widest text-slate-400">
                  {domain.countText}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl leading-tight text-white group-hover:text-[#00CFFF] transition-colors">
                  {domain.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {domain.tagline}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
              <span>EXPLORE SOLUTIONS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#00CFFF]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
