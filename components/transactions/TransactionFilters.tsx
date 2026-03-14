'use client';

import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';

interface TransactionFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  status: string[];
  dateFrom: string;
  dateTo: string;
  sortBy: 'timestamp-desc' | 'timestamp-asc' | 'amount-desc' | 'amount-asc' | 'status';
}

export function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    dateFrom: '',
    dateTo: '',
    sortBy: 'timestamp-desc',
  });

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter((s) => s !== status);
    const newFilters = { ...filters, status: newStatus };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (type: 'from' | 'to', value: string) => {
    const newFilters = {
      ...filters,
      [type === 'from' ? 'dateFrom' : 'dateTo']: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      status: [],
      dateFrom: '',
      dateTo: '',
      sortBy: 'timestamp-desc',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 p-6 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Filter size={20} className="text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Status</h3>
        <div className="space-y-2">
          {['Completed', 'Processing', 'Failed'].map((status) => (
            <label key={status} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.status.includes(status)}
                onChange={(e) => handleStatusChange(status, e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Calendar size={16} />
          Date Range
        </h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-slate-600 block mb-1">From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleDateChange('from', e.target.value)}
              className="w-full px-2 py-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 block mb-1">To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleDateChange('to', e.target.value)}
              className="w-full px-2 py-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: 'timestamp-desc', label: 'Newest First' },
            { value: 'timestamp-asc', label: 'Oldest First' },
            { value: 'amount-desc', label: 'Highest Amount' },
            { value: 'amount-asc', label: 'Lowest Amount' },
            { value: 'status', label: 'Status' },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={filters.sortBy === option.value}
                onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
                className="w-4 h-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-medium text-sm transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}
