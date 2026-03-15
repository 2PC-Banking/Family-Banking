import { SystemStatus } from '@/components/dashboard/SystemStatus';

export default function LogsPage() {
  return (
    <div className="flex flex-col h-full">
      <SystemStatus />
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Logs</h2>
          <p className="text-slate-500 mt-2">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
