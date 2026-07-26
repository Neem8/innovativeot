'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { CLINIC_LOCATIONS } from '@/lib/mockData';
import { Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

// Dynamic import for Leaflet map to prevent SSR hydration errors
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

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <section className="bg-[#0F3854] text-white py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            Intake & Practice Contacts
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Contact Health Bound
          </h1>
          <p className="text-slate-300 text-sm">
            We are here to answer questions from clients, families, physicians, lawyers, and insurers.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-12">
        
        {/* Real OpenStreetMap Interactive Leaflet Component */}
        <RealLeafletMap />

        {/* Contact Information & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Intake Desk & Support</h2>
              
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Toll-Free Intake</span>
                    <a href="tel:18665233615" className="font-extrabold text-lg text-[#0F3854] hover:underline">
                      1-866-523-3615
                    </a>
                    <p className="text-xs text-slate-500">Province-Wide Support</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Local Line & Fax</span>
                    <p className="font-bold text-slate-900">Tel: 416-548-7872</p>
                    <p className="text-xs text-slate-500">Fax: 416-850-9609</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Intake & General Email</span>
                    <span className="font-semibold text-slate-900">info@healthbound.ca</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Hours of Operation</span>
                    <p className="font-medium">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-xs text-slate-500">Weekend clinical sessions by appointment</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-teal-600 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Confidential PHIPA Compliant Fax Line Available
                </span>
              </div>
            </div>

            {/* Clinic Addresses */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white">Physical Clinic Addresses</h3>
              <div className="space-y-3 text-xs text-slate-300">
                {CLINIC_LOCATIONS.filter(l => l.id !== 'community_virtual').map(loc => (
                  <div key={loc.id} className="border-b border-slate-800 pb-2.5 space-y-0.5">
                    <span className="font-bold text-teal-300 block">{loc.name}</span>
                    <p className="text-slate-400">{loc.address}, {loc.city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* General Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-teal-600 mx-auto" />
                <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Our intake coordination team will respond within 1 business day.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Send an Inquiry</h2>
                  <p className="text-xs text-slate-500">For non-urgent inquiries or service questions.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Question about OAP funding / MVA rehab"
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Message *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can our clinical team assist you?"
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
