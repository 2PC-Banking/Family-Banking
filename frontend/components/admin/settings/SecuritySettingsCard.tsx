'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface SecuritySettings {
  twoFactorAuth: boolean;
  encryption: boolean;
  auditLogging: boolean;
}

interface SecuritySettingsCardProps {
  onSettingsChange?: (settings: SecuritySettings) => void;
}

export function SecuritySettingsCard({ onSettingsChange }: SecuritySettingsCardProps) {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    encryption: false,
    auditLogging: false,
  });

  const handleToggle = (field: keyof SecuritySettings) => {
    const updated = { ...settings, [field]: !settings[field] };
    setSettings(updated);
    onSettingsChange?.(updated);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Security Settings</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">Two-Factor Authentication</h3>
            <p className="text-sm text-slate-600 mt-1">Require 2FA for admin accounts</p>
          </div>
          <Switch
            checked={settings.twoFactorAuth}
            onCheckedChange={() => handleToggle('twoFactorAuth')}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">Encryption</h3>
            <p className="text-sm text-slate-600 mt-1">Enable end-to-end encryption for sensitive data</p>
          </div>
          <Switch
            checked={settings.encryption}
            onCheckedChange={() => handleToggle('encryption')}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">Audit Logging</h3>
            <p className="text-sm text-slate-600 mt-1">Log all administrative actions</p>
          </div>
          <Switch
            checked={settings.auditLogging}
            onCheckedChange={() => handleToggle('auditLogging')}
          />
        </div>
      </div>
    </div>
  );
}
