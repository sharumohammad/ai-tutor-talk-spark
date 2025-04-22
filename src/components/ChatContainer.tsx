
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
  
  // Set up socket message listener
  useEffect(() => {
    if (!isConnected) return;
    
    const unsubscribe = socketService.onMessage((socketMessage) => {
      // In a real app, this would receive messages from other users or the server
      console.log('Socket message received:', socketMessage);
      
      // Handle different message types if needed
      if (socketMessage.type === 'typing_indicator') {
        // Handle typing indicators
        console.log('Typing indicator:', socketMessage);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const handleSendMessage = async (content: string) => {
    try {
      // Add user message to state
      addMessage({ content, role: 'user' });
      
      // Notify via socket service (in a real app, this would go to a server)
      if (isConnected) {
        socketService.send({
          type: 'new_message',
          content,
          role: 'user',
          timestamp: Date.now()
        });
      }
      
      // Set processing state
      setProcessing(true);
      
      // Add assistant loading message
      const assistantMessage = addAssistantMessage('');
      
      // Format messages for the API
      const messageHistory = messages
        .filter(msg => !msg.isLoading)
        .slice(-10) // Limit context to last 10 messages
        .map(msg => ({
          role: msg.role,
          content: msg.content,
        }));
      
      // Add the new user message
      messageHistory.push({ role: 'user', content });
      
      // Get AI response
      const response = await generateAIResponse(messageHistory);
      
      // Update the assistant message with the response
      updateLastAssistantMessage(response);
      
      // Set processing state to false
      setProcessing(false);
    } catch (error) {
      console.error('Error in chat process:', error);
      
      // Add error message
      updateLastAssistantMessage("I'm sorry, I encountered an error. Please try again.");
      setProcessing(false);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-indigo-800">Spark AI Tutor</h1>
          <div className="ml-3 flex items-center text-sm">
            {isConnected ? (
              <div className="flex items-center text-green-600">
                <Wifi size={16} className="mr-1" />
                <span>Connected</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <WifiOff size={16} className="mr-1" />
                <span>Offline</span>
              </div>
            )}
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-gray-500 hover:text-red-500"
          onClick={clearMessages}
        >
          <Trash2 size={18} className="mr-1" /> Clear Chat
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-1 py-2">
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
