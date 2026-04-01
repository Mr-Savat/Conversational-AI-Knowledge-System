import React from 'react';
import { Palette } from 'lucide-react';

export default function SettingsCustomization({ settings, onChange }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-black/5 dark:border-white/5 pb-4">
        <h2 className="text-[18px] font-semibold text-[#1d1d1f] dark:text-white flex items-center gap-2">
          <Palette size={20} className="text-[#0071e3]"/> Interface Customization
        </h2>
        <p className="text-[13px] text-[#8e8e93] mt-1">Make the internal dashboard look like your own product.</p>
      </div>

      <div className="max-w-sm space-y-6">
        <div>
          <label className="block text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">Organization Display Name</label>
          <input 
            type="text" 
            className="w-full bg-gray-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            value={settings.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
          />
        </div>

         <div>
          <label className="block text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">Primary Brand Color (Hex)</label>
          <div className="flex gap-3">
            <input 
              type="color" 
              className="w-12 h-10 p-1 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg cursor-pointer flex-shrink-0"
              value={settings.brandColor}
              onChange={(e) => onChange('brandColor', e.target.value)}
            />
            <input 
              type="text" 
              className="flex-1 bg-gray-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 text-[14px] text-[#1d1d1f] dark:text-white outline-none uppercase font-mono"
              value={settings.brandColor}
              onChange={(e) => onChange('brandColor', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
