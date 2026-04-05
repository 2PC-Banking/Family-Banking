'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

type UserSession = {
  customerId: string;
  name: string;
  accountnumber: string;
};

interface UserContextType {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isReady: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'family-banking-user';

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUserState(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsReady(true);
  }, []);

  const setUser = (value: UserSession | null) => {
    setUserState(value);
    if (value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout,
      isLoggedIn: !!user,
      isReady,
    }),
    [user, isReady]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}