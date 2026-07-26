import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  title: "Health Bound Health Network | Multidisciplinary Rehabilitation Services Ontario",
  description: "CARF-accredited multidisciplinary rehabilitation network across Ontario. Specializing in Physiotherapy, Occupational Therapy, Chiropractic Care, Massage, and Psychological Counselling across 45+ communities.",
  keywords: "physiotherapy ontario, occupational therapy toronto, CARF accredited clinic, MVA rehabilitation, WSIB return to work, psychological counselling, chiropody Markham, massage therapy East York, health network Ontario",
  openGraph: {
    title: "Health Bound Health Network | Rebuilding Life and Health",
    description: "CARF-accredited multidisciplinary clinic and community outreach network across Ontario.",
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
