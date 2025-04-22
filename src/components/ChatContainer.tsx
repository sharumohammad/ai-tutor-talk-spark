
import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useChatStore from '@/store/useChatStore';
import { generateAIResponse } from '@/services/openRouterService';
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
      // Future: handle typing indicator, etc.
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
      addAssistantMessage('');
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
    <section className="flex flex-col h-full rounded-2xl min-h-[500px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-3 md:px-6 pt-3 pb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-emerald-700 tracking-tight drop-shadow select-none">EduSpark</h2>
          {isConnected ? (
            <div className="flex items-center ml-2 text-xs text-green-500 bg-green-100/80 px-2 py-0.5 rounded-full shadow">
              <Wifi size={15} className="mr-1" />
              Connected
            </div>
          ) : (
            <div className="flex items-center ml-2 text-xs text-red-400 bg-red-100/80 px-2 py-0.5 rounded-full shadow">
              <WifiOff size={15} className="mr-1" />
              Offline
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-emerald-400 hover:text-emerald-700 hover:bg-green-100 rounded-2xl transition"
          onClick={clearMessages}
        >
          <Trash2 size={19} className="mr-1" /> Clear
        </Button>
      </div>
      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-1 sm:px-5 pb-4 scrollbar-none">
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input */}
      <div className="sticky bottom-0 mt-auto pt-3 pb-4 px-1 sm:px-5 bg-transparent">
        <ChatInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
      </div>
    </section>
  );
};

export default ChatContainer;
