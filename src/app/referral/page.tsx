'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { useStore } from '@/context/StoreContext';
import { ReferralSourceDetails, ServiceLineId, PayerTypeId, LocationId, OntarioRegion } from '@/lib/types';
import { SERVICE_LINES, CLINIC_LOCATIONS } from '@/lib/mockData';
import { 
  CalendarCheck, 
  UserCheck, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

function ReferralFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addReferral } = useStore();

  const [step, setStep] = useState<number>(1);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form Fields State
  const [referringCategory, setReferringCategory] = useState<ReferralSourceDetails['category']>('physician_hospital');
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [clientName, setClientName] = useState('');
  const [clientDob, setClientDob] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [region, setRegion] = useState<OntarioRegion>('Niagara');

  const [serviceLine, setServiceLine] = useState<ServiceLineId>(
    (searchParams.get('service') as ServiceLineId) || 'occupational_therapy'
  );
  const [payerType, setPayerType] = useState<PayerTypeId>('mva_auto');
  const [urgency, setUrgency] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [preferredLocation, setPreferredLocation] = useState<LocationId>(
    (searchParams.get('location') as LocationId) || 'pape_east_york'
  );
  const [clinicalSummary, setClinicalSummary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !contactEmail || !clientPhone) {
      alert('Please fill in required fields: Client Name, Contact Email, Client Phone.');
      return;
    }

    const newCaseId = addReferral({
      referringCategory,
      orgName: orgName || (referringCategory === 'self' ? 'Self Referral' : 'Independent Clinic/Firm'),
      contactName: contactName || clientName,
      contactEmail: contactEmail || clientEmail,
      contactPhone: contactPhone || clientPhone,
      clientName,
      clientDob,
      clientPhone,
      clientEmail,
      clientCity,
      region,
      serviceLine,
      payerType,
      urgency,
      preferredLocation,
      clinicalSummary
    });

    setSubmittedId(newCaseId);
    setStep(3);
  };

  return (
    <>
      {submittedId ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Referral Successfully Received</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Case File Created in Pipeline
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Thank you. Your referral has been assigned Case ID <span className="font-mono font-bold text-[#0F3854]">{submittedId}</span> and is now under review by our intake coordinator.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-2 max-w-lg mx-auto text-left">
            <div className="flex justify-between border-b border-slate-200 pb-1 font-semibold text-slate-800">
              <span>Client Name:</span>
              <span>{clientName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-1">
              <span>Service Line:</span>
              <span className="capitalize">{serviceLine.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-1">
              <span>Payer Framework:</span>
              <span className="uppercase font-bold text-teal-700">{payerType.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Pipeline Stage:</span>
              <span className="font-bold text-blue-600">New / Under Review</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => router.push(`/platform/referrals`)}
              className="px-6 py-3 rounded-xl bg-[#0F3854] hover:bg-[#1E6B9B] text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Open in Operations Kanban Board</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSubmittedId(null);
                setStep(1);
              }}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              Submit Another Referral
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8 text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#0F3854]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#0F3854] text-white' : 'bg-slate-100 text-slate-500'}`}>1</span>
              <span>Referrer & Client Details</span>
            </div>
            <div className="h-0.5 flex-1 bg-slate-200 mx-4" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#0F3854]' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#0F3854] text-white' : 'bg-slate-100 text-slate-500'}`}>2</span>
              <span>Service & Payer Config</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 1: Referral Source & Client Details</h2>
                  <p className="text-xs text-slate-500">Specify who is making the referral and client demographics.</p>
                </div>

                {/* Referrer Category */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Referral Source Category *</label>
                  <select
                    value={referringCategory}
                    onChange={e => setReferringCategory(e.target.value as ReferralSourceDetails['category'])}
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="physician_hospital">Physician / Hospital Discharge Planner</option>
                    <option value="legal">Personal Injury / Legal Counsel</option>
                    <option value="insurance_adjuster">Auto Insurance / Disability Adjuster</option>
                    <option value="employer_hr">Employer HR / RTW Coordinator</option>
                    <option value="union">Union Representative</option>
                    <option value="school">School Board / Teacher</option>
                    <option value="community_org">Community Organization</option>
                    <option value="self">Self / Family Member</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Referring Organization / Firm Name</label>
                    <input
                      type="text"
                      placeholder="e.g. St. Joseph Hospital / McMaster Law"
                      value={orgName}
                      onChange={e => setOrgName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Person Name</label>
                    <input
                      type="text"
                      placeholder="Dr. Smith / Jane Lawyer"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="contact@org.ca"
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="905-555-0100"
                      value={contactPhone}
                      onChange={e => setContactPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <hr className="border-slate-200" />

                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Client Demographics</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Client Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={clientDob}
                        onChange={e => setClientDob(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Client Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="905-555-0199"
                        value={clientPhone}
                        onChange={e => setClientPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Client Email</label>
                      <input
                        type="email"
                        placeholder="client@example.com"
                        value={clientEmail}
                        onChange={e => setClientEmail(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">City / Town</label>
                      <input
                        type="text"
                        placeholder="St. Catharines / Oakville"
                        value={clientCity}
                        onChange={e => setClientCity(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Ontario Service Region</label>
                      <select
                        value={region}
                        onChange={e => setRegion(e.target.value as OntarioRegion)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      >
                        <option value="Niagara">Niagara Region</option>
                        <option value="Hamilton-Halton">Hamilton & Halton</option>
                        <option value="GTA">GTA (Toronto, York, Peel)</option>
                        <option value="Southwestern">Southwestern (Waterloo/Kitchener)</option>
                        <option value="Central">Central Ontario</option>
                        <option value="Eastern">Eastern Ontario</option>
                        <option value="Northern">Northern Ontario</option>
                        <option value="Durham">Durham Region</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!clientName || !contactEmail || !clientPhone) {
                        alert('Please complete required fields before continuing.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#0F3854] hover:bg-[#1E6B9B] text-white font-bold text-sm transition-colors flex items-center gap-2"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 2: Service Line & Multi-Payer Configuration</h2>
                  <p className="text-xs text-slate-500">Configure clinical service needs and payer authorization routing.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Service Line Needed *</label>
                    <select
                      value={serviceLine}
                      onChange={e => setServiceLine(e.target.value as ServiceLineId)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      {SERVICE_LINES.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.ageRangeText})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Payer / Funding Type *</label>
                    <select
                      value={payerType}
                      onChange={e => setPayerType(e.target.value as PayerTypeId)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value="mva_auto">Auto Insurance (SABS MVA Rehab)</option>
                      <option value="wsib">WSIB (Workplace Safety & Insurance)</option>
                      <option value="oap">OAP (Ontario Autism Program)</option>
                      <option value="extended_health">Extended Health Benefits</option>
                      <option value="odsp">ODSP / Disability Support</option>
                      <option value="private_pay">Private Pay</option>
                      <option value="public_contract">Public Contract / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Urgency Level</label>
                    <select
                      value={urgency}
                      onChange={e => setUrgency(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value="normal">Normal (Routine Intake within 3-5 days)</option>
                      <option value="high">High Priority (Hospital Discharge / 48 hrs)</option>
                      <option value="urgent">Urgent (Catastrophic Crisis / 24 hrs)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Location / Care Delivery Preference</label>
                    <select
                      value={preferredLocation}
                      onChange={e => setPreferredLocation(e.target.value as LocationId)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      {CLINIC_LOCATIONS.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">Clinical Summary & Medical Background</label>
                  <textarea
                    rows={4}
                    placeholder="Brief description of functional goals, injuries, hospital discharge dates, or specific assessment requirements..."
                    value={clinicalSummary}
                    onChange={e => setClinicalSummary(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">PHIPA & PIPEDA Compliance Notice:</span> Information submitted via this form is encrypted and transmitted directly to Health Bound's secure internal intake server under Canadian healthcare privacy standards.
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm"
                  >
                    Back to Step 1
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md flex items-center gap-2"
                  >
                    <span>Submit Referral into Pipeline</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      )}
    </>
  );
}

export default function ReferralPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      <section className="bg-[#0F3854] text-white py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            PHIPA Secure Intake • Direct to Operations Pipeline
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Client Referral & Intake Form
          </h1>
          <p className="text-slate-300 text-sm">
            For Physicians, Lawyers, Insurers, HR Coordinators, Schools, and Self-Referrals across Ontario.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <Suspense fallback={
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 font-medium">
            Loading intake form...
          </div>
        }>
          <ReferralFormContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
