'use client';

import { X, CheckCircle2, AlertCircle, Clock, Database } from 'lucide-react';
import { useState } from 'react';

interface ParticipantStatus {
  bank: string;
  status: 'Ready' | 'Waiting' | 'Failed';
  timestamp: string;
}

interface TwoPhaseCommitTransaction {
  id: string;
  fromBank: string;
  toBank: string;
  amount: string;
  timestamp: string;
  phase: 'PREPARE' | 'COMMIT' | 'ABORT';
  status: 'Prepared' | 'Committed' | 'Pending' | 'Aborted';
  participants: number;
  coordinatorBank: string;
  reason?: string;
  phaseStartTime: string;
  phaseEndTime: string;
  participantStatuses: ParticipantStatus[];
}

interface TwoPhaseCommitDetailModalProps {
  isOpen: boolean;
  transaction: TwoPhaseCommitTransaction | null;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ready':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Waiting':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Failed':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getPhaseColor = (phase: string, status: string) => {
  if (status === 'Aborted') return 'text-red-600';
  if (status === 'Committed') return 'text-green-600';
  if (status === 'Pending') return 'text-blue-600';
  return 'text-yellow-600';
};

export function TwoPhaseCommitDetailModal({
  isOpen,
  transaction,
  onClose,
}: TwoPhaseCommitDetailModalProps) {
  if (!isOpen || !transaction) return null;

  const isPreparePhase = transaction.phase === 'PREPARE';
  const isAborted = transaction.status === 'Aborted';
  const isCommitted = transaction.status === 'Committed';
  const duration = transaction.phaseEndTime 
    ? `${Math.abs(parseInt(transaction.phaseEndTime.split(':')[2]) - parseInt(transaction.phaseStartTime.split(':')[2]))} seconds`
    : 'In Progress';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Two-Phase Commit Protocol</h2>
            <p className="text-sm text-slate-600 mt-1">Transaction ID: {transaction.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Phase 1: Prepare */}
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                1
              </div>
              <h3 className={`text-xl font-bold ${getPhaseColor('PREPARE', transaction.status)}`}>
                Phase 1: Prepare
              </h3>
            </div>

            {/* Prepare Phase Visualization */}
            <div className="bg-slate-50 rounded-lg p-8 mb-6">
              <div className="flex items-center justify-between gap-8">
                {/* Sender Bank */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border-2 border-blue-400 bg-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <Database className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-blue-900">{transaction.fromBank}</span>
                    </div>
                  </div>
                  {isPreparePhase && (
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      isAborted ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {isAborted ? 'Failed' : 'Prepared'}
                    </span>
                  )}
                </div>

                {/* Coordinator */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 rounded-full border-4 border-blue-500 bg-blue-100 flex items-center justify-center mb-3">
                    <Clock className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">Coordinator</p>
                  <p className="text-xs text-slate-600">{transaction.coordinatorBank}</p>
                  <p className="text-xs text-slate-500 mt-2">Sending Prepare Requests</p>
                </div>

                {/* Receiver Bank */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border-2 border-green-400 bg-green-50 flex items-center justify-center">
                    <div className="text-center">
                      <Database className="w-8 h-8 text-green-600 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-green-900">{transaction.toBank}</span>
                    </div>
                  </div>
                  {isPreparePhase && (
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      isAborted ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {isAborted ? 'Failed' : 'Prepared'}
                    </span>
                  )}
                </div>
              </div>

              {/* Prepare Queries */}
              <div className="flex justify-between mt-8 text-center text-sm text-slate-600">
                <span>→ Can commit?</span>
                <span>Can commit? →</span>
              </div>
            </div>
          </div>

          {/* Phase 2: Commit or Rollback */}
          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 font-bold text-lg">
                2
              </div>
              <h3 className={`text-xl font-bold ${getPhaseColor('COMMIT', transaction.status)}`}>
                Phase 2: {isAborted ? 'Rollback' : 'Commit'}
              </h3>
            </div>

            {/* Commit/Rollback Phase Visualization */}
            <div className="bg-slate-50 rounded-lg p-8">
              <div className="flex items-center justify-between gap-8">
                {/* Sender Bank */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border-2 border-blue-400 bg-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <Database className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-blue-900">{transaction.fromBank}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    isAborted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {isAborted ? 'Rolled Back' : 'Committed'}
                  </span>
                </div>

                {/* Coordinator */}
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mb-3 ${
                    isAborted 
                      ? 'border-red-500 bg-red-100' 
                      : 'border-green-500 bg-green-100'
                  }`}>
                    {isAborted ? (
                      <AlertCircle className="w-10 h-10 text-red-600" />
                    ) : (
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{isAborted ? 'Failed' : 'Success'}</p>
                  <p className="text-xs text-slate-500 mt-2">{isAborted ? 'Broadcasting Rollback' : 'Broadcasting Commit'}</p>
                </div>

                {/* Receiver Bank */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border-2 border-green-400 bg-green-50 flex items-center justify-center">
                    <div className="text-center">
                      <Database className="w-8 h-8 text-green-600 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-green-900">{transaction.toBank}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    isAborted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {isAborted ? 'Rolled Back' : 'Committed'}
                  </span>
                </div>
              </div>

              {/* Commit/Rollback Messages */}
              <div className="flex justify-between mt-8 text-center text-sm text-slate-600">
                <span>← {isAborted ? 'Rollback' : 'Commit'}</span>
                <span>{isAborted ? 'Rollback' : 'Commit'} →</span>
              </div>
            </div>
          </div>

          {/* Transaction Details Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Transaction Details */}
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Transaction Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600 uppercase font-semibold">Transaction ID</p>
                  <p className="text-sm font-mono font-semibold text-slate-900 mt-1">{transaction.id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase font-semibold">Status</p>
                  <p className={`text-sm font-semibold mt-1 ${
                    isAborted ? 'text-red-600' : isCommitted ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {transaction.status}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase font-semibold">Amount</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{transaction.amount}</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Participants</h4>
              <div className="space-y-2">
                {transaction.participantStatuses.map((participant) => (
                  <div key={participant.bank} className="flex items-center justify-between">
                    <span className="text-sm text-slate-900 font-medium">{participant.bank}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(participant.status)}`}>
                      {participant.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="border border-slate-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Timeline</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600 uppercase font-semibold">Phase Started</p>
                  <p className="text-sm font-mono font-semibold text-slate-900 mt-1">{transaction.phaseStartTime}</p>
                </div>
                {transaction.phaseEndTime && (
                  <div>
                    <p className="text-xs text-slate-600 uppercase font-semibold">Phase Ended</p>
                    <p className="text-sm font-mono font-semibold text-slate-900 mt-1">{transaction.phaseEndTime}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-600 uppercase font-semibold">Duration</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Information */}
          {isAborted && transaction.reason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h5 className="font-semibold text-red-900">Abort Reason</h5>
                  <p className="text-sm text-red-800 mt-1">{transaction.reason}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
