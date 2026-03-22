import React from 'react';
import { Search, Calendar, MapPin, ClipboardList, GraduationCap } from 'lucide-react';
const WelcomeScreen = ({ onSelectSuggestion }) => {
  const suggestions = [
    { icon: <Calendar size={18} />, label: 'Academic Calendar' },
    { icon: <ClipboardList size={18} />, label: 'Registration' },
    { icon: <MapPin size={18} />, label: 'Campus Map' },
    { icon: <GraduationCap size={18} />, label: 'Graduation' },
  ];

  return (
    <div className="flex flex-col items-center pt-10">
{/* <div className="w-20 h-20 border border-brand-200 dark:border-brand-800 rounded-3xl overflow-hidden mb-10 shadow-xl dark:shadow-none">
  </div> */}

      <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-center text-brand-900 dark:text-white">
        How can I assist you?
      </h2>
      <p className="text-brand-500 dark:text-brand-400 max-w-lg text-center mb-12 text-lg">
        Your intelligent assistant for university knowledge and instant documentation retrieval.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {suggestions.map((item, index) => (
          <button 
            key={index} 
            onClick={() => onSelectSuggestion(item.label)}
            className="group flex items-center gap-4 p-5 bg-white dark:bg-brand-900/40 border border-brand-200 dark:border-brand-800 rounded-2xl hover:border-brand-400 dark:hover:border-brand-600 hover:shadow-lg transition-all text-left"
          >
            <span className="p-3 rounded-xl bg-brand-50 dark:bg-brand-800 text-brand-600 dark:text-brand-200 group-hover:bg-brand-600 group-hover:text-white transition-colors">
              {item.icon}
            </span>
            <span className="font-semibold text-brand-800 dark:text-brand-100">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;