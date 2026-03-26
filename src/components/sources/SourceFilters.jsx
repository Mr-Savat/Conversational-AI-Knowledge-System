import React from 'react';

const SourceFilters = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({ search: '', type: '', status: '' });
  };

  const hasActiveFilters = filters.search || filters.type || filters.status;

  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="text"
        placeholder="Search by title..."
        value={filters.search}
        onChange={(e) => handleChange('search', e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
      />
      
      <select
        value={filters.type}
        onChange={(e) => handleChange('type', e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="">All Types</option>
        <option value="text">Text</option>
        <option value="document">Document</option>
        <option value="url">URL</option>
        <option value="faq">FAQ</option>
      </select>
      
      <select
        value={filters.status}
        onChange={(e) => handleChange('status', e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="processing">Processing</option>
        <option value="error">Error</option>
      </select>
      
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default SourceFilters;