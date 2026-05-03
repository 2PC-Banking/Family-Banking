'use client';

import { useState } from 'react';
import { SystemStatus } from '@/components/admin/dashboard/SystemStatus';
import { SettingsHeader } from '@/components/admin/settings/SettingsHeader';
import { TransactionSettingsCard } from '@/components/admin/settings/TransactionSettingsCard';
import { LogRetentionCard } from '@/components/admin/settings/LogRetentionCard';
import { MonitoringAlertsCard } from '@/components/admin/settings/MonitoringAlertsCard';
import { ParticipantNodesCard } from '@/components/admin/settings/ParticipantNodesCard';
import { SecuritySettingsCard } from '@/components/admin/settings/SecuritySettingsCard';
import { SystemInformationCard } from '@/components/admin/settings/SystemInformationCard';
import { NodeConfigurationModal } from '@/components/admin/settings/NodeConfigurationModal';

interface ParticipantNode {
  id: string;
  name: string;
  status: 'Online' | 'Offline' | 'Pending';
  endpointUrl?: string;
  lastHeartbeat?: string;
  averageResponseTime?: number;
  timeoutThreshold?: number;
}

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ParticipantNode | null>(null);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // In a real app, you would save the settings here
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to their default values?')) {
      // Reset logic would go here
    }
  };

  const handleAddParticipant = () => {
    // Add participant logic would go here
  };

  const handleConfigureNode = (node: ParticipantNode) => {
    setSelectedNode(node);
  };

  const handleTestConnection = (nodeId: string) => {
    // Test connection logic would go here
    console.log('[v0] Testing connection for node:', nodeId);
  };

  const handleSaveNodeConfiguration = (node: ParticipantNode) => {
    // Save node configuration logic would go here
    console.log('[v0] Saving node configuration:', node);
  };

  const handleDisableNode = (nodeId: string) => {
    // Disable node logic would go here
    console.log('[v0] Disabling node:', nodeId);
  };

  return (
    <div className="flex flex-col h-full">
      <SystemStatus />
      <SettingsHeader />

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-8 py-6">
          <div className="space-y-6">
            {/* Transaction Settings */}
            <TransactionSettingsCard />

            {/* Log Retention */}
            <LogRetentionCard />

            {/* Monitoring & Alerts */}
            <MonitoringAlertsCard />

            {/* Participant Nodes */}
            <ParticipantNodesCard 
              onAddNode={handleAddParticipant}
              onConfigureNode={handleConfigureNode}
              onTestConnection={handleTestConnection}
            />

            {/* Security Settings */}
            <SecuritySettingsCard />

            {/* System Information */}
            <SystemInformationCard />

            {/* Action Buttons */}
            <div className="flex justify-between gap-3 pt-4">
              <button
                onClick={handleResetSettings}
                className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors bg-white"
              >
                Reset to Default
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Node Configuration Modal */}
      <NodeConfigurationModal
        isOpen={selectedNode !== null}
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSave={handleSaveNodeConfiguration}
        onDisable={handleDisableNode}
      />
    </div>
  );
}


