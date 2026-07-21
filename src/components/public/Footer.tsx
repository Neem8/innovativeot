'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Award, CheckCircle2 } from 'lucide-react';
import { CLINIC_LOCATIONS } from '@/lib/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2538] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: About & Values */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-[#0B2538] font-extrabold flex items-center justify-center text-lg">
                iOT
              </div>
              <div className="flex items-center gap-1 text-xl font-bold text-white">
                <span>INNOVATIVE</span>
                <span className="text-teal-400 font-light">OT</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Ontario-based occupational therapy practice operating since 2015. Delivering evidence-based clinical, hospital-integrated, and community/virtual OT care across Ontario.
            </p>
            
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block mb-2">Our Core Values</span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Compassionate Care',
                  'Interdisciplinary Excellence',
                  'Healthcare Partner Support',
                  'Continuity of Care',
                  'Prevention & Education',
                  'Community Impact'
                ].map((val, idx) => (
                  <span key={idx} className="text-xs bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" /> {val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Clinic Locations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Clinic Locations</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              {CLINIC_LOCATIONS.filter(l => l.id !== 'community_virtual').map(loc => (
                <li key={loc.id} className="space-y-0.5">
                  <div className="font-semibold text-slate-200 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{loc.name}</span>
                  </div>
                  <p className="pl-4 text-[11px] text-slate-400">{loc.address}, {loc.city}</p>
                </li>
              ))}
              <li className="pt-1">
                <span className="font-semibold text-teal-400 block">+ Province-Wide Virtual & Community Services</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Lines */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Service Lines</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/services#pediatric" className="hover:text-teal-300">Pediatric OT & OAP Autism</Link></li>
              <li><Link href="/services#mva" className="hover:text-teal-300">MVA & Catastrophic Injury</Link></li>
              <li><Link href="/services#ergo" className="hover:text-teal-300">Workplace Ergonomics & Job Demands</Link></li>
              <li><Link href="/services#rtw" className="hover:text-teal-300">WSIB & Vocational RTW</Link></li>
              <li><Link href="/services#driver" className="hover:text-teal-300">Driver Rehab & Assessment</Link></li>
              <li><Link href="/services#geriatric" className="hover:text-teal-300">Home Safety & Fall Prevention</Link></li>
              <li><Link href="/services#mental-health" className="hover:text-teal-300">Community Mental Health & Psychotherapy</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Access */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact & Portals</h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a href="tel:2892144467" className="flex items-center gap-2 hover:text-teal-300">
                <Phone className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-sm text-white">289-214-4467</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>intake@innovativeot.ca</span>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <Link 
                  href="/portal/referrer" 
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 font-medium text-xs text-center border border-slate-700"
                >
                  Referrer Portal Login
                </Link>
                <Link 
                  href="/portal/client" 
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs text-center border border-slate-700"
                >
                  Client / Family Portal
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & AODA */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} InnovativeOT Solutions Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> PHIPA & PIPEDA Compliant
            </span>
            <span className="text-slate-400">AODA Accessibility Standard</span>
            <Link href="/contact" className="hover:text-slate-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
