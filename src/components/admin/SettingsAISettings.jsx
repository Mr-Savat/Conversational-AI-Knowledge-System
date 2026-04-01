import React from 'react';
import { Bot, ChevronDown } from 'lucide-react';
import Select from 'react-select';

export default function SettingsAISettings({ settings, onChange }) {
  const modelOptions = [
    { value: 'gemini-1.5-pro', label: 'Google Gemini 1.5 Pro' },
    { value: 'gpt-4o', label: 'OpenAI GPT-4o' },
    { value: 'claude-3-5-sonnet', label: 'Anthropic Claude 3.5 Sonnet' },
    { value: 'llama-3', label: 'Meta Llama 3 70B' },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(118, 118, 128, 0.12)',
      borderRadius: '12px',
      border: 'none',
      minHeight: '44px',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 113, 227, 0.3)' : 'none',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'rgba(118, 118, 128, 0.24)',
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 16px',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'inherit',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#8e8e93',
      paddingRight: '12px',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      border: '0.5px solid rgba(0,0,0,0.1)',
      overflow: 'hidden',
      padding: '4px',
      '.dark &': {
        backgroundColor: 'rgba(44, 44, 46, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }
    }),
    option: (base, state) => ({
      ...base,
      fontSize: '14px',
      borderRadius: '8px',
      margin: '2px 0',
      backgroundColor: state.isSelected 
        ? '#0071e3' 
        : state.isFocused ? 'rgba(0,0,0,0.05)' : 'transparent',
      color: state.isSelected ? 'white' : 'inherit',
      cursor: 'pointer',
      '.dark &': {
        backgroundColor: state.isSelected 
          ? '#0a84ff' 
          : state.isFocused ? 'rgba(255,255,255,0.1)' : 'transparent',
      }
    }),
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-black/5 dark:border-white/5 pb-4">
        <h2 className="text-[18px] font-semibold text-[#1d1d1f] dark:text-white flex items-center gap-2">
          <Bot size={20} className="text-[#0071e3]"/> System AI Configuration
        </h2>
        <p className="text-[13px] text-[#8e8e93] mt-1">Control the foundation model and identity of the assistant.</p>
      </div>

      <div className="space-y-6">
        <div className="text-black dark:text-white">
          <label className="block text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">Foundation Model</label>
          <Select
            options={modelOptions}
            value={modelOptions.find(opt => opt.value === settings.model)}
            onChange={(selected) => onChange('model', selected?.value || 'gemini-1.5-pro')}
            styles={customStyles}
            isSearchable={false}
            className="react-select-container"
            classNamePrefix="react-select"
            components={{ DropdownIndicator: () => <ChevronDown size={14} className="mr-1 text-[#8e8e93]" /> }}
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">System Prompt / Core Persona</label>
          <textarea 
            rows={4}
            className="w-full bg-gray-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-[14px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition-all resize-none shadow-inner"
            value={settings.systemPrompt}
            onChange={(e) => onChange('systemPrompt', e.target.value)}
          />
          <p className="text-[12px] text-[#8e8e93] mt-2 ml-1">This defines the core personality and strict rules the AI must follow globally.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="flex justify-between text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">
              <span>Temperature</span>
              <span className="text-[#0071e3] font-mono">{settings.temperature.toFixed(2)}</span>
            </label>
            <input 
              type="range" min="0" max="1" step="0.05"
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
              value={settings.temperature}
              onChange={(e) => onChange('temperature', parseFloat(e.target.value))}
            />
             <p className="text-[12px] text-[#8e8e93] mt-2 ml-1">0.0 (Strictly factual) to 1.0 (Highly creative).</p>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">Reasoning Token Limit</label>
            <input 
              type="number" 
              className="w-full bg-gray-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/30"
              value={settings.maxTokens}
              onChange={(e) => onChange('maxTokens', parseInt(e.target.value))}
            />
             <p className="text-[12px] text-[#8e8e93] mt-2 ml-1">Maximum length of AI responses to prevent runaway costs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
