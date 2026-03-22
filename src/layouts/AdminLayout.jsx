import React from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ArrowLeft, LogOut, ShieldCheck } from 'lucide-react';

import { useAdminStore } from '../store/adminStore';
import AdminSidebar from '../components/admin/AdminSidbar'

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAdminStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const getPageTitle = () => {
    if (location.pathname.includes('knowledge')) return 'Knowledge Management';
    if (location.pathname.includes('sources')) return 'Data Sources';
    if (location.pathname.includes('settings')) return 'System Settings';
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-[#FAF5FF]">
      {/* Sidebar - Using the clean version we built */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Clean White with Purple Accents */}
        <header className="h-20 border-b border-gray-100 bg-white/80 backdrop-blur-xl flex items-center px-8 shrink-0 z-10">
          
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#9810FA] hover:bg-[#FAF5FF] transition-all"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Chat Mode</span>
          </button>

          <div className="ml-4 pl-4 border-l border-gray-100">
            <h1 className="text-sm font-black text-gray-900 uppercase tracking-tighter">
              {getPageTitle()}
            </h1>
          </div>

          <div className="ml-auto flex items-center gap-6">
            {/* Admin Profile Chip - Styled like the 'Jobs' tags in your image */}
            <div className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-2xl bg-white border border-gray-100 shadow-sm shadow-purple-100/20">
              <div className="w-8 h-8 rounded-xl bg-[#9810FA] flex items-center justify-center text-white shadow-lg shadow-purple-200">
                <ShieldCheck size={16} strokeWidth={3} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[11px] font-black text-gray-900 uppercase">Admin</span>
                <span className="text-[9px] font-bold text-[#9810FA] uppercase tracking-widest">Superuser</span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="group p-3 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
              title="Logout"
            >
              <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </header>

        {/* Page content area */}
        <main className="flex-1 overflow-auto bg-[#FAF5FF]/50">
          <div className="max-w-7xl mx-auto p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}