
import { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import WelcomeScreen from './WelcomeScreen';
import { cn } from '@/lib/utils';
import { 
  Star,
  MessageSquare, 
  BookOpen, 
  Users, 
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
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#e0e7ff] via-[#f1f5f9] to-[#fde4e0] font-sans">
      {showWelcome && <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />}
      {/* Sidebar */}
      <aside
        className={cn(
          'transition-all duration-300 flex flex-col justify-between shadow-xl',
          sidebarOpen
            ? 'w-64 bg-white/80 border-r border-indigo-100 backdrop-blur-xl visible'
            : 'w-0 opacity-0 pointer-events-none',
          'overflow-hidden py-8 pl-4 pr-2 z-20 min-h-screen'
        )}
        style={{ minWidth: sidebarOpen ? 220 : 0 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-10 ml-2">
            <div className="rounded-full bg-indigo-100 p-2 shadow">
              <Star size={38} className="text-pink-500" />
            </div>
            <span className="text-3xl font-extrabold text-indigo-800 tracking-tight select-none">EduGenius</span>
          </div>
          <nav className="space-y-2 mt-3">
            <SidebarItem icon={MessageSquare} label="Chat" active />
            <SidebarItem icon={BookOpen} label="Lessons" />
            <SidebarItem icon={Users} label="Community" />
          </nav>
        </div>
        <div className="h-16 flex items-end ml-2">
          <span className="text-sm text-indigo-300">© {new Date().getFullYear()} EduGenius</span>
        </div>
      </aside>
      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header
          className="w-full flex items-center justify-between px-4 py-5 bg-white/90 border-b border-indigo-100 shadow-sm sticky top-0 z-10 transition"
        >
          <button
            className="md:hidden block mr-3 rounded-lg p-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-2xl lg:text-3xl font-semibold tracking-tight text-pink-600 drop-shadow-sm select-none">EduGenius Tutor</span>
          </div>
          <div className="w-[40px]"></div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-transparent">
          <div className="w-full max-w-3xl rounded-3xl bg-white/90 p-0 sm:p-3 md:p-8 min-h-[70vh] h-full shadow-2xl border border-pink-100/40">
            <ChatContainer />
          </div>
        </main>
      </div>
      {/* Backdrop for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-indigo-200/60 backdrop-blur-md"
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
        'flex items-center gap-3 px-4 py-3 rounded-2xl mb-1 w-full font-medium text-lg cursor-pointer select-none transition-all',
        active
          ? 'bg-gradient-to-br from-pink-100 via-indigo-100 to-white text-pink-600 shadow-md'
          : 'hover:bg-indigo-50 text-indigo-800/90'
      )}
      tabIndex={0}
    >
      <Icon className={cn("w-6 h-6", active ? "text-pink-600" : "text-indigo-400")} />
      <span>{label}</span>
    </div>
  );
}

export default MainLayout;
