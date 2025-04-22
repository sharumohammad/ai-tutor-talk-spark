
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, Users, Settings, ArrowRight } from 'lucide-react';

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
      }, 340);
    } else {
      onGetStarted();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-[#ebe8fa] via-[#f2f3fd] to-[#e5eafc] animate-fade-in transition-all"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-2xl mx-auto p-12 bg-white/90 shadow-2xl rounded-3xl text-center border border-[#dfd3fc]/60">
        <div className="flex justify-center mb-7">
          <div className="p-7 bg-purple-100/80 rounded-full backdrop-blur-sm shadow-xl">
            <span className="sidebar-logo select-none">🎨</span>
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-purple-700 mb-3 tracking-tight font-sans drop-shadow">Welcome to LearnVibe AI</h1>
        <p className="text-lg text-indigo-800 mb-6 font-medium drop-shadow-sm">
          A vivid way to chat, learn, and explore with friendly AI in your pocket.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Home,
              title: "Home",
              description: "Your dashboard for resources.",
              color: "text-indigo-400"
            },
            {
              icon: MessageSquare,
              title: "Chat",
              description: "Ask and learn with AI.",
              color: "text-blue-400"
            },
            {
              icon: Users,
              title: "Community",
              description: "Share and connect.",
              color: "text-pink-400"
            },
            {
              icon: Settings,
              title: "Settings",
              description: "Personalize your vibe.",
              color: "text-purple-400"
            }
          ].map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-indigo-50/80 to-purple-100/90 p-6 rounded-xl border border-purple-100 shadow hover:shadow-md"
            >
              <Icon className={`${color} mb-2`} size={32} />
              <h3 className="font-bold text-purple-700 mb-1">{title}</h3>
              <p className="text-indigo-500 text-xs">{description}</p>
            </div>
          ))}
        </div>

        <div className="mb-7">
          <h2 className="text-base font-bold text-purple-700 mb-2">Try a question:</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "What are fractals in nature?",
              "Explain the theory of relativity.",
              "How do plants make food?",
            ].map(prompt => (
              <div
                key={prompt}
                className="bg-purple-100 px-4 py-1.5 rounded-full text-purple-600 text-sm font-semibold hover:bg-indigo-100 transition"
              >
                "{prompt}"
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-purple-500 text-white px-12 py-3 shadow-lg text-xl rounded-2xl group font-bold tracking-wide transition"
        >
          Dive In
          <ArrowRight size={24} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
