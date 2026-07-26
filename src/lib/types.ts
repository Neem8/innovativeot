export type UserRole = 'admin' | 'clinic_manager' | 'therapist' | 'referrer' | 'client';

export type ServiceLineId = 
  | 'physiotherapy'
  | 'occupational_therapy'
  | 'chiropractor'
  | 'massage_therapy'
  | 'active_exercise'
  | 'acupuncture'
  | 'cupping'
  | 'chiropody'
  | 'msk_injection'
  | 'naturopathic'
  | 'assistive_devices'
  | 'psychological_counselling';

export type PayerTypeId = 
  | 'wsib' 
  | 'oap' 
  | 'mva_auto' 
  | 'extended_health' 
  | 'odsp' 
  | 'private_pay' 
  | 'public_contract'
  | 'adp';

export type PipelineStage = 
  | 'new' 
  | 'under_review' 
  | 'awaiting_funding' 
  | 'assigned' 
  | 'active' 
  | 'discharged';

export type LocationId = 
  | 'pape_east_york'
  | 'toronto_bloor_west'
  | 'hamilton'
  | 'etobicoke'
  | 'markham'
  | 'barrie'
  | 'community_virtual';

export type OntarioRegion = 
  | 'GTA' 
  | 'Hamilton-Halton' 
  | 'Niagara' 
  | 'Southwestern' 
  | 'Central' 
  | 'Eastern' 
  | 'Northern' 
  | 'Durham';

export interface LocationInfo {
  id: LocationId;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  isHospitalCoLocated: boolean;
  hospitalName?: string;
  regionsCovered: OntarioRegion[];
}

export interface ServiceLineInfo {
  id: ServiceLineId;
  name: string;
  ageBand: 'pediatric' | 'adult' | 'geriatric' | 'all';
  ageRangeText: string;
  shortDesc: string;
  fullDesc: string;
  commonPayers: PayerTypeId[];
  outcomesTracked: string[];
}

export interface ReferralSourceDetails {
  category: 'physician_hospital' | 'legal' | 'insurance_adjuster' | 'employer_hr' | 'union' | 'school' | 'community_org' | 'self';
  organizationName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  referenceNumber?: string;
}

export interface PayerAuthorization {
  payerType: PayerTypeId;
  claimOrPolicyNumber: string;
  adjusterOrCaseWorker?: string;
  approvedSessionsTotal?: number;
  approvedSessionsUsed?: number;
  approvedAmountTotal?: number;
  authorizationExpiry: string;
  requiresProgressReportForRenewal: boolean;
  customPayerFields: Record<string, string>;
}

export interface OutcomeGoal {
  id: string;
  title: string;
  targetDate: string;
  baselineScore: number;
  currentScore: number;
  targetScore: number;
  measureType: 'COPM' | 'GAS' | 'DASH' | 'GAD-7' | 'PHQ-9' | 'Custom';
  status: 'in_progress' | 'achieved' | 'partially_achieved';
}

export interface ClientDocument {
  id: string;
  title: string;
  category: 'assessment' | 'wsib_report' | 'oap_funding' | 'treatment_plan' | 'consent_form' | 'legal_summary';
  uploadedAt: string;
  uploadedBy: string;
  fileSize: string;
  isSharedWithReferrer: boolean;
  isSharedWithClient: boolean;
  fileUrl?: string;
}

export interface SessionNote {
  id: string;
  caseId: string;
  date: string;
  therapistId: string;
  therapistName: string;
  sessionType: 'clinic' | 'community' | 'virtual';
  durationMinutes: number;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  billingCode?: string;
}

export interface ClientCase {
  id: string;
  referralId: string;
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  city: string;
  region: OntarioRegion;
  serviceLine: ServiceLineId;
  stage: PipelineStage;
  locationPreference: LocationId;
  referralSource: ReferralSourceDetails;
  payerAuth: PayerAuthorization;
  assignedTherapistId?: string;
  assignedTherapistName?: string;
  goals: OutcomeGoal[];
  documents: ClientDocument[];
  sessionNotes: SessionNote[];
  urgency: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

export interface Therapist {
  id: string;
  name: string;
  credentials: string;
  email: string;
  phone: string;
  primaryLocation: LocationId;
  servicedRegions: OntarioRegion[];
  specialties: ServiceLineId[];
  activeCaseloadCount: number;
  maxCaseloadCapacity: number;
  bio: string;
  avatarUrl: string;
}

export interface Appointment {
  id: string;
  caseId: string;
  clientName: string;
  therapistId: string;
  therapistName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  locationId: LocationId;
  visitType: 'clinic' | 'community_home' | 'virtual';
  virtualMeetingUrl?: string;
  serviceLine: ServiceLineId;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: 'CREATE' | 'READ_PHI' | 'UPDATE' | 'DELETE' | 'EXPORT_REPORT' | 'LOGIN';
  resourceType: 'ClientCase' | 'Referral' | 'Document' | 'SessionNote' | 'Report';
  resourceId: string;
  details: string;
  ipAddress: string;
}

export interface ReferralSubmissionInput {
  referringCategory: ReferralSourceDetails['category'];
  orgName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  clientName: string;
  clientDob: string;
  clientPhone: string;
  clientEmail: string;
  clientCity: string;
  region: OntarioRegion;
  serviceLine: ServiceLineId;
  payerType: PayerTypeId;
  urgency: 'normal' | 'high' | 'urgent';
  preferredLocation: LocationId;
  clinicalSummary: string;
}
