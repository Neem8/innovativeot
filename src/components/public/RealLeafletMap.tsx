'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CLINIC_LOCATIONS } from '@/lib/mockData';
import { LocationInfo } from '@/lib/types';
import { MapPin, Building2, Phone, ExternalLink, Navigation, Compass } from 'lucide-react';

const CLINIC_COORDINATES: Record<string, { lat: number; lng: number }> = {
  st_catharines: { lat: 43.1558, lng: -79.2828 },
  grimsby: { lat: 43.1936, lng: -79.5573 },
  oakville_otmh: { lat: 43.4357, lng: -79.7525 },
  kitchener_benton: { lat: 43.4475, lng: -80.4870 }
};

export const RealLeafletMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  const physicalClinics = CLINIC_LOCATIONS.filter(l => l.id !== 'community_virtual');
  const [selectedLoc, setSelectedLoc] = useState<LocationInfo>(physicalClinics[0]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Dynamically import Leaflet in browser environment only
    import('leaflet').then(L => {
      // Fix default Leaflet marker icon paths in React
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!leafletMapRef.current && mapContainerRef.current) {
        // Center on Niagara/GTA region
        const map = L.map(mapContainerRef.current).setView([43.28, -79.70], 9);

        // OpenStreetMap real map tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | InnovativeOT Ontario',
          maxZoom: 18,
        }).addTo(map);

        // Add markers for all physical clinics
        physicalClinics.forEach(loc => {
          const coords = CLINIC_COORDINATES[loc.id];
          if (coords) {
            const popupContent = `
              <div style="font-family: system-ui, sans-serif; padding: 4px; max-width: 200px;">
                <div style="font-weight: 800; font-size: 13px; color: #0F3854;">${loc.name}</div>
                <div style="font-size: 11px; color: #475569; margin-top: 2px;">${loc.address}, ${loc.city}</div>
                <div style="font-size: 11px; color: #0D9488; font-weight: 700; margin-top: 4px;">📞 ${loc.phone}</div>
              </div>
            `;

            const marker = L.marker([coords.lat, coords.lng])
              .addTo(map)
              .bindPopup(popupContent);

            marker.on('click', () => {
              setSelectedLoc(loc);
            });

            markersRef.current[loc.id] = marker;
          }
        });

        leafletMapRef.current = map;
        setMapLoaded(true);
      }
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Pan to selected clinic on tab click
  const handleSelectClinic = (loc: LocationInfo) => {
    setSelectedLoc(loc);
    const coords = CLINIC_COORDINATES[loc.id];
    if (leafletMapRef.current && coords) {
      leafletMapRef.current.flyTo([coords.lat, coords.lng], 13, { duration: 1.5 });
      const marker = markersRef.current[loc.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden space-y-6 p-6 sm:p-8">
      {/* Leaflet CSS Link */}
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" 
        crossOrigin="" 
      />

      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
            OpenStreetMap Real-World Map
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <Compass className="w-6 h-6 text-teal-600" />
            <span>Interactive Ontario Clinic Map</span>
          </h2>
          <p className="text-xs text-slate-500">Live street map showing St. Catharines, Grimsby, Oakville, and Kitchener clinic locations.</p>
        </div>

        {/* Location Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {physicalClinics.map(loc => (
            <button
              key={loc.id}
              onClick={() => handleSelectClinic(loc)}
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

      {/* Real Map Canvas & Info Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Leaflet Map Canvas Element */}
        <div className="lg:col-span-7 relative bg-slate-100 rounded-2xl h-[380px] sm:h-[420px] border border-slate-300 shadow-inner overflow-hidden">
          <div ref={mapContainerRef} className="w-full h-full z-10" />
        </div>

        {/* Selected Location Info Card */}
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
                <span className="font-semibold text-slate-500 block">Exact Address:</span>
                <span className="font-bold text-slate-900">{selectedLoc.address}, {selectedLoc.city}, ON {selectedLoc.postalCode}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-500 block">Direct Telephone:</span>
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

          <div className="pt-3 border-t border-slate-200">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLoc.name + ' ' + selectedLoc.address + ' ' + selectedLoc.city)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#0F3854] hover:bg-[#1E6B9B] text-white font-bold text-xs text-center transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
