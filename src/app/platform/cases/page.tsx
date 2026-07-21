'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Search, Filter, FolderKanban, ShieldCheck, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';

export default function CasesListPage() {
  const { cases } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [payerFilter, setPayerFilter] = useState('all');

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayer = payerFilter === 'all' || c.payerAuth.payerType === payerFilter;
    return matchesSearch && matchesPayer;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
            PHI Protected Vault
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Client Case Records</h1>
          <p className="text-xs text-slate-500">Active occupational therapy files with multi-payer schema authorization tracking.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by client name or Case ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={payerFilter}
            onChange={e => setPayerFilter(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium outline-none"
          >
            <option value="all">All Payer Types</option>
            <option value="mva_auto">Auto Insurance (MVA SABS)</option>
            <option value="wsib">WSIB Claims</option>
            <option value="oap">Ontario Autism Program (OAP)</option>
            <option value="extended_health">Extended Health</option>
            <option value="private_pay">Private Pay</option>
          </select>
        </div>
      </div>

      {/* Case Files Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Case ID & Client</th>
                <th className="py-3.5 px-4">Service Line</th>
                <th className="py-3.5 px-4">Payer Schema & Expiry</th>
                <th className="py-3.5 px-4">Therapist</th>
                <th className="py-3.5 px-4">Stage</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCases.map(c => {
                const sessionsUsed = c.payerAuth.approvedSessionsUsed || 0;
                const sessionsTotal = c.payerAuth.approvedSessionsTotal || 12;
                const isNearExpiry = (sessionsUsed / sessionsTotal) >= 0.8;

                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <Link href={`/platform/cases/${c.id}`} className="font-bold text-slate-900 hover:text-teal-600 block">
                        {c.fullName}
                      </Link>
                      <span className="text-[10px] text-slate-400 font-mono">{c.id} • DOB: {c.dateOfBirth}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 capitalize">{c.serviceLine.replace('_', ' ')}</span>
                      <p className="text-[10px] text-slate-500">{c.region}</p>
                    </td>

                    <td className="py-3.5 px-4 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold uppercase px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                          {c.payerAuth.payerType.replace('_', ' ')}
                        </span>
                        {isNearExpiry && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-0.5">
                            <AlertTriangle className="w-3 h-3 text-amber-600" /> Renewal Alert
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Claim: {c.payerAuth.claimOrPolicyNumber} ({sessionsUsed}/{sessionsTotal} sessions used)
                      </p>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-teal-700">
                      {c.assignedTherapistName || 'Unassigned'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="capitalize text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {c.stage.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/platform/cases/${c.id}`}
                        className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold text-xs inline-flex items-center gap-1"
                      >
                        <span>Open File</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
