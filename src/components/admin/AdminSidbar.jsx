import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Settings, Brain, Sparkles, ChevronRight, Database, Globe, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, path: '/admin/knowledge' },
  { id: 'sources', label: 'Data Sources', icon: Database, path: '/admin/sources' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/40 z-40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex ${expanded ? 'w-72' : 'w-20'} flex-col h-full bg-white dark:bg-[#1c1c1e] border-r border-black/6 dark:border-white/6 shrink-0
      `}>

      {/* Branding Section - iPhone Style */}
      <div className={`pt-6 pb-4 border-b border-black/6 dark:border-white/6 flex items-center ${expanded ? 'px-5 justify-between' : 'px-2 justify-center'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 min-w-[40px] rounded-xl bg-linear-to-br from-[#0071e3] to-[#34aadc] flex items-center justify-center shadow-sm cursor-pointer" onClick={() => navigate("/admin")}>
            <Brain size={20} className="text-white" strokeWidth={1.8} />
          </div>
          {expanded && (
            <div className="overflow-hidden">
              <h1 className="font-semibold text-[15px] text-[#1d1d1f] dark:text-white tracking-tight whitespace-nowrap">
                RAG Admin
              </h1>
              <p className="text-[10px] text-[#8e8e93] dark:text-[#98989e] tracking-tight whitespace-nowrap">
                Knowledge Management
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation - iPhone Style */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1.5 scrollbar-none">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              title={!expanded ? item.label : ""}
              className={`group cursor-pointer flex items-center ${expanded ? 'justify-between px-3' : 'justify-center px-0'} w-full py-2.5 rounded-xl transition-all duration-200 ${active
                ? 'bg-[#0071e3]/10 text-[#0071e3] dark:bg-[#0a84ff]/10 dark:text-[#0a84ff]'
                : 'text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/4 dark:hover:bg-white/8'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 min-w-[32px] rounded-lg flex items-center justify-center transition-all ${active
                  ? 'bg-[#0071e3]/10 text-[#0071e3] dark:bg-[#0a84ff]/10 dark:text-[#0a84ff]'
                  : 'text-[#8e8e93] group-hover:text-[#1d1d1f] dark:group-hover:text-white'
                  }`}>
                  <item.icon size={18} strokeWidth={1.6} />
                </div>
                {expanded && (
                  <span className="text-[14px] font-medium tracking-[-0.01em] whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
              {expanded && active && (
                <ChevronRight size={14} className="text-[#0071e3] dark:text-[#0a84ff] shrink-0" strokeWidth={1.8} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-black/6 dark:border-white/6 mt-auto">
        <button
          onClick={() => setExpanded(p => !p)}
          className={`group w-full flex items-center ${expanded ? 'justify-start px-3' : 'justify-center px-0'} py-2.5 rounded-xl text-[#8e8e93] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/4 dark:hover:bg-white/8 transition-all duration-200 cursor-pointer`}
          title={expanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {expanded ? <PanelLeftClose size={18} strokeWidth={1.6} /> : <PanelLeftOpen size={18} strokeWidth={1.6} />}
          {expanded && <span className="text-[14px] font-medium tracking-[-0.01em] ml-3 whitespace-nowrap">Collapse</span>}
        </button>
      </div>
    </aside>
    </>
  );
}