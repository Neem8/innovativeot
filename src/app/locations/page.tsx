'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { CLINIC_LOCATIONS } from '@/lib/mockData';
import { MapPin, Phone, Building2, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const RealLeafletMap = dynamic(
  () => import('@/components/public/RealLeafletMap').then(mod => mod.RealLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-12 text-center text-slate-500 font-medium space-y-2">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs">Loading OpenStreetMap real-world clinic map...</p>
      </div>
    )
  }
);

export default function LocationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <section className="bg-[#0F3854] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            Physical Clinics & Mobile Tele-OT
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Our Locations & Service Areas
          </h1>
          <p className="text-slate-300 text-base max-w-3xl mx-auto">
            Conveniently located inside major Ontario health systems and community clinics, backed by province-wide virtual and in-home OT visits.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-12">
        
        {/* Real OpenStreetMap Interactive Leaflet Map */}
        <RealLeafletMap />

        {/* Physical Clinics Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-teal-600" />
            <span>Physical Clinic Locations</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLINIC_LOCATIONS.filter(l => l.id !== 'community_virtual').map(loc => (
              <div 
                key={loc.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {loc.isHospitalCoLocated ? (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" /> Hospital Co-Located
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        Regional OT Centre
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-500">Ontario</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{loc.name}</h3>
                    {loc.hospitalName && (
                      <p className="text-xs font-semibold text-teal-600 mt-0.5">{loc.hospitalName}</p>
                    )}
                    <p className="text-sm text-slate-600 mt-2 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{loc.address}, {loc.city}, ON {loc.postalCode}</span>
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Regions Serviced</span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.regionsCovered.map(reg => (
                        <span key={reg} className="text-xs bg-white text-slate-700 px-2.5 py-0.5 rounded font-medium border border-slate-200">
                          ✓ {reg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a 
                    href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} 
                    className="text-xs font-bold text-slate-800 flex items-center gap-1.5 hover:text-teal-600"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>{loc.phone}</span>
                  </a>
                  <Link
                    href={`/referral?location=${loc.id}`}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    <span>Book at Location</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Province Wide Community Banner */}
        <div className="bg-linear-to-r from-[#0F3854] to-teal-800 text-white rounded-2xl p-8 shadow-lg space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">Province-Wide Coverage</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Community & Virtual Care Network</h2>
            <p className="text-slate-200 text-sm max-w-3xl">
              Can't make it to a clinic? Our registered occupational therapists deliver in-home assessments, workplace evaluations, and secure video Tele-OT across all Ontario health regions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              'GTA (Toronto, York, Peel)',
              'Niagara Region',
              'Hamilton & Halton',
              'Southwestern (Kitchener, London)',
              'Central (Barrie, Simcoe)',
              'Durham Region',
              'Eastern Ontario (Ottawa)',
              'Northern Ontario'
            ].map(reg => (
              <div key={reg} className="bg-white/10 backdrop-blur-xs px-3 py-2 rounded-lg text-xs font-medium text-slate-100 flex items-center gap-1.5 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span>{reg}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-teal-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-teal-300" /> PHIPA Compliant Telehealth Security Guaranteed
            </div>
            <Link
              href="/referral?location=community_virtual"
              className="px-6 py-3 rounded-xl bg-teal-400 text-slate-950 font-bold text-sm hover:bg-teal-300 transition-colors shadow-md"
            >
              Request Community / Virtual Visit
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
