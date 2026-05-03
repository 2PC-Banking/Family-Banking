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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (username === 'familybank' && password === '123456') {
      setNeedsOtp(true);
      setAdminName('Family Bank Admin');
      return true;
    }
    return false;
  };

  const verifyOtp = async (code: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (code === '123456') {
      setIsAuthenticated(true);
      setNeedsOtp(false);
      localStorage.setItem('familybank_auth', JSON.stringify({ name: adminName }));
      return true;
    }
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
