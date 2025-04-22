
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
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative bg-white/85 rounded-xl shadow-sm flex items-end border border-indigo-100">
        <textarea
          ref={inputRef}
          className="w-full bg-transparent px-4 py-3 rounded-xl resize-none text-base text-gray-800 focus-glow focus:outline-none"
          placeholder={isProcessing ? "Processing..." : "Type your question, then press Enter"}
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          style={{ minHeight: 50, maxHeight: 120 }}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 bottom-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
          disabled={!message.trim() || isProcessing}
        >
          <Send size={20} />
        </Button>
      </div>
      {isProcessing && (
        <div className="text-xs text-indigo-400 mt-1 px-1 font-medium animate-pulse">
          AI is thinking...
        </div>
      )}
    </form>
  );
};

export default ChatInput;
