'use client';

import React, { useState } from 'react';
import { CLINIC_LOCATIONS } from '@/lib/mockData';
import { LocationInfo } from '@/lib/types';
import { MapPin, Building2, Phone, ExternalLink, Navigation, Compass, CheckCircle2 } from 'lucide-react';

interface ClinicMapProps {
  initialSelectedId?: string;
}

export const ClinicMap: React.FC<ClinicMapProps> = ({ initialSelectedId = 'pape_east_york' }) => {
  const physicalClinics = CLINIC_LOCATIONS.filter(l => l.id !== 'community_virtual');
  const [selectedLoc, setSelectedLoc] = useState<LocationInfo>(
    physicalClinics.find(l => l.id === initialSelectedId) || physicalClinics[0]
  );

  // Map pin relative coordinates (%) for Southern Ontario / GTA map canvas
  const pinCoordinates: Record<string, { top: string; left: string; labelPosition: string }> = {
    barrie: { top: '15%', left: '42%', labelPosition: 'top' },
    markham: { top: '26%', left: '62%', labelPosition: 'top' },
    pape_east_york: { top: '34%', left: '54%', labelPosition: 'bottom' },
    toronto_bloor_west: { top: '36%', left: '48%', labelPosition: 'top' },
    etobicoke: { top: '38%', left: '42%', labelPosition: 'bottom' },
    hamilton: { top: '58%', left: '30%', labelPosition: 'bottom' }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden space-y-6 p-6 sm:p-8">
      
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
            Interactive Ontario Map
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <Compass className="w-6 h-6 text-teal-600" />
            <span>Health Bound Physical Clinic Locations</span>
          </h2>
          <p className="text-xs text-slate-500">Select a clinic pin to view hospital co-location details, address, and directions.</p>
        </div>

        {/* Location Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {physicalClinics.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelectedLoc(loc)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLoc.id === loc.id
                  ? 'bg-[#0F3854] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {loc.city}
            </button>
          ))}
        </div>
      </div>

      {/* Map Graphic Canvas + Selected Clinic Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Map Canvas */}
        <div className="lg:col-span-7 relative bg-slate-900 rounded-2xl h-[360px] sm:h-[400px] border border-slate-800 shadow-inner overflow-hidden flex items-center justify-center p-4">
          
          {/* Map Grid Lines & Styling */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
          <div className="absolute inset-0 bg-linear-to-br from-teal-950/30 via-slate-900 to-[#0F3854]/40" />

          {/* Stylized Lake Ontario & Regions Watermark SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 500">
            {/* Lake Ontario curve */}
            <path d="M 350 150 Q 550 250 800 200 L 800 500 L 350 500 Z" fill="#0D9488" />
            {/* Lake Erie curve */}
            <path d="M 0 380 Q 250 480 500 480 L 0 500 Z" fill="#0D9488" />
          </svg>

          {/* Region Annotations */}
          <span className="absolute top-4 left-6 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
            WATERLOO / KITCHENER REGION
          </span>
          <span className="absolute top-4 right-6 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
            GREATER TORONTO & HALTON
          </span>
          <span className="absolute bottom-4 right-6 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
            NIAGARA PENINSULA
          </span>

          {/* Animated Clinic Pins */}
          {physicalClinics.map(loc => {
            const coords = pinCoordinates[loc.id] || { top: '50%', left: '50%', labelPosition: 'top' };
            const isSelected = selectedLoc.id === loc.id;

            return (
              <div
                key={loc.id}
                style={{ top: coords.top, left: coords.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => setSelectedLoc(loc)}
              >
                {/* Radar pulse for selected pin */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-teal-400/30 animate-ping" />
                )}

                {/* Marker Badge */}
                <div className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border transition-all ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 border-teal-300 font-extrabold scale-110 ring-4 ring-teal-500/20'
                    : 'bg-slate-800/90 text-white border-slate-700 hover:bg-slate-700 font-bold hover:scale-105'
                }`}>
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-teal-400'}`} />
                  <span className="text-xs whitespace-nowrap">{loc.city}</span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Selected Clinic Details Drawer */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200/90 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Selected Clinic</span>
              <h3 className="text-lg font-bold text-slate-900">{selectedLoc.name}</h3>
            </div>
            {selectedLoc.isHospitalCoLocated && (
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                Hospital Co-Located
              </span>
            )}
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            {selectedLoc.hospitalName && (
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200/80 flex items-start gap-2">
                <Building2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-900 block">Co-Located Health System:</span>
                  <span className="text-blue-800">{selectedLoc.hospitalName}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-500 block">Address:</span>
                <span className="font-bold text-slate-900">{selectedLoc.address}, {selectedLoc.city}, ON {selectedLoc.postalCode}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-500 block">Direct Line:</span>
                <a href={`tel:${selectedLoc.phone.replace(/[^0-9]/g, '')}`} className="font-bold text-teal-700 hover:underline">
                  {selectedLoc.phone}
                </a>
              </div>
            </div>

            <div className="pt-2 space-y-1.5">
              <span className="font-semibold text-slate-500 block">Service Regions Covered:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedLoc.regionsCovered.map(r => (
                  <span key={r} className="text-xs bg-white text-slate-700 px-2.5 py-0.5 rounded font-medium border border-slate-200">
                    ✓ {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLoc.name + ' ' + selectedLoc.address + ' ' + selectedLoc.city)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#0F3854] hover:bg-[#1E6B9B] text-white font-bold text-xs text-center transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Google Maps Directions</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
