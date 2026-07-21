'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ShieldAlert, Lock, Search, Filter, CheckCircle2, Server, Eye } from 'lucide-react';

export default function AuditLogsPage() {
  const { auditLogs } = useStore();
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    return actionFilter === 'all' || log.action === actionFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
            PHIPA & PIPEDA Compliance Audit Engine
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">PHI Security Access Log</h1>
          <p className="text-xs text-slate-500">Immutable audit record of every access, view, modification, and report export of Personal Health Information (PHI).</p>
        </div>
      </div>

      {/* Canadian Data Residency & Encryption Status */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="flex items-start gap-3">
          <Server className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white text-sm block">Canadian Data Residency</span>
            <p className="text-slate-300">AWS ca-central-1 (Montreal, QC / Toronto, ON). PHI never leaves Canadian borders.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white text-sm block">AES-256 & TLS 1.3 Encryption</span>
            <p className="text-slate-300">End-to-end encryption at rest and in transit for clinical vault documents and SOAP notes.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white text-sm block">PHIPA Access Auditing</span>
            <p className="text-slate-300">Mandatory logging on every record read/write pursuant to Ontario Health privacy regulations.</p>
          </div>
        </div>
      </div>

      {/* Filter Control */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-700">Filter Action Type:</span>
          <select
            value={actionFilter}
            onChange={e => setActionFilter(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 text-xs bg-slate-50 font-medium outline-none"
          >
            <option value="all">All Audit Actions</option>
            <option value="READ_PHI">READ_PHI (View PHI File)</option>
            <option value="CREATE">CREATE (New Record / Note)</option>
            <option value="UPDATE">UPDATE (Stage / Goal Change)</option>
            <option value="EXPORT_REPORT">EXPORT_REPORT (PDF Export)</option>
          </select>
        </div>

        <span className="text-xs font-bold text-slate-500">{filteredLogs.length} Events Audited</span>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">User & Role</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Resource Target</th>
                <th className="py-3.5 px-4">Details</th>
                <th className="py-3.5 px-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{log.userName}</span>
                    <span className="text-[10px] text-teal-700 font-bold uppercase">{log.userRole}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      log.action === 'READ_PHI' 
                        ? 'bg-purple-100 text-purple-900 border border-purple-200' 
                        : log.action === 'CREATE'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-800">{log.resourceType}</span>
                    <span className="text-[10px] text-slate-400 font-mono block">ID: {log.resourceId}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {log.details}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-500 text-[11px]">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
