'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { useStore } from '@/context/StoreContext';
import { Briefcase, Search, Plus, ShieldCheck, ArrowRight, FileText, CheckCircle2, Lock } from 'lucide-react';

export default function ReferrerPortalPage() {
  const { cases } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                Healthcare Partner Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">PHIPA Compliant Privacy Filter</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Referrer Case Status Portal</h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              For Physicians, Personal Injury Lawyers, WSIB Adjusters, and HR Coordinators to track referral status real-time without exposing confidential clinical PHI.
            </p>
          </div>

          <Link
            href="/referral"
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Submit New Online Referral</span>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-8">
        
        {/* Security & Privacy Guarantee */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
            <span>
              <strong>PHI Shielded View:</strong> Legal counsel and adjusters view real-time pipeline status, approval dates, and shared assessment summaries only.
            </span>
          </div>
          <span className="font-bold text-blue-800 hidden sm:inline">PHIPA Compliant</span>
        </div>

        {/* Referred Cases Status List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Your Referred Clients ({cases.length})</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map(c => (
              <div key={c.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">Ref ID: {c.referralId}</span>
                    <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
                      Stage: {c.stage.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{c.fullName}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Service: <span className="capitalize text-slate-800 font-bold">{c.serviceLine.replace('_', ' ')}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block font-semibold">Assigned OT:</span>
                      <span className="font-bold text-teal-700">{c.assignedTherapistName || 'Pending Assignment'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Payer Authorization:</span>
                      <span className="font-bold text-slate-800 uppercase">{c.payerAuth.payerType} ({c.payerAuth.approvedSessionsUsed || 0}/{c.payerAuth.approvedSessionsTotal || 12} sessions)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Shared Files: {c.documents.filter(d => d.isSharedWithReferrer).length} Reports</span>
                  <Link
                    href={`/platform/cases/${c.id}`}
                    className="text-teal-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Status Summary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
