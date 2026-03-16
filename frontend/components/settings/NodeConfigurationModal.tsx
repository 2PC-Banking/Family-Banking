'use client';

import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface NodeConfiguration {
  id: string;
  name: string;
  endpointUrl: string;
  status: 'Online' | 'Offline' | 'Pending';
  lastHeartbeat: string;
  averageResponseTime: number;
  timeoutThreshold: number;
}

interface NodeConfigurationModalProps {
  isOpen: boolean;
  node: NodeConfiguration | null;
  onClose: () => void;
  onSave?: (node: NodeConfiguration) => void;
  onDisable?: (nodeId: string) => void;
}

export function NodeConfigurationModal({
  isOpen,
  node,
  onClose,
  onSave,
  onDisable,
}: NodeConfigurationModalProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; responseTime?: number } | null>(null);
  const [editedNode, setEditedNode] = useState<NodeConfiguration | null>(node);

  if (!isOpen || !node) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Random success/failure for demo
    const success = Math.random() > 0.2;
    const responseTime = success ? Math.floor(Math.random() * (200 - 50 + 1) + 50) : undefined;
    
    setTestResult({ success, responseTime });
    setIsTesting(false);
  };

  const handleSave = () => {
    if (editedNode && onSave) {
      onSave(editedNode);
      onClose();
    }
  };

  const handleDisable = () => {
    if (confirm(`Are you sure you want to disable ${node.name}?`)) {
      onDisable?.(node.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Node Configuration</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Status Badge */}
          <div className={`px-4 py-3 rounded-lg border ${
            node.status === 'Online' ? 'bg-green-50 border-green-200' :
            node.status === 'Offline' ? 'bg-red-50 border-red-200' :
            'bg-yellow-50 border-yellow-200'
          }`}>
            <p className={`font-semibold ${
              node.status === 'Online' ? 'text-green-700' :
              node.status === 'Offline' ? 'text-red-700' :
              'text-yellow-700'
            }`}>
              {node.status}
            </p>
          </div>

          {/* Node Name */}
          <div>
            <label className="text-sm font-medium text-slate-600">Node Name</label>
            <input
              type="text"
              value={editedNode?.name || ''}
              onChange={(e) => setEditedNode(prev => prev ? { ...prev, name: e.target.value } : null)}
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Endpoint URL */}
          <div>
            <label className="text-sm font-medium text-slate-600">Endpoint URL</label>
            <input
              type="text"
              value={editedNode?.endpointUrl || ''}
              onChange={(e) => setEditedNode(prev => prev ? { ...prev, endpointUrl: e.target.value } : null)}
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Heartbeat */}
          <div>
            <label className="text-sm font-medium text-slate-600">Last Heartbeat Timestamp</label>
            <p className="text-slate-900 mt-1 font-mono bg-slate-50 px-3 py-2 rounded border border-slate-200">
              {node.lastHeartbeat}
            </p>
          </div>

          {/* Average Response Time */}
          <div>
            <label className="text-sm font-medium text-slate-600">Average Response Time</label>
            <p className="text-slate-900 mt-1 font-semibold bg-slate-50 px-3 py-2 rounded border border-slate-200">
              {node.averageResponseTime} ms
            </p>
          </div>

          {/* Timeout Threshold */}
          <div>
            <label className="text-sm font-medium text-slate-600">Timeout Threshold (ms)</label>
            <input
              type="number"
              value={editedNode?.timeoutThreshold || ''}
              onChange={(e) => setEditedNode(prev => prev ? { ...prev, timeoutThreshold: parseInt(e.target.value) || 0 } : null)}
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Test Connection Result */}
          {testResult && (
            <div className={`p-4 rounded-lg border ${
              testResult.success
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                {testResult.success ? (
                  <CheckCircle2 size={20} className="text-green-600" />
                ) : (
                  <AlertCircle size={20} className="text-red-600" />
                )}
                <div>
                  <p className={`font-semibold ${
                    testResult.success ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                  </p>
                  {testResult.responseTime && (
                    <p className={`text-sm ${
                      testResult.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      Response Time: {testResult.responseTime} ms
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button
            onClick={handleDisable}
            className="px-4 py-2 bg-red-50 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            Disable Node
          </button>
          <div className="flex-1"></div>
          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="px-4 py-2 bg-slate-100 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTesting ? 'Testing...' : 'Test Connection'}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Save Configuration
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
