import React from 'react';
import { GraduationCap, Moon, Sun, LayoutDashboard, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isDark, setIsDark } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-brand-200 dark:border-brand-800 backdrop-blur-md sticky top-0 z-50 bg-brand-50/80 dark:bg-brand-950/80 transition-colors">
      
      {/* Brand Section */}
      <div className="flex items-center gap-3">
        <div className="bg-brand-900 dark:bg-brand-100 p-2 rounded-xl text-white dark:text-brand-900 shadow-lg">
           <Brain size={22} />
        </div>
        <div className="hidden sm:block">
          <h1 className="font-bold text-lg leading-tight tracking-tight text-brand-900 dark:text-brand-50">
            Rag System
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-brand-500 font-bold">
            Conversational AI
          </p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3">
        
        {/* Admin Access - Styled with the new Admin Maroon #670D2F */}
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-brand-600 dark:text-brand-400 hover:bg-admin-900/10 dark:hover:bg-admin-400/10 hover:text-admin-800 transition-all border border-transparent hover:border-admin-800/20"
          title="Admin Panel"
        >
          <LayoutDashboard size={20} />
          <span className="text-xs font-bold hidden md:block uppercase tracking-tighter">Console</span>
        </button>

        <div className="h-6 w-px bg-brand-200 dark:bg-brand-800 mx-1" />

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(prev => !prev)}
          className="p-2.5 rounded-xl bg-brand-100 dark:bg-brand-900 hover:scale-105 active:scale-95 transition-all border border-brand-200 dark:border-brand-800"
        >
          {isDark ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-brand-600" />
          )}
        </button>

        {/* Auth Action */}
        <button className="px-5 py-2.5 text-sm font-bold bg-brand-900 dark:bg-brand-100 text-white dark:text-brand-950 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-brand-900/10 dark:shadow-none">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;