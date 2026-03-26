import React from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ value, onChange, onSend, loading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="relative group">
      <textarea
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder="Ask me anything..."
        rows={1}
        className="w-full py-3.5 pl-5 pr-14 rounded-2xl bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-sm border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#8e8e93] resize-none focus:outline-none focus:border-[#0071e3] dark:focus:border-[#0a84ff] focus:ring-1 focus:ring-[#0071e3]/20 dark:focus:ring-[#0a84ff]/20 transition-all text-[15px] leading-relaxed shadow-sm"
      />
      <button
        onClick={onSend}
        disabled={!value.trim() || loading}
        className="absolute right-2 bottom-2 w-9 h-9 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center shadow-sm"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin text-white" strokeWidth={1.8} />
        ) : (
          <Send size={16} className="text-white" strokeWidth={1.8} />
        )}
      </button>
    </div>
  );
};

export default ChatInput;