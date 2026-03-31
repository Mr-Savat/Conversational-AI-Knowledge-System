import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Link2, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
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

const DashboardRecentSources = ({ sources }) => {
  return (
    <div className="bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-gray-50/30 dark:bg-white/[0.01]">
         <div className="flex items-center gap-2">
          <Database size={18} className="text-indigo-500" />
          <h2 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-white">Recent Knowledge Additions</h2>
        </div>
        <Link to="/admin/sources" className="text-[13px] text-[#0071e3] hover:underline font-medium">Manage All</Link>
      </div>
      <div className="p-0 flex-1 flex flex-col">
        {sources.length > 0 ? (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {sources.map((source, index) => (
              <div key={source.id || index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-2 rounded-xl flex-shrink-0 ${
                    source.type === 'url' ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/30' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
                  }`}>
                    {source.type === 'url' ? <Link2 size={16} /> : <FileText size={16} />}
                  </div>
                  <div className="truncate">
                    <p className="text-[14px] font-medium text-[#1d1d1f] dark:text-white truncate max-w-[200px] sm:max-w-xs">{source.title || source.url || 'Untitled Source'}</p>
                    <p className="text-[12px] text-[#8e8e93] mt-0.5">{formatDate(source.updated_at || source.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(source.status)}
                  <span className={`text-[12px] capitalize font-medium hidden sm:block ${
                    source.status === 'active' ? 'text-green-600' :
                    source.status === 'error' ? 'text-red-500' : 'text-yellow-600'
                  }`}>{source.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
           <div className="flex-1 flex items-center justify-center p-10 flex-col text-center">
             <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-3">
               <Database size={20} className="text-gray-400" />
             </div>
             <p className="text-[15px] font-medium text-[#1d1d1f] dark:text-white">No sources found</p>
             <p className="text-[13px] text-[#8e8e93] mt-1 max-w-sm">Sources you add will appear here.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default DashboardRecentSources;
