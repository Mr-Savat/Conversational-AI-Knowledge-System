import React, { useEffect, useRef, useMemo } from 'react';
import useAIChat from '../hooks/useAIChat';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import Navbar from '../layouts/Navbar';

const ChatPage = () => {
  const { 
    messages, 
    input, 
    setInput, 
    loading, 
    conversationId,
    conversationTitle,
    startNewChat,
    loadConversation,
    handleSend, 
    handleSuggestion 
  } = useAIChat();
  
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const messagesEndRef = useRef(null);

  // Determine navbar title
  const getNavbarTitle = () => {
    if (conversationTitle) {
      return conversationTitle;
    }
    if (messages.length > 0) {
      return 'New Conversation';
    }
    return 'AI Knowledge';
  };

  // Memoize message list to prevent unnecessary re-renders
  const renderedMessages = useMemo(() => (
    messages.map((msg, idx) => {
      const isLastMessage = idx === messages.length - 1;
      const isAILoading = loading && isLastMessage && msg.role === 'user';
      
      return (
        <ChatMessage 
          key={msg.id || idx}
          role={msg.role} 
          text={msg.text}
          time={msg.created_at}
          isLoading={isAILoading}
        />
      );
    })
  ), [messages, loading]);

  // Smooth scroll to bottom when messages update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, loading]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafafc] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7]">
      <ChatSidebar 
        onSelectConversation={(id, title) => {
          loadConversation(id, title);
          setIsSidebarOpen(false); // Close sidebar on mobile after selection
        }}
        currentConversationId={conversationId}
        currentMessageCount={messages?.length || 0}
        onNewChat={() => {
          startNewChat();
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 flex flex-col min-w-0 relative">
        <Navbar 
          title={getNavbarTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
          <div className="max-w-3xl mx-auto w-full px-4 py-6">
            {messages.length === 0 && loading ? (
              <div className="flex flex-col items-center justify-center h-full pt-20">
                <div className="w-8 h-8 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#8e8e93] text-[13px]">Loading conversation...</p>
              </div>
            ) : messages.length === 0 ? (
              <WelcomeScreen onSelectSuggestion={handleSuggestion} />
            ) : (
              <div className="space-y-5">
                {renderedMessages}
                <div ref={messagesEndRef} className="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Input Dock */}
        <div className="p-4 pb-4 md:pb-6">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onSend={handleSend}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;