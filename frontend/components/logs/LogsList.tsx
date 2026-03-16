'use client';

import { useState, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { LogCard } from './LogCard';

interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  source: string;
  message: string;
  transactionId: string | null;
}

interface LogsListProps {
  logs: Log[];
  onRowClick: (log: Log) => void;
  onFilteredDataChange?: (data: Log[]) => void;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export function LogsList({ logs = [], onRowClick, onFilteredDataChange, currentPage = 1, onPageChange }: LogsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const itemsPerPage = 15;

  const filteredLogs = (logs || []).filter((log) => {
    const matchesSearch = 
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const levelValue = log.level.charAt(0) + log.level.slice(1).toLowerCase();
    const matchesLevel = levelFilter === 'All Levels' || levelValue === levelFilter;
    
    return matchesSearch && matchesLevel;
  });

  useEffect(() => {
    if (onFilteredDataChange) {
      onFilteredDataChange(filteredLogs);
    }
  }, [searchTerm, levelFilter]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200" key={refreshKey}>
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-slate-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search logs by transaction ID, message, or source..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                onPageChange?.(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={levelFilter}
            onChange={(e) => {
              setLevelFilter(e.target.value);
              onPageChange?.(1);
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
          >
            <option>All Levels</option>
            <option>Info</option>
            <option>Success</option>
            <option>Warning</option>
            <option>Error</option>
          </select>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors flex-shrink-0"
          >
            <RefreshCw size={18} />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-3 px-6 py-4">
        {paginatedLogs.length > 0 ? (
          paginatedLogs.map((log) => (
            <LogCard key={log.id} log={log} onClick={onRowClick} />
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">No logs found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Showing {filteredLogs.length > 0 ? startIndex + 1 : 0} to{' '}
          {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
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
            disabled={currentPage === totalPages || filteredLogs.length === 0}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
