
import { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import WelcomeScreen from './WelcomeScreen';
import { cn } from '@/lib/utils';
import {
  Menu,
  MessageSquare,
  Home,
  Users,
  Settings
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const sidebarLinks = [
  { icon: Home, label: 'Home', active: true },
  { icon: MessageSquare, label: 'Chat' },
  { icon: Users, label: 'Community' },
  { icon: Settings, label: 'Settings' }
];

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#eceeff] via-[#ece6f6] to-[#dde4f6] font-sans">
      {showWelcome && <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />}
      {/* Sidebar */}
      <aside
        className={cn(
          'transition-all duration-300 flex flex-col justify-between shadow-2xl sidebar-glass',
          sidebarOpen
            ? 'w-60 bg-gradient-to-b from-purple-900 via-indigo-900/90 to-indigo-800/95 border-r border-indigo-200 backdrop-blur-[15px] visible'
            : 'w-0 opacity-0 pointer-events-none',
          'overflow-hidden py-7 pl-4 pr-2 z-20 min-h-screen'
        )}
        style={{ minWidth: sidebarOpen ? 213 : 0 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-10 ml-2">
            <span className="sidebar-logo select-none drop-shadow-lg">🎨</span>
            <span className="sidebar-brand text-white font-black tracking-tight select-none">
              LearnVibe AI
            </span>
          </div>
          <nav className="space-y-1 mt-4">
            {sidebarLinks.map(({ icon: Icon, label, active }) => (
              <SidebarItem key={label} icon={Icon} label={label} active={!!active} />
            ))}
          </nav>
        </div>
        <div className="h-16 flex items-end ml-2">
          <span className="text-sm text-indigo-200">© {new Date().getFullYear()} LearnVibe</span>
        </div>
      </aside>
      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header
          className="w-full flex items-center justify-between px-4 py-5 bg-gradient-to-r from-[#eceeff]/95 to-[#f0e6fa]/90 border-b border-[#ede1fa] shadow-sm sticky top-0 z-10"
        >
          <button
            className="md:hidden block mr-3 rounded-lg p-2 bg-purple-100/80 text-purple-800 hover:bg-purple-200 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-purple-800 drop-shadow-md select-none">
              LearnVibe AI
            </span>
          </div>
          <div className="w-[36px]"></div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-transparent">
          <div className="w-full max-w-3xl rounded-3xl bg-white/90 p-0 sm:p-3 md:p-8 min-h-[70vh] h-full shadow-xl border border-indigo-200/50">
            <ChatContainer />
          </div>
        </main>
      </div>
      {/* Backdrop for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-indigo-900/30 backdrop-blur-md"
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
        'flex items-center gap-3 px-4 py-3 mb-1 w-full font-semibold text-lg cursor-pointer select-none transition-all',
        active
          ? 'sidebar-menu-item-active'
          : 'sidebar-menu-item'
      )}
      tabIndex={0}
    >
      <Icon className={cn("w-6 h-6", active ? "text-white" : "text-indigo-300")} />
      <span>{label}</span>
    </div>
  );
}

export default MainLayout;
