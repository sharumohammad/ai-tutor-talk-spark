
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const isUser = message.role === 'user';

  useEffect(() => {
    if (message.role === 'assistant' && !message.isLoading) {
      if (charIndex < message.content.length) {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setDisplayedContent(message.content.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 12); // Faster type-in for new UI
        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
      }
    } else {
      setDisplayedContent(message.content);
    }
  }, [message, charIndex]);

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'mb-1 max-w-[85%] transition-all duration-150 bubble',
          isUser
            ? 'bg-gradient-to-br from-pink-400/80 to-pink-300/80 text-white font-semibold bubble-user user'
            : 'bg-gradient-to-br from-indigo-100/90 to-indigo-50/95 text-indigo-900 font-medium shadow bubble-ai ai'
        )}
        style={{
          borderBottomRightRadius: isUser ? '1.2rem' : undefined,
          borderTopRightRadius: isUser ? '2rem' : undefined,
          borderBottomLeftRadius: !isUser ? '1.2rem' : undefined,
          borderTopLeftRadius: !isUser ? '2rem' : undefined,
        }}
      >
        {message.isLoading ? (
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '120ms' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '240ms' }}></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-base">
            {isUser ? message.content : displayedContent}
            {isTyping && (
              <span className="inline-block w-1 h-5 ml-1 bg-pink-400 animate-pulse rounded"></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
