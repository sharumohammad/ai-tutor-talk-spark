
import { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import WelcomeScreen from './WelcomeScreen';
import { cn } from '@/lib/utils';
import { 
  GraduationCap,
  BookOpen, 
  Library, 
  CircleUserRound, 
  Menu 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="min-h-screen w-full glass-bg flex">
      {showWelcome && <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />}
      {/* Sidebar */}
      <aside
        className={cn(
          'transition-all duration-300 flex flex-col justify-between',
          sidebarOpen
            ? 'w-60 md:w-72 glass-card shadow-lg visible'
            : 'w-0 opacity-0 pointer-events-none',
          'overflow-hidden py-7 pl-2 pr-4 z-20'
        )}
        style={{ minWidth: sidebarOpen ? 200 : 0 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-8 ml-3">
            <GraduationCap size={32} className="text-indigo-500" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Spark AI</span>
          </div>
          <nav className="space-y-3 mt-3">
            <SidebarItem icon={CircleUserRound} label="Tutor" active />
            <SidebarItem icon={BookOpen} label="Topics" />
            <SidebarItem icon={Library} label="Library" />
          </nav>
        </div>
        <div className="h-24 flex items-end ml-3">
          <span className="text-xs text-gray-400">© {new Date().getFullYear()} Spark AI</span>
        </div>
      </aside>
      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header
          className="w-full flex items-center justify-between px-4 py-5 glass-card border-t-0 border-l-0 border-r-0 sticky top-0 shadow-none z-10"
        >
          <button
            className="md:hidden block mr-4 rounded-lg p-2 focus-glow"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6 text-indigo-600" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-xl lg:text-2xl font-semibold tracking-tight text-indigo-900">AI Educational Tutor</span>
          </div>
          <div className="w-[36px]"></div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-3xl glass-card p-1 sm:p-2 md:p-6 lg:p-8 min-h-[70vh] h-full shadow-xl border border-indigo-100/40">
            <ChatContainer />
          </div>
        </main>
      </div>
      {/* Backdrop for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-indigo-100/70 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

function SidebarItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg mb-1 w-full font-semibold transition-all cursor-pointer select-none',
        active
          ? 'bg-indigo-100 text-indigo-700 shadow hover:bg-indigo-200'
          : 'hover:bg-indigo-50 text-gray-600'
      )}
      tabIndex={0}
    >
      <Icon className="w-5 h-5 text-indigo-400" />
      <span className="text-base">{label}</span>
    </div>
  );
}

export default MainLayout;
