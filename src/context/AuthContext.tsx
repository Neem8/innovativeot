'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/lib/types';

interface AuthContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  aodaHighContrast: boolean;
  aodaLargeText: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  roleLabels: Record<UserRole, string>;
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Executive / Practice Director',
  clinic_manager: 'Clinic Intake Manager',
  therapist: 'Therapist (OT)',
  referrer: 'Referrer (Legal / MD / Insurer)',
  client: 'Client / Family Member'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('clinic_manager');
  const [aodaHighContrast, setAodaHighContrast] = useState(false);
  const [aodaLargeText, setAodaLargeText] = useState(false);

  useEffect(() => {
    if (aodaHighContrast) {
      document.body.classList.add('aoda-high-contrast');
    } else {
      document.body.classList.remove('aoda-high-contrast');
    }
  }, [aodaHighContrast]);

  useEffect(() => {
    if (aodaLargeText) {
      document.body.classList.add('aoda-large-text');
    } else {
      document.body.classList.remove('aoda-large-text');
    }
  }, [aodaLargeText]);

  const toggleHighContrast = () => setAodaHighContrast(prev => !prev);
  const toggleLargeText = () => setAodaLargeText(prev => !prev);

  return (
    <AuthContext.Provider
      value={{
        currentRole,
        setRole: setCurrentRole,
        aodaHighContrast,
        aodaLargeText,
        toggleHighContrast,
        toggleLargeText,
        roleLabels
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
