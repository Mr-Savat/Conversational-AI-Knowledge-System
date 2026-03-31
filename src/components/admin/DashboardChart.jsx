import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-black/5 dark:border-white/5 shadow-sm p-6 mb-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[17px] font-semibold text-[#1d1d1f] dark:text-white">Usage Over Time</h2>
          <p className="text-[13px] text-[#8e8e93] mt-1">Number of conversations and active users</p>
        </div>
        <select className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[13px] text-[#1d1d1f] dark:text-white rounded-lg px-3 py-1.5 outline-none cursor-pointer">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConvo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-800" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8e8e93' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8e8e93' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tooltip-bg, white)' }}
              itemStyle={{ fontSize: '13px', fontWeight: 500 }}
              labelStyle={{ fontSize: '12px', color: '#8e8e93', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="conversations" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorConvo)" name="Conversations" />
            <Area type="monotone" dataKey="users" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" name="Active Users" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
