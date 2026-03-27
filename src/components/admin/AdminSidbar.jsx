import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Settings, Brain, Sparkles, ChevronRight, Database, Globe } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, path: '/admin/knowledge' },
  { id: 'sources', label: 'Data Sources', icon: Database, path: '/admin/sources' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="hidden md:flex w-72 flex-col h-full bg-white dark:bg-[#1c1c1e] border-r border-black/6 dark:border-white/6 shrink-0">
      
      {/* Branding Section - iPhone Style */}
      <div className="px-5 pt-6 pb-4 border-b border-black/6 dark:border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0071e3] to-[#34aadc] flex items-center justify-center shadow-sm cursor-pointer" onClick={() => navigate("/admin")}>
            <Brain size={20} className="text-white" strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="font-semibold text-[15px] text-[#1d1d1f] dark:text-white tracking-tight">
              RAG Admin
            </h1>
            <p className="text-[10px] text-[#8e8e93] dark:text-[#98989e] tracking-tight">
              Knowledge Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation - iPhone Style */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`group cursor-pointer flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-200 ${
                active 
                  ? 'bg-[#0071e3]/10 text-[#0071e3] dark:bg-[#0a84ff]/10 dark:text-[#0a84ff]' 
                  : 'text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/4 dark:hover:bg-white/8'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  active 
                    ? 'bg-[#0071e3]/10 text-[#0071e3] dark:bg-[#0a84ff]/10 dark:text-[#0a84ff]' 
                    : 'text-[#8e8e93] group-hover:text-[#1d1d1f] dark:group-hover:text-white'
                }`}>
                  <item.icon size={18} strokeWidth={1.6} />
                </div>
                <span className="text-[14px] font-medium tracking-[-0.01em]">
                  {item.label}
                </span>
              </div>
              {active && (
                <ChevronRight size={14} className="text-[#0071e3] dark:text-[#0a84ff]" strokeWidth={1.8} />
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Card - iPhone Style */}
      <div className="p-4 mt-auto border-t border-black/6 dark:border-white/6">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#f5f5f7] to-white dark:from-[#2c2c2e] dark:to-[#1c1c1e] p-4 border border-black/5 dark:border-white/5">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[#0071e3]/5 to-transparent rounded-full" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={12} className="text-[#0071e3]" strokeWidth={1.8} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071e3] dark:text-[#0a84ff]">
                System Status
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#34c759] animate-ping opacity-75" />
              </div>
              <span className="text-[12px] font-medium text-[#1d1d1f] dark:text-white">
                All Systems Operational
              </span>
            </div>
            
            <p className="text-[10px] text-[#8e8e93] dark:text-[#98989e] mt-2">
              Vector DB • Gemini API • Supabase
            </p>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="px-4 py-3 border-t border-black/6 dark:border-white/6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#8e8e93] dark:text-[#98989e] tracking-tight">
            v1.0.0
          </span>
          <span className="text-[10px] text-[#8e8e93] dark:text-[#98989e] tracking-tight">
            RAG System
          </span>
        </div>
      </div>
    </aside>
  );
}