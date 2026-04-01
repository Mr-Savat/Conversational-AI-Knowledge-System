import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SettingsAccessControl({ settings, onChange }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-black/5 dark:border-white/5 pb-4">
        <h2 className="text-[18px] font-semibold text-[#1d1d1f] dark:text-white flex items-center gap-2">
          <ShieldCheck size={20} className="text-[#0071e3]"/> Authentication & Roles
        </h2>
        <p className="text-[13px] text-[#8e8e93] mt-1">Manage global registration limits and system roles.</p>
      </div>

      <div className="max-w-md">
        <label className="block text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">Allowed Registration Domain</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8e8e93]">
            @
          </div>
          <input 
            type="text" 
            placeholder="company.com"
            className="w-full pl-9 bg-gray-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            value={settings.allowedDomains.replace('@', '')}
            onChange={(e) => onChange('allowedDomains', `@${e.target.value}`)}
          />
        </div>
        <p className="text-[12px] text-[#8e8e93] mt-2 ml-1">Leave empty to allow any email domain. Currently set to strictly limit signups to company emails.</p>
      </div>

      <div className="mt-8">
         <h3 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white mb-4">Promote Administrators</h3>
         <div className="bg-gray-50 dark:bg-black border border-black/5 dark:border-white/5 rounded-xl p-6 text-center">
           <ShieldCheck size={32} className="text-gray-400 mx-auto mb-3" />
           <p className="text-[14px] font-medium text-[#1d1d1f] dark:text-white">Role Management interface</p>
           <p className="text-[12px] text-[#8e8e93] mt-1 max-w-sm mx-auto">Requires backend user_metadata mapping endpoint to be implemented to fetch directory.</p>
         </div>
      </div>
    </div>
  );
}
