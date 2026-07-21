'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Kanban, 
  FolderKanban, 
  Calendar, 
  UserCheck, 
  FileCheck2, 
  BarChart3, 
  ShieldAlert, 
  ExternalLink,
  Users,
  Briefcase
} from 'lucide-react';

export const PlatformSidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentRole } = useAuth();

  const navItems = [
    { 
      href: '/platform/referrals', 
      label: 'Referral Pipeline', 
      icon: Kanban, 
      roles: ['admin', 'clinic_manager', 'therapist'] 
    },
    { 
      href: '/platform/cases', 
      label: 'Case Management', 
      icon: FolderKanban, 
      roles: ['admin', 'clinic_manager', 'therapist'] 
    },
    { 
      href: '/platform/schedule', 
      label: 'Native Schedule', 
      icon: Calendar, 
      roles: ['admin', 'clinic_manager', 'therapist'] 
    },
    { 
      href: '/platform/therapist', 
      label: 'Therapist Workspace', 
      icon: UserCheck, 
      roles: ['admin', 'clinic_manager', 'therapist'] 
    },
    { 
      href: '/platform/reports', 
      label: 'WSIB/Insurer Reports', 
      icon: FileCheck2, 
      roles: ['admin', 'clinic_manager', 'therapist'] 
    },
    { 
      href: '/platform/dashboard', 
      label: 'Operations Analytics', 
      icon: BarChart3, 
      roles: ['admin', 'clinic_manager'] 
    },
    { 
      href: '/platform/audit-logs', 
      label: 'PHIPA Audit Logs', 
      icon: ShieldAlert, 
      roles: ['admin'] 
    },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 shrink-0 hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
            Platform Modules
          </span>
          <nav className="space-y-1">
            {visibleItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
            External Portals
          </span>
          <div className="space-y-1">
            <Link
              href="/portal/referrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-teal-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-400" />
                <span>Referrer Portal</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link
              href="/portal/client"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-teal-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#06B6D4]" />
                <span>Client & Family Portal</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Role Notice */}
      <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-[11px] space-y-1">
        <span className="text-slate-400 block font-semibold">Active Permissions:</span>
        <p className="text-teal-300 font-bold capitalize">{currentRole.replace('_', ' ')}</p>
      </div>
    </aside>
  );
};
