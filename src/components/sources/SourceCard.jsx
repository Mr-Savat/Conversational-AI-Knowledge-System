import React from 'react';

const SourceCard = ({ source, getStatusBadge, getTypeIcon, onDelete, onSync }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (size) => {
    if (!size) return 'N/A';
    return size;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="text-3xl">{getTypeIcon(source.type)}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate" title={source.title}>
              {source.title || 'Untitled'}
            </h3>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusBadge(source.status)}`}>
              {source.status}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Type:</span>
            <span className="text-gray-700 capitalize">{source.type}</span>
          </div>

          {source.file_path && (
            <div className="flex justify-between">
              <span className="text-gray-500">File:</span>
              <span className="text-gray-700 truncate max-w-37.5" title={source.file_path}>
                {source.file_path.split('/').pop()}
              </span>
            </div>
          )}

          {source.file_size && (
            <div className="flex justify-between">
              <span className="text-gray-500">Size:</span>
              <span className="text-gray-700">{formatFileSize(source.file_size)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-500">Chunks:</span>
            <span className="text-gray-700 font-mono">{source.document_count || 0}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Created:</span>
            <span className="text-gray-700 text-xs">{formatDate(source.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      {/* <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 flex gap-2">
        {source.type === 'url' && (
          <button
            onClick={() => onSync(source.id)}
            className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            🔄 Sync
          </button>
        )}
        <button
          onClick={() => onDelete(source.id)}
          className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          🗑️ Delete
        </button>
      </div> */}

      {/* Actions */}
      <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 flex gap-2">
        {source.type === 'url' && (
          <button
            onClick={() => onSync(source.id)}
            className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            🔄 Sync
          </button>
        )}
        <button
          onClick={() => onDelete(source)}  // ← CHANGE: pass full source, not just id
          className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default SourceCard;