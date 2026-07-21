'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { LocationId, Appointment } from '@/lib/types';
import { CLINIC_LOCATIONS } from '@/lib/mockData';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Plus, UserCheck, CheckCircle2, Filter, X } from 'lucide-react';

export default function SchedulePage() {
  const { appointments, cases, therapists, addAppointment } = useStore();
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedVisitType, setSelectedVisitType] = useState<string>('all');
  const [showBookModal, setShowBookModal] = useState(false);

  // New Appointment Form State
  const [caseId, setCaseId] = useState(cases[0]?.id || '');
  const [therapistId, setTherapistId] = useState(therapists[0]?.id || '');
  const [date, setDate] = useState('2026-07-25');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [locationId, setLocationId] = useState<LocationId>('st_catharines');
  const [visitType, setVisitType] = useState<'clinic' | 'community_home' | 'virtual'>('clinic');
  const [notes, setNotes] = useState('');

  const filteredAppointments = appointments.filter(apt => {
    const matchesLoc = selectedLocation === 'all' || apt.locationId === selectedLocation;
    const matchesVisit = selectedVisitType === 'all' || apt.visitType === selectedVisitType;
    return matchesLoc && matchesVisit;
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = cases.find(c => c.id === caseId);
    const therapist = therapists.find(t => t.id === therapistId);
    if (!client || !therapist) return;

    addAppointment({
      caseId,
      clientName: client.fullName,
      therapistId,
      therapistName: therapist.name,
      date,
      startTime,
      endTime,
      locationId,
      visitType,
      virtualMeetingUrl: visitType === 'virtual' ? `https://innovativeot.ca/telehealth/room-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
      serviceLine: client.serviceLine,
      status: 'scheduled',
      notes
    });

    setShowBookModal(false);
    alert('Appointment scheduled in native OT calendar.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
            Native Operations Calendar (Replaces JaneApp)
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Therapist & Clinic Schedule</h1>
          <p className="text-xs text-slate-500">Manage clinic room bookings, community home visits, and secure Tele-OT video appointments.</p>
        </div>

        <button
          onClick={() => setShowBookModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-700">Filter Location:</span>
          </div>
          <select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium outline-none"
          >
            <option value="all">All Locations & Virtual</option>
            {CLINIC_LOCATIONS.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>

          <select
            value={selectedVisitType}
            onChange={e => setSelectedVisitType(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium outline-none"
          >
            <option value="all">All Visit Types</option>
            <option value="clinic">In-Clinic Room</option>
            <option value="community_home">Community / Home Visit</option>
            <option value="virtual">Virtual Tele-OT</option>
          </select>
        </div>

        <span className="text-xs font-bold text-slate-500">
          Showing {filteredAppointments.length} Scheduled Sessions
        </span>
      </div>

      {/* Schedule Agenda Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map(apt => (
          <div key={apt.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-teal-600" /> {apt.date}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  apt.visitType === 'virtual' 
                    ? 'bg-purple-100 text-purple-900 border border-purple-200'
                    : apt.visitType === 'community_home'
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-teal-100 text-teal-900 border border-teal-200'
                }`}>
                  {apt.visitType.replace('_', ' ')}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{apt.clientName}</h3>
                <p className="text-xs text-teal-700 font-semibold">{apt.therapistName}</p>
                <p className="text-xs text-slate-500 mt-1 capitalize font-medium">Service: {apt.serviceLine.replace('_', ' ')}</p>
              </div>

              <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">{apt.startTime} - {apt.endTime} EST</span>
                </div>
                {apt.notes && (
                  <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                    "{apt.notes}"
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {apt.virtualMeetingUrl ? (
                <a
                  href={apt.virtualMeetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Launch Tele-OT Video</span>
                </a>
              ) : (
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" /> In-Person Booking
                </span>
              )}

              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                {apt.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Schedule OT Appointment</h2>
              <button onClick={() => setShowBookModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Select Client Case</label>
                <select
                  value={caseId}
                  onChange={e => setCaseId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                >
                  {cases.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.serviceLine.replace('_', ' ')})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Select Therapist</label>
                <select
                  value={therapistId}
                  onChange={e => setTherapistId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                >
                  {therapists.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Visit Type</label>
                  <select
                    value={visitType}
                    onChange={e => setVisitType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                  >
                    <option value="clinic">In-Clinic Room</option>
                    <option value="community_home">Community / Home Visit</option>
                    <option value="virtual">Virtual Tele-OT Video</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Location Centre</label>
                  <select
                    value={locationId}
                    onChange={e => setLocationId(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                  >
                    {CLINIC_LOCATIONS.map(l => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Session Notes / Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Bring sensory kit / Form 1 assessment prep"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors shadow-md"
              >
                Confirm Appointment Booking
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
