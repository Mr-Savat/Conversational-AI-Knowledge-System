import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Settings, Brain } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, path: '/admin/knowledge' },
  { id: 'sources', label: 'Data Sources', icon: FileText, path: '/admin/sources' },
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
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-100 bg-white shrink-0">
      {/* Branding Section */}
      <div className="h-20 flex items-center gap-3 px-6">
        <div className="w-10 h-10 rounded-2xl bg-[#9810fa] flex items-center justify-center shadow-lg shadow-purple-200">
          <Brain size={22} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-gray-900 text-sm tracking-tight uppercase">Rag Admin</span>
          <span className="text-[10px] text-[#9810fa] font-bold uppercase tracking-widest">Knowledge AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-bold transition-all group
                ${active 
                  ? 'bg-admin-50 text-[#8200db]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-admin-100 text-[#9810fa]' : 'bg-transparent group-hover:bg-gray-100'}`}>
                <item.icon size={18} />
              </div>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer Status Card - Like your examples */}
      <div className="p-4 mt-auto">
        <div className="p-4 rounded-4xl bg-admin-50 border border-admin-100 relative overflow-hidden">
          {/* Subtle background circle effect */}
          <div className="absolute -right-2 -top-2 w-12 h-12 bg-[#9810fa]/5 rounded-full" />
          
          <p className="text-[10px] font-black text-[#8200db] uppercase tracking-widest mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9810fa] animate-pulse" />
            <span className="text-xs font-bold text-gray-700">All Systems Live</span>
          </div>
        </div>
      </div>
    </aside>
  );
}