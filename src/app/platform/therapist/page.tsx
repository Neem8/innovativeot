'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { UserCheck, Calendar, Clock, FileText, CheckCircle2, MessageSquare, ArrowRight, Video } from 'lucide-react';

export default function TherapistWorkspacePage() {
  const { cases, therapists, appointments, addSessionNote } = useStore();
  const activeTherapist = therapists[0]; // Sarah Lin MScOT

  const assignedCases = cases.filter(c => c.assignedTherapistId === activeTherapist.id || !c.assignedTherapistId);
  const myAppointments = appointments.filter(a => a.therapistId === activeTherapist.id || a.therapistId === 'th-1');

  const [chatMessage, setChatMessage] = useState('');
  const [caseChats, setCaseChats] = useState<{ id: string; sender: string; time: string; text: string }[]>([
    { id: '1', sender: 'Intake Director', time: '09:15 AM', text: 'Sarah, Robert Miller\'s Aviva adjuster approved 6 additional MVA sessions.' },
    { id: '2', sender: 'Sarah Lin, MScOT', time: '10:30 AM', text: 'Thank you! Updated COPM sitting score to 6/10 today.' }
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage) return;
    setCaseChats(prev => [
      ...prev,
      { id: Date.now().toString(), sender: activeTherapist.name, time: 'Just now', text: chatMessage }
    ]);
    setChatMessage('');
  };

  return (
    <div className="space-y-6">
      
      {/* Practitioner Header */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-400 shrink-0">
            <img src={activeTherapist.avatarUrl} alt={activeTherapist.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-400/30">
                COTO Registered OT
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {activeTherapist.id}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-0.5">{activeTherapist.name}</h1>
            <p className="text-xs text-slate-300">{activeTherapist.credentials} • Primary Clinic: St. Catharines</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
          <div>
            <span className="text-slate-400 block font-medium">Active Caseload:</span>
            <span className="font-extrabold text-lg text-teal-300">{activeTherapist.activeCaseloadCount} / {activeTherapist.maxCaseloadCapacity}</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-700" />
          <div>
            <span className="text-slate-400 block font-medium">Scheduled Today:</span>
            <span className="font-extrabold text-lg text-white">{myAppointments.length} sessions</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Today's Appointments & My Caseload */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Today's Agenda */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>Today's Clinical Agenda</span>
            </h2>

            <div className="space-y-3">
              {myAppointments.map(apt => (
                <div key={apt.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">{apt.clientName}</span>
                      <span className="capitalize px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-bold text-[10px]">
                        {apt.serviceLine.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-teal-600" /> {apt.startTime} - {apt.endTime}</span>
                      <span>• Location: {apt.locationId}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {apt.virtualMeetingUrl && (
                      <a
                        href={apt.virtualMeetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Tele-OT</span>
                      </a>
                    )}
                    <Link
                      href={`/platform/cases/${apt.caseId}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-slate-800 text-xs"
                    >
                      Log SOAP Note
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Caseload Cards */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900">My Assigned Caseload ({assignedCases.length})</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assignedCases.map(c => (
                <div key={c.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/platform/cases/${c.id}`} className="font-bold text-sm text-slate-900 hover:text-teal-600 block">
                        {c.fullName}
                      </Link>
                      <span className="text-[10px] text-slate-500">{c.region} • {c.payerAuth.payerType.toUpperCase()}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      {c.stage.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-slate-200 pt-2 text-[11px]">
                    <span className="text-slate-500">Sessions Used:</span>
                    <span className="font-bold text-slate-800">
                      {c.payerAuth.approvedSessionsUsed || 0} / {c.payerAuth.approvedSessionsTotal || 12}
                    </span>
                  </div>

                  <Link
                    href={`/platform/cases/${c.id}`}
                    className="w-full py-2 rounded-lg bg-white border border-slate-200 text-teal-700 font-bold text-center block hover:bg-slate-100 transition-colors"
                  >
                    Open Clinical File →
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Internal Case Messaging Thread */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <MessageSquare className="w-5 h-5 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900">Internal Case Chat</h3>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 text-xs">
              {caseChats.map(chat => (
                <div key={chat.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span className="text-teal-700">{chat.sender}</span>
                    <span>{chat.time}</span>
                  </div>
                  <p className="text-slate-800 font-medium">{chat.text}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-100 space-y-2">
            <input
              type="text"
              placeholder="Type internal note to clinic manager..."
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Post Note to Case Team
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
