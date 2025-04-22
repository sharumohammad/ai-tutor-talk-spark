
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
  { icon: Home, label: 'Dashboard', active: true },
  { icon: MessageSquare, label: 'Converse' },
  { icon: Users, label: 'Friends' },
  { icon: Settings, label: 'Account' }
];

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {showWelcome && <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />}
      <aside
        className={cn(
          'transition-all duration-300 flex flex-col justify-between border-r',
          sidebarOpen
            ? 'w-60 bg-gray-50 visible'
            : 'w-0 opacity-0 pointer-events-none',
          'overflow-hidden py-7 pl-3 pr-2 z-20 min-h-screen'
        )}
        style={{ minWidth: sidebarOpen ? 213 : 0 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-10 ml-2">
            <span className="sidebar-logo select-none">📚</span>
            <span className="sidebar-brand text-gray-800 font-bold tracking-tight select-none">
              Learn AI
            </span>
          </div>
          <nav className="space-y-1 mt-4">
            {sidebarLinks.map(({ icon: Icon, label, active }) => (
              <SidebarItem key={label} icon={Icon} label={label} active={!!active} />
            ))}
          </nav>
        </div>
        <div className="h-16 flex items-end ml-2">
          <span className="text-sm text-gray-400">© {new Date().getFullYear()} Learn AI</span>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="w-full flex items-center justify-between px-4 py-5 bg-gray-50 border-b sticky top-0 z-10">
          <button
            className="md:hidden block mr-3 rounded-lg p-2 bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-800 select-none">
              Learn AI
            </span>
          </div>
          <div className="w-[36px]"></div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-white">
          <div className="w-full max-w-3xl rounded-lg bg-white p-0 sm:p-4 md:p-9 min-h-[70vh] h-full shadow-md border border-gray-100">
            <ChatContainer />
          </div>
        </main>
      </div>
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-gray-100/40 backdrop-blur-sm"
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
          ? 'bg-gray-200 text-black shadow-sm'
          : 'hover:bg-gray-100 text-gray-700'
      )}
      tabIndex={0}
    >
      <Icon className={cn("w-6 h-6", active ? "text-black" : "text-gray-500")} />
      <span>{label}</span>
    </div>
  );
}

export default MainLayout;
