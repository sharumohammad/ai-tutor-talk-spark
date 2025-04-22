
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, Users, Settings } from 'lucide-react';

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
      className="fixed inset-0 z-30 flex items-center justify-center bg-white animate-fade-in transition-all"
    >
      <div className="max-w-2xl mx-auto p-12 bg-white shadow-lg rounded-lg text-center border border-gray-100">
        <div className="flex justify-center mb-7">
          <div className="p-6 bg-gray-100 rounded-full">
            <span className="sidebar-logo select-none">📚</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">Learn AI</h1>
        <p className="text-lg text-gray-600 mb-6 font-medium">
          Your friendly AI learning companion.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Home,
              title: "Dashboard",
              description: "Your learning hub.",
              color: "text-gray-500"
            },
            {
              icon: MessageSquare,
              title: "Chat",
              description: "Ask questions.",
              color: "text-gray-500"
            },
            {
              icon: Users,
              title: "Community",
              description: "Connect & share.",
              color: "text-gray-500"
            },
            {
              icon: Settings,
              title: "Settings",
              description: "Customize experience.",
              color: "text-gray-500"
            }
          ].map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 transition"
            >
              <Icon className={`${color} mb-2`} size={28} />
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-gray-500 text-xs">{description}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={handleGetStarted}
          className="bg-gray-800 hover:bg-gray-700 text-white px-10 py-3 rounded-lg text-lg font-semibold transition"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
