export function RecoveryStrategy() {
  return (
    <div className="px-8 py-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Recovery Strategy</h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Automatic Detection */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Automatic Detection</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span className="text-slate-600">Coordinator heartbeat timeouts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span className="text-slate-600">Participant response failures</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span className="text-slate-600">Network partition detection</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span className="text-slate-600">Log-based recovery analysis</span>
              </li>
            </ul>
          </div>

          {/* Recovery Actions */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Recovery Actions</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span className="text-slate-600">Query transaction logs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span className="text-slate-600">Verify participant states</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span className="text-slate-600">Determine safe outcome</span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span className="text-slate-600">Enforce final decision</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
