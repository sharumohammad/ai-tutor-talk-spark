
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, BookOpen, Lightbulb, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleGetStarted = () => {
    // Add exit animation
    if (containerRef.current) {
      containerRef.current.classList.add('animate-fade-out');
      setTimeout(() => {
        onGetStarted();
      }, 300); // Match this with CSS animation duration
    } else {
      onGetStarted();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-6 animate-fade-in"
    >
      <div className="max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-100 rounded-full">
            <GraduationCap size={48} className="text-indigo-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Spark AI Tutor</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personal AI-powered educational assistant ready to help you learn through conversation.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <BookOpen className="text-indigo-500 mb-2" size={24} />
            <h3 className="font-medium text-gray-900 mb-1">Intelligent Tutoring</h3>
            <p className="text-gray-600 text-sm">Get personalized help with any educational topic.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <Lightbulb className="text-indigo-500 mb-2" size={24} />
            <h3 className="font-medium text-gray-900 mb-1">Interactive Learning</h3>
            <p className="text-gray-600 text-sm">Engage in real-time conversations to deepen understanding.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <Zap className="text-indigo-500 mb-2" size={24} />
            <h3 className="font-medium text-gray-900 mb-1">Quick Responses</h3>
            <p className="text-gray-600 text-sm">Get immediate answers to your educational questions.</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Try asking:</h2>
          <div className="flex flex-wrap justify-center gap-2">
            <div className="bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 text-sm">
              "Explain quantum physics to a beginner"
            </div>
            <div className="bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 text-sm">
              "Help me understand photosynthesis"
            </div>
            <div className="bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 text-sm">
              "Teach me about the Civil War"
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Get Started <ArrowRight size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
