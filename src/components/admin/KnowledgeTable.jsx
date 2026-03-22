import React from 'react';
import { FileText, Globe, Trash2, ExternalLink, ChevronRight } from 'lucide-react';

const KnowledgeTable = ({ sources, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-50">
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Knowledge Source</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Type</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Files</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sources.map((source) => (
            <tr key={source.id} className="hover:bg-[#faf5ff]/50 transition-all group">
              {/* Source Name with Icon Box like your 'Categories' example */}
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm border transition-colors
                    ${source.type === 'url' 
                      ? 'bg-[#faf5ff] text-[#9810fa] border-[#f3e8ff]' 
                      : 'bg-white text-gray-400 border-gray-100 group-hover:border-[#f3e8ff] group-hover:text-[#9810fa]'
                    }`}>
                    {source.type === 'url' ? <Globe size={18} /> : <FileText size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 leading-tight">{source.title}</span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5">Updated 2h ago</span>
                  </div>
                </div>
              </td>

              {/* Type Badge */}
              <td className="px-6 py-5">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                  {source.type}
                </span>
              </td>

              {/* Doc Count with Mono Font */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-gray-900 font-mono">{source.documentCount}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Chunks</span>
                </div>
              </td>

              {/* Status with Glow Effect */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    source.status === 'Active' 
                    ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' 
                    : 'bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                  }`} />
                  <span className="text-xs font-bold text-gray-700">{source.status}</span>
                </div>
              </td>

              {/* Actions - Modern and Clean */}
              <td className="px-8 py-5 text-right">
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <button className="p-2.5 hover:bg-white hover:shadow-md rounded-xl text-gray-400 hover:text-[#9810fa] transition-all">
                    <ExternalLink size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(source.id)}
                    className="p-2.5 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="ml-2 pl-2 border-l border-gray-100 flex items-center">
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KnowledgeTable;