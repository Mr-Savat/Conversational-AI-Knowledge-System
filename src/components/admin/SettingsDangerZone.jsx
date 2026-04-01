import React from 'react';
import { AlertTriangle, Trash2, RefreshCw } from 'lucide-react';

export default function SettingsDangerZone({ settings, onChange }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-red-200 dark:border-red-900 pb-4">
        <h2 className="text-[18px] font-semibold text-red-600 dark:text-red-500 flex items-center gap-2">
          <AlertTriangle size={20}/> Danger Zone
        </h2>
        <p className="text-[13px] text-[#8e8e93] mt-1">Destructive operations that affect the underlying database. Process with caution.</p>
      </div>

      <div className="border border-red-200 dark:border-red-900/50 rounded-2xl p-5 sm:p-6 bg-red-50/30 dark:bg-red-950/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white leading-tight">Purge All Idle Conversations</h3>
          <p className="text-[13px] text-[#8e8e93] mt-1 max-w-sm">Permanently deletes all chat histories globally. Useful for freeing up Supabase PSQL database rows.</p>
        </div>
        <button className="shrink-0 cursor-pointer px-4 py-2 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-xl text-[13px] font-medium transition-all flex items-center gap-2">
           <Trash2 size={16} /> Delete Logs
        </button>
      </div>

      <div className="border border-red-200 dark:border-red-900/50 rounded-2xl p-5 sm:p-6 bg-red-50/30 dark:bg-red-950/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white leading-tight">Hard Vector Re-Index</h3>
          <p className="text-[13px] text-[#8e8e93] mt-1 max-w-sm">Flushes the Pinecone/Vector DB and forces the Python backend to aggressively re-parse, re-chunk, and re-embed all active Source contents.</p>
        </div>
        <button className="shrink-0 cursor-pointer px-4 py-2 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-xl text-[13px] font-medium transition-all flex items-center gap-2">
           <RefreshCw size={16} /> Force Rebuild
        </button>
      </div>
    </div>
  );
}
