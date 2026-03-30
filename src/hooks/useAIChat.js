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

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

    // Add empty AI message that will be updated
    const aiMessageId = Date.now().toString();
    setMessages(prev => [...prev, { id: aiMessageId, role: 'ai', text: '' }]);
    setLoading(true);

    let currentConversationId = conversationId;
    let fullResponse = '';

    await api.sendChatMessageStream(
      userMessage,
      currentConversationId,
      // onChunk - called for each word/character
      (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg =>
          msg.id === aiMessageId
            ? { ...msg, text: fullResponse }
            : msg
        ));
      },
      // onDone - called when stream completes
      async () => {
        setLoading(false);
      },
      // onError - called if error occurs
      (error) => {
        console.error('Stream error:', error);
        setMessages(prev => prev.map(msg =>
          msg.id === aiMessageId
            ? { ...msg, text: `Error: ${error}` }
            : msg
        ));
        setLoading(false);
      }
    );
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