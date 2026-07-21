import { 
  LocationInfo, 
  ServiceLineInfo, 
  Therapist, 
  ClientCase, 
  Appointment, 
  AuditLogEntry 
} from './types';

export const CLINIC_LOCATIONS: LocationInfo[] = [
  {
    id: 'st_catharines',
    name: 'St. Catharines Clinic (Marotta Family Hospital)',
    address: '1200 Fourth Ave, Suite 302',
    city: 'St. Catharines',
    postalCode: 'L2S 0A9',
    phone: '289-214-4467',
    isHospitalCoLocated: true,
    hospitalName: 'Niagara Health - Marotta Family Hospital',
    regionsCovered: ['Niagara', 'Hamilton-Halton']
  },
  {
    id: 'grimsby',
    name: 'Grimsby Regional OT Centre',
    address: '63 Main Street East, Suite 204',
    city: 'Grimsby',
    postalCode: 'L3M 1N7',
    phone: '289-214-4467',
    isHospitalCoLocated: false,
    regionsCovered: ['Niagara', 'Hamilton-Halton']
  },
  {
    id: 'oakville_otmh',
    name: 'Oakville Clinic (Oakville Trafalgar Memorial Hospital)',
    address: '3001 Hospital Gate, Suite 410',
    city: 'Oakville',
    postalCode: 'L6M 0L8',
    phone: '289-214-4467',
    isHospitalCoLocated: true,
    hospitalName: 'Oakville Trafalgar Memorial Hospital',
    regionsCovered: ['Hamilton-Halton', 'GTA']
  },
  {
    id: 'kitchener_benton',
    name: 'Kitchener Clinic (Benton Medical Clinic)',
    address: '85 Benton St, Suite 101',
    city: 'Kitchener',
    postalCode: 'N2G 3H1',
    phone: '289-214-4467',
    isHospitalCoLocated: true,
    hospitalName: 'Benton Medical Centre',
    regionsCovered: ['Southwestern', 'Central']
  },
  {
    id: 'community_virtual',
    name: 'Province-Wide Community & Virtual Care',
    address: 'Mobile / Virtual Tele-OT Services',
    city: 'Toronto / GTA / Province-Wide',
    postalCode: 'M5H 2N2',
    phone: '289-214-4467',
    isHospitalCoLocated: false,
    regionsCovered: ['GTA', 'Niagara', 'Hamilton-Halton', 'Southwestern', 'Central', 'Eastern', 'Northern', 'Durham']
  }
];

export const SERVICE_LINES: ServiceLineInfo[] = [
  {
    id: 'pediatric',
    name: 'Pediatric Occupational Therapy',
    ageBand: 'pediatric',
    ageRangeText: 'Ages 0 - 18',
    shortDesc: 'Developmental milestones, sensory processing, emotional regulation, and school readiness.',
    fullDesc: 'Customized early intervention and pediatric care supporting children with neurodevelopmental needs, sensory processing differences, autism (OAP approved), fine/gross motor delays, and executive functioning challenges.',
    commonPayers: ['oap', 'extended_health', 'private_pay'],
    outcomesTracked: ['GAS (Goal Attainment Scale)', 'Sensory Profile 2', 'Beery VMI']
  },
  {
    id: 'mva_rehab',
    name: 'MVA Auto Injury Rehab & Brain Injury',
    ageBand: 'adult',
    ageRangeText: 'Ages 19 - 64',
    shortDesc: 'Comprehensive post-collision rehab, concussion recovery, and catastrophic assessment.',
    fullDesc: 'Specialized motor vehicle accident rehabilitation following Ontario SABS guidelines. Includes Form 1 attendant care assessments, catastrophic impairment evaluation, cognitive rehab, and functional capacity evaluation.',
    commonPayers: ['mva_auto', 'public_contract'],
    outcomesTracked: ['COPM', 'DASH', 'Rivermead Post-Concussion', 'WHODAS 2.0']
  },
  {
    id: 'workplace_ergo',
    name: 'Workplace Ergonomics & Job Demands',
    ageBand: 'adult',
    ageRangeText: 'Ages 19 - 64',
    shortDesc: 'Ergonomic assessments, workstation modifications, and injury prevention.',
    fullDesc: 'On-site and virtual ergonomic evaluation for office, manufacturing, healthcare, and industrial employers across Ontario. Designed to reduce MSK injuries and lower WSIB claims.',
    commonPayers: ['wsib', 'extended_health', 'private_pay'],
    outcomesTracked: ['REBA/RULA Risk Scores', 'Disability Rating']
  },
  {
    id: 'return_to_work',
    name: 'Vocational Rehab & Return-to-Work (RTW)',
    ageBand: 'adult',
    ageRangeText: 'Ages 19 - 64',
    shortDesc: 'Graduated return-to-work plans, work hardening, and employer coordination.',
    fullDesc: 'Structured RTW planning in collaboration with WSIB case managers, disability insurers, employers, and unions. We bridge the gap between medical recovery and workplace performance.',
    commonPayers: ['wsib', 'mva_auto', 'extended_health'],
    outcomesTracked: ['Job Demands Match %', 'Work Capacity Hours']
  },
  {
    id: 'driver_rehab',
    name: 'Driver Rehabilitation & Mobility Assessment',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Clinical & behind-the-wheel driver evaluations, vehicle modifications, and adaptive equipment.',
    fullDesc: 'MTO-approved occupational therapy driver assessments for seniors, individuals post-stroke, spinal cord injury, or traumatic brain injury to determine driving safety and vehicle modification needs.',
    commonPayers: ['mva_auto', 'private_pay', 'wsib'],
    outcomesTracked: ['MTO Driver Safety Score', 'Adaptive Equipment Clearance']
  },
  {
    id: 'home_mods',
    name: 'Home Safety, Modifications & Aging-in-Place',
    ageBand: 'geriatric',
    ageRangeText: 'Ages 65+',
    shortDesc: 'Fall prevention, barrier-free barrier design, stairlifts, and accessibility ramps.',
    fullDesc: 'Comprehensive home safety assessments and environmental modification recommendations helping seniors and individuals with physical disabilities remain safely in their homes.',
    commonPayers: ['extended_health', 'odsp', 'private_pay', 'mva_auto'],
    outcomesTracked: ['FES-I Fall Risk Scale', 'SAFER-HOME v3']
  },
  {
    id: 'chronic_pain',
    name: 'Chronic Pain & Energy Conservation',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Pacing strategies, biofeedback, sleep hygiene, and functional reactivation.',
    fullDesc: 'Interdisciplinary occupational therapy for fibromyalgia, complex regional pain syndrome (CRPS), persistent post-surgical pain, and arthritis.',
    commonPayers: ['wsib', 'mva_auto', 'extended_health'],
    outcomesTracked: ['Brief Pain Inventory (BPI)', 'PDI (Pain Disability Index)']
  },
  {
    id: 'mental_health',
    name: 'Community Mental Health & Psychotherapy OT',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'CBT, behavioral activation, trauma-informed care, PTSD recovery for first responders.',
    fullDesc: 'Psychotherapy and occupational therapy for anxiety, depression, PTSD, operational stress injuries, and burnout. Delivered virtually or in community settings.',
    commonPayers: ['wsib', 'extended_health', 'oap', 'private_pay'],
    outcomesTracked: ['GAD-7', 'PHQ-9', 'PCL-5']
  }
];

export const INITIAL_THERAPISTS: Therapist[] = [
  {
    id: 'th-1',
    name: 'Sarah Lin, MScOT, Reg. (Ont.)',
    credentials: 'MScOT, OTO Member, CBT Certified',
    email: 'sarah.lin@innovativeot.ca',
    phone: '289-214-4467 ext 102',
    primaryLocation: 'st_catharines',
    servicedRegions: ['Niagara', 'Hamilton-Halton'],
    specialties: ['mva_rehab', 'chronic_pain', 'catastrophic_injury'],
    activeCaseloadCount: 14,
    maxCaseloadCapacity: 18,
    bio: 'Founder & Senior OT with 12+ years expertise in MVA catastrophic rehabilitation and hospital discharge planning.',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-78a99478f72c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'th-2',
    name: 'Marcus Vance, OT Reg. (Ont.)',
    credentials: 'BHSc, MScOT, Ergonomic Specialist',
    email: 'marcus.vance@innovativeot.ca',
    phone: '289-214-4467 ext 105',
    primaryLocation: 'oakville_otmh',
    servicedRegions: ['Hamilton-Halton', 'GTA'],
    specialties: ['workplace_ergo', 'return_to_work', 'driver_rehab'],
    activeCaseloadCount: 11,
    maxCaseloadCapacity: 16,
    bio: 'Specializing in WSIB job-demands evaluations, industrial ergonomics, and driver rehab assessments.',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'th-3',
    name: 'Elena Rostova, MScOT, Reg. (Ont.)',
    credentials: 'MScOT, OAP Approved Provider',
    email: 'elena.rostova@innovativeot.ca',
    phone: '289-214-4467 ext 108',
    primaryLocation: 'kitchener_benton',
    servicedRegions: ['Southwestern', 'Central'],
    specialties: ['pediatric', 'mental_health'],
    activeCaseloadCount: 16,
    maxCaseloadCapacity: 20,
    bio: 'Pediatric and neurodevelopmental OT leading Ontario Autism Program (OAP) funded therapy programs.',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'th-4',
    name: 'David Okafor, OT Reg. (Ont.)',
    credentials: 'MScOT, Certified Fall Prevention Specialist',
    email: 'david.okafor@innovativeot.ca',
    phone: '289-214-4467 ext 110',
    primaryLocation: 'grimsby',
    servicedRegions: ['Niagara', 'Hamilton-Halton', 'GTA'],
    specialties: ['home_mods', 'mental_health', 'chronic_pain'],
    activeCaseloadCount: 9,
    maxCaseloadCapacity: 15,
    bio: 'Geriatric specialist focusing on home safety modifications, aging-in-place, and PTSD recovery for first responders.',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
  }
];

export const INITIAL_CASES: ClientCase[] = [
  {
    id: 'case-101',
    referralId: 'ref-801',
    fullName: 'Robert Miller',
    dateOfBirth: '1978-04-12',
    phone: '905-555-0192',
    email: 'r.miller@example.com',
    city: 'St. Catharines',
    region: 'Niagara',
    serviceLine: 'mva_rehab',
    stage: 'active',
    locationPreference: 'st_catharines',
    referralSource: {
      category: 'legal',
      organizationName: 'McMaster & Associates Injury Law',
      contactName: 'Jennifer Sterling, Esq.',
      contactEmail: 'jsterling@mcmasterlaw.ca',
      contactPhone: '905-522-8000',
      referenceNumber: 'LAW-2026-992'
    },
    payerAuth: {
      payerType: 'mva_auto',
      claimOrPolicyNumber: 'AUTO-POL-99281',
      adjusterOrCaseWorker: 'Mark Thomson (Aviva Canada)',
      approvedSessionsTotal: 24,
      approvedSessionsUsed: 10,
      approvedAmountTotal: 4800,
      authorizationExpiry: '2026-11-30',
      requiresProgressReportForRenewal: true,
      customPayerFields: {
        'Form 1 Attendant Care Status': 'Approved ($2,100/mo)',
        'Catastrophic Determination': 'Pending Assessment',
        'Insurer Case File': 'AVIVA-MVA-2026-081'
      }
    },
    assignedTherapistId: 'th-1',
    assignedTherapistName: 'Sarah Lin, MScOT',
    urgency: 'high',
    createdAt: '2026-06-10',
    updatedAt: '2026-07-18',
    goals: [
      {
        id: 'g-1',
        title: 'Increase sitting tolerance for light office tasks to 45 mins',
        targetDate: '2026-08-30',
        baselineScore: 2,
        currentScore: 6,
        targetScore: 9,
        measureType: 'COPM',
        status: 'in_progress'
      },
      {
        id: 'g-2',
        title: 'Independent community driving for grocery shopping without fatigue spike',
        targetDate: '2026-09-15',
        baselineScore: 1,
        currentScore: 4,
        targetScore: 8,
        measureType: 'GAS',
        status: 'in_progress'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        title: 'Initial OT Assessment & Treatment Plan (OCF-18)',
        category: 'assessment',
        uploadedAt: '2026-06-15',
        uploadedBy: 'Sarah Lin, MScOT',
        fileSize: '1.8 MB',
        isSharedWithReferrer: true,
        isSharedWithClient: true,
        fileUrl: '#'
      },
      {
        id: 'doc-2',
        title: 'Form 1 Assessment of Attendant Care Needs',
        category: 'assessment',
        uploadedAt: '2026-06-20',
        uploadedBy: 'Sarah Lin, MScOT',
        fileSize: '2.4 MB',
        isSharedWithReferrer: true,
        isSharedWithClient: false,
        fileUrl: '#'
      }
    ],
    sessionNotes: [
      {
        id: 'sn-1',
        caseId: 'case-101',
        date: '2026-07-15',
        therapistId: 'th-1',
        therapistName: 'Sarah Lin, MScOT',
        sessionType: 'clinic',
        durationMinutes: 60,
        subjective: 'Client reports mild neck stiffness today (4/10 pain). Expressed anxiety regarding returning to modified driving duties.',
        objective: 'Completed cervical ROM exercises, cognitive pacing review, and ergonomics setup simulation.',
        assessment: 'Progressing well with pacing strategies. Sitting tolerance improved from 20 to 35 mins.',
        plan: 'Proceed with community driving practice next session. Prepare mid-term progress report for insurer.',
        billingCode: 'OT-MVA-TREAT-01'
      }
    ]
  },
  {
    id: 'case-102',
    referralId: 'ref-802',
    fullName: 'Liam Chen',
    dateOfBirth: '2019-09-14',
    phone: '416-555-4921',
    email: 'parents.chen@example.com',
    city: 'Kitchener',
    region: 'Southwestern',
    serviceLine: 'pediatric',
    stage: 'active',
    locationPreference: 'kitchener_benton',
    referralSource: {
      category: 'school',
      organizationName: 'Waterloo Region District School Board',
      contactName: 'Sandra Kowalski (Resource Teacher)',
      contactEmail: 'skowalski@wrdsb.ca',
      contactPhone: '519-570-0003'
    },
    payerAuth: {
      payerType: 'oap',
      claimOrPolicyNumber: 'OAP-ID-772910',
      adjusterOrCaseWorker: 'AccessOAP Care Coordinator #402',
      approvedSessionsTotal: 30,
      approvedSessionsUsed: 14,
      approvedAmountTotal: 3600,
      authorizationExpiry: '2026-12-15',
      requiresProgressReportForRenewal: true,
      customPayerFields: {
        'OAP Funding Portal Access': 'Verified',
        'Direct Billing Status': 'Active via AccessOAP',
        'Core Clinical Needs Score': 'Level 2 Support'
      }
    },
    assignedTherapistId: 'th-3',
    assignedTherapistName: 'Elena Rostova, MScOT',
    urgency: 'normal',
    createdAt: '2026-05-18',
    updatedAt: '2026-07-16',
    goals: [
      {
        id: 'g-3',
        title: 'Demonstrate self-regulation during classroom transitions without sensory meltdown',
        targetDate: '2026-10-01',
        baselineScore: 3,
        currentScore: 7,
        targetScore: 9,
        measureType: 'GAS',
        status: 'in_progress'
      }
    ],
    documents: [
      {
        id: 'doc-3',
        title: 'OAP Core Clinical OT Assessment & Individual Care Plan',
        category: 'oap_funding',
        uploadedAt: '2026-05-22',
        uploadedBy: 'Elena Rostova, MScOT',
        fileSize: '1.2 MB',
        isSharedWithReferrer: true,
        isSharedWithClient: true
      }
    ],
    sessionNotes: []
  },
  {
    id: 'case-103',
    referralId: 'ref-803',
    fullName: 'Maria Santos',
    dateOfBirth: '1965-11-03',
    phone: '905-555-8831',
    email: 'msantos65@example.com',
    city: 'Oakville',
    region: 'Hamilton-Halton',
    serviceLine: 'workplace_ergo',
    stage: 'awaiting_funding',
    locationPreference: 'oakville_otmh',
    referralSource: {
      category: 'employer_hr',
      organizationName: 'Halton Logistics Distribution Centre',
      contactName: 'Dave Higgins (HR & Safety Manager)',
      contactEmail: 'dhiggins@haltonlogistics.ca',
      contactPhone: '905-845-1200'
    },
    payerAuth: {
      payerType: 'wsib',
      claimOrPolicyNumber: 'WSIB-CLAIM-448102',
      adjusterOrCaseWorker: 'Brenda Walsh (WSIB Nurse Consultant)',
      approvedSessionsTotal: 12,
      approvedSessionsUsed: 0,
      approvedAmountTotal: 1800,
      authorizationExpiry: '2026-08-15',
      requiresProgressReportForRenewal: true,
      customPayerFields: {
        'WSIB Program Stream': 'Musculoskeletal Program (MSK-OT)',
        'Employer RTW Officer': 'Dave Higgins',
        'Form 8 Clearance Date': '2026-07-02'
      }
    },
    assignedTherapistId: 'th-2',
    assignedTherapistName: 'Marcus Vance, OT Reg. (Ont.)',
    urgency: 'high',
    createdAt: '2026-07-05',
    updatedAt: '2026-07-19',
    goals: [],
    documents: [],
    sessionNotes: []
  },
  {
    id: 'case-104',
    referralId: 'ref-804',
    fullName: 'Arthur Tremblay',
    dateOfBirth: '1948-02-19',
    phone: '289-555-3301',
    email: 'art.tremblay@example.com',
    city: 'Grimsby',
    region: 'Niagara',
    serviceLine: 'home_mods',
    stage: 'under_review',
    locationPreference: 'grimsby',
    referralSource: {
      category: 'physician_hospital',
      organizationName: 'Niagara Health - West Lincoln Memorial',
      contactName: 'Dr. Aris Thorne (Family Physician)',
      contactEmail: 'dr.thorne@niagarahealth.on.ca',
      contactPhone: '905-945-2253'
    },
    payerAuth: {
      payerType: 'extended_health',
      claimOrPolicyNumber: 'SUNLIFE-881920',
      adjusterOrCaseWorker: 'Self / Supplemental Care',
      approvedSessionsTotal: 6,
      approvedSessionsUsed: 0,
      approvedAmountTotal: 900,
      authorizationExpiry: '2026-10-31',
      requiresProgressReportForRenewal: false,
      customPayerFields: {
        'Benefit Coverage Limit': '$1,500/yr OT',
        'Primary Diagnosis': 'Post-Hip Replacement / Fall Risk'
      }
    },
    assignedTherapistId: 'th-4',
    assignedTherapistName: 'David Okafor, OT Reg. (Ont.)',
    urgency: 'normal',
    createdAt: '2026-07-18',
    updatedAt: '2026-07-19',
    goals: [],
    documents: [],
    sessionNotes: []
  },
  {
    id: 'case-105',
    referralId: 'ref-805',
    fullName: 'Samantha Wright',
    dateOfBirth: '1991-08-27',
    phone: '416-555-9011',
    email: 'sam.wright@example.com',
    city: 'Toronto',
    region: 'GTA',
    serviceLine: 'mental_health',
    stage: 'new',
    locationPreference: 'community_virtual',
    referralSource: {
      category: 'self',
      organizationName: 'Self-Referral',
      contactName: 'Samantha Wright',
      contactEmail: 'sam.wright@example.com',
      contactPhone: '416-555-9011'
    },
    payerAuth: {
      payerType: 'private_pay',
      claimOrPolicyNumber: 'PRIVATE-DIRECT',
      approvedSessionsTotal: 10,
      approvedSessionsUsed: 0,
      approvedAmountTotal: 1500,
      authorizationExpiry: '2027-01-01',
      requiresProgressReportForRenewal: false,
      customPayerFields: {
        'Payment Method': 'Direct Credit Card',
        'Receipt Issued': 'Yes'
      }
    },
    urgency: 'urgent',
    createdAt: '2026-07-20',
    updatedAt: '2026-07-20',
    goals: [],
    documents: [],
    sessionNotes: []
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    caseId: 'case-101',
    clientName: 'Robert Miller',
    therapistId: 'th-1',
    therapistName: 'Sarah Lin, MScOT',
    date: '2026-07-22',
    startTime: '10:00',
    endTime: '11:00',
    locationId: 'st_catharines',
    visitType: 'clinic',
    serviceLine: 'mva_rehab',
    status: 'scheduled',
    notes: 'Community driving readiness check & cognitive fatigue rating.'
  },
  {
    id: 'apt-2',
    caseId: 'case-102',
    clientName: 'Liam Chen',
    therapistId: 'th-3',
    therapistName: 'Elena Rostova, MScOT',
    date: '2026-07-22',
    startTime: '14:00',
    endTime: '15:00',
    locationId: 'kitchener_benton',
    visitType: 'clinic',
    serviceLine: 'pediatric',
    status: 'scheduled',
    notes: 'OAP sensory integration & fine motor session.'
  },
  {
    id: 'apt-3',
    caseId: 'case-103',
    clientName: 'Maria Santos',
    therapistId: 'th-2',
    therapistName: 'Marcus Vance, OT',
    date: '2026-07-23',
    startTime: '09:30',
    endTime: '11:30',
    locationId: 'oakville_otmh',
    visitType: 'community_home',
    serviceLine: 'workplace_ergo',
    status: 'scheduled',
    notes: 'On-site workplace ergonomic analysis at Halton Distribution Centre.'
  },
  {
    id: 'apt-4',
    caseId: 'case-105',
    clientName: 'Samantha Wright',
    therapistId: 'th-4',
    therapistName: 'David Okafor, OT',
    date: '2026-07-24',
    startTime: '11:00',
    endTime: '12:00',
    locationId: 'community_virtual',
    visitType: 'virtual',
    virtualMeetingUrl: 'https://innovativeot.ca/telehealth/room-99201',
    serviceLine: 'mental_health',
    status: 'scheduled',
    notes: 'Initial Tele-OT mental health assessment & goal setting.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-1',
    timestamp: '2026-07-20 22:40:12',
    userId: 'usr-admin-1',
    userName: 'Operations Director',
    userRole: 'admin',
    action: 'READ_PHI',
    resourceType: 'ClientCase',
    resourceId: 'case-101',
    details: 'Viewed client file Robert Miller (PHI access audit)',
    ipAddress: '192.168.1.45'
  },
  {
    id: 'audit-2',
    timestamp: '2026-07-20 21:15:00',
    userId: 'usr-th-1',
    userName: 'Sarah Lin, MScOT',
    userRole: 'therapist',
    action: 'CREATE',
    resourceType: 'SessionNote',
    resourceId: 'sn-1',
    details: 'Logged SOAP clinical session note for case-101',
    ipAddress: '192.168.1.88'
  },
  {
    id: 'audit-3',
    timestamp: '2026-07-20 18:02:44',
    userId: 'usr-ref-99',
    userName: 'Jennifer Sterling, Esq.',
    userRole: 'referrer',
    action: 'READ_PHI',
    resourceType: 'Report',
    resourceId: 'doc-1',
    details: 'Downloaded Initial OT Assessment report from Referrer Portal',
    ipAddress: '142.204.12.9'
  }
];
