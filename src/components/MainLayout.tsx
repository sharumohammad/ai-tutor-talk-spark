
import { useEffect, useState } from 'react';
import ChatContainer from './ChatContainer';
import WelcomeScreen from './WelcomeScreen';
import { cn } from '@/lib/utils';
import { CircleUserRound, BookOpen, Library, GraduationCap, LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    className={cn(
      'flex items-center gap-3 w-full p-3 rounded-lg transition-colors',
      active 
        ? 'bg-indigo-100 text-indigo-800' 
        : 'hover:bg-gray-100 text-gray-700'
    )}
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useIsMobile();
  
  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Welcome Screen */}
      {showWelcome && <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white p-4 border-r transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-0 -ml-4 md:ml-0 md:w-16",
          isMobile && sidebarOpen ? "absolute z-10 h-full shadow-lg" : ""
        )}
      >
        <div className="flex items-center mb-8">
          {sidebarOpen && (
            <>
              <GraduationCap size={28} className="text-indigo-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Spark AI</h1>
            </>
          )}
          {!sidebarOpen && !isMobile && (
            <GraduationCap size={24} className="text-indigo-600 mx-auto" />
          )}
        </div>
        
        <nav className="space-y-2">
          <SidebarItem 
            icon={CircleUserRound} 
            label="Personal Tutor" 
            active={true} 
          />
          <SidebarItem 
            icon={BookOpen} 
            label="Study Topics" 
          />
          <SidebarItem 
            icon={Library} 
            label="Resource Library" 
          />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-lg font-medium text-gray-800">Educational AI Assistant</h1>
          </div>
          
          <div className="w-8"></div> {/* Spacer to center the title */}
        </header>
        
        {/* Chat container */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="bg-white rounded-xl shadow-sm h-full p-4 max-w-4xl mx-auto">
            <ChatContainer />
          </div>
        </div>
      </main>
      
      {/* Mobile overlay when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
