import React, { useState } from 'react';
// import { useAdminStore } from '../../store/adminStore';
import { Globe, Database, RefreshCw, ExternalLink, Plus, X, Globe2 } from 'lucide-react';

const statusConfig = {
 connected: { 
  color: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
  label: 'Connected' 
 },
 disconnected: { 
  color: 'bg-red-50 text-red-700 border-red-200', 
  label: 'Disconnected' 
 },
 syncing: { 
  color: 'bg-admin-100 text-admin-800 border-admin-400/30', 
  label: 'Syncing' 
 },
};

export default function AdminSourcesPage() {
 const [sources, setSources] = useState([
  { id: 'ds-1', url: 'https://university.edu/handbook', title: 'Academic Handbook', status: 'connected', lastSync: '2h ago', documentCount: 245 },
  { id: 'ds-2', url: 'https://university.edu/it-policy', title: 'IT Policies', status: 'syncing', lastSync: 'Syncing...', documentCount: 89 },
 ]);
 
 const [showAddModal, setShowAddModal] = useState(false);
 const [newUrl, setNewUrl] = useState('');

 const handleAddSource = () => {
  if (!newUrl.trim()) return;
  const newSource = {
   id: `ds-${Date.now()}`,
   url: newUrl,
   title: newUrl.replace(/https?:\/\/(www\.)?/, '').split('/')[0],
   status: 'syncing',
   lastSync: 'Pending...',
   documentCount: 0,
  };
  setSources([newSource, ...sources]);
  setNewUrl('');
  setShowAddModal(false);
 };

 return (
  <div className="space-y-8 animate-in fade-in duration-500">
   {/* Header Section */}
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
     <h1 className="text-3xl font-black text-admin-900 tracking-tight">Data Sources</h1>
     <p className="text-admin-600 font-medium mt-1 text-sm">
      Configure web crawlers to keep your RAG knowledge up to date.
     </p>
    </div>
    <button
     onClick={() => setShowAddModal(true)}
     className="flex items-center gap-2 py-3 px-6 bg-admin-800 hover:bg-admin-900 text-white rounded-2xl font-bold transition-all shadow-lg shadow-admin-900/20 active:scale-95"
    >
     <Plus size={20} />
     <span>Connect New URL</span>
    </button>
   </div>

   {/* Summary Stats using #3A0519 and #A53860 */}
   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-4xl border border-admin-800/10 shadow-sm">
     <p className="text-[10px] font-black text-admin-400 uppercase tracking-widest">Active Links</p>
     <p className="text-3xl font-black text-admin-900 mt-1">
      {sources.filter(s => s.status === 'connected').length}
     </p>
    </div>
    <div className="bg-white p-6 rounded-4xl border border-admin-800/10 shadow-sm border-l-4 border-l-admin-600">
     <p className="text-[10px] font-black text-admin-400 uppercase tracking-widest">Live Syncing</p>
     <p className="text-3xl font-black text-admin-600 mt-1">
      {sources.filter(s => s.status === 'syncing').length}
     </p>
    </div>
    <div className="bg-white p-6 rounded-4xl border border-admin-800/10 shadow-sm">
     <p className="text-[10px] font-black text-admin-400 uppercase tracking-widest">Total Pages</p>
     <p className="text-3xl font-black text-admin-900 mt-1">
      {sources.reduce((sum, s) => sum + s.documentCount, 0).toLocaleString()}
     </p>
    </div>
   </div>

   {/* Sources List UI */}
   <div className="bg-white rounded-[2.5rem] border border-admin-800/10 overflow-hidden shadow-xl shadow-admin-900/5">
    <div className="divide-y divide-admin-50">
     {sources.map((source) => {
      const config = statusConfig[source.status];
      return (
       <div key={source.id} className="flex flex-col md:flex-row md:items-center gap-4 p-6 hover:bg-admin-50/50 transition-all group">
        <div className="w-12 h-12 rounded-2xl bg-admin-900 flex items-center justify-center shrink-0 text-admin-400 shadow-inner">
         <Globe2 size={24} />
        </div>
        
        <div className="flex-1 min-w-0">
         <h3 className="font-bold text-admin-900 truncate">{source.title}</h3>
         <p className="text-xs text-admin-400 truncate mt-1 font-mono">{source.url}</p>
        </div>

        <div className="flex items-center gap-4">
         <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight border ${config.color}`}>
          {source.status === 'syncing' && <RefreshCw size={12} className="animate-spin" />}
          {config.label}
         </span>

         <div className="text-right hidden lg:block min-w-25">
          <p className="text-xs font-black text-admin-900">{source.documentCount} pages</p>
          <p className="text-[10px] text-admin-400 mt-1 italic font-medium">{source.lastSync}</p>
         </div>

         <button className="p-3 rounded-xl text-admin-400 hover:text-admin-900 hover:bg-admin-100 transition-all shrink-0">
          <ExternalLink size={18} />
         </button>
        </div>
       </div>
      );
     })}
    </div>
   </div>

   {/* Add URL Modal using #670D2F accents */}
   {showAddModal && (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-admin-900/60 backdrop-blur-sm animate-in fade-in duration-200">
     <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full p-8 border border-admin-800/20 scale-in-center">
      <div className="flex items-center justify-between mb-6">
       <h2 className="text-2xl font-black text-admin-900 tracking-tight">Add Web Source</h2>
       <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-admin-50 rounded-xl text-admin-400">
        <X size={24} />
       </button>
      </div>
      
      <div className="space-y-4">
       <div>
        <label className="block text-[10px] font-black text-admin-400 uppercase tracking-widest mb-2 ml-1">Crawl URL</label>
        <input
         type="url"
         value={newUrl}
         onChange={(e) => setNewUrl(e.target.value)}
         placeholder="https://example.com/docs"
         className="w-full px-5 py-4 bg-admin-50 border border-admin-800/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-admin-600/20 focus:border-admin-600 transition-all text-admin-900 font-medium placeholder:text-admin-400/50"
        />
       </div>
       
       <div className="p-4 bg-admin-100/50 border border-admin-600/10 rounded-2xl">
        <p className="text-[11px] text-admin-600 leading-relaxed font-medium italic">
         The RAG system will analyze the URL, extract text content, and update the vector database automatically.
        </p>
       </div>

       <div className="flex gap-3 pt-4">
        <button 
         onClick={() => setShowAddModal(false)} 
         className="flex-1 py-4 text-sm font-bold text-admin-600 hover:bg-admin-50 rounded-2xl transition-all"
        >
         Cancel
        </button>
        <button 
         onClick={handleAddSource} 
         className="flex-1 py-4 bg-admin-800 hover:bg-admin-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-admin-900/20 transition-all"
        >
         <Database size={18} />
         <span>Start Sync</span>
        </button>
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}