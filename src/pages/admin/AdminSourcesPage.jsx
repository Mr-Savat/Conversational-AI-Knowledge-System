import React, { useState, useEffect } from 'react';
import {
  Plus,
  Upload,
  Link2,
  FileText,
  Search,
  X,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Trash2,
  RefreshCw,
  Eye
} from 'lucide-react';
import api from '../../services/api';
import SourceForm from '../../components/sources/SourceForm';
import SourceFilters from '../../components/sources/SourceFilters';

const AdminSourcesPage = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('text');
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
  });

  // In AdminSourcesPage.jsx
  useEffect(() => {
    loadSources();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadSources = async () => {
    try {
      setLoading(true);
      const [knowledgeData, urlData] = await Promise.all([
        api.getKnowledgeSources(filters),
        api.getDataSources()
      ]);

      const knowledgeSources = knowledgeData.sources || [];
      const urlSources = urlData.sources || [];

      const formattedUrlSources = urlSources.map(source => ({
        ...source,
        type: source.type || 'url',
      }));

      setSources([...knowledgeSources, ...formattedUrlSources]);
      setError(null);
    } catch (err) {
      console.error('Load error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddText = async (data) => {
    try {
      const result = await api.addTextKnowledge(data);
      await loadSources();
      setShowForm(false);
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleUploadFile = async (file, title) => {
    try {
      const result = await api.uploadFile(file, title);
      await loadSources();
      setShowForm(false);
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleAddUrl = async (url, title) => {
    try {
      const result = await api.addDataSource(url, title);
      await loadSources();
      setShowForm(false);
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleDelete = async (source) => {
    if (!window.confirm(`Delete "${source.title || source.url}"?`)) return;

    try {
      if (source.url) {
        await api.deleteDataSource(source.id);
      } else {
        await api.deleteKnowledgeSource(source.id);
      }
      await loadSources();
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  const handleSync = async (id) => {
    try {
      await api.syncDataSource(id);
      await loadSources();
      alert('Sync started successfully!');
    } catch (err) {
      alert(`Failed to sync: ${err.message}`);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'processing':
        return <Clock size={14} className="text-yellow-500 animate-pulse" />;
      case 'error':
        return <AlertCircle size={14} className="text-red-500" />;
      default:
        return <Clock size={14} className="text-gray-400" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text':
        return <FileText size={14} className="text-blue-500" />;
      case 'document':
        return <Upload size={14} className="text-purple-500" />;
      case 'url':
        return <Link2 size={14} className="text-teal-500" />;
      default:
        return <FileText size={14} className="text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour ago`;
    if (diffDays < 7) return `${diffDays} day ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const stats = {
    total: sources.length,
    active: sources.filter(s => s.status === 'active').length,
    processing: sources.filter(s => s.status === 'processing').length,
    error: sources.filter(s => s.status === 'error').length,
  };

  if (loading && sources.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafc] dark:bg-black">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[13px] text-[#8e8e93]">Loading sources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden flex flex-col bg-[#fafafc] dark:bg-black">
      <div className="flex-1 overflow-hidden flex flex-col max-w-7xl mx-auto w-full px-6 py-6">

        {/* Header - iPhone Style */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white tracking-tight">
            Knowledge Sources
          </h1>
          <p className="text-[13px] text-[#8e8e93] dark:text-[#98989e] mt-1">
            Manage documents, text content, and URL sources for your RAG system
          </p>
        </div>

        {/* Stats Cards - iPhone Style */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-4 border border-black/6 dark:border-white/6">
            <p className="text-[11px] font-medium text-[#8e8e93] uppercase tracking-wide">Total</p>
            <p className="text-2xl font-semibold text-[#1d1d1f] dark:text-white mt-1">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-4 border border-black/6 dark:border-white/6">
            <p className="text-[11px] font-medium text-[#8e8e93] uppercase tracking-wide">Active</p>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">{stats.active}</p>
          </div>
          <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-4 border border-black/6 dark:border-white/6">
            <p className="text-[11px] font-medium text-[#8e8e93] uppercase tracking-wide">Processing</p>
            <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400 mt-1">{stats.processing}</p>
          </div>
          <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-4 border border-black/6 dark:border-white/6">
            <p className="text-[11px] font-medium text-[#8e8e93] uppercase tracking-wide">Errors</p>
            <p className="text-2xl font-semibold text-red-600 dark:text-red-400 mt-1">{stats.error}</p>
          </div>
        </div>

        {/* Actions Bar - iPhone Style */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <SourceFilters filters={filters} onFilterChange={setFilters} />

          <div className="flex gap-2">
            <button
              onClick={() => { setFormType('text'); setShowForm(true); }}
              className="px-4 cursor-pointer py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl text-[13px] font-medium transition-all active:scale-95 flex items-center gap-2 shadow-sm"
            >
              <FileText size={14} />
              <span>Add Text</span>
            </button>
            <button
              onClick={() => { setFormType('file'); setShowForm(true); }}
              className="px-4 cursor-pointer py-2 bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white rounded-xl text-[13px] font-medium hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e] transition-all active:scale-95 flex items-center gap-2"
            >
              <Upload size={14} />
              <span>Upload File</span>
            </button>
            <button
              onClick={() => { setFormType('url'); setShowForm(true); }}
              className="px-4 cursor-pointer py-2 bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white rounded-xl text-[13px] font-medium hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e] transition-all active:scale-95 flex items-center gap-2"
            >
              <Link2 size={14} />
              <span>Add URL</span>
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl flex justify-between items-center">
            <span className="text-[13px] text-red-600 dark:text-red-400">⚠️ {error}</span>
            <button onClick={loadSources} className="px-3 py-1.5 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-[12px] font-medium hover:bg-red-200 transition-all">
              Retry
            </button>
          </div>
        )}

        {/* Table - iPhone Style */}
        {sources.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1c1c1e] rounded-2xl border border-black/6 dark:border-white/6">
            <div className="w-16 h-16 rounded-full bg-[#0071e3]/10 flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-[#0071e3]" />
            </div>
            <h3 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-white mb-1">No knowledge sources yet</h3>
            <p className="text-[13px] text-[#8e8e93] mb-4">Add your first document, text, or URL to get started</p>
            <button
              onClick={() => { setFormType('text'); setShowForm(true); }}
              className="px-4 py-2 cursor-pointer bg-[#0071e3] text-white rounded-xl text-[13px] font-medium hover:bg-[#0077ed] transition-all"
            >
              + Add Your First Source
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-black/6 dark:border-white/6 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-black/6 dark:border-white/6 text-[11px] font-medium text-[#8e8e93] uppercase tracking-wide">
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Chunks</div>
              <div className="col-span-1">Updated</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {sources.map((source) => (
                <div key={source.id} className="grid grid-cols-12 gap-4 px-5 py-3 items-center hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e] transition-colors group">
                  {/* Name */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(source.type)}
                      <span className="text-[14px] font-medium text-[#1d1d1f] dark:text-white truncate">
                        {source.title || source.url || 'Untitled'}
                      </span>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="col-span-2">
                    <span className="text-[12px] text-[#8e8e93] capitalize">{source.type || 'url'}</span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(source.status)}
                      <span className={`text-[12px] font-medium capitalize ${source.status === 'active' ? 'text-green-600 dark:text-green-400' :
                          source.status === 'processing' ? 'text-yellow-600 dark:text-yellow-400' :
                            source.status === 'error' ? 'text-red-600 dark:text-red-400' :
                              'text-gray-500'
                        }`}>
                        {source.status}
                      </span>
                    </div>
                  </div>

                  {/* Chunks */}
                  <div className="col-span-2">
                    <span className="text-[13px] text-[#1d1d1f] dark:text-white font-mono">
                      {source.document_count || 0}
                    </span>
                  </div>

                  {/* Updated */}
                  <div className="col-span-1">
                    <span className="text-[11px] text-[#8e8e93]">
                      {formatDate(source.updated_at)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-end gap-1">
                    {source.type === 'url' && (
                      <button
                        onClick={() => handleSync(source.id)}
                        className="p-1.5 cursor-pointer rounded-lg text-[#8e8e93] hover:text-[#0071e3] dark:hover:text-[#0a84ff] hover:bg-black/4 dark:hover:bg-white/8 transition-all"
                        title="Sync URL"
                      >
                        <RefreshCw size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(source)}
                      className="p-1.5 cursor-pointer rounded-lg text-[#8e8e93] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
              <div className="sticky top-0 bg-white dark:bg-[#1c1c1e] border-b border-black/6 dark:border-white/6 p-5 flex justify-between items-center">
                <h2 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-white">
                  {formType === 'text' && 'Add Text Knowledge'}
                  {formType === 'file' && 'Upload Document'}
                  {formType === 'url' && 'Add URL Source'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 cursor-pointer rounded-full flex items-center justify-center text-[#8e8e93] hover:bg-black/4 dark:hover:bg-white/8 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5">
                <SourceForm
                  type={formType}
                  onSubmit={
                    formType === 'text'
                      ? handleAddText
                      : formType === 'file'
                        ? handleUploadFile
                        : handleAddUrl
                  }
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default AdminSourcesPage;