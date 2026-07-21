'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { SERVICE_LINES } from '@/lib/mockData';
import { ServiceLineInfo } from '@/lib/types';
import { CheckCircle2, ArrowRight, Sparkles, Filter, Activity, FileText } from 'lucide-react';

export default function ServicesPage() {
  const [selectedAge, setSelectedAge] = useState<string>('all');

  const filteredServices = SERVICE_LINES.filter(service => {
    if (selectedAge === 'all') return true;
    if (selectedAge === 'pediatric') return service.ageBand === 'pediatric' || service.ageBand === 'all';
    if (selectedAge === 'adult') return service.ageBand === 'adult' || service.ageBand === 'all';
    if (selectedAge === 'geriatric') return service.ageBand === 'geriatric' || service.ageBand === 'all';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      {/* Header Banner */}
      <section className="bg-[#0F3854] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            Clinical Practice & Service Lines
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Specialized Occupational Therapy Services
          </h1>
          <p className="text-slate-300 text-base max-w-3xl mx-auto">
            Delivering evidence-based interventions tailored to age, functional goals, and payer authorization frameworks across Ontario.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
        
        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Filter className="w-4 h-4 text-teal-600" />
            <span>Filter by Age Group:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'pediatric', label: 'Pediatric (0-18)' },
              { id: 'adult', label: 'Adult (19-64)' },
              { id: 'geriatric', label: 'Geriatric (65+)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedAge(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedAge === tab.id
                    ? 'bg-[#0F3854] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {filteredServices.map(service => (
            <div 
              id={service.id}
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-md bg-teal-100 text-teal-900 border border-teal-200">
                      {service.ageRangeText}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 uppercase">
                      ID: {service.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">{service.name}</h2>
                  <p className="text-slate-600 text-sm mt-1">{service.shortDesc}</p>
                </div>

                <Link
                  href={`/referral?service=${service.id}`}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-all shadow-sm shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Refer for {service.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
                <div className="lg:col-span-2 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Clinical Overview</h3>
                  <p className="text-slate-700 leading-relaxed">{service.fullDesc}</p>
                </div>

                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Standard Payers</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {service.commonPayers.map(p => (
                        <span key={p} className="text-xs font-semibold bg-white text-slate-800 px-2.5 py-1 rounded border border-slate-200 uppercase shadow-xs">
                          {p.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Validated Outcome Tools</h3>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {service.outcomesTracked.map((outcome, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
