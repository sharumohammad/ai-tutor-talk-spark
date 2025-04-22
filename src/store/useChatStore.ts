
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ChatState, Message, MessageRole } from '../types';

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: uuidv4(),
      content: "Hi! I'm your AI tutor Spark. How can I help you learn today?",
      role: 'assistant',
      timestamp: Date.now(),
    },
  ],
  isProcessing: false,
  
  addMessage: (message) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: message.content,
      role: message.role,
      timestamp: Date.now(),
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
    
    return newMessage;
  },
  
  addAssistantMessage: (content) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      role: 'assistant',
      timestamp: Date.now(),
      isLoading: false,
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
    
    return newMessage;
  },
  
  updateLastAssistantMessage: (content) => {
    set((state) => {
      const messages = [...state.messages];
      const lastAssistantMessageIndex = [...messages]
        .reverse()
        .findIndex((message) => message.role === 'assistant');
        
      if (lastAssistantMessageIndex >= 0) {
        const actualIndex = messages.length - 1 - lastAssistantMessageIndex;
        messages[actualIndex] = {
          ...messages[actualIndex],
          content,
          isLoading: false,
        };
      }
      
      return { messages };
    });
  },
  
  setProcessing: (isProcessing) => {
    set({ isProcessing });
  },
  
  clearMessages: () => {
    set({
      messages: [
        {
          id: uuidv4(),
          content: "Hi! I'm your AI tutor Spark. How can I help you learn today?",
          role: 'assistant',
          timestamp: Date.now(),
        },
      ],
    });
  },
}));

export default useChatStore;
