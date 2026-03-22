import { GraduationCap, User } from 'lucide-react';

const ChatMessage = ({ role, text }) => {
  const isAi = role === 'ai';

  return (
    <div className={`flex w-full mb-6 ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex gap-4 max-w-[85%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* The Icon Container */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border 
          ${isAi 
            ? 'bg-brand-100 dark:bg-brand-800 border-brand-200 dark:border-brand-700 text-brand-600 dark:text-brand-300' 
            : 'bg-brand-900 text-white border-transparent'}`}>
          
          {isAi ? <GraduationCap size={20} /> : <User size={20} />}
        </div>
        
        {/* The Message Bubble */}
        <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed
          ${isAi 
            ? 'bg-white dark:bg-brand-900 text-brand-900 dark:text-brand-100 border border-brand-100 dark:border-brand-800' 
            : 'bg-brand-800 text-white dark:bg-brand-100 dark:text-brand-900'}`}>
          
          {text === "" && isAi ? (
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </span>
          ) : (
            <p className="whitespace-pre-wrap">{text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;