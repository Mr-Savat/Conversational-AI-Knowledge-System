import React from 'react';
import { Search } from 'lucide-react';

export default function SettingsRetrievalSettings({ settings, onChange }) {
  return (
    <div className="space-y-8 animate-fade-in">
       <div className="border-b border-black/5 dark:border-white/5 pb-4">
        <h2 className="text-[18px] font-semibold text-[#1d1d1f] dark:text-white flex items-center gap-2">
          <Search size={20} className="text-[#0071e3]"/> RAG Engine Parameters
        </h2>
        <p className="text-[13px] text-[#8e8e93] mt-1">Configure how the backend searches the vector database.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
            <label className="flex justify-between text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">
              <span>Top-K Context Injection</span>
              <span className="text-[#0071e3] font-mono">{settings.topK} Chunks</span>
            </label>
            <input 
              type="range" min="1" max="15" step="1"
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
              value={settings.topK}
              onChange={(e) => onChange('topK', parseInt(e.target.value))}
            />
             <p className="text-[12px] text-[#8e8e93] mt-3 ml-1 leading-relaxed">How many pieces of knowledge the AI reads per question. Higher increases accuracy but costs more tokens.</p>
        </div>

         <div>
            <label className="flex justify-between text-[13px] font-semibold text-[#1d1d1f] dark:text-white mb-2 ml-1">
              <span>Min Similarity Score</span>
              <span className="text-[#0071e3] font-mono">{settings.minSimilarity.toFixed(2)}</span>
            </label>
            <input 
              type="range" min="0.5" max="0.95" step="0.01"
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
              value={settings.minSimilarity}
              onChange={(e) => onChange('minSimilarity', parseFloat(e.target.value))}
            />
             <p className="text-[12px] text-[#8e8e93] mt-3 ml-1 leading-relaxed">Aggressiveness of the search filter. If documents fall below this threshold, the AI will ignore them.</p>
        </div>
      </div>

      {/* Future Text Splitter config */}
      <div className="bg-blue-50/50 dark:bg-[#1c1c1e] border-l-4 border-[#0071e3] rounded-r-2xl p-4 mt-6">
        <h4 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-white mb-1">Vectorization Settings</h4>
        <p className="text-[13px] text-[#8e8e93]">Modifying Chunk Size (Currently: {settings.chunkSize}) or Overlap (Currently: {settings.chunkOverlap}) requires a full purge and re-indexing of your current database. Direct toggling is disabled while documents are active.</p>
      </div>
    </div>
  );
}
