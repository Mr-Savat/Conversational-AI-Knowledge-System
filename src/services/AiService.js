import OpenAI from "openai";

export const askKnowledgeAI = async (prompt) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_OPENROUTER_KEY,
    dangerouslyAllowBrowser: true
  });

  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat",
    messages: [
      { 
        role: "system", 
        content: "You are a Campus Assistant AI. Use the provided knowledge base to answer questions accurately and professionally. If you don't know the answer, suggest contacting the university office." 
      },
      { role: "user", content: prompt }
    ]
  });

  return completion.choices[0].message.content;
};