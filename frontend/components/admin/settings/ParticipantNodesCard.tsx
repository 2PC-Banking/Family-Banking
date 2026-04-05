'use client';

import { useState } from 'react';

interface ParticipantNode {
  id: string;
  name: string;
  status: 'Online' | 'Offline' | 'Pending';
  endpointUrl?: string;
  lastHeartbeat?: string;
  averageResponseTime?: number;
  timeoutThreshold?: number;
}

interface ParticipantNodesCardProps {
  nodes?: ParticipantNode[];
  onAddNode?: () => void;
  onConfigureNode?: (node: ParticipantNode) => void;
  onTestConnection?: (nodeId: string) => void;
}

const defaultNodes: ParticipantNode[] = [
  { 
    id: '1', 
    name: 'Bank A', 
    status: 'Online',
    endpointUrl: 'https://bank-a.example.com/api',
    lastHeartbeat: '2024-02-06 14:32:21',
    averageResponseTime: 85,
    timeoutThreshold: 5000,
  },
  { 
    id: '2', 
    name: 'Bank B', 
    status: 'Online',
    endpointUrl: 'https://bank-b.example.com/api',
    lastHeartbeat: '2024-02-06 14:32:22',
    averageResponseTime: 120,
    timeoutThreshold: 5000,
  },
  { 
    id: '3', 
    name: 'Bank C', 
    status: 'Online',
    endpointUrl: 'https://bank-c.example.com/api',
    lastHeartbeat: '2024-02-06 14:32:23',
    averageResponseTime: 95,
    timeoutThreshold: 5000,
  },
  { 
    id: '4', 
    name: 'Bank D', 
    status: 'Online',
    endpointUrl: 'https://bank-d.example.com/api',
    lastHeartbeat: '2024-02-06 14:32:24',
    averageResponseTime: 110,
    timeoutThreshold: 5000,
  },
];

const statusColors: Record<string, string> = {
  Online: 'bg-green-50 text-green-700',
  Offline: 'bg-red-50 text-red-700',
  Pending: 'bg-yellow-50 text-yellow-700',
};

export function ParticipantNodesCard({
  nodes = defaultNodes,
  onAddNode,
  onConfigureNode,
  onTestConnection,
}: ParticipantNodesCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Participant Nodes</h2>

      <div className="space-y-3 mb-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{node.name}</h3>
              <p className={`text-sm mt-1 px-2 py-1 rounded w-fit ${statusColors[node.status]}`}>
                Status: {node.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onTestConnection?.(node.id)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors bg-white"
              >
                Test Connection
              </button>
              <button
                onClick={() => onConfigureNode?.(node)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors bg-white"
              >
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onAddNode}
        className="w-full py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors bg-white"
      >
        Add Participant Node
      </button>
    </div>
  );
}
