'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  adminName: string;
  login: (username: string, password: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
  logout: () => void;
  needsOtp: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOtp, setNeedsOtp] = useState(false);
  const [adminName, setAdminName] = useState('');

  // Check if user is logged in on mount
  useEffect(() => {
    const stored = localStorage.getItem('familybank_auth');
    if (stored) {
      setIsAuthenticated(true);
      setAdminName(JSON.parse(stored).name);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? '';
    const url = `${base}/api/auth/login`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: username, pass: password }),
      });

      if (res.ok) {
        const data = await res.json();

        setAdminName(data.name ?? '');
        setIsAuthenticated(true);   // ✅ login luôn
        setNeedsOtp(false);         // ❌ bỏ OTP

        localStorage.setItem(
          'familybank_auth',
          JSON.stringify({
            name: data.name,
            customerId: data.customerId,
          })
        );

        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const verifyOtp = async (code: string) => {
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setNeedsOtp(false);
    setAdminName('');
    localStorage.removeItem('familybank_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminName, login, verifyOtp, logout, needsOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
