'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/types';
import { 
  ShieldCheck, 
  User, 
  ArrowLeft, 
  Sparkles,
  Layers,
  Building2,
  Calendar,
  FileText,
  BarChart3,
  Lock
} from 'lucide-react';

export const PlatformNavbar: React.FC = () => {
  const pathname = usePathname();
  const { currentRole, setRole, roleLabels } = useAuth();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Brand + Back to Site */}
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="text-xs text-slate-400 hover:text-teal-300 flex items-center gap-1 font-medium bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-500 to-[#0F3854] flex items-center justify-center font-extrabold text-sm text-white shadow-xs">
              HB
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-tight">HEALTH<span className="text-teal-400 font-light">BOUND</span></span>
              <span className="text-[10px] font-bold px-2 py-0.5 ml-2 rounded bg-teal-500/20 text-teal-300 border border-teal-400/30 uppercase tracking-wider">
                Platform
              </span>
            </div>
          </div>
        </div>

        {/* Live Role Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-400">Active Role:</span>
            <select
              value={currentRole}
              onChange={e => setRole(e.target.value as UserRole)}
              className="bg-transparent text-teal-300 font-bold focus:outline-none cursor-pointer"
            >
              {(Object.keys(roleLabels) as UserRole[]).map(r => (
                <option key={r} value={r} className="bg-slate-900 text-white font-medium">
                  {roleLabels[r]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-slate-400 font-mono">PHIPA Secured</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

      </div>
    </header>
  );
};
