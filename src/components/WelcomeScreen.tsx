
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
      }, 330);
    } else {
      onGetStarted();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 flex items-center justify-center glass-bg bg-gradient-to-br from-violet-200 via-indigo-100 to-white animate-fade-in transition-all"
      style={{ backdropFilter: 'blur(9px)' }}
    >
      <div className="max-w-2xl mx-auto p-10 bg-white/80 shadow-2xl rounded-2xl text-center border border-indigo-100/40">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-indigo-100/80 rounded-full backdrop-blur-sm shadow">
            <GraduationCap size={52} className="text-indigo-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-indigo-800 mb-3">Welcome to Spark AI Tutor</h1>
        <p className="text-lg text-indigo-600/90 mb-7">
          Your personal, conversational learning assistant for a smarter educational journey.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            {
              icon: BookOpen,
              title: "Adaptive",
              description: "Personal guidance for your learning curve.",
              color: "text-indigo-400"
            },
            {
              icon: Lightbulb,
              title: "Conversational",
              description: "Learn with dialog & real insights.",
              color: "text-amber-400"
            },
            {
              icon: Zap,
              title: "Instant",
              description: "Get quick, clear answers.",
              color: "text-pink-400"
            }
          ].map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="backdrop-blur bg-indigo-50/70 p-5 rounded-xl border border-indigo-100 shadow hover:shadow-md"
            >
              <Icon className={`${color} mb-2`} size={27} />
              <h3 className="font-semibold text-indigo-800 mb-1">{title}</h3>
              <p className="text-indigo-500 text-xs">{description}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-base font-medium text-indigo-800 mb-2">Try one of these:</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "What is quantum physics?",
              "Explain photosynthesis simply.",
              "What caused the Civil War?"
            ].map(prompt => (
              <div
                key={prompt}
                className="bg-indigo-100 px-3 py-1 rounded-full text-indigo-700 text-sm hover:bg-indigo-200 transition"
              >
                "{prompt}"
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 shadow-lg text-lg rounded-lg group"
        >
          Get Started
          <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
