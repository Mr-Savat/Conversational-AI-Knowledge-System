import React, { useEffect, useRef } from 'react';
import { useAIChat } from '../hooks/useAIChat';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import WelcomeScreen from '../components/chat/WelcomeScreen';

const ChatPage = () => {
  const { messages, input, setInput, loading, handleSend } = useAIChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // 'h-[calc(100vh-73px)]' matches your navbar height
    <div className="flex flex-col h-[calc(100vh-73px)] bg-brand-50 dark:bg-brand-950">
      
      {/* 1. Scrollable Area - Use flex-1 to take up all remaining space */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <WelcomeScreen onSelectSuggestion={(val) => setInput(val)} />
          ) : (
            <>
              {messages.map((msg, idx) => <ChatMessage key={idx} {...msg} />)}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* 2. Input Area - No longer absolute/fixed, sits naturally at the bottom */}
      <div className="p-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSend={handleSend}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;