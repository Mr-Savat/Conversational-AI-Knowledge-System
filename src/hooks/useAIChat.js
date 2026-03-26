import { useState, useCallback, } from 'react';
import api from '../services/api';

const useAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [conversationTitle, setConversationTitle] = useState('');

  const loadConversation = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await api.getConversation(id);
      setConversationId(data.conversation.id);
      setConversationTitle(data.conversation.title);
      
      // Format messages for display
      const formattedMessages = data.messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'ai',
        text: msg.content,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setConversationTitle('');
    setInput('');
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Send to backend
      const response = await api.sendChatMessage({
        message: userMessage,
        conversation_id: conversationId,
      });

      // Update conversation ID (for follow-up questions)
      if (!conversationId) {
        setConversationId(response.conversation_id);
      }
      
      // Add AI response to UI
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: response.content 
      }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Sorry, I encountered an error: ${error.message}. Please try again.` 
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, conversationId]);

  const handleSuggestion = useCallback((suggestion) => {
    setInput(suggestion);
    setTimeout(() => {
      handleSend();
    }, 100);
  }, [handleSend]);

  return {
    messages,
    input,
    setInput,
    loading,
    conversationId,
    conversationTitle,
    startNewChat,
    loadConversation,
    handleSend,
    handleSuggestion,
  };
};

export default useAIChat;