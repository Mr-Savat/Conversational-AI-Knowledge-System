import React from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ArrowLeft, LogOut, ShieldCheck, Bell, Settings } from 'lucide-react';

import { useAdminStore } from '../store/adminStore';
import AdminSidebar from '../components/admin/AdminSidbar';

export default function AdminLayout() {
  const { isAuthenticated, logout, user } = useAdminStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const getPageTitle = () => {
    if (location.pathname.includes('knowledge')) return 'Knowledge Base';
    if (location.pathname.includes('sources')) return 'Data Sources';
    if (location.pathname.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  const getPageDescription = () => {
    if (location.pathname.includes('knowledge')) return 'Manage your document library and knowledge sources';
    if (location.pathname.includes('sources')) return 'Configure external data sources and crawlers';
    if (location.pathname.includes('settings')) return 'System configuration and preferences';
    return 'Overview of your RAG system health and activity';
  };

  return (
    <div className="flex h-screen bg-[#fafafc] dark:bg-black">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - iPhone Style */}
        <header className="h-16 border-b border-black/6 dark:border-white/6 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-10">
          
          {/* Left Section - Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="group cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#8e8e93] dark:text-[#98989e] hover:text-[#0071e3] dark:hover:text-[#0a84ff] hover:bg-black/4 dark:hover:bg-white/8 transition-all"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={1.6} />
              <span className="hidden sm:inline">Back to Chat</span>
            </button>

            <div className="w-px h-5 bg-black/8 dark:bg-white/8" />

            <div>
              <h1 className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white tracking-tight">
                {getPageTitle()}
              </h1>
              <p className="text-[11px] text-[#8e8e93] dark:text-[#98989e] hidden sm:block">
                {getPageDescription()}
              </p>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <button className="p-2 cursor-pointer rounded-xl text-[#8e8e93] hover:text-[#0071e3] dark:hover:text-[#0a84ff] hover:bg-black/4 dark:hover:bg-white/8 transition-all">
              <Bell size={18} strokeWidth={1.6} />
            </button>

            {/* Settings Button */}
            <button className="p-2 cursor-pointer rounded-xl text-[#8e8e93] hover:text-[#0071e3] dark:hover:text-[#0a84ff] hover:bg-black/4 dark:hover:bg-white/8 transition-all">
              <Settings size={18} strokeWidth={1.6} />
            </button>

            <div className="w-px h-5 bg-black/8 dark:bg-white/8 mx-1" />

            {/* Admin Profile - iPhone Style */}
            <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#1c1c1e] border border-black/6 dark:border-white/6 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#0071e3] to-[#34aadc] flex items-center justify-center">
                <ShieldCheck size={14} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-medium text-[#1d1d1f] dark:text-white leading-tight">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-[9px] text-[#8e8e93] dark:text-[#98989e] tracking-tight">
                  Super Admin
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="p-2 cursor-pointer rounded-xl text-[#8e8e93] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all group"
              title="Logout"
            >
              <LogOut size={18} strokeWidth={1.6} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </header>

        {/* Page content area - iPhone Style */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}