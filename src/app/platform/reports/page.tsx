'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Printer, Download, FileText, CheckCircle2, Building2, ShieldCheck } from 'lucide-react';

export default function ReportExporterPage() {
  const { cases, logAuditAction } = useStore();
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || '');
  const [reportType, setReportType] = useState<'wsib' | 'mva_legal' | 'oap_renewal'>('wsib');

  const clientCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handlePrint = () => {
    logAuditAction('EXPORT_REPORT', 'Report', clientCase.id, `Exported ${reportType.toUpperCase()} status report for ${clientCase.fullName}`);
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Controls Bar (Hidden during print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
            Formal Report Exporter
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Downstream Consumer Status Reports</h1>
          <p className="text-xs text-slate-500">Generate printable progress summaries formatted for WSIB, Auto Insurers, Legal Counsel, and OAP Care Coordinators.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-[#0F3854] hover:bg-[#1E6B9B] text-white font-bold text-xs transition-all shadow-md flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Report Options Selector (Hidden during print) */}
      <div className="no-print bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Select Client File</label>
          <select
            value={selectedCaseId}
            onChange={e => setSelectedCaseId(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 font-bold outline-none"
          >
            {cases.map(c => (
              <option key={c.id} value={c.id}>{c.fullName} ({c.id} • {c.payerAuth.payerType.toUpperCase()})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Select Report Template</label>
          <select
            value={reportType}
            onChange={e => setReportType(e.target.value as any)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 font-bold outline-none"
          >
            <option value="wsib">WSIB Progress Report (Form 8 / MSK-OT Summary)</option>
            <option value="mva_legal">Auto Insurance / SABS Legal Case Summary</option>
            <option value="oap_renewal">OAP Funding Renewal Reminder Letter</option>
          </select>
        </div>
      </div>

      {/* Formal Printable Document View */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-300 shadow-lg max-w-4xl mx-auto space-y-8 print:shadow-none print:border-none print:p-0">
        
        {/* Document Header */}
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl text-[#0F3854]">HEALTH</span>
              <span className="font-light text-2xl text-teal-600">BOUND</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Health Bound Health Network</p>
            <p className="text-[11px] text-slate-500">East York • Toronto • Hamilton • Etobicoke • Markham • Barrie</p>
            <p className="text-[11px] text-slate-500 font-bold">Tel: 416-548-7872 | Fax: 416-850-9609 | info@healthbound.ca</p>
          </div>

          <div className="text-right text-xs space-y-1">
            <span className="font-extrabold uppercase text-slate-900 text-sm block">
              {reportType === 'wsib' && 'WSIB MSK-OT PROGRESS REPORT'}
              {reportType === 'mva_legal' && 'MVA SABS REHABILITATION SUMMARY'}
              {reportType === 'oap_renewal' && 'OAP FUNDING RENEWAL AUDIT'}
            </span>
            <p className="text-slate-600">Date Issued: {new Date().toISOString().split('T')[0]}</p>
            <p className="font-mono text-slate-500">File Reference: {clientCase.id}</p>
          </div>
        </div>

        {/* Client & Payer Demographics Table */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 print:bg-slate-100">
          <div>
            <span className="font-bold text-slate-900 block uppercase">Client Information</span>
            <p className="text-slate-700"><strong>Name:</strong> {clientCase.fullName}</p>
            <p className="text-slate-700"><strong>DOB:</strong> {clientCase.dateOfBirth}</p>
            <p className="text-slate-700"><strong>City:</strong> {clientCase.city}, ON ({clientCase.region})</p>
          </div>
          <div>
            <span className="font-bold text-slate-900 block uppercase">Payer Authorization</span>
            <p className="text-slate-700"><strong>Framework:</strong> {clientCase.payerAuth.payerType.toUpperCase()}</p>
            <p className="text-slate-700"><strong>Claim / Policy #:</strong> {clientCase.payerAuth.claimOrPolicyNumber}</p>
            <p className="text-slate-700"><strong>Adjuster / Case Worker:</strong> {clientCase.payerAuth.adjusterOrCaseWorker || 'Direct'}</p>
          </div>
        </div>

        {/* Report Body Content */}
        {reportType === 'wsib' && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold uppercase text-slate-900 border-b border-slate-200 pb-1">1. Clinical Overview & Job Demands Match</h3>
              <p>
                Client presents with musculoskeletal limitations following work incident. Functional capacity evaluation demonstrates job-demands match score of 68% against physical workplace requirements.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold uppercase text-slate-900 border-b border-slate-200 pb-1">2. Sessions Authorized & Attendance</h3>
              <p>
                Authorized Sessions: <strong>{clientCase.payerAuth.approvedSessionsTotal || 12}</strong> | Completed: <strong>{clientCase.payerAuth.approvedSessionsUsed || 0}</strong> | Remaining: <strong>{(clientCase.payerAuth.approvedSessionsTotal || 12) - (clientCase.payerAuth.approvedSessionsUsed || 0)}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold uppercase text-slate-900 border-b border-slate-200 pb-1">3. Goal Attainment Status</h3>
              <ul className="space-y-1 pl-4 list-disc">
                {clientCase.goals.map(g => (
                  <li key={g.id}><strong>{g.title}:</strong> Baseline {g.baselineScore}/10 → Current {g.currentScore}/10 ({g.status.toUpperCase()})</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold uppercase text-slate-900 border-b border-slate-200 pb-1">4. Practitioner Recommendation</h3>
              <p>
                Recommend approval of 6 additional graduated return-to-work OT sessions to achieve full workplace duty clearance.
              </p>
            </div>
          </div>
        )}

        {reportType === 'mva_legal' && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold uppercase text-slate-900 border-b border-slate-200 pb-1">1. Motor Vehicle Accident Rehabilitation Status</h3>
              <p>
                Treatment provided pursuant to Ontario SABS guidelines. Initial Form 1 Attendant Care assessment completed. Client exhibits cognitive fatigue and neck/shoulder ROM restrictions.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold uppercase text-slate-900 border-b border-slate-200 pb-1">2. Legal / Insurer Summary</h3>
              <p>
                Referring Legal Firm: <strong>{clientCase.referralSource.organizationName}</strong> | Reference #: {clientCase.referralSource.referenceNumber || 'LAW-2026-REF'}
              </p>
              <p>
                Form 1 Status: Approved ($2,100/mo) | Catastrophic Determination Assessment Pending.
              </p>
            </div>
          </div>
        )}

        {reportType === 'oap_renewal' && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold uppercase text-slate-900 border-b border-slate-200 pb-1">1. AccessOAP Clinical Care Plan Review</h3>
              <p>
                Pediatric OT core clinical intervention under Ontario Autism Program funding framework. Sensori-motor and self-regulation milestones tracked via Goal Attainment Scaling (GAS).
              </p>
            </div>
          </div>
        )}

        {/* Signature Box */}
        <div className="pt-8 border-t border-slate-300 flex justify-between items-end text-xs">
          <div>
            <span className="font-bold text-slate-900 block">{clientCase.assignedTherapistName || 'Sarah Lin, MScOT, Reg. (Ont.)'}</span>
            <p className="text-slate-500">Registered Occupational Therapist • COTO #99281</p>
          </div>
          <div className="text-right">
            <div className="w-40 h-0.5 bg-slate-800 mb-1" />
            <span className="text-[10px] text-slate-500 uppercase">Authorized Practitioner Signature</span>
          </div>
        </div>

      </div>

    </div>
  );
}
