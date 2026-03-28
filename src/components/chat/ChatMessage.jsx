import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ role, text, time, isLoading = false }) => {
  const isAi = role === 'ai';

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex w-full mb-5 items-end gap-2.5 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>

      {/* Avatar */}
      <div className={`w-7 h-7 min-w-[28px] rounded-full flex items-center justify-center flex-shrink-0 mb-0.5 ${
        isAi 
          ? 'bg-[#1d1d1f] dark:bg-[#2c2c2e]' 
          : 'bg-gradient-to-br from-[#0071e3] to-[#34aadc]'
      }`}>
        {isAi
          ? <Bot size={13} strokeWidth={1.8} className="text-white" />
          : <User size={13} strokeWidth={1.8} className="text-white" />
        }
      </div>

      {/* Bubble + meta */}
      <div className={`flex flex-col gap-1 max-w-[72%] ${isAi ? 'items-start' : 'items-end'}`}>
        <span className="text-[11px] font-medium text-[#8e8e93] tracking-[0.01em] px-3.5">
          {isAi ? 'RAG System' : 'You'}
        </span>

        <div className={`relative px-4 py-2.5 text-[15px] leading-[1.45] tracking-[-0.01em] shadow-sm ${
          isAi
            ? 'bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/[0.06] dark:border-white/[0.06] rounded-[18px] rounded-bl-[5px]'
            : 'bg-[#0071e3] text-white rounded-[18px] rounded-br-[5px]'
        }`}>
          {isLoading && isAi ? (
            <div className="flex items-center gap-1 py-1 px-1">
              <div className="w-1.5 h-1.5 bg-[#8e8e93] rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-[#8e8e93] rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-[#8e8e93] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Style headers
                  h1: ({ children }) => <h1 className="text-lg font-bold mt-2 mb-1">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-md font-semibold mt-2 mb-1">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold mt-1 mb-0.5">{children}</h3>,
                  // Style lists
                  ul: ({ children }) => <ul className="list-disc pl-4 my-1 space-y-0.5">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 my-1 space-y-0.5">{children}</ol>,
                  li: ({ children }) => <li className="text-[14px] leading-[1.4]">{children}</li>,
                  // Style paragraphs
                  p: ({ children }) => <p className="my-1 leading-[1.45]">{children}</p>,
                  // Style bold and italic
                  strong: ({ children }) => <strong className="font-semibold text-[#0071e3] dark:text-[#0a84ff]">{children}</strong>,
                  // Style code blocks
                  code: ({ children }) => <code className="bg-black/[0.05] dark:bg-white/[0.08] px-1 py-0.5 rounded text-[12px] font-mono">{children}</code>,
                  // Style horizontal rules
                  hr: () => <hr className="my-2 border-black/[0.08] dark:border-white/[0.08]" />,
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {time && (
          <span className="text-[10px] text-[#8e8e93] tracking-[0.01em] px-3.5">
            {formatTime(time)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;