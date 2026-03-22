import React from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ value, onChange, onSend, loading }) => {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    /* FIX: Removed 'fixed', 'bottom-0', etc. 
       The parent (ChatPage) now handles the layout positioning.
    */
    <div className="w-full pt-2 pb-2">
      <div className="max-w-3xl mx-auto relative group">
        
        {/* Glow effect on focus */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-brand-500 to-brand-700 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
        
        <div className="relative flex items-end gap-2 bg-white dark:bg-brand-900 border-2 border-brand-200 dark:border-brand-800 rounded-3xl p-2 shadow-xl transition-all focus-within:border-brand-500 dark:focus-within:border-brand-400">
          
          <textarea
            rows="1"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about campus..."
            className="w-full py-3 px-4 bg-transparent outline-none text-brand-900 dark:text-brand-50 placeholder:text-brand-400 resize-none max-h-40"
            style={{ height: 'auto' }}
          />

          <button
            onClick={onSend}
            disabled={loading || !value.trim()}
            className={`p-3 rounded-2xl transition-all flex items-center justify-center shrink-0
              ${loading || !value.trim() 
                ? 'bg-brand-100 dark:bg-brand-800 text-brand-400 cursor-not-allowed' 
                : 'bg-brand-900 dark:bg-brand-100 text-white dark:text-brand-950 hover:scale-105 active:scale-95'
              }`}
          >
            {loading ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <Send size={22} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;