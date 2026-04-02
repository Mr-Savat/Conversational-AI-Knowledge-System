import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DashboardStats from '../../components/admin/DashboardStats';
import DashboardChart from '../../components/admin/DashboardChart';
import DashboardPopularQueries from '../../components/admin/DashboardPopularQueries';
import DashboardRecentSources from '../../components/admin/DashboardRecentSources';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalSources: 0,
    totalConversations: 0,
    totalUsers: 0,
    activeUsers: 0,
  });
  
  const [recentSources, setRecentSources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [dashboardAnalytics, knowledgeData, dataSourcesData] = await Promise.all([
          api.getDashboardAnalytics().catch(err => {
            console.error("Failed to load dashboard analytics:", err);
            return null;
          }),
          api.getKnowledgeSources().catch(() => ({sources: []})),
          api.getDataSources().catch(() => ({sources: []}))
        ]);

        if (dashboardAnalytics) {
          setStats(dashboardAnalytics.stats);
          setChartData(dashboardAnalytics.chartData);
          setPopularQuestions(dashboardAnalytics.popularQueries);
        }

        const knowledgeSources = knowledgeData?.sources || [];
        const dataSources = dataSourcesData?.sources || [];
        const allSources = [...knowledgeSources, ...dataSources];
        
        const sorted = allSources.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
        setRecentSources(sorted.slice(0, 4));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-[#fafafc] dark:bg-black w-full h-full min-h-[500px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[13px] text-[#8e8e93]">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#fafafc] dark:bg-black w-full">
      <div className="max-w-7xl mx-auto w-full px-6 py-6 md:py-10">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-white tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-[15px] text-[#8e8e93] dark:text-[#98989e] mt-2">
            Monitor system usage, user engagement, and knowledge base performance.
          </p>
        </div>

        {/* Modular Components */}
        <DashboardStats stats={stats} />
        
        <DashboardChart data={chartData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardPopularQueries queries={popularQuestions} />
          <DashboardRecentSources sources={recentSources} />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
