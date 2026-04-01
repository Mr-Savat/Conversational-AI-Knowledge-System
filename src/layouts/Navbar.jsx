import React from 'react';
import { Moon, Sun, LayoutDashboard, Brain, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title = 'AI Knowledge', onMenuClick }) => {
  const { isDark, setIsDark } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="
      sticky top-0 z-50 flex justify-between items-center
      px-4 md:px-6 h-13
      bg-white/70 dark:bg-[#161617]/80
      backdrop-blur-xl backdrop-saturate-180
      border-b border-black/8 dark:border-white/8
      transition-colors duration-300
    ">
      {/* Brand */}
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 -ml-1.5 mr-1 rounded-lg text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        )}
        <span className="text-[17px] font-semibold tracking-[-0.022em] text-[#1d1d1f] dark:text-[#f5f5f7]">
          {title}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        {/* Console */}
        <button
          onClick={() => navigate('/admin')}
          className="
            flex items-center gap-1.5 px-3 py-1.5 cursor-pointer
            rounded-full text-[#1d1d1f] dark:text-white/86
            hover:bg-black/6 dark:hover:bg-white/10
            transition-all active:scale-[0.97]
          "
        >
          <LayoutDashboard size={15} strokeWidth={1.6} />
          <span className="hidden md:block text-xs font-medium text-[#6e6e73] dark:text-white/50 tracking-[0.01em]">
            Admin
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-4.5 bg-black/15 dark:bg-white/15 mx-0.5" />

        {/* Theme toggle */}
        <button
          onClick={() => setIsDark(p => !p)}
          className="w-8.5 h-8.5 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/6 dark:hover:bg-white/10 transition-all active:scale-[0.93] text-[#1d1d1f] dark:text-white/86">
          {isDark
            ? <Sun size={16} strokeWidth={1.5} />
            : <Moon size={16} strokeWidth={1.5} />
          }
        </button>

        {/* Sign In */}
        {/* <button className="
          px-4 py-1.75 rounded-full cursor-pointer
          bg-[#0071e3] dark:bg-white
          text-white dark:text-[#1d1d1f]
          text-[13px] font-normal tracking-[-0.01em]
          hover:opacity-90 active:scale-[0.97]
          transition-all duration-150
          whitespace-nowrap
        ">
          Sign In
        </button> */}
      </div>
    </nav>
  );
};
export default Navbar;