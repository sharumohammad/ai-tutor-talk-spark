
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
      isLoading: message.isLoading || false,
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
      isLoading: true,
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
    
    return newMessage;
  },
  
  updateLastAssistantMessage: (content) => {
    set((state) => {
      const messages = [...state.messages];
      const lastAssistantIndex = messages
        .map((msg, index) => ({ ...msg, index }))
        .filter((msg) => msg.role === 'assistant')
        .pop();
        
      if (lastAssistantIndex) {
        messages[lastAssistantIndex.index] = {
          ...messages[lastAssistantIndex.index],
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
      isProcessing: false,
    });
  },
}));

export default useChatStore;
