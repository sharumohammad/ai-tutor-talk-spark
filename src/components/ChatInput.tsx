
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
    if (!isTyping) {
      setIsTyping(true);
      socketService.send({
        type: 'typing_indicator',
        user: 'user',
        isTyping: true
      });
    }
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => {
      setIsTyping(false);
      socketService.send({
        type: 'typing_indicator',
        user: 'user',
        isTyping: false
      });
    }, 2000));
  };

  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    }
  }, [typingTimeout]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="rounded-lg border border-gray-200 flex items-end min-h-[55px] bg-white">
        <textarea
          ref={inputRef}
          className="w-full px-4 py-3 rounded-lg resize-none text-base text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 min-h-[55px] max-h-32 transition"
          placeholder={isProcessing ? "Processing..." : "Ask a question"}
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 bottom-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-sm focus:ring-1 focus:ring-gray-500 transition"
          disabled={!message.trim() || isProcessing}
        >
          <Send size={20} />
        </Button>
      </div>
      {isProcessing && (
        <div className="text-xs text-gray-500 mt-2 px-1 font-semibold text-center">
          Generating response...
        </div>
      )}
    </form>
  );
};

export default ChatInput;
