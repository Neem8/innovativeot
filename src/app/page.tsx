'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { ButterflyVideo } from '@/components/public/ButterflyVideo';
import { 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  UserCheck, 
  FileText, 
  ShieldAlert, 
  Activity, 
  Award, 
  HeartHandshake, 
  Sparkles,
  Users,
  Brain,
  Car,
  Briefcase,
  Home as HomeIcon,
  Smile,
  ChevronRight
} from 'lucide-react';
import { CLINIC_LOCATIONS, SERVICE_LINES } from '@/lib/mockData';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Header />

      {/* Hero Section with Natural Butterfly Video Background */}
      <section className="relative bg-slate-950 text-white pt-20 pb-28 overflow-hidden min-h-[560px]">
        {/* Butterfly Ambient Video Layer */}
        <ButterflyVideo overlayOpacity="bg-linear-to-r from-[#0F3854]/60 via-[#0F3854]/30 to-[#0F3854]/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-semibold tracking-wide backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span>Ontario-Wide Multidisciplinary Clinic Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Rebuilding Your <span className="text-teal-300 underline decoration-teal-400/50 decoration-wavy underline-offset-8">Life</span> & Health.
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl">
                Accredited interdisciplinary care for motor vehicle collisions, workplace recovery, chronic pain, and rehabilitation. Serving over 45 communities across Ontario.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/referral"
                  className="px-6 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base transition-all shadow-lg hover:shadow-teal-500/30 flex items-center justify-center gap-2 group"
                >
                  <span>Submit Client Referral</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="tel:18665233615"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-xs border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5 text-teal-300" />
                  <span>Call 1-866-523-3615</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-200 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>CARF International Accredited</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>WSIB & MVA Direct Billing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Bilingual Staff & Outreach</span>
                </div>
              </div>
            </div>

            {/* Hero Card Visual */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">Intake & Referral Pipeline</span>
                    <h2 className="text-xl font-bold text-white">Fast-Track Referral Intake</h2>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold">
                    Live Platform
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/10 p-3.5 rounded-xl flex items-center justify-between border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs">
                        MVA
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Auto Injury & Rehabilitation</p>
                        <p className="text-xs text-slate-300">Form 1 Attendant Care & Neuro-Rehab</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-400/20 text-blue-200 font-medium">Auto Insurers</span>
                  </div>

                  <div className="bg-white/10 p-3.5 rounded-xl flex items-center justify-between border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
                        EHB
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Extended Health Benefits</p>
                        <p className="text-xs text-slate-300">Physiotherapy, Massage & Chiropractic</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-teal-400/20 text-teal-200 font-medium">Extended Health</span>
                  </div>

                  <div className="bg-white/10 p-3.5 rounded-xl flex items-center justify-between border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                        WSIB
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">WSIB Work-Related Recovery</p>
                        <p className="text-xs text-slate-300">Work Hardening & Return-to-Work Programs</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-200 font-medium">WSIB Claims</span>
                  </div>
                </div>

                <Link
                  href="/platform/referrals"
                  className="w-full py-3 rounded-xl bg-white text-[#0F3854] font-bold text-center text-sm hover:bg-slate-100 transition-colors block shadow-md"
                >
                  Explore Internal Operations Platform →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section className="bg-white border-b border-slate-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#0F3854]">6 Clinics</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">Physical Clinic Resource Centers</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-teal-600">45+ Areas</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">Communities Served Across Ontario</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#0F3854]">CARF</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">Commission on Accreditation of Rehab</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-teal-600">Province-Wide</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">Outreach, Home & Community Visits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Lines Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Comprehensive Clinical Practice
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Occupational Therapy Across All Age Bands & Sectors
          </h2>
          <p className="text-slate-600 text-base">
            From early pediatric milestone intervention to complex auto injury rehabilitation and workplace ergonomic redesign.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_LINES.map(service => {
            const iconMap: Record<string, React.ReactNode> = {
              physiotherapy: <Activity className="w-6 h-6 text-teal-600" />,
              occupational_therapy: <HeartHandshake className="w-6 h-6 text-rose-600" />,
              chiropractor: <Sparkles className="w-6 h-6 text-blue-600" />,
              massage_therapy: <Users className="w-6 h-6 text-purple-600" />,
              active_exercise: <Activity className="w-6 h-6 text-teal-600" />,
              acupuncture: <CheckCircle2 className="w-6 h-6 text-teal-600" />,
              cupping: <CheckCircle2 className="w-6 h-6 text-teal-600" />,
              chiropody: <MapPin className="w-6 h-6 text-blue-600" />,
              msk_injection: <ShieldAlert className="w-6 h-6 text-rose-600" />,
              naturopathic: <Smile className="w-6 h-6 text-emerald-600" />,
              assistive_devices: <HomeIcon className="w-6 h-6 text-emerald-600" />,
              psychological_counselling: <Brain className="w-6 h-6 text-purple-600" />
            };

            return (
              <div 
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                      {iconMap[service.id] || <Activity className="w-6 h-6 text-teal-600" />}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {service.ageRangeText}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {service.commonPayers.map(p => (
                      <span key={p} className="text-[11px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200 uppercase">
                        {p.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700"
                  >
                    <span>View Service Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Referral Partners & Sectors */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Healthcare Partner Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Tailored Workflows for Key Ontario Referral Partners
            </h2>
            <p className="text-slate-400 text-base">
              We eliminate administrative delays by providing specialized reporting, direct billing, and status visibility tailored to each sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                MD
              </div>
              <h3 className="text-lg font-bold text-white">Physicians & Discharge Planners</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct hospital discharge coordination, attendant care evaluation, and prompt clinical progress summaries for family physicians.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
                LAW
              </div>
              <h3 className="text-lg font-bold text-white">Personal Injury Lawyers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Form 1 assessments, SABS catastrophic injury evaluations, and objective medical-legal reports built for trial readiness.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                INS
              </div>
              <h3 className="text-lg font-bold text-white">WSIB & Auto Adjusters</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Timely Form 8 progress submissions, job-demands matching, clear treatment plan authorization tracking, and goal metrics.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F3854] text-teal-300 flex items-center justify-center font-bold">
                HOSP
              </div>
              <h3 className="text-lg font-bold text-white">Hospitals & Government</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Programs and services extended to community, corporate, and government entities as well as hospitals directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Map / Cards Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Regional Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Physical Clinics & Community Tele-OT
            </h2>
          </div>
          <Link
            href="/locations"
            className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            <span>View All Clinic Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_LOCATIONS.filter(l => l.id !== 'community_virtual').map(loc => (
            <div key={loc.id} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                {loc.isHospitalCoLocated && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 inline-block">
                    Hospital Co-Located
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{loc.name}</h3>
                <p className="text-xs text-slate-600 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{loc.address}, {loc.city}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Phone: {loc.phone}</span>
                <span className="text-teal-600">Open M-F</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner with Butterfly Video Overlay */}
      <section className="relative bg-[#0F3854] text-white py-20 overflow-hidden">
        <ButterflyVideo overlayOpacity="bg-linear-to-r from-teal-900/50 via-[#0F3854]/40 to-[#0F3854]/60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Refer a Client or Start Therapy?
          </h2>
          <p className="text-teal-100 text-base max-w-2xl mx-auto">
            Our intake coordinators handle all payer authorization verification, therapist matching, and initial scheduling within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/referral"
              className="px-8 py-4 rounded-xl bg-white text-[#0F3854] font-bold text-base hover:bg-slate-100 transition-all shadow-lg"
            >
              Submit Online Referral Intake
            </Link>
            <a
              href="tel:18665233615"
              className="px-8 py-4 rounded-xl bg-teal-700/60 hover:bg-teal-700 text-white font-semibold text-base border border-teal-400/40 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-teal-200" />
              <span>Call Toll Free: 1-866-523-3615</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
