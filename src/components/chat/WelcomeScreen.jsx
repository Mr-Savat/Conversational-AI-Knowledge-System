import React from 'react';
import { Search, Calendar, MapPin, ClipboardList, GraduationCap, Sparkles } from 'lucide-react';
import Star from '../star/star';

const WelcomeScreen = ({ onSelectSuggestion }) => {
  const suggestions = [
    { icon: <Calendar size={20} strokeWidth={1.5} />, label: 'Academic Calendar', description: 'Check important dates' },
    { icon: <ClipboardList size={20} strokeWidth={1.5} />, label: 'Registration', description: 'Course enrollment' },
    { icon: <MapPin size={20} strokeWidth={1.5} />, label: 'Campus Map', description: 'Find your way' },
    { icon: <GraduationCap size={20} strokeWidth={1.5} />, label: 'Graduation', description: 'Commencement info' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      
      {/* Header Icon */}
      <div className="w-16 h-16 flex items-center justify-center mb-6">
        <Star/>
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-semibold mb-3 tracking-tight text-center text-[#1d1d1f] dark:text-white">
        How can I assist you?
      </h2>
      
      {/* Description */}
      <p className="text-[#8e8e93] dark:text-[#98989e] max-w-lg text-center mb-10 text-[15px] leading-relaxed">
        Your intelligent assistant for university knowledge and instant documentation retrieval.
      </p>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((item, index) => (
          <button 
            key={index} 
            onClick={() => onSelectSuggestion(item.label)}
            className="group flex items-center gap-4 p-4 bg-white dark:bg-[#1c1c1e] border border-black/6 dark:border-white/6 rounded-2xl hover:border-[#0071e3]/30 dark:hover:border-[#0a84ff]/30 hover:shadow-md transition-all duration-200 text-left"
          >
            {/* Icon Container */}
            <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/4 dark:bg-white/8 text-[#0071e3] dark:text-[#0a84ff] group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-200">
              {item.icon}
            </span>
            
            {/* Text Content */}
            <div className="flex-1">
              <p className="font-medium text-[15px] text-[#1d1d1f] dark:text-white tracking-[-0.01em]">
                {item.label}
              </p>
              <p className="text-[12px] text-[#8e8e93] dark:text-[#98989e] mt-0.5">
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Optional: Keyboard hint */}
      <p className="text-[11px] text-[#8e8e93] dark:text-[#98989e] mt-8 text-center">
        Press <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/8 rounded-md text-[10px] font-mono">Enter</kbd> to send
      </p>
    </div>
  );
};

export default WelcomeScreen;