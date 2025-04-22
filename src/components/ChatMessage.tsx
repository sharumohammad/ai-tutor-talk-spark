
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
  
  // Typing animation for assistant messages
  useEffect(() => {
    if (message.role === 'assistant' && !message.isLoading) {
      if (charIndex < message.content.length) {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setDisplayedContent(message.content.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 20); // Speed of typing
        
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
        'flex w-full mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-xl p-4 animate-fade-in',
          isUser
            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-tr-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        )}
      >
        {message.isLoading ? (
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">
            {isUser ? message.content : displayedContent}
            {isTyping && (
              <span className="inline-block w-1 h-4 ml-1 bg-gray-600 animate-pulse"></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
