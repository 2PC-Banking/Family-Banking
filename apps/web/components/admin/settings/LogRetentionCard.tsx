'use client';

import { useState } from 'react';

interface LogRetentionSettings {
  retentionDays: number;
  archiveSize: number;
  logLevel: string;
}

interface LogRetentionCardProps {
  onSettingsChange?: (settings: LogRetentionSettings) => void;
}

export function LogRetentionCard({ onSettingsChange }: LogRetentionCardProps) {
  const [settings, setSettings] = useState<LogRetentionSettings>({
    retentionDays: 30,
    archiveSize: 1000,
    logLevel: 'INFO',
  });

  const handleChange = (field: keyof LogRetentionSettings, value: number | string) => {
    const updated = { ...settings, [field]: value };
    setSettings(updated);
    onSettingsChange?.(updated);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Log Retention</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Retention Period (days)
            </label>
            <input
              type="number"
              value={settings.retentionDays}
              onChange={(e) => handleChange('retentionDays', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-slate-600 mt-1">How long system logs are kept</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Archive Size Limit (MB)
            </label>
            <input
              type="number"
              value={settings.archiveSize}
              onChange={(e) => handleChange('archiveSize', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-slate-600 mt-1">Maximum archive size before rotation</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Log Level
          </label>
          <select
            value={settings.logLevel}
            onChange={(e) => handleChange('logLevel', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option>DEBUG</option>
            <option>INFO</option>
            <option>WARN</option>
            <option>ERROR</option>
          </select>
        </div>
      </div>
    </div>
  );
}
