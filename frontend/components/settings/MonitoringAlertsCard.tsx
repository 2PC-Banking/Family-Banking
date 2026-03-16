'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface MonitoringAlertsSettings {
  highErrorRateAlert: boolean;
  slowTransactionAlert: boolean;
  participantOfflineAlert: boolean;
}

interface MonitoringAlertsCardProps {
  onSettingsChange?: (settings: MonitoringAlertsSettings) => void;
}

export function MonitoringAlertsCard({ onSettingsChange }: MonitoringAlertsCardProps) {
  const [settings, setSettings] = useState<MonitoringAlertsSettings>({
    highErrorRateAlert: true,
    slowTransactionAlert: true,
    participantOfflineAlert: true,
  });

  const handleToggle = (field: keyof MonitoringAlertsSettings) => {
    const updated = { ...settings, [field]: !settings[field] };
    setSettings(updated);
    onSettingsChange?.(updated);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Monitoring & Alerts</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">High Error Rate Alert</h3>
            <p className="text-sm text-slate-600 mt-1">Trigger alert when transaction error rate exceeds threshold</p>
          </div>
          <Switch
            checked={settings.highErrorRateAlert}
            onCheckedChange={() => handleToggle('highErrorRateAlert')}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">Slow Transaction Alert</h3>
            <p className="text-sm text-slate-600 mt-1">Alert when transaction duration exceeds configured timeout</p>
          </div>
          <Switch
            checked={settings.slowTransactionAlert}
            onCheckedChange={() => handleToggle('slowTransactionAlert')}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">Participant Offline Alert</h3>
            <p className="text-sm text-slate-600 mt-1">Alert when a participant node becomes unreachable</p>
          </div>
          <Switch
            checked={settings.participantOfflineAlert}
            onCheckedChange={() => handleToggle('participantOfflineAlert')}
          />
        </div>
      </div>
    </div>
  );
}
