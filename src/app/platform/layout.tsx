'use client';

import React from 'react';
import { PlatformNavbar } from '@/components/platform/PlatformNavbar';
import { PlatformSidebar } from '@/components/platform/PlatformSidebar';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <PlatformNavbar />
      <div className="flex flex-1">
        <PlatformSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
