
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Star, BookOpen, Lightbulb, Users, ArrowRight } from 'lucide-react';

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
      className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-pink-50 via-indigo-50 to-white animate-fade-in transition-all"
      style={{ backdropFilter: 'blur(11px)' }}
    >
      <div className="max-w-2xl mx-auto p-12 bg-white/85 shadow-2xl rounded-3xl text-center border border-indigo-100/40">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-pink-100/80 rounded-full backdrop-blur-sm shadow-lg">
            <Star size={60} className="text-pink-500" />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-pink-600 mb-3 tracking-tight">Welcome to EduGenius</h1>
        <p className="text-lg text-indigo-700/90 mb-6">
          Your all-in-one, conversational learning assistant for a brighter educational journey.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-7">
          {[
            {
              icon: BookOpen,
              title: "Lessons",
              description: "Adaptive lesson journeys for any learner.",
              color: "text-indigo-400"
            },
            {
              icon: Lightbulb,
              title: "Conversation",
              description: "Dialog-driven, easy Q&A with insight.",
              color: "text-amber-400"
            },
            {
              icon: Users,
              title: "Community",
              description: "Learner network and tips sharing.",
              color: "text-pink-400"
            }
          ].map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-white/80 p-5 rounded-xl border border-pink-100 shadow hover:shadow-md"
            >
              <Icon className={`${color} mb-2`} size={29} />
              <h3 className="font-bold text-pink-600 mb-1">{title}</h3>
              <p className="text-indigo-500 text-xs">{description}</p>
            </div>
          ))}
        </div>

        <div className="mb-7">
          <h2 className="text-base font-bold text-indigo-800 mb-2">Try a question:</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "What is quantum physics?",
              "Explain photosynthesis simply.",
              "What caused the Civil War?"
            ].map(prompt => (
              <div
                key={prompt}
                className="bg-pink-100 px-4 py-1.5 rounded-full text-pink-600 text-sm font-semibold hover:bg-pink-200 transition"
              >
                "{prompt}"
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGetStarted}
          className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 shadow-lg text-xl rounded-2xl group font-bold tracking-wide transition"
        >
          Get Started
          <ArrowRight size={23} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
