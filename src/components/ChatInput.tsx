
import { useState, KeyboardEvent, FormEvent, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import socketService from '@/services/socketService';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInput = ({ onSendMessage, isProcessing }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
      return;
    }
    
    // Set typing indicator
    if (!isTyping) {
      setIsTyping(true);
      // Notify that user started typing
      socketService.send({
        type: 'typing_indicator',
        user: 'user',
        isTyping: true
      });
    }
    
    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Set new timeout to turn off typing indicator after 2 seconds of inactivity
    const newTimeout = setTimeout(() => {
      setIsTyping(false);
      socketService.send({
        type: 'typing_indicator',
        user: 'user',
        isTyping: false
      });
    }, 2000);
    
    setTypingTimeout(newTimeout);
  };
  
  // Focus the input when processing completes
  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);
  
  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <form onSubmit={handleSubmit} className="mt-4 relative">
      <div className="relative">
        <textarea
          ref={inputRef}
          className="w-full p-4 pr-12 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white text-gray-800"
          placeholder={isProcessing ? "Processing..." : "Ask anything... (Press Enter to send)"}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          style={{ minHeight: '60px', maxHeight: '150px' }}
        />
        <Button
          type="submit"
          className="absolute right-2 bottom-2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          disabled={!message.trim() || isProcessing}
        >
          <Send size={20} />
        </Button>
      </div>
      {isProcessing && (
        <div className="text-sm text-gray-500 mt-1">
          AI is thinking...
        </div>
      )}
    </form>
  );
};

export default ChatInput;
