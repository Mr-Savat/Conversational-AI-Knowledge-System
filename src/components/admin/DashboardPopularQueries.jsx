import React from 'react';
import { Search, TrendingUp } from 'lucide-react';

const DashboardPopularQueries = ({ queries }) => {
  return (
    <div className="bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-gray-50/30 dark:bg-white/[0.01]">
        <div className="flex items-center gap-2">
          <Search size={18} className="text-blue-500" />
          <h2 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-white">Popular Queries</h2>
        </div>
      </div>
      
      <div className="p-0 flex-1 flex flex-col divide-y divide-black/5 dark:divide-white/5">
        {queries.map((q, index) => (
          <div key={q.id || index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-4 overflow-hidden">
              <span className="text-[13px] font-bold text-[#8e8e93] w-4 text-center">{index + 1}</span>
              <p className="text-[14px] font-medium text-[#1d1d1f] dark:text-white truncate">{q.text}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-[12px] font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-md">
                {q.frequency}
              </span>
              {q.trend === 'up' ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : q.trend === 'down' ? (
                <TrendingUp size={16} className="text-red-500 rotate-180" />
              ) : (
                <div className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPopularQueries;
