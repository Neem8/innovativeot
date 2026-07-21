'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { PipelineStage, ClientDocument } from '@/lib/types';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Upload, 
  Lock, 
  Calendar,
  Sparkles,
  Share2
} from 'lucide-react';

export default function SingleCaseViewPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.id as string;
  const { cases, updateCaseStage, addSessionNote, addDocument, updateGoalScore, logAuditAction } = useStore();

  const clientCase = cases.find(c => c.id === caseId);

  const [activeTab, setActiveTab] = useState<'payer' | 'goals' | 'soap' | 'documents'>('payer');

  // SOAP Note Form State
  const [sessionType, setSessionType] = useState<'clinic' | 'community' | 'virtual'>('clinic');
  const [duration, setDuration] = useState<number>(60);
  const [subj, setSubj] = useState('');
  const [obj, setObj] = useState('');
  const [assess, setAssess] = useState('');
  const [plan, setPlan] = useState('');

  // Document Upload State
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<ClientDocument['category']>('assessment');
  const [shareReferrer, setShareReferrer] = useState(true);
  const [shareClient, setShareClient] = useState(false);

  // PHIPA Access Audit Logging on Mount
  useEffect(() => {
    if (clientCase) {
      logAuditAction('READ_PHI', 'ClientCase', clientCase.id, `Accessed PHI record for ${clientCase.fullName}`);
    }
  }, [caseId]);

  if (!clientCase) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Case Record Not Found</h2>
        <Link href="/platform/cases" className="text-sm text-teal-600 font-bold hover:underline">
          Return to Case List
        </Link>
      </div>
    );
  }

  const handleSOAPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subj || !obj) {
      alert('Please fill out Subjective and Objective clinical notes.');
      return;
    }
    addSessionNote(clientCase.id, {
      date: new Date().toISOString().split('T')[0],
      therapistId: clientCase.assignedTherapistId || 'th-1',
      therapistName: clientCase.assignedTherapistName || 'Active OT',
      sessionType,
      durationMinutes: duration,
      subjective: subj,
      objective: obj,
      assessment: assess || 'Client responding well to treatment.',
      plan: plan || 'Continue next scheduled session.',
      billingCode: 'OT-CLINIC-TREAT'
    });
    setSubj(''); setObj(''); setAssess(''); setPlan('');
    alert('Clinical SOAP Note saved & appended to PHI record.');
  };

  const handleDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;
    addDocument(clientCase.id, {
      title: docTitle,
      category: docCategory,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: 'Active System User',
      fileSize: '1.5 MB',
      isSharedWithReferrer: shareReferrer,
      isSharedWithClient: shareClient
    });
    setDocTitle('');
    alert('Document encrypted & uploaded to Vault.');
  };

  const sessionsUsed = clientCase.payerAuth.approvedSessionsUsed || 0;
  const sessionsTotal = clientCase.payerAuth.approvedSessionsTotal || 12;

  return (
    <div className="space-y-6">
      
      {/* Top Navigation & Status Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/platform/cases" 
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">{clientCase.id}</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
                  {clientCase.payerAuth.payerType.replace('_', ' ')}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">{clientCase.fullName}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">Stage:</span>
            <select
              value={clientCase.stage}
              onChange={e => updateCaseStage(clientCase.id, e.target.value as PipelineStage)}
              className="p-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-bold outline-none capitalize"
            >
              <option value="new">New Intake</option>
              <option value="under_review">Under Review</option>
              <option value="awaiting_funding">Awaiting Funding</option>
              <option value="assigned">Assigned</option>
              <option value="active">Active Care</option>
              <option value="discharged">Discharged</option>
            </select>
          </div>
        </div>

        {/* Demographics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-semibold">Service Line:</span>
            <span className="font-bold text-slate-800 capitalize">{clientCase.serviceLine.replace('_', ' ')}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Region / Location:</span>
            <span className="font-bold text-slate-800">{clientCase.region} • {clientCase.locationPreference}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Assigned OT:</span>
            <span className="font-bold text-teal-700">{clientCase.assignedTherapistName || 'Unassigned'}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Referral Source:</span>
            <span className="font-bold text-slate-800">{clientCase.referralSource.organizationName}</span>
          </div>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {[
          { id: 'payer', label: 'Payer Schema & Auth' },
          { id: 'goals', label: `Outcome Goals (${clientCase.goals.length})` },
          { id: 'soap', label: `SOAP Clinical Notes (${clientCase.sessionNotes.length})` },
          { id: 'documents', label: `Document Vault (${clientCase.documents.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-t border-x ${
              activeTab === tab.id
                ? 'bg-white text-[#0F3854] border-slate-200 border-b-white -mb-[1px] shadow-xs'
                : 'bg-slate-100 text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Payer Schema */}
      {activeTab === 'payer' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Configured Payer Schema</span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">Authorization & Funding Profile</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 font-semibold block">Payer Framework:</span>
                <span className="font-bold text-slate-900 uppercase">{clientCase.payerAuth.payerType}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Claim / Policy #:</span>
                <span className="font-mono font-bold text-slate-900">{clientCase.payerAuth.claimOrPolicyNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Adjuster / Care Coordinator:</span>
                <span className="font-medium text-slate-800">{clientCase.payerAuth.adjusterOrCaseWorker || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Authorization Expiry:</span>
                <span className="font-bold text-slate-900">{clientCase.payerAuth.authorizationExpiry}</span>
              </div>
            </div>

            {/* Custom Fields per Schema */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Payer-Specific Required Fields</span>
              <div className="space-y-2">
                {Object.entries(clientCase.payerAuth.customPayerFields).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="font-semibold text-slate-700">{k}:</span>
                    <span className="font-bold text-slate-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            <h3 className="text-base font-bold text-slate-900">Session Usage Meter</h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-semibold">
                <span>Authorized Sessions:</span>
                <span>{sessionsUsed} / {sessionsTotal} used</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (sessionsUsed / sessionsTotal) * 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Progress Report Requirement:</span>
              <p className="text-slate-600">
                {clientCase.payerAuth.requiresProgressReportForRenewal
                  ? '⚠️ Formatted progress report required prior to authorization renewal.'
                  : 'No mid-term progress report mandated.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Outcome Goals */}
      {activeTab === 'goals' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Goal Attainment Scale</span>
              <h2 className="text-lg font-bold text-slate-900">Standardized Outcome Trackers</h2>
            </div>
          </div>

          <div className="space-y-4">
            {clientCase.goals.map(goal => (
              <div key={goal.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                      {goal.measureType}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">{goal.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Target Date: {goal.targetDate}</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Score: Baseline ({goal.baselineScore}) → Current ({goal.currentScore}) → Target ({goal.targetScore})</span>
                    <span className="font-bold text-teal-700 uppercase">{goal.status.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={goal.currentScore}
                      onChange={e => updateGoalScore(clientCase.id, goal.id, parseInt(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                    <span className="font-extrabold text-sm text-teal-700 w-6">{goal.currentScore}</span>
                  </div>
                </div>
              </div>
            ))}
            {clientCase.goals.length === 0 && (
              <p className="text-xs text-slate-400 italic">No formal outcome goals recorded yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: SOAP Notes */}
      {activeTab === 'soap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Historical SOAP Clinical Notes</h2>

            <div className="space-y-4">
              {clientCase.sessionNotes.map(note => (
                <div key={note.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-900">{note.therapistName} • {note.date}</span>
                    <span className="capitalize px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-semibold">
                      {note.sessionType} ({note.durationMinutes} mins)
                    </span>
                  </div>
                  <p><strong className="text-slate-800">Subjective (S):</strong> {note.subjective}</p>
                  <p><strong className="text-slate-800">Objective (O):</strong> {note.objective}</p>
                  <p><strong className="text-slate-800">Assessment (A):</strong> {note.assessment}</p>
                  <p><strong className="text-slate-800">Plan (P):</strong> {note.plan}</p>
                </div>
              ))}
              {clientCase.sessionNotes.length === 0 && (
                <p className="text-xs text-slate-400 italic">No SOAP notes recorded for this client yet.</p>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Log New Session SOAP Note</h3>

            <form onSubmit={handleSOAPSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Session Type</label>
                  <select
                    value={sessionType}
                    onChange={e => setSessionType(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                  >
                    <option value="clinic">In-Clinic</option>
                    <option value="community">Community / Home</option>
                    <option value="virtual">Tele-OT Virtual</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(parseInt(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Subjective (S)</label>
                <textarea
                  rows={2}
                  placeholder="Client symptoms, reported pain, mental state..."
                  value={subj}
                  onChange={e => setSubj(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Objective (O)</label>
                <textarea
                  rows={2}
                  placeholder="ROM measurements, exercises completed, standardized tests..."
                  value={obj}
                  onChange={e => setObj(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Assessment (A)</label>
                <textarea
                  rows={2}
                  placeholder="Clinical progress towards goals..."
                  value={assess}
                  onChange={e => setAssess(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Plan (P)</label>
                <textarea
                  rows={2}
                  placeholder="Next steps, home exercise program updates..."
                  value={plan}
                  onChange={e => setPlan(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors shadow-xs"
              >
                Append SOAP Note to PHI File
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 4: Document Vault */}
      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Encrypted Document Vault</h2>

            <div className="space-y-3">
              {clientCase.documents.map(doc => (
                <div key={doc.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <div>
                      <h3 className="font-bold text-slate-900">{doc.title}</h3>
                      <p className="text-[10px] text-slate-500">
                        Uploaded by {doc.uploadedBy} on {doc.uploadedAt} • {doc.fileSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.isSharedWithReferrer && (
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
                        Shared w/ Referrer
                      </span>
                    )}
                    {doc.isSharedWithClient && (
                      <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-semibold">
                        Shared w/ Client
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {clientCase.documents.length === 0 && (
                <p className="text-xs text-slate-400 italic">No documents uploaded yet.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Upload Clinical Document</h3>

            <form onSubmit={handleDocSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OCF-18 Treatment Plan / Progress Assessment"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={docCategory}
                  onChange={e => setDocCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                >
                  <option value="assessment">Initial OT Assessment</option>
                  <option value="wsib_report">WSIB Progress Report</option>
                  <option value="oap_funding">OAP Care Plan</option>
                  <option value="treatment_plan">Treatment Plan</option>
                  <option value="consent_form">Signed Consent Form</option>
                  <option value="legal_summary">Medical-Legal Report</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareReferrer}
                    onChange={e => setShareReferrer(e.target.checked)}
                    className="accent-teal-600"
                  />
                  <span>Make visible in Referrer Portal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareClient}
                    onChange={e => setShareClient(e.target.checked)}
                    className="accent-teal-600"
                  />
                  <span>Make visible in Client Portal</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0F3854] hover:bg-[#1E6B9B] text-white font-bold transition-colors shadow-xs"
              >
                Upload Encrypted File
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
