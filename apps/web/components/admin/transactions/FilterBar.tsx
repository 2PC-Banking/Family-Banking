'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { FilterState } from './TransactionFilters';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter((s) => s !== status);
    const newFilters = { ...filters, status: newStatus };
    onFilterChange(newFilters);
  };

  const handleDateChange = (type: 'from' | 'to', value: string) => {
    const newFilters = {
      ...filters,
      [type === 'from' ? 'dateFrom' : 'dateTo']: value,
    };
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    const newFilters = { ...filters, sortBy };
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      status: [],
      dateFrom: '',
      dateTo: '',
      sortBy: 'timestamp-desc',
    };
    onFilterChange(resetFilters);
  };

  const activeFiltersCount =
    filters.status.length +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0) +
    (filters.sortBy !== 'timestamp-desc' ? 1 : 0);

  return (
    <div className="bg-white border-b border-slate-200">
      {/* Compact Filter Header */}
      <div className="px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Filter size={20} className="text-slate-600" />
          <span className="text-sm font-medium text-slate-900">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown
            size={18}
            className={`text-slate-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X size={16} />
            Clear all
          </button>
        )}
      </div>

      {/* Expanded Filter Panel */}
      {isExpanded && (
        <div className="border-t border-slate-200 px-8 py-6 bg-slate-50">
          <div className="grid grid-cols-4 gap-6">
            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Status</h3>
              <div className="space-y-2">
                {['Completed', 'Processing', 'Failed'].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 cursor-pointer"
                  >
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
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
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
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: 'timestamp-desc', label: 'Newest First' },
                  { value: 'timestamp-asc', label: 'Oldest First' },
                  { value: 'amount-desc', label: 'Highest Amount' },
                  { value: 'amount-asc', label: 'Lowest Amount' },
                  { value: 'status', label: 'Status' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={(e) =>
                        handleSortChange(e.target.value as FilterState['sortBy'])
                      }
                      className="w-4 h-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Info Space */}
            <div className="flex items-end">
              <p className="text-xs text-slate-500">
                Showing filters for status, date range, and sort order. Adjust as needed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
