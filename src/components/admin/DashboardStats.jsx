import React from 'react';
import { Database, MessageSquare, Users, Activity } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Database size={20} />
          </div>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#8e8e93] uppercase tracking-wide">Total Sources</p>
          <h3 className="text-3xl font-semibold text-[#1d1d1f] dark:text-white mt-1">{stats.totalSources}</h3>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <MessageSquare size={20} />
          </div>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#8e8e93] uppercase tracking-wide">Conversations</p>
          <h3 className="text-3xl font-semibold text-[#1d1d1f] dark:text-white mt-1">{stats.totalConversations}</h3>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Users size={20} />
          </div>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#8e8e93] uppercase tracking-wide">Total Users</p>
          <h3 className="text-3xl font-semibold text-[#1d1d1f] dark:text-white mt-1">{stats.totalUsers}</h3>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <Activity size={20} />
          </div>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#8e8e93] uppercase tracking-wide">Active Users</p>
          <h3 className="text-3xl font-semibold text-[#1d1d1f] dark:text-white mt-1">{stats.activeUsers}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
