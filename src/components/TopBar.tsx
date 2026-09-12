import { useState, KeyboardEvent } from 'react';
import { Search, Activity, ShieldCheck, Sparkles, X, ChevronRight } from 'lucide-react';
import { Ticket, PageId } from '../types';

interface TopBarProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
  onNavigate: (page: PageId) => void;
  onSearchSubmit?: (query: string) => void;
}

export function TopBar({ tickets, onSelectTicket, onNavigate, onSearchSubmit }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? tickets.filter(
        (t) =>
          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.extractedKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSelectResult = (ticket: Ticket) => {
    onSelectTicket(ticket);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchQuery.trim());
      }
      onNavigate('history');
      setIsSearchFocused(false);
    }
  };

  return (
    <header
      id="top-navbar"
      className="h-16 bg-white border-b border-[#E8EAF0] px-6 flex items-center justify-between sticky top-0 z-20"
    >
      {/* Search Input Bar */}
      <div className="relative w-full max-w-md">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#667085] absolute left-3.5 pointer-events-none" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search tickets, tags or queries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-8 py-2 bg-[#F7F8FC] hover:bg-[#F0F2F8] focus:bg-white text-xs text-[#17203A] placeholder-[#667085] border border-[#E8EAF0] focus:border-[#15133B] focus:ring-1 focus:ring-[#15133B] rounded-xl outline-none transition-all duration-150"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-[#667085] hover:text-[#17203A] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Quick Results Dropdown */}
        {isSearchFocused && searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E8EAF0] rounded-xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in-50 duration-100">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#667085] flex justify-between">
              <span>Matching Tickets</span>
              <span>Press Enter to View All</span>
            </div>

            {searchResults.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-[#667085]">
                No matching tickets found for "{searchQuery}"
              </div>
            ) : (
              <div className="space-y-1">
                {searchResults.map((t) => (
                  <button
                    key={t.id}
                    onMouseDown={() => handleSelectResult(t)}
                    className="w-full text-left p-2.5 hover:bg-[#F7F8FC] rounded-lg transition-colors flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#15133B]">{t.id}</span>
                        <span className="text-xs text-[#17203A] font-medium truncate">{t.customerName}</span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-[#667085]">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#667085] truncate mt-0.5">{t.subject}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#667085] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right controls: System status & User profile */}
      <div className="flex items-center gap-5">
        {/* System status pill */}
        <div
          id="system-status-indicator"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18A779]/10 border border-[#18A779]/20 text-xs font-medium text-[#18A779]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18A779] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#18A779]"></span>
          </span>
          <span className="text-[#17203A] font-semibold text-xs">System Online</span>
          <span className="text-[#667085] text-xs font-normal">• Latency 142ms</span>
        </div>

        {/* Quick action: Analyze */}
        <button
          onClick={() => onNavigate('analyze')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#15133B]/5 hover:bg-[#15133B]/10 text-[#15133B] transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
          <span>Quick Scan</span>
        </button>

        {/* User Identity */}
        <div className="flex items-center gap-3 pl-3 border-l border-[#E8EAF0]">
          <div className="text-right">
            <div className="text-xs font-bold text-[#17203A]">SupportAI Ops</div>
            <div className="text-[11px] text-[#18A779] font-medium flex items-center justify-end gap-1">
              <ShieldCheck className="w-3 h-3 text-[#18A779]" />
              Enterprise
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#15133B] text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-[#15133B]/10 ring-2 ring-[#E8EAF0]">
            SO
          </div>
        </div>
      </div>
    </header>
  );
}
