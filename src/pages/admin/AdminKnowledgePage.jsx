import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import KnowledgeTable from '../../components/admin/KnowledgeTable';
import { Plus, Search, FileText, Globe, FileQuestion, AlignLeft, X, Layers } from 'lucide-react';

export default function AdminKnowledgePage() {
  const { knowledgeSources, searchQuery, setSearchQuery, deleteKnowledgeSource } = useAdminStore();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('document');

  const filteredSources = knowledgeSources.filter((source) =>
    source.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uploadTypes = [
    { id: 'document', label: 'Document', icon: <FileText size={20} />, desc: 'PDF, DOCX, TXT' },
    { id: 'url', label: 'URL', icon: <Globe size={20} />, desc: 'Web Crawler' },
    { id: 'text', label: 'Text', icon: <AlignLeft size={20} />, desc: 'Direct Input' },
    { id: 'faq', label: 'FAQ', icon: <FileQuestion size={20} />, desc: 'Q&A Pairs' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header with Stats Cards */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Knowledge Base</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf5ff] border border-[#f3e8ff]">
              <Layers size={14} className="text-[#9810fa]" />
              <span className="text-xs font-bold text-[#8200db]">{knowledgeSources.length} Sources</span>
            </div>
            <span className="text-gray-400 text-xs font-medium uppercase tracking-widest">
              {knowledgeSources.reduce((sum, s) => sum + s.documentCount, 0)} Total docs
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => setShowUploadModal(true)} 
          className="flex items-center gap-2 py-3.5 px-7 bg-[#9810fa] hover:bg-[#8200db] text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-purple-200 active:scale-95"
        >
          <Plus size={20} strokeWidth={3} /> Add Knowledge
        </button>
      </div>

      {/* Filter Bar - Clean White Style */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#9810fa] transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your knowledge base..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#9810fa]/5 focus:border-[#9810fa]/20 transition-all font-medium text-gray-700"
          />
        </div>
        <select className="px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none font-bold text-sm text-gray-600 appearance-none cursor-pointer">
          <option>All Types</option>
          <option>Documents</option>
          <option>URLs</option>
        </select>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {filteredSources.length > 0 ? (
          <KnowledgeTable sources={filteredSources} onDelete={deleteKnowledgeSource} />
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-[#faf5ff] rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-[#dab2ff]" />
            </div>
            <h3 className="text-xl font-black text-gray-900">No sources found</h3>
            <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto font-medium">
              Your knowledge base is currently empty. Start by uploading a document or a URL.
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal - Styled like the cards in your images */}
      {showUploadModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl p-10 shadow-2xl scale-in-center overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#faf5ff] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center justify-between mb-10 relative">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Add Knowledge</h2>
                <p className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest">Select your source type</p>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 relative">
              {uploadTypes.map((type) => (
                <button 
                  key={type.id} 
                  onClick={() => setUploadType(type.id)}
                  className={`p-6 rounded-3xl border-2 text-left transition-all group relative overflow-hidden ${
                    uploadType === type.id 
                    ? 'border-[#9810fa] bg-[#faf5ff]' 
                    : 'border-gray-50 bg-white hover:border-[#f3e8ff]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    uploadType === type.id 
                    ? 'bg-[#9810fa] text-white shadow-lg shadow-purple-200' 
                    : 'bg-gray-50 text-gray-400 group-hover:bg-[#f3e8ff] group-hover:text-[#9810fa]'
                  }`}>
                    {type.icon}
                  </div>
                  <p className={`font-black text-lg ${uploadType === type.id ? 'text-[#3c0366]' : 'text-gray-900'}`}>{type.label}</p>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">{type.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-4 relative">
              <button 
                onClick={() => setShowUploadModal(false)} 
                className="flex-1 py-4 text-sm font-black text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 py-4 bg-[#9810fa] hover:bg-[#8200db] text-white rounded-2xl font-black text-sm shadow-xl shadow-purple-100 transition-all">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}