'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { useStore } from '@/context/StoreContext';
import { Users, Calendar, Clock, Video, FileText, Heart, CheckCircle2, Phone, MapPin } from 'lucide-react';

export default function ClientPortalPage() {
  const { cases, appointments } = useStore();
  const currentClient = cases[0]; // Robert Miller
  const clientAppointments = appointments.filter(a => a.caseId === currentClient.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      {/* Header Banner */}
      <section className="bg-linear-to-r from-[#0F3854] to-teal-800 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Client & Family Portal
            </span>
            <h1 className="text-3xl font-extrabold text-white">Welcome back, {currentClient.fullName}</h1>
            <p className="text-teal-100 text-sm max-w-xl">
              Track your occupational therapy appointments, connect with your therapist, and access shared care plans.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs text-white space-y-1">
            <span className="text-teal-300 font-semibold block">Primary OT Practitioner:</span>
            <span className="font-bold text-sm text-white">{currentClient.assignedTherapistName || 'Sarah Lin, MScOT'}</span>
            <p className="text-slate-300 text-[11px]">Next session: Tomorrow at 10:00 AM</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Upcoming Sessions & Tele-OT Launcher */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span>Upcoming Therapy Appointments</span>
              </h2>

              <div className="space-y-4">
                {clientAppointments.map(apt => (
                  <div key={apt.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-xs font-extrabold text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded">
                          {apt.date}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base mt-1">{apt.notes || 'Occupational Therapy Session'}</h3>
                      </div>
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-teal-600" /> {apt.startTime} - {apt.endTime} EST
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <span className="text-slate-600 font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-slate-400" /> Location: {apt.locationId} ({apt.visitType})
                      </span>

                      {apt.visitType === 'virtual' ? (
                        <a
                          href={apt.virtualMeetingUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Tele-OT Video Session</span>
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded border border-teal-200">
                          Confirmed In-Person Booking
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goal Progress Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <span>My Active Rehabilitation Goals</span>
              </h2>

              <div className="space-y-4">
                {currentClient.goals.map(g => (
                  <div key={g.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{g.title}</span>
                      <span className="text-teal-700">{g.currentScore} / {g.targetScore} score</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                      <div 
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${(g.currentScore / g.targetScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Shared Documents & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">Shared Care Documents</h2>
              
              <div className="space-y-3 text-xs">
                {currentClient.documents.filter(d => d.isSharedWithClient).map(doc => (
                  <div key={doc.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <div>
                        <p className="font-bold text-slate-900">{doc.title}</p>
                        <span className="text-[10px] text-slate-500">{doc.uploadedAt}</span>
                      </div>
                    </div>
                    <button className="text-teal-600 font-bold hover:underline">Download</button>
                  </div>
                ))}
                {currentClient.documents.filter(d => d.isSharedWithClient).length === 0 && (
                  <p className="text-xs text-slate-400 italic">No care documents shared yet.</p>
                )}
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 text-xs">
              <h3 className="font-bold text-sm text-white">Need to Reschedule?</h3>
              <p className="text-slate-300">Call your clinic coordinator at least 24 hours prior to your session.</p>
              <a href="tel:18665233615" className="font-bold text-teal-300 hover:underline block pt-1">
                📞 Call 1-866-523-3615
              </a>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
