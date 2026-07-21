'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { BarChart3, TrendingUp, Users, Clock, AlertTriangle, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function AnalyticsDashboardPage() {
  const { cases, therapists, auditLogs } = useStore();

  const totalCases = cases.length;
  const activeCases = cases.filter(c => c.stage === 'active').length;
  const pendingFunding = cases.filter(c => c.stage === 'awaiting_funding' || c.stage === 'new').length;
  const totalAuditLogs = auditLogs.length;

  // Referral breakdown
  const sourceCounts: Record<string, number> = {};
  cases.forEach(c => {
    const cat = c.referralSource.category;
    sourceCounts[cat] = (sourceCounts[cat] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
            Practice Operations Overview
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Practice Analytics & KPI Dashboard</h1>
          <p className="text-xs text-slate-500">Real-time metrics on intake throughput, therapist capacity, and funding authorization status.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Active Files</span>
            <Users className="w-5 h-5 text-teal-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{activeCases}</p>
          <span className="text-[11px] text-teal-700 font-semibold">Out of {totalCases} total client records</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Intake & Funding Queue</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-700">{pendingFunding}</p>
          <span className="text-[11px] text-amber-800 font-semibold">Awaiting reviewer / funding decision</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Therapist Capacity</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">74%</p>
          <span className="text-[11px] text-slate-500 font-medium">50 active / 69 max caseload capacity</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">PHIPA Access Events</span>
            <ShieldCheck className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-purple-700">{totalAuditLogs}</p>
          <span className="text-[11px] text-purple-800 font-semibold">Audited PHI access records</span>
        </div>
      </div>

      {/* Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Referral Source Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Referrals by Source Category</h2>

          <div className="space-y-3">
            {[
              { cat: 'Personal Injury / Legal Counsel', count: sourceCounts['legal'] || 1, color: 'bg-blue-500' },
              { cat: 'Physician / Hospital Discharge', count: sourceCounts['physician_hospital'] || 1, color: 'bg-teal-500' },
              { cat: 'Employer HR / WSIB RTW', count: sourceCounts['employer_hr'] || 1, color: 'bg-amber-500' },
              { cat: 'School Board / OAP Autism', count: sourceCounts['school'] || 1, color: 'bg-purple-500' },
              { cat: 'Self & Community Referrals', count: sourceCounts['self'] || 1, color: 'bg-emerald-500' }
            ].map(item => (
              <div key={item.cat} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{item.cat}</span>
                  <span className="font-extrabold text-slate-900">{item.count} referrals</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / totalCases) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Therapist Utilization Progress Bars */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Therapist Caseload Utilization</h2>

          <div className="space-y-4">
            {therapists.map(th => {
              const utilPct = Math.round((th.activeCaseloadCount / th.maxCaseloadCapacity) * 100);
              return (
                <div key={th.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{th.name.split(',')[0]}</span>
                    <span className="text-teal-700">{th.activeCaseloadCount}/{th.maxCaseloadCapacity} ({utilPct}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${utilPct >= 85 ? 'bg-amber-500' : 'bg-teal-500'}`}
                      style={{ width: `${utilPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
