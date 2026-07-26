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
    id: 'pape_east_york',
    name: 'Pape / East York Clinic',
    address: '909 Pape Ave, Suite #1',
    city: 'East York',
    postalCode: 'M4K 3V1',
    phone: '416-519-3775',
    isHospitalCoLocated: false,
    regionsCovered: ['GTA', 'Durham']
  },
  {
    id: 'toronto_bloor_west',
    name: 'Toronto Clinic (Bloor West)',
    address: '3250 Bloor Street West, East Tower, Suite #111',
    city: 'Toronto',
    postalCode: 'M8X 2X9',
    phone: '416-236-7778',
    isHospitalCoLocated: false,
    regionsCovered: ['GTA']
  },
  {
    id: 'hamilton',
    name: 'Hamilton Clinic',
    address: '634 Stone Church Rd W, Unit C',
    city: 'Hamilton',
    postalCode: 'L9B 1A7',
    phone: '416-548-7872',
    isHospitalCoLocated: false,
    regionsCovered: ['Hamilton-Halton', 'Niagara']
  },
  {
    id: 'etobicoke',
    name: 'Etobicoke Clinic',
    address: 'Confirm address on site (Contact main office)',
    city: 'Etobicoke',
    postalCode: 'M9C 5H2',
    phone: '416-548-7872',
    isHospitalCoLocated: false,
    regionsCovered: ['GTA', 'Hamilton-Halton']
  },
  {
    id: 'markham',
    name: 'Markham Clinic',
    address: 'Confirm address on site (Contact main office)',
    city: 'Markham',
    postalCode: 'L3R 5X6',
    phone: '416-548-7872',
    isHospitalCoLocated: false,
    regionsCovered: ['GTA', 'Durham']
  },
  {
    id: 'barrie',
    name: 'Barrie Clinic',
    address: 'Confirm address on site (Contact main office)',
    city: 'Barrie',
    postalCode: 'L4M 4Y8',
    phone: '416-548-7872',
    isHospitalCoLocated: false,
    regionsCovered: ['Central']
  },
  {
    id: 'community_virtual',
    name: 'Province-Wide Community & Virtual Care',
    address: 'Mobile / Virtual Tele-OT Services',
    city: 'Toronto / GTA / Province-Wide',
    postalCode: 'M4K 3V1',
    phone: '1-866-523-3615',
    isHospitalCoLocated: false,
    regionsCovered: ['GTA', 'Niagara', 'Hamilton-Halton', 'Southwestern', 'Central', 'Eastern', 'Northern', 'Durham']
  }
];

export const SERVICE_LINES: ServiceLineInfo[] = [
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Manual therapy, exercise prescription, electrotherapy, and ultrasound for musculoskeletal recovery.',
    fullDesc: 'Manual therapy, exercise prescription, electrotherapy, and ultrasound for sports injuries, post-surgical rehab, chronic pain, and musculoskeletal disorders.',
    commonPayers: ['extended_health', 'mva_auto', 'wsib', 'private_pay'],
    outcomesTracked: ['DASH Score', 'Visual Analogue Scale (VAS)', 'Grip Strength']
  },
  {
    id: 'occupational_therapy',
    name: 'Occupational Therapy',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Brain injury, home safety, cognitive rehab, work-site assessments, and RTW programs.',
    fullDesc: 'Brain injury, orthopedic injury, spinal cord injury, stroke, mental health, chronic pain; hospital discharge planning, home safety assessments, wheelchair seating, cognitive rehab, work-site assessments and RTW programs. CAT-certified OTs for catastrophic file management.',
    commonPayers: ['mva_auto', 'wsib', 'extended_health'],
    outcomesTracked: ['COPM (Goal Attainment)', 'FIM Score', 'SAFER-HOME v3']
  },
  {
    id: 'chiropractor',
    name: 'Chiropractor',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Spinal adjustments, manual therapy, and preventative joint care.',
    fullDesc: 'Spinal adjustments, mobilizations, soft-tissue therapy, and exercise prescription to resolve neck/back pain, headaches, and joint stiffness.',
    commonPayers: ['extended_health', 'mva_auto', 'private_pay'],
    outcomesTracked: ['Oswestry Disability Index (ODI)', 'Neck Disability Index (NDI)']
  },
  {
    id: 'massage_therapy',
    name: 'Massage Therapy',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Registered massage therapy (RMT) for muscle tension, stress, and injury recovery.',
    fullDesc: 'Registered massage therapy (RMT) targeting soft tissue strain, myofascial trigger points, lymphatic drainage, and stress reduction.',
    commonPayers: ['extended_health', 'private_pay'],
    outcomesTracked: ['Range of Motion (ROM)', 'Pain Scale']
  },
  {
    id: 'active_exercise',
    name: 'Active Exercise and Personal Training',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Goal-oriented strength, mobility, and cardio training for functional recovery.',
    fullDesc: 'Kinesiologist-led active exercise programs and personalized training focused on restoring core stability, muscle balance, and cardiovascular health.',
    commonPayers: ['private_pay', 'extended_health'],
    outcomesTracked: ['Functional Movement Screen (FMS)', '1-Rep Max Assessments']
  },
  {
    id: 'acupuncture',
    name: 'Acupuncture',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Dry needling and traditional acupuncture for pain relief and neuromodulation.',
    fullDesc: 'Acupuncture and dry needling targeting myofascial trigger points to relieve acute/chronic pain, reduce inflammation, and enhance nerve function.',
    commonPayers: ['extended_health', 'private_pay'],
    outcomesTracked: ['Pain Rating Scale', 'Local Tissue Perfusion']
  },
  {
    id: 'cupping',
    name: 'Cupping',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Decompression therapy using cupping to improve local blood flow and tissue mobility.',
    fullDesc: 'Myofascial cupping therapy designed to increase local blood circulation, release tissue adhesions, and accelerate muscle recovery.',
    commonPayers: ['private_pay'],
    outcomesTracked: ['Myofascial Range of Motion']
  },
  {
    id: 'chiropody',
    name: 'Chiropody',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Podiatric foot care, gait analysis, and custom orthotics prescription.',
    fullDesc: 'Chiropody assessment and treatment of foot conditions, ingrown toenails, diabetic foot care, gait anomalies, and custom orthotic solutions.',
    commonPayers: ['extended_health', 'private_pay'],
    outcomesTracked: ['FPI-6 (Foot Posture Index)', 'Pedobarographic Gait Map']
  },
  {
    id: 'msk_injection',
    name: 'MSK Injection Therapy',
    ageBand: 'adult',
    ageRangeText: 'Ages 18+',
    shortDesc: 'Corticosteroid and joint injections for localized pain and arthritis management.',
    fullDesc: 'Ultrasound-guided musculoskeletal injections including corticosteroids, viscosupplementation, and joint blocks to manage severe chronic pain and arthritis.',
    commonPayers: ['extended_health', 'mva_auto'],
    outcomesTracked: ['Visual Analogue Scale (VAS)', 'Joint ROM']
  },
  {
    id: 'naturopathic',
    name: 'Naturopathic Treatment',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'Holistic dietary, lifestyle, and supplement planning for overall health.',
    fullDesc: 'Naturopathic doctor (ND) assessments providing dietary counseling, botanical medicine, stress management, and nutritional supplement plans.',
    commonPayers: ['extended_health', 'private_pay'],
    outcomesTracked: ['WHOQOL-BREF Quality of Life Score']
  },
  {
    id: 'assistive_devices',
    name: 'Assistive Devices and Equipment',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'ADP assessments for wheelchairs, walkers, orthoses, and home medical gear.',
    fullDesc: 'Authorized ADP (Assistive Devices Program) assessments to prescribe funded wheelchairs, walkers, home safety grab bars, and adaptive rehabilitation equipment.',
    commonPayers: ['adp', 'extended_health', 'mva_auto'],
    outcomesTracked: ['PIADS Impact Score']
  },
  {
    id: 'psychological_counselling',
    name: 'Psychological Counselling',
    ageBand: 'all',
    ageRangeText: 'All Ages',
    shortDesc: 'CBT, trauma counselling, and mental health support for PTSD and anxiety.',
    fullDesc: 'Psychological counselling, cognitive behavioral therapy (CBT), and trauma-informed care targeting post-concussion anxiety, PTSD, depression, and WSIB/MVA coping strategies.',
    commonPayers: ['extended_health', 'wsib', 'mva_auto'],
    outcomesTracked: ['GAD-7', 'PHQ-9', 'PCL-5']
  }
];

export const INITIAL_THERAPISTS: Therapist[] = [
  {
    id: 'th-1',
    name: 'Sarah Lin, MScOT, Reg. (Ont.)',
    credentials: 'MScOT, OTO Member, CBT Certified',
    email: 'sarah.lin@healthbound.ca',
    phone: '416-548-7872 ext 102',
    primaryLocation: 'pape_east_york',
    servicedRegions: ['GTA', 'Durham'],
    specialties: ['occupational_therapy', 'msk_injection', 'psychological_counselling'],
    activeCaseloadCount: 14,
    maxCaseloadCapacity: 18,
    bio: 'Senior OT with 12+ years expertise in MVA catastrophic rehabilitation and clinical file management.',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-78a99478f72c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'th-2',
    name: 'Marcus Vance, OT Reg. (Ont.)',
    credentials: 'BHSc, MScOT, Ergonomic Specialist',
    email: 'marcus.vance@healthbound.ca',
    phone: '416-548-7872 ext 105',
    primaryLocation: 'toronto_bloor_west',
    servicedRegions: ['GTA'],
    specialties: ['occupational_therapy', 'assistive_devices', 'active_exercise'],
    activeCaseloadCount: 11,
    maxCaseloadCapacity: 16,
    bio: 'Specializing in WSIB job-demands evaluations, industrial ergonomics, and return-to-work program coordination.',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'th-3',
    name: 'Elena Rostova, MScOT, Reg. (Ont.)',
    credentials: 'MScOT, OAP Approved Provider',
    email: 'elena.rostova@healthbound.ca',
    phone: '416-548-7872 ext 108',
    primaryLocation: 'hamilton',
    servicedRegions: ['Hamilton-Halton', 'Niagara'],
    specialties: ['occupational_therapy', 'psychological_counselling', 'acupuncture'],
    activeCaseloadCount: 16,
    maxCaseloadCapacity: 20,
    bio: 'Pediatric and neurodevelopmental OT leading structured cognitive functional rehabilitation programs.',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'th-4',
    name: 'David Okafor, OT Reg. (Ont.)',
    credentials: 'MScOT, Certified Fall Prevention Specialist',
    email: 'david.okafor@healthbound.ca',
    phone: '416-548-7872 ext 110',
    primaryLocation: 'etobicoke',
    servicedRegions: ['GTA', 'Hamilton-Halton'],
    specialties: ['occupational_therapy', 'massage_therapy', 'cupping'],
    activeCaseloadCount: 9,
    maxCaseloadCapacity: 15,
    bio: 'Geriatric specialist focusing on home safety assessments, aging-in-place modifications, and chronic pain management.',
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
    city: 'East York',
    region: 'GTA',
    serviceLine: 'occupational_therapy',
    stage: 'active',
    locationPreference: 'pape_east_york',
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
    city: 'Hamilton',
    region: 'Hamilton-Halton',
    serviceLine: 'occupational_therapy',
    stage: 'active',
    locationPreference: 'hamilton',
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
    city: 'Toronto',
    region: 'GTA',
    serviceLine: 'occupational_therapy',
    stage: 'awaiting_funding',
    locationPreference: 'toronto_bloor_west',
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
    city: 'Etobicoke',
    region: 'GTA',
    serviceLine: 'occupational_therapy',
    stage: 'under_review',
    locationPreference: 'etobicoke',
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
    serviceLine: 'psychological_counselling',
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
    locationId: 'pape_east_york',
    visitType: 'clinic',
    serviceLine: 'occupational_therapy',
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
    locationId: 'hamilton',
    visitType: 'clinic',
    serviceLine: 'occupational_therapy',
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
    locationId: 'toronto_bloor_west',
    visitType: 'community_home',
    serviceLine: 'occupational_therapy',
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
    virtualMeetingUrl: 'https://healthbound.ca/telehealth/room-99201',
    serviceLine: 'psychological_counselling',
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
