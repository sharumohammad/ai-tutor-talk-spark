
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, BookOpen, Lightbulb, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleGetStarted = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('animate-fade-out');
      setTimeout(() => {
        onGetStarted();
      }, 300);
    } else {
      onGetStarted();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white z-20 flex flex-col items-center justify-center p-6 animate-fade-in"
    >
      <div className="max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-indigo-100/50 rounded-full backdrop-blur-sm">
            <GraduationCap size={56} className="text-indigo-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Welcome to Spark AI Tutor</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
          Your intelligent, conversational learning companion designed to make education engaging and personalized.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: BookOpen,
              title: "Adaptive Learning",
              description: "Personalized guidance tailored to your unique learning style.",
              color: "text-indigo-500"
            },
            {
              icon: Lightbulb,
              title: "Interactive Insights",
              description: "Dive deep into topics through dynamic, conversational learning.",
              color: "text-green-500"
            },
            {
              icon: Zap,
              title: "Instant Comprehension",
              description: "Get clear, concise explanations at the speed of thought.",
              color: "text-orange-500"
            }
          ].map(({ icon: Icon, title, description, color }) => (
            <div 
              key={title} 
              className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <Icon className={`${color} mb-3`} size={28} />
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Explore Possibilities:</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Explain quantum physics",
              "Break down photosynthesis",
              "Explore Civil War history"
            ].map(prompt => (
              <div 
                key={prompt} 
                className="bg-indigo-50/70 px-3 py-1 rounded-full text-indigo-700 text-sm hover:bg-indigo-100 transition-colors"
              >
                "{prompt}"
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={handleGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg group"
        >
          Get Started 
          <ArrowRight 
            size={20} 
            className="ml-2 transition-transform group-hover:translate-x-1" 
          />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
