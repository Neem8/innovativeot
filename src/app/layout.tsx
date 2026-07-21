import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  title: "InnovativeOT | Occupational Therapy Services Ontario",
  description: "Ontario-based multi-location occupational therapy provider. Specializing in Pediatric OT, MVA Rehab, Workplace Ergonomics, Return-to-Work, Geriatric Fall Prevention, and Community Mental Health across GTA, Niagara, Halton, and Waterloo.",
  keywords: "occupational therapy ontario, pediatric OT st catharines, MVA rehab oakville, WSIB ergonomic assessment kitchener, driver rehab grimsby, brain injury rehab GTA, OAP autism therapy, PHIPA compliant OT platform",
  openGraph: {
    title: "InnovativeOT | Where Your Journey Begins",
    description: "Multi-location & virtual occupational therapy operating platform across Ontario.",
    type: "website",
    locale: "en_CA",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FAFAF7] text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
        <AuthProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
