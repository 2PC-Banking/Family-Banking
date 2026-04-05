'use client';

import { useState } from 'react';

interface TransactionSettings {
  phase1Timeout: number;
  phase2Timeout: number;
  maxRetryAttempts: number;
  retryDelay: number;
}

interface TransactionSettingsCardProps {
  onSettingsChange?: (settings: TransactionSettings) => void;
}

export function TransactionSettingsCard({ onSettingsChange }: TransactionSettingsCardProps) {
  const [settings, setSettings] = useState<TransactionSettings>({
    phase1Timeout: 30,
    phase2Timeout: 45,
    maxRetryAttempts: 3,
    retryDelay: 1000,
  });

  const handleChange = (field: keyof TransactionSettings, value: number) => {
    const updated = { ...settings, [field]: value };
    setSettings(updated);
    onSettingsChange?.(updated);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Transaction Settings</h2>

      {/* Timeout Configuration */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Timeout Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phase 1 Timeout (seconds)
            </label>
            <input
              type="number"
              value={settings.phase1Timeout}
              onChange={(e) => handleChange('phase1Timeout', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-slate-600 mt-1">Maximum wait time for prepare phase responses</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phase 2 Timeout (seconds)
            </label>
            <input
              type="number"
              value={settings.phase2Timeout}
              onChange={(e) => handleChange('phase2Timeout', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-slate-600 mt-1">Maximum wait time for commit phase responses</p>
          </div>
        </div>
      </div>

      {/* Retry Configuration */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Retry Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Maximum Retry Attempts
            </label>
            <input
              type="number"
              value={settings.maxRetryAttempts}
              onChange={(e) => handleChange('maxRetryAttempts', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-slate-600 mt-1">Number of times to retry failed operations</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Retry Delay (milliseconds)
            </label>
            <input
              type="number"
              value={settings.retryDelay}
              onChange={(e) => handleChange('retryDelay', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-slate-600 mt-1">Delay between retry attempts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
