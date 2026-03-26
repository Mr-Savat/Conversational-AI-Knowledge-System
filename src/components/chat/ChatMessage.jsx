import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ role, text, time, isLoading = false }) => {
  const isAi = role === 'ai';

  // Format time if provided
  const formattedTime = time ? new Date(time).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }) : null;

  return (
    <div className={`flex w-full mb-5 items-end gap-2.5 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>

      {/* Avatar - iPhone style */}
      <div className={`w-7 h-7 min-w-7 rounded-full flex items-center justify-center shrink-0 mb-0.5 ${
        isAi 
          ? 'bg-[#1d1d1f] dark:bg-[#2c2c2e]' 
          : 'bg-linear-to-br from-[#0071e3] to-[#34aadc]'
      }`}>
        {isAi
          ? <Bot size={13} strokeWidth={1.8} className="text-white" />
          : <User size={13} strokeWidth={1.8} className="text-white" />
        }
      </div>

      {/* Bubble + meta */}
      <div className={`flex flex-col gap-1 max-w-[72%] ${isAi ? 'items-start' : 'items-end'}`}>
        {/* Sender name */}
        <span className={`text-[11px] font-medium text-[#8e8e93] tracking-[0.01em] px-3.5 ${
          isAi ? 'ml-0' : 'mr-0'
        }`}>
          {isAi ? 'RAG System' : 'You'}
        </span>

        {/* Message bubble */}
        <div className={`relative px-4 py-2.5 text-[15px] leading-[1.45] tracking-[-0.01em] shadow-sm ${
          isAi
            ? 'bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/6 dark:border-white/6 rounded-[18px] rounded-bl-[5px]'
            : 'bg-[#0071e3] text-white rounded-[18px] rounded-br-[5px]'
        }`}>
          {isLoading && isAi ? (
            <div className="flex items-center gap-1 py-1 px-1">
              <div className="typing-dot-small" />
              <div className="typing-dot-small" style={{ animationDelay: '0.2s' }} />
              <div className="typing-dot-small" style={{ animationDelay: '0.4s' }} />
            </div>
          ) : (
            <p className="whitespace-pre-wrap wrap-break-word">{text}</p>
          )}
        </div>

        {/* Timestamp */}
        {formattedTime && (
          <span className={`text-[10px] text-[#8e8e93] tracking-[0.01em] px-3.5 ${
            isAi ? 'ml-0' : 'mr-0'
          }`}>
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;