
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
      <div className="relative rounded-2xl shadow-lg flex items-end border border-indigo-200 ring-2 ring-purple-200 min-h-[55px] bg-chatbox">
        <textarea
          ref={inputRef}
          className="w-full bg-transparent px-4 py-4 rounded-2xl resize-none text-base text-purple-900 placeholder:italic font-medium focus:outline-none focus:ring-2 focus:ring-purple-300 min-h-[55px] max-h-32 transition"
          placeholder={isProcessing ? "AI is crafting wisdom..." : "Write your question and press Enter"}
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 bottom-3 bg-gradient-to-tr from-purple-500 to-indigo-400 hover:bg-purple-600 text-white rounded-xl shadow focus:ring-2 focus:ring-purple-300 transition"
          disabled={!message.trim() || isProcessing}
        >
          <Send size={22} />
        </Button>
      </div>
      {isProcessing && (
        <div className="text-xs text-purple-400 mt-2 px-1 font-semibold animate-pulse text-center">
          AI is crafting wisdom...
        </div>
      )}
    </form>
  );
};

export default ChatInput;
