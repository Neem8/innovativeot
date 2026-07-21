'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Eye, 
  Type, 
  Menu, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  MapPin,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { aodaHighContrast, aodaLargeText, toggleHighContrast, toggleLargeText } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/locations', label: 'Locations' },
    { href: '/story', label: 'Our Story & Team' },
    { href: '/referral', label: 'Referral Intake' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner: Free Intake & AODA Controls */}
      <div className="bg-[#0F3854] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-medium text-teal-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Intake • No Physician Referral Required</span>
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <a 
              href="tel:2892144467" 
              className="flex items-center gap-1.5 hover:text-teal-300 transition-colors font-semibold"
              aria-label="Call InnovativeOT at 289-214-4467"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>289-214-4467</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> AODA Accessible:
            </span>
            <button
              onClick={toggleHighContrast}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors flex items-center gap-1 border ${
                aodaHighContrast 
                  ? 'bg-yellow-400 text-black border-yellow-300 font-bold' 
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              aria-label="Toggle High Contrast Mode"
            >
              <Eye className="w-3 h-3" />
              {aodaHighContrast ? 'Contrast ON' : 'High Contrast'}
            </button>
            <button
              onClick={toggleLargeText}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors flex items-center gap-1 border ${
                aodaLargeText 
                  ? 'bg-teal-400 text-slate-950 border-teal-300 font-bold' 
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              aria-label="Toggle Large Text Mode"
            >
              <Type className="w-3 h-3" />
              {aodaLargeText ? 'Text 115%' : 'Large Text'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0F3854] to-[#1E6B9B] flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            iOT
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold tracking-tight text-xl text-[#0F3854]">INNOVATIVE</span>
              <span className="font-light text-xl text-teal-600">OT</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">Occupational Therapy Solutions</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors relative py-1 ${
                isActive(item.href)
                  ? 'text-[#0F3854] font-bold'
                  : 'text-slate-600 hover:text-[#0F3854]'
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Callouts */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/referral"
            className="px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm transition-all shadow-sm flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Refer a Client</span>
          </Link>
          <Link
            href="/platform/referrals"
            className="px-4 py-2.5 rounded-lg bg-[#0F3854] hover:bg-[#1E6B9B] text-white font-medium text-sm transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Operations Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-teal-50 text-teal-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/referral"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-teal-600 text-white font-medium text-center text-sm"
            >
              Submit Referral
            </Link>
            <Link
              href="/platform/referrals"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-[#0F3854] text-white font-medium text-center text-sm"
            >
              Access Operations Platform
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
