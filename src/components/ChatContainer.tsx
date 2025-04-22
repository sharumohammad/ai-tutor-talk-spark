
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useChatStore from '@/store/useChatStore';
import { generateAIResponse } from '@/services/openRouterService';
import { Message } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Wifi, WifiOff } from 'lucide-react';
import socketService from '@/services/socketService';
import { useConnectionStatus } from '@/hooks/useConnectionStatus';
import { useToast } from '@/hooks/use-toast';

const ChatContainer = () => {
  const {
    messages,
    isProcessing,
    addMessage,
    addAssistantMessage,
    setProcessing,
    clearMessages,
    updateLastAssistantMessage
  } = useChatStore();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isConnected = useConnectionStatus();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (!isConnected) return;
    
    const unsubscribe = socketService.onMessage((socketMessage) => {
      console.log('Socket message received:', socketMessage);
      
      if (socketMessage.type === 'typing_indicator') {
        console.log('Typing indicator:', socketMessage);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const handleSendMessage = async (content: string) => {
    try {
      addMessage({ content, role: 'user' });
      
      if (isConnected) {
        socketService.send({
          type: 'new_message',
          content,
          role: 'user',
          timestamp: Date.now()
        });
      }
      
      setProcessing(true);
      const assistantMessage = addAssistantMessage('');
      
      const messageHistory = messages
        .filter(msg => !msg.isLoading)
        .slice(-10)
        .map(msg => ({
          role: msg.role,
          content: msg.content,
        }));
      
      messageHistory.push({ role: 'user', content });
      
      const response = await generateAIResponse(messageHistory);
      
      updateLastAssistantMessage(response);
      setProcessing(false);
    } catch (error) {
      console.error('Error in chat process:', error);
      updateLastAssistantMessage("I'm sorry, I encountered an error. Please try again.");
      setProcessing(false);
      
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl">
      <div className="flex justify-between items-center bg-indigo-50/50 p-4 rounded-t-xl border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-indigo-800 tracking-tight">Spark AI Tutor</h1>
          <div className="ml-3 flex items-center text-sm">
            {isConnected ? (
              <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <Wifi size={16} className="mr-1" />
                <span>Connected</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500 bg-red-50 px-2 py-1 rounded-full">
                <WifiOff size={16} className="mr-1" />
                <span>Offline</span>
              </div>
            )}
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-gray-500 hover:text-red-500 hover:bg-red-50"
          onClick={clearMessages}
        >
          <Trash2 size={18} className="mr-1" /> Clear Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
    </div>
  );
};

export default ChatContainer;
