
import { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import WelcomeScreen from './WelcomeScreen';
import { cn } from '@/lib/utils';
import { 
  CircleUserRound, 
  BookOpen, 
  Library, 
  GraduationCap, 
  LucideIcon, 
  Menu 
} from 'lucide-react';
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
      'flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-300',
      active 
        ? 'bg-indigo-100/70 text-indigo-800 hover:bg-indigo-100' 
        : 'hover:bg-gray-100/50 text-gray-700 hover:text-gray-900'
    )}
    onClick={onClick}
  >
    <Icon size={20} className="shrink-0" />
    <span className="text-sm font-medium truncate">{label}</span>
  </button>
);

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
      {showWelcome && <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />}
      
      <aside 
        className={cn(
          "bg-white/80 backdrop-blur-lg border-r border-gray-100 shadow-sm transition-all duration-300 ease-in-out overflow-hidden",
          sidebarOpen ? "w-64" : "w-0 -ml-4 md:ml-0 md:w-16",
          isMobile && sidebarOpen ? "absolute z-20 h-full" : ""
        )}
      >
        <div className="flex items-center p-4 border-b border-gray-100">
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <GraduationCap size={28} className="text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Spark AI</h1>
            </div>
          )}
          {!sidebarOpen && !isMobile && (
            <GraduationCap size={24} className="text-indigo-600 mx-auto" />
          )}
        </div>
        
        <nav className="p-2 space-y-1">
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

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
              Educational AI Assistant
            </h1>
          </div>
          
          <div className="w-8"></div>
        </header>
        
        <div className="flex-1 overflow-hidden p-4">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg h-full p-4 max-w-4xl mx-auto border border-gray-100">
            <ChatContainer />
          </div>
        </div>
      </main>
      
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
