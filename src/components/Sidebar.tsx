import {
  LayoutDashboard,
  Cpu,
  History,
  BarChart3,
  Tag,
  Settings,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { PageId } from '../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  openTicketsCount?: number;
}

export function Sidebar({ currentPage, onNavigate, openTicketsCount = 7 }: SidebarProps) {
  const navItems: { id: PageId; label: string; icon: typeof LayoutDashboard; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyze', label: 'Analyze Ticket', icon: Cpu, badge: 'AI' },
    { id: 'history', label: 'Ticket History', icon: History, badge: `${openTicketsCount}` },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About', icon: HelpCircle },
  ];

  return (
    <aside
      id="main-sidebar"
      className="w-64 bg-[#15133B] text-white flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none border-r border-[#1e1b4b]"
    >
      {/* Brand Header */}
      <div>
        <div className="p-6 pb-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white relative shadow-sm">
            <Sparkles className="w-5 h-5 text-[#FF6B57]" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#18A779] rounded-full ring-2 ring-[#15133B]" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold text-white tracking-tight">SupportAI</h1>
            <p className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Ticket Intelligence</p>
          </div>
        </div>

        {/* Navigation items */}
        <div className="px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">Navigation</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left ${
                    isActive
                      ? 'bg-[#FF6B57] text-white shadow-sm shadow-[#FF6B57]/25'
                      : 'text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-white' : 'text-white/70'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : item.badge === 'AI'
                          ? 'bg-[#FF6B57] text-white'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Profile Area */}
      <div className="p-3 m-3 mb-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FF6B57]/20 text-[#FF6B57] border border-[#FF6B57]/30 flex items-center justify-center font-bold text-xs shrink-0">
            TM
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">Team Member</h4>
            <p className="text-[11px] text-white/60 truncate font-medium">Lead Designer</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#18A779] shrink-0 ring-2 ring-[#15133B]" title="System Online" />
        </div>
      </div>
    </aside>
  );
}
