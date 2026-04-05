'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

interface TwoPhaseCommitTransaction {
  id: string;
  fromBank: string;
  toBank: string;
  amount: string;
  timestamp: string;
  phase: 'PREPARE' | 'COMMIT' | 'ABORT';
  status: 'Prepared' | 'Committed' | 'Pending' | 'Aborted';
  participants: number;
  coordinatorBank: string;
  reason?: string;
}

interface TwoPhaseCommitTableProps {
  transactions: TwoPhaseCommitTransaction[];
  onRowClick: (transaction: TwoPhaseCommitTransaction) => void;
  onFilteredDataChange?: (data: TwoPhaseCommitTransaction[]) => void;
}

type SortField = 'id' | 'timestamp' | 'amount' | 'status' | 'phase';
type SortOrder = 'asc' | 'desc';

const statusBadge = (status: string) => {
  const styles = {
    'Prepared': 'bg-yellow-100 text-yellow-700',
    'Committed': 'bg-green-100 text-green-700',
    'Pending': 'bg-blue-100 text-blue-700',
    'Aborted': 'bg-red-100 text-red-700',
  };
  return styles[status as keyof typeof styles] || '';
};

const phaseBadge = (phase: string) => {
  const styles = {
    'PREPARE': 'bg-purple-100 text-purple-700',
    'COMMIT': 'bg-blue-100 text-blue-700',
    'ABORT': 'bg-red-100 text-red-700',
  };
  return styles[phase as keyof typeof styles] || '';
};

const parseAmount = (amount: string): number => {
  return parseFloat(amount.replace(/[$,]/g, ''));
};

export function TwoPhaseCommitTable({ transactions = [], onRowClick, onFilteredDataChange }: TwoPhaseCommitTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Prepared' | 'Committed' | 'Pending' | 'Aborted'>('All');
  const [phaseFilter, setPhaseFilter] = useState<'All' | 'PREPARE' | 'COMMIT' | 'ABORT'>('All');
  
  const itemsPerPage = 8;

  // Filter transactions
  const filteredTransactions = (transactions || []).filter((tx) => {
    const matchesSearch = 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.fromBank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.toBank.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    const matchesPhase = phaseFilter === 'All' || tx.phase === phaseFilter;
    
    return matchesSearch && matchesStatus && matchesPhase;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let compareValue = 0;
    
    switch (sortField) {
      case 'id':
        compareValue = a.id.localeCompare(b.id);
        break;
      case 'timestamp':
        compareValue = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        break;
      case 'amount':
        compareValue = parseAmount(a.amount) - parseAmount(b.amount);
        break;
      case 'status':
        compareValue = a.status.localeCompare(b.status);
        break;
      case 'phase':
        compareValue = a.phase.localeCompare(b.phase);
        break;
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  // Notify parent of filtered/sorted data
  useEffect(() => {
    if (onFilteredDataChange) {
      onFilteredDataChange(sortedTransactions);
    }
  }, [searchTerm, statusFilter, phaseFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: 'All' | 'Prepared' | 'Committed' | 'Pending' | 'Aborted') => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePhaseChange = (phase: 'All' | 'PREPARE' | 'COMMIT' | 'ABORT') => {
    setPhaseFilter(phase);
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={16} className="text-slate-400" />;
    return (
      <ArrowUpDown
        size={16}
        className={`${sortOrder === 'asc' ? 'rotate-180' : ''} text-blue-600`}
      />
    );
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      {/* Search and Filters Bar */}
      <div className="px-6 py-4 border-b border-slate-200 space-y-4">
        {/* Search */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by transaction ID, amount, or bank..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Status:</span>
            <div className="flex gap-2">
              {(['All', 'Prepared', 'Committed', 'Pending', 'Aborted'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Phase:</span>
            <select
              value={phaseFilter}
              onChange={(e) => handlePhaseChange(e.target.value as any)}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200 transition-colors"
            >
              <option value="All">All Phases</option>
              <option value="PREPARE">PREPARE</option>
              <option value="COMMIT">COMMIT</option>
              <option value="ABORT">ABORT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th 
                onClick={() => handleSort('id')}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Transaction ID
                  <SortIcon field="id" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('timestamp')}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Date & Time
                  <SortIcon field="timestamp" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('amount')}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Amount
                  <SortIcon field="amount" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Coordinator</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Participants</th>
              <th 
                onClick={() => handleSort('phase')}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Phase
                  <SortIcon field="phase" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('status')}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => onRowClick(tx)}
                  className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{tx.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.timestamp}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{tx.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.coordinatorBank}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.participants}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${phaseBadge(tx.phase)}`}>
                      {tx.phase}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                  No transactions found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Showing {sortedTransactions.length > 0 ? startIndex + 1 : 0} to{' '}
          {Math.min(startIndex + itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length}{' '}
          transactions
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || sortedTransactions.length === 0}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
