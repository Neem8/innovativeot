'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { ButterflyVideo } from '@/components/public/ButterflyVideo';
import { INITIAL_THERAPISTS } from '@/lib/mockData';
import { Heart, Award, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, MapPin } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      {/* Hero Header with Natural Butterfly Video */}
      <section className="relative bg-slate-950 text-white py-20 border-b border-slate-800 overflow-hidden">
        <ButterflyVideo overlayOpacity="bg-linear-to-r from-[#0F3854]/60 via-[#0F3854]/30 to-[#0F3854]/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
            Founded 2015 • OT-Led Practice
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Our Story & Clinical Team
          </h1>
          <p className="text-slate-200 text-base max-w-3xl mx-auto">
            Founded by an Occupational Therapist with a vision to transform fragmented healthcare into a compassionate, interdisciplinary continuum of care across Ontario.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 space-y-16">
        
        {/* Founder & Practice Origin */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Practicing Across Ontario Since 2015</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Built by OTs, for Clients, Referrers, and Healthcare Partners
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              InnovativeOT began in 2015 when our founder recognized a critical breakdown in Ontario rehabilitation: clients leaving hospital trauma units or living with complex conditions were trapped in long waitlists, fragmented communication between physicians, insurers, and lawyers, and generic care plans.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Today, our practice operates physical clinics inside major Ontario hospital networks (Oakville Trafalgar, Marotta Family Hospital St. Catharines, Benton Medical Kitchener) alongside a robust community tele-OT network.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 space-y-6 border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Our 7 Pillars of Excellence
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              {[
                { title: 'Compassionate Care', desc: 'Treating the whole person, not just a diagnosis code.' },
                { title: 'Interdisciplinary Excellence', desc: 'Seamless collaboration with physicians, lawyers & adjusters.' },
                { title: 'Healthcare Partner Support', desc: 'Objective, rapid reporting formatted for downstream needs.' },
                { title: 'Continuity of Care', desc: 'Unbroken transition from hospital discharge to community.' },
                { title: 'Innovation in Prevention', desc: 'Proactive ergonomic & fall prevention strategies.' },
                { title: 'Empowerment Through Education', desc: 'Equipping families with self-advocacy tools.' },
                { title: 'Community Impact', desc: 'Accessible care across urban, rural, and remote regions.' }
              ].map((p, idx) => (
                <li key={idx} className="space-y-0.5">
                  <div className="font-bold text-teal-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{p.title}</span>
                  </div>
                  <p className="pl-5 text-slate-400">{p.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Clinical Team Profiles */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Registered Practitioners
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Meet Our Clinical Team</h2>
            <p className="text-slate-600 text-sm">
              All therapists are registered with the College of Occupational Therapists of Ontario (COTO).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIAL_THERAPISTS.map(th => (
              <div key={th.id} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-teal-500 mx-auto shadow-md">
                    <img src={th.avatarUrl} alt={th.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-base font-bold text-slate-900">{th.name}</h3>
                    <p className="text-xs text-teal-600 font-medium">{th.credentials}</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-center italic">
                    "{th.bio}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span>Active Caseload:</span>
                    <span className="font-bold text-slate-900">{th.activeCaseloadCount}/{th.maxCaseloadCapacity} clients</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center pt-1">
                    {th.specialties.map(s => (
                      <span key={s} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold uppercase">
                        {s.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
