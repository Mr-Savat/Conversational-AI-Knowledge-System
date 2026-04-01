import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  ShieldCheck, 
  Palette, 
  AlertTriangle,
  Save,
  Check
} from 'lucide-react';

import SettingsAISettings from '../../components/admin/SettingsAISettings';
import SettingsRetrievalSettings from '../../components/admin/SettingsRetrievalSettings';
import SettingsAccessControl from '../../components/admin/SettingsAccessControl';
import SettingsCustomization from '../../components/admin/SettingsCustomization';
import SettingsDangerZone from '../../components/admin/SettingsDangerZone';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('ai');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock Settings State
  const [settings, setSettings] = useState({
    model: 'gemini-1.5-pro',
    systemPrompt: 'You are a highly capable AI assistant built to help employees. Base your answers strictly on the knowledge base provided. If you do not know the answer, say "I don\'t know based on the provided context."',
    temperature: 0.3,
    maxTokens: 2048,
    topK: 5,
    minSimilarity: 0.75,
    chunkSize: 1000,
    chunkOverlap: 200,
    allowedDomains: '@company.com',
    companyName: 'Internal Knowledge AI',
    brandColor: '#0071e3',
  });

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 800);
  };

  const tabs = [
    { id: 'ai', label: 'AI Configuration', icon: Bot },
    { id: 'retrieval', label: 'Retrieval Engine', icon: Search },
    { id: 'access', label: 'Access Control', icon: ShieldCheck },
    { id: 'branding', label: 'Customization', icon: Palette },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, color: 'text-red-500' },
  ];

  return (
    <div className="h-full overflow-hidden flex flex-col bg-[#fafafc] dark:bg-black">
      <div className="flex-1 overflow-hidden flex flex-col max-w-6xl mx-auto w-full px-6 py-6 md:py-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-white tracking-tight">System Settings</h1>
            <p className="text-[15px] text-[#8e8e93] mt-2">Manage your platform's AI behavior, search rules, and security.</p>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`cursor-pointer px-5 py-2.5 rounded-xl text-[14px] font-medium flex items-center gap-2 transition-all active:scale-95 ${
              saveSuccess 
                ? 'bg-green-500 text-white' 
                : 'bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-sm'
            } disabled:opacity-70`}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saveSuccess ? (
              <Check size={16} strokeWidth={2.5} />
            ) : (
               <Save size={16} />
            )}
            <span>{isSaving ? 'Saving...' : saveSuccess ? 'Saved' : 'Save Changes'}</span>
          </button>
        </div>

        {/* Main Interface Layout - iPhone Style Container */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 min-h-0 overflow-hidden">
          
          {/* Left Navigation Sidebar */}
          <nav className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none border-b md:border-b-0 border-black/5 dark:border-white/5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer shrink-0 items-center justify-start gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white shadow-sm border border-black/5 dark:border-white/5'
                    : 'text-[#8e8e93] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/4 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`${tab.color || (activeTab === tab.id ? 'text-[#0071e3]' : 'text-inherit')}`}>
                  <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                </div>
                <span className="text-[14px] font-medium tracking-tight whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 pb-10 pr-2">
            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-black/5 dark:border-white/5 shadow-sm p-6 sm:p-8 min-h-[500px]">
              
              {activeTab === 'ai' && <SettingsAISettings settings={settings} onChange={handleSettingChange} />}
              {activeTab === 'retrieval' && <SettingsRetrievalSettings settings={settings} onChange={handleSettingChange} />}
              {activeTab === 'access' && <SettingsAccessControl settings={settings} onChange={handleSettingChange} />}
              {activeTab === 'branding' && <SettingsCustomization settings={settings} onChange={handleSettingChange} />}
              {activeTab === 'danger' && <SettingsDangerZone settings={settings} onChange={handleSettingChange} />}

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
