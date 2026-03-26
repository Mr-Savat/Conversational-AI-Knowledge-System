import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import SourceCard from '../../components/sources/SourceCard';
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

  useEffect(() => {
    loadSources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadSources = async () => {
    try {
      setLoading(true);

      // Get both types of sources
      const [knowledgeData, urlData] = await Promise.all([
        api.getKnowledgeSources(filters),
        api.getDataSources()
      ]);

      console.log('Knowledge sources:', knowledgeData); // Debug
      console.log('URL sources:', urlData); // Debug

      // Combine and format
      const knowledgeSources = knowledgeData.sources || [];
      const urlSources = urlData.sources || [];

      // Add type field to URL sources if needed
      const formattedUrlSources = urlSources.map(source => ({
        ...source,
        type: source.type || 'url',  // Ensure type is set
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

  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this knowledge source?')) {
  //     return;
  //   }

  //   try {
  //     await api.deleteKnowledgeSource(id);
  //     await loadSources();
  //   } catch (err) {
  //     alert(`Failed to delete: ${err.message}`);
  //   }
  // };

  const handleDelete = async (source) => {
    if (!window.confirm('Are you sure you want to delete this knowledge source?')) {
      return;
    }

    try {
      // Check if it's a URL source (has url field) or knowledge source
      if (source.url) {
        // This is a URL source from data_sources
        await api.deleteDataSource(source.id);
      } else {
        // This is a knowledge source (text/file)
        await api.deleteKnowledgeSource(source.id);
      }
      await loadSources(); // Reload the list
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

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      default: 'bg-gray-100 text-gray-800',
    };
    return styles[status] || styles.default;
  };

  const getTypeIcon = (type) => {
    const icons = {
      text: '📝',
      document: '📄',
      url: '🔗',
      faq: '❓',
    };
    return icons[type] || '📁';
  };

  if (loading && sources.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading knowledge sources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            📚 Knowledge Sources
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your documents, text content, and URL sources for the RAG system
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <SourceFilters filters={filters} onFilterChange={setFilters} />

          <div className="flex gap-2">
            <button
              onClick={() => { setFormType('text'); setShowForm(true); }}
              className="px-4 py-2 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              + Add Text
            </button>
            <button
              onClick={() => { setFormType('file'); setShowForm(true); }}
              className="px-4 py-2 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              📄 Upload File
            </button>
            <button
              onClick={() => { setFormType('url'); setShowForm(true); }}
              className="px-4 py-2 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              🔗 Add URL
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
            <span className="text-red-700">⚠️ {error}</span>
            <button onClick={loadSources} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
              Retry
            </button>
          </div>
        )}

        {/* Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No knowledge sources yet</h3>
              <p className="text-gray-500 mb-4">Add your first document, text, or URL to get started</p>
              <button
                onClick={() => { setFormType('text'); setShowForm(true); }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                + Add Your First Source
              </button>
            </div>
          ) : (
            sources.map((source) => (
              <SourceCard
                key={source.id}
                source={source}
                getStatusBadge={getStatusBadge}
                getTypeIcon={getTypeIcon}
                onDelete={handleDelete}
                onSync={handleSync}
              />
            ))
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm flex justify-center gap-8">
          <div className="flex gap-2">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold text-gray-900">{sources.length}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-600">Active:</span>
            <span className="font-semibold text-green-600">
              {sources.filter(s => s.status === 'active').length}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-600">Processing:</span>
            <span className="font-semibold text-yellow-600">
              {sources.filter(s => s.status === 'processing').length}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-600">Errors:</span>
            <span className="font-semibold text-red-600">
              {sources.filter(s => s.status === 'error').length}
            </span>
          </div>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideUp">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {formType === 'text' && 'Add Text Knowledge'}
                  {formType === 'file' && 'Upload Document'}
                  {formType === 'url' && 'Add URL Source'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
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

      <style>
        {`
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-slideUp {
      animation: slideUp 0.3s ease-out;
    }
  `}
      </style>
    </div>
  );
};

export default AdminSourcesPage;