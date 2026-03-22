import { useState, useEffect } from 'react';
import { askKnowledgeAI } from '../services/AiService';
import { typeTextEffect } from '../utils/typeEffect'; 

export const useAIChat = () => {
  // Initialize from sessionStorage or empty array
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('ai_chat_messages');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('ai_chat_messages', JSON.stringify(messages));
  }, [messages]);

// Inside useAIChat.js
const handleSend = async () => {
  if (!input.trim() || loading) return;

  const userText = input;
  setInput("");
  setLoading(true);

  // Add User Message
  setMessages(prev => [...prev, { role: "user", text: userText }]);

  try {
    const aiResponse = await askKnowledgeAI(userText);

    // Add the EMPTY AI message first so the typing effect has a target
    setMessages(prev => [...prev, { role: "ai", text: "" }]);

    // Pass a callback that only updates the TEXT, not the whole array
    typeTextEffect(aiResponse, (newText) => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], text: newText };
        return updated;
      });
    }, () => setLoading(false));

  } catch (err) {
    setMessages(prev => [...prev, { role: "ai", text: "Connection error." }]);
    setLoading(false);
  }
};

  return { messages, input, setInput, loading, handleSend, setMessages };
};