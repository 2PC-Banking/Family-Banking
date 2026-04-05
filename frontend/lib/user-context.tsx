'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { currentUser, mockTransactions, Transaction } from './user-mock-data';

interface TransferData {
  fromAccount: string;
  toAccount: string;
  recipientName: string;
  recipientBank: string;
  amount: number;
  note: string;
}

interface UserContextType {
  user: typeof currentUser;
  transactions: Transaction[];
  pendingTransfer: TransferData | null;
  lastCompletedTransfer: (TransferData & { id: string; timestamp: string }) | null;
  setPendingTransfer: (data: TransferData | null) => void;
  completeTransfer: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [pendingTransfer, setPendingTransfer] = useState<TransferData | null>(null);
  const [lastCompletedTransfer, setLastCompletedTransfer] = useState<(TransferData & { id: string; timestamp: string }) | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const completeTransfer = () => {
    if (pendingTransfer) {
      const newTransaction: Transaction = {
        id: `TX_${Date.now()}_OUT`,
        type: 'transfer_out',
        amount: -pendingTransfer.amount,
        status: 'success',
        timestamp: new Date().toISOString(),
        description: 'Chuyển tiền',
        recipientName: pendingTransfer.recipientName,
        recipientAccount: pendingTransfer.toAccount,
        recipientBank: pendingTransfer.recipientBank,
        note: pendingTransfer.note,
        authMethod: 'Smart OTP',
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setLastCompletedTransfer({
        ...pendingTransfer,
        id: newTransaction.id,
        timestamp: newTransaction.timestamp,
      });
      setPendingTransfer(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        transactions,
        pendingTransfer,
        lastCompletedTransfer,
        setPendingTransfer,
        completeTransfer,
        isLoggedIn: true, // Mock logged in state
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
