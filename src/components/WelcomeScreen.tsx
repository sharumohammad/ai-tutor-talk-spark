
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
      className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-[#dcfaec] via-[#f7fcf9] to-[#def6ee] animate-fade-in transition-all"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-2xl mx-auto p-12 bg-white/90 shadow-2xl rounded-3xl text-center border border-emerald-100/70">
        <div className="flex justify-center mb-7">
          <div className="p-7 bg-green-100/80 rounded-full backdrop-blur-sm shadow-xl">
            <span className="sidebar-logo select-none">🌿</span>
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-emerald-700 mb-3 tracking-tight font-sans drop-shadow">Welcome to EduSpark</h1>
        <p className="text-lg text-emerald-900 mb-6 font-medium drop-shadow-sm">
          A friendly way to chat, learn, and explore with your personal AI tutor.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Home,
              title: "Dashboard",
              description: "Your home for learning.",
              color: "text-emerald-400"
            },
            {
              icon: MessageSquare,
              title: "Converse",
              description: "Ask and chat with Spark.",
              color: "text-cyan-500"
            },
            {
              icon: Users,
              title: "Friends",
              description: "Connect & share.",
              color: "text-pink-400"
            },
            {
              icon: Settings,
              title: "Account",
              description: "Tweak your experience.",
              color: "text-lime-500"
            }
          ].map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-green-50/80 to-emerald-100/90 p-6 rounded-xl border border-emerald-100 shadow hover:shadow-md"
            >
              <Icon className={`${color} mb-2`} size={32} />
              <h3 className="font-bold text-emerald-700 mb-1">{title}</h3>
              <p className="text-emerald-500 text-xs">{description}</p>
            </div>
          ))}
        </div>

        <div className="mb-7">
          <h2 className="text-base font-bold text-emerald-700 mb-2">Try a question:</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "How does rain form?",
              "What are photosynthesis steps?",
              "Explain gravity in simple words.",
            ].map(prompt => (
              <div
                key={prompt}
                className="bg-green-100 px-4 py-1.5 rounded-full text-emerald-600 text-sm font-semibold hover:bg-emerald-100 transition"
              >
                "{prompt}"
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-emerald-500 via-green-400 to-cyan-400 hover:from-green-600 hover:to-emerald-400 text-white px-12 py-3 shadow-lg text-xl rounded-2xl group font-bold tracking-wide transition"
        >
          Dive In
          <ArrowRight size={24} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
