'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { PipelineStage, ClientCase, Therapist } from '@/lib/types';
import { 
  Kanban, 
  Search, 
  Filter, 
  Plus, 
  UserCheck, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Building2, 
  Clock,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

const STAGES: { id: PipelineStage; label: string; colorClass: string; badgeBg: string }[] = [
  { id: 'new', label: 'New Intake', colorClass: 'border-blue-500', badgeBg: 'bg-blue-100 text-blue-900 border-blue-200' },
  { id: 'under_review', label: 'Under Review', colorClass: 'border-purple-500', badgeBg: 'bg-purple-100 text-purple-900 border-purple-200' },
  { id: 'awaiting_funding', label: 'Awaiting Funding', colorClass: 'border-amber-500', badgeBg: 'bg-amber-100 text-amber-900 border-amber-200' },
  { id: 'assigned', label: 'Assigned', colorClass: 'border-cyan-500', badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-200' },
  { id: 'active', label: 'Active Care', colorClass: 'border-emerald-500', badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
  { id: 'discharged', label: 'Discharged', colorClass: 'border-slate-400', badgeBg: 'bg-slate-100 text-slate-700 border-slate-200' },
];

export default function ReferralsKanbanPage() {
  const { cases, therapists, updateCaseStage, assignTherapist } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');
  
  // Auto-Routing Modal State
  const [autoRouteCase, setAutoRouteCase] = useState<ClientCase | null>(null);

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.referralSource.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedServiceFilter === 'all' || c.serviceLine === selectedServiceFilter;
    return matchesSearch && matchesService;
  });

  // Calculate Auto-Routing Matches
  const calculateMatches = (clientCase: ClientCase) => {
    return therapists.map(th => {
      let score = 0;
      const reasons: string[] = [];

      // Specialty Match (40 pts)
      if (th.specialties.includes(clientCase.serviceLine)) {
        score += 40;
        reasons.push(`Specialist in ${clientCase.serviceLine.replace('_', ' ')}`);
      }

      // Region Match (35 pts)
      if (th.servicedRegions.includes(clientCase.region)) {
        score += 35;
        reasons.push(`Covers ${clientCase.region} region`);
      }

      // Capacity Match (25 pts)
      const availableCapacity = th.maxCaseloadCapacity - th.activeCaseloadCount;
      if (availableCapacity > 0) {
        const capacityPct = (availableCapacity / th.maxCaseloadCapacity) * 25;
        score += Math.round(capacityPct);
        reasons.push(`${availableCapacity} open caseload slots`);
      } else {
        reasons.push('At maximum caseload capacity');
      }

      return { therapist: th, score, reasons };
    }).sort((a, b) => b.score - a.score);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
              Operations Intake
            </span>
            <span className="text-xs text-slate-500 font-mono">Live Sync</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Referral Pipeline (Kanban)</h1>
          <p className="text-xs text-slate-500">Track referrals from intake to funding approval, therapist routing, active care, and discharge.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/referral"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Intake Form</span>
          </Link>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search client name, ref source..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedServiceFilter}
            onChange={e => setSelectedServiceFilter(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium outline-none"
          >
            <option value="all">All Service Lines</option>
            <option value="mva_rehab">MVA Auto Rehab</option>
            <option value="pediatric">Pediatric OT</option>
            <option value="workplace_ergo">Workplace Ergo</option>
            <option value="home_mods">Home Mods</option>
            <option value="mental_health">Mental Health</option>
          </select>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const stageCases = filteredCases.filter(c => c.stage === stage.id);

          return (
            <div 
              key={stage.id}
              className={`bg-slate-100/80 rounded-2xl p-3 border-t-4 ${stage.colorClass} border-x border-b border-slate-200/90 flex flex-col min-h-[500px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800">{stage.label}</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                  {stageCases.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                {stageCases.map(clientCase => (
                  <div
                    key={clientCase.id}
                    className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 group"
                  >
                    <div className="flex items-start justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${stage.badgeBg}`}>
                        {clientCase.payerAuth.payerType.toUpperCase()}
                      </span>
                      {clientCase.urgency === 'urgent' && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                          URGENT
                        </span>
                      )}
                    </div>

                    <div>
                      <Link 
                        href={`/platform/cases/${clientCase.id}`}
                        className="font-bold text-sm text-slate-900 hover:text-teal-600 transition-colors block"
                      >
                        {clientCase.fullName}
                      </Link>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Ref Source: {clientCase.referralSource.organizationName}
                      </p>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-600">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-semibold text-slate-800 capitalize">
                          {clientCase.serviceLine.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Region:</span>
                        <span className="font-semibold text-slate-800">{clientCase.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Therapist:</span>
                        <span className="font-bold text-teal-700">
                          {clientCase.assignedTherapistName ? clientCase.assignedTherapistName.split(',')[0] : 'Unassigned'}
                        </span>
                      </div>
                    </div>

                    {/* Quick Card Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <button
                        onClick={() => setAutoRouteCase(clientCase)}
                        className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 bg-teal-50 px-2 py-1 rounded border border-teal-200"
                      >
                        <Sparkles className="w-3 h-3 text-teal-600" />
                        <span>Auto-Route</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <select
                          value={clientCase.stage}
                          onChange={e => updateCaseStage(clientCase.id, e.target.value as PipelineStage)}
                          className="text-[10px] p-1 rounded border border-slate-200 bg-slate-50 font-medium outline-none"
                        >
                          {STAGES.map(s => (
                            <option key={s.id} value={s.id}>Move to {s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                  </div>
                ))}
                {stageCases.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl">
                    No cases in stage
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Auto-Routing Recommendation Modal */}
      {autoRouteCase && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  Algorithmic Matching Engine
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  Therapist Auto-Routing Suggestions
                </h2>
                <p className="text-xs text-slate-500">
                  Target Case: <span className="font-bold text-slate-800">{autoRouteCase.fullName}</span> ({autoRouteCase.serviceLine.replace('_', ' ')} • {autoRouteCase.region})
                </p>
              </div>

              <button
                onClick={() => setAutoRouteCase(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Ranked Practitioner Matches</span>
              
              {calculateMatches(autoRouteCase).map(({ therapist, score, reasons }, index) => (
                <div 
                  key={therapist.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500 shrink-0">
                      <img src={therapist.avatarUrl} alt={therapist.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{therapist.name}</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
                          {score}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{therapist.credentials}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {reasons.map((r, i) => (
                          <span key={i} className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                            ✓ {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      assignTherapist(autoRouteCase.id, therapist.id);
                      setAutoRouteCase(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Assign Practitioner</span>
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
