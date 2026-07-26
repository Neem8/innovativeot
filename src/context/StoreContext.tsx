'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ClientCase, 
  Therapist, 
  Appointment, 
  AuditLogEntry, 
  PipelineStage, 
  ReferralSubmissionInput,
  SessionNote,
  ClientDocument,
  OutcomeGoal
} from '@/lib/types';
import { 
  INITIAL_CASES, 
  INITIAL_THERAPISTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_AUDIT_LOGS 
} from '@/lib/mockData';

interface StoreContextType {
  cases: ClientCase[];
  therapists: Therapist[];
  appointments: Appointment[];
  auditLogs: AuditLogEntry[];
  addReferral: (input: ReferralSubmissionInput) => string;
  updateCaseStage: (caseId: string, stage: PipelineStage) => void;
  assignTherapist: (caseId: string, therapistId: string) => void;
  addAppointment: (apt: Omit<Appointment, 'id'>) => void;
  addSessionNote: (caseId: string, note: Omit<SessionNote, 'id' | 'caseId'>) => void;
  addDocument: (caseId: string, doc: Omit<ClientDocument, 'id'>) => void;
  updateGoalScore: (caseId: string, goalId: string, currentScore: number) => void;
  logAuditAction: (action: AuditLogEntry['action'], resourceType: AuditLogEntry['resourceType'], resourceId: string, details: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY_CASES = 'healthbound_cases_v1';
const STORAGE_KEY_THERAPISTS = 'healthbound_therapists_v1';
const STORAGE_KEY_APPOINTMENTS = 'healthbound_apts_v1';
const STORAGE_KEY_AUDITS = 'healthbound_audits_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<ClientCase[]>(INITIAL_CASES);
  const [therapists, setTherapists] = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Initialize from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCases = localStorage.getItem(STORAGE_KEY_CASES);
      if (savedCases) setCases(JSON.parse(savedCases));

      const savedTherapists = localStorage.getItem(STORAGE_KEY_THERAPISTS);
      if (savedTherapists) setTherapists(JSON.parse(savedTherapists));

      const savedApts = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
      if (savedApts) setAppointments(JSON.parse(savedApts));

      const savedAudits = localStorage.getItem(STORAGE_KEY_AUDITS);
      if (savedAudits) setAuditLogs(JSON.parse(savedAudits));
    } catch {
      // Fallback to initial mock data if parsing fails
    }
  }, []);

  // Sync state changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CASES, JSON.stringify(cases));
    } catch {}
  }, [cases]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THERAPISTS, JSON.stringify(therapists));
    } catch {}
  }, [therapists]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
    } catch {}
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUDITS, JSON.stringify(auditLogs));
    } catch {}
  }, [auditLogs]);

  const logAuditAction = (
    action: AuditLogEntry['action'],
    resourceType: AuditLogEntry['resourceType'],
    resourceId: string,
    details: string
  ) => {
    const newEntry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: 'usr-current',
      userName: 'Active System User',
      userRole: 'admin',
      action,
      resourceType,
      resourceId,
      details,
      ipAddress: '192.168.1.100'
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const addReferral = (input: ReferralSubmissionInput): string => {
    const newCaseId = `case-${Date.now().toString().slice(-4)}`;
    const newReferralId = `ref-${Date.now().toString().slice(-4)}`;

    const newCase: ClientCase = {
      id: newCaseId,
      referralId: newReferralId,
      fullName: input.clientName,
      dateOfBirth: input.clientDob || '1990-01-01',
      phone: input.clientPhone,
      email: input.clientEmail,
      city: input.clientCity,
      region: input.region,
      serviceLine: input.serviceLine,
      stage: 'new',
      locationPreference: input.preferredLocation,
      referralSource: {
        category: input.referringCategory,
        organizationName: input.orgName,
        contactName: input.contactName,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone
      },
      payerAuth: {
        payerType: input.payerType,
        claimOrPolicyNumber: `PENDING-AUTH-${Math.floor(1000 + Math.random() * 9000)}`,
        approvedSessionsTotal: 12,
        approvedSessionsUsed: 0,
        approvedAmountTotal: 1500,
        authorizationExpiry: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
        requiresProgressReportForRenewal: true,
        customPayerFields: {
          'Intake Summary': input.clinicalSummary,
          'Authorization Status': 'Under Review'
        }
      },
      urgency: input.urgency,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      goals: [],
      documents: [],
      sessionNotes: []
    };

    setCases(prev => [newCase, ...prev]);
    logAuditAction('CREATE', 'Referral', newReferralId, `Submitted public/portal referral for ${input.clientName}`);
    return newCaseId;
  };

  const updateCaseStage = (caseId: string, stage: PipelineStage) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          stage,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    }));
    logAuditAction('UPDATE', 'ClientCase', caseId, `Updated referral stage to ${stage}`);
  };

  const assignTherapist = (caseId: string, therapistId: string) => {
    const therapist = therapists.find(t => t.id === therapistId);
    if (!therapist) return;

    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          assignedTherapistId: therapist.id,
          assignedTherapistName: therapist.name,
          stage: c.stage === 'new' || c.stage === 'under_review' ? 'assigned' : c.stage,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    }));

    setTherapists(prev => prev.map(t => {
      if (t.id === therapistId) {
        return { ...t, activeCaseloadCount: t.activeCaseloadCount + 1 };
      }
      return t;
    }));

    logAuditAction('UPDATE', 'ClientCase', caseId, `Assigned therapist ${therapist.name}`);
  };

  const addAppointment = (apt: Omit<Appointment, 'id'>) => {
    const newApt: Appointment = {
      ...apt,
      id: `apt-${Date.now()}`
    };
    setAppointments(prev => [newApt, ...prev]);
    logAuditAction('CREATE', 'ClientCase', apt.caseId, `Scheduled appointment on ${apt.date} at ${apt.startTime}`);
  };

  const addSessionNote = (caseId: string, note: Omit<SessionNote, 'id' | 'caseId'>) => {
    const newNote: SessionNote = {
      ...note,
      id: `sn-${Date.now()}`,
      caseId
    };

    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          sessionNotes: [newNote, ...c.sessionNotes],
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    }));

    logAuditAction('CREATE', 'SessionNote', newNote.id, `Logged SOAP note for case ${caseId}`);
  };

  const addDocument = (caseId: string, doc: Omit<ClientDocument, 'id'>) => {
    const newDoc: ClientDocument = {
      ...doc,
      id: `doc-${Date.now()}`
    };

    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          documents: [newDoc, ...c.documents],
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    }));

    logAuditAction('CREATE', 'Document', newDoc.id, `Uploaded document ${doc.title} to case ${caseId}`);
  };

  const updateGoalScore = (caseId: string, goalId: string, currentScore: number) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updatedGoals = c.goals.map(g => {
          if (g.id === goalId) {
            const isAchieved = currentScore >= g.targetScore;
            return {
              ...g,
              currentScore,
              status: isAchieved ? ('achieved' as const) : ('in_progress' as const)
            };
          }
          return g;
        });
        return { ...c, goals: updatedGoals, updatedAt: new Date().toISOString().split('T')[0] };
      }
      return c;
    }));
    logAuditAction('UPDATE', 'ClientCase', caseId, `Updated goal score to ${currentScore}`);
  };

  return (
    <StoreContext.Provider
      value={{
        cases,
        therapists,
        appointments,
        auditLogs,
        addReferral,
        updateCaseStage,
        assignTherapist,
        addAppointment,
        addSessionNote,
        addDocument,
        updateGoalScore,
        logAuditAction
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
