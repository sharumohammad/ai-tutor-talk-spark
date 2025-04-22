
import { OpenRouterResponse } from '../types';

const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export const generateAIResponse = async (
  messages: Array<{ role: string; content: string }>
): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'Spark AI Tutor'
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // You can change this to any model available in OpenRouter
        messages: [
          {
            role: "system",
            content: "You are Spark, a friendly and knowledgeable AI tutor. Your purpose is to help students learn through engaging, educational conversations. Provide accurate, helpful information, and explain complex topics in a clear, concise manner. Be supportive, encouraging, and adapt your explanations to the student's level of understanding. Focus on being educational while keeping responses informative but concise."
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};
