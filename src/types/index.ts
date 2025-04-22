
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: number;
  isLoading?: boolean;
}

export interface ChatState {
  messages: Message[];
  isProcessing: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  addAssistantMessage: (content: string) => void;
  updateLastAssistantMessage: (content: string) => void;
  setProcessing: (isProcessing: boolean) => void;
  clearMessages: () => void;
}

export interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
}
