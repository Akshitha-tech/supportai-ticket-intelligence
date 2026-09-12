import { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
  TrendingUp,
  Filter,
  BarChart2,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { Ticket, PageId, CategoryItem } from '../types';

interface DashboardPageProps {
  tickets: Ticket[];
  categories: CategoryItem[];
  onNavigate: (page: PageId) => void;
  onSelectTicket: (ticket: Ticket) => void;
  onSelectCategory?: (category: CategoryItem) => void;
  onOpenFilterQueues: () => void;
  activeQueueFilter: string;
}

export function DashboardPage({
  tickets,
  categories,
  onNavigate,
  onSelectTicket,
  onSelectCategory,
  onOpenFilterQueues,
  activeQueueFilter,
}: DashboardPageProps) {
  const [volumeTimeRange, setVolumeTimeRange] = useState<'7d' | '30d'>('7d');

  // Filter recent tickets if activeQueueFilter is set
  const filteredTickets = tickets.filter((t) => {
    if (activeQueueFilter === 'high-priority') return t.priority === 'High' || t.priority === 'Critical';
    if (activeQueueFilter === 'open-only') return t.status !== 'Resolved';
    if (activeQueueFilter === 'tier2-billing') return t.category === 'Billing';
    if (activeQueueFilter === 'tier3-eng') return t.category === 'Technical Issue';
    return true;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-[#F04444]/15 text-[#F04444] border-[#F04444]/30';
      case 'High':
        return 'bg-[#F04444]/10 text-[#F04444] border-[#F04444]/20';
      case 'Medium':
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
      case 'Low':
        return 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20';
      default:
        return 'bg-slate-100 text-[#667085]';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-[#18A779]/10 text-[#18A779] border-[#18A779]/20';
      case 'In Progress':
        return 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20';
      default:
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
    }
  };

  const volumeData = [
    { day: 'Mon', count: 184, automated: 172 },
    { day: 'Tue', count: 215, automated: 201 },
    { day: 'Wed', count: 248, automated: 236 },
    { day: 'Thu', count: 196, automated: 188 },
    { day: 'Fri', count: 220, automated: 209 },
    { day: 'Sat', count: 98, automated: 92 },
    { day: 'Sun', count: 87, automated: 83 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in-50 duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#15133B] tracking-tight">Dashboard</h1>
          <p className="text-xs text-[#667085] mt-1">
            Monitor ticket activity and AI-powered support intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="dashboard-filter-queues-btn"
            onClick={onOpenFilterQueues}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
              activeQueueFilter !== 'all'
                ? 'bg-[#15133B] text-white border-[#15133B] shadow-sm'
                : 'bg-white text-[#17203A] border-[#E8EAF0] hover:bg-[#F7F8FC]'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-[#FF6B57]" />
            <span>Filter Queues</span>
            {activeQueueFilter !== 'all' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B57]" />
            )}
          </button>

          <button
            id="dashboard-analyze-new-ticket-btn"
            onClick={() => onNavigate('analyze')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B57] hover:bg-[#ff553e] text-white transition-all duration-150 shadow-sm shadow-[#FF6B57]/25 flex items-center gap-2 active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Analyze New Ticket</span>
          </button>
        </div>
      </div>

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tickets */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAF0] shadow-xs hover:border-[#CBD5E1] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#667085]">Total Tickets</span>
            <div className="w-8 h-8 rounded-lg bg-[#15133B]/5 text-[#15133B] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-[#17203A]">1,248</div>
            <div className="text-xs font-semibold text-[#18A779] flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>↑ 12.5%</span>
              <span className="text-[#667085] font-normal">from last month</span>
            </div>
          </div>
        </div>

        {/* High Priority */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAF0] shadow-xs hover:border-[#CBD5E1] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#667085]">High Priority</span>
            <div className="w-8 h-8 rounded-lg bg-[#F04444]/10 text-[#F04444] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-[#F04444]">321</div>
            <div className="text-xs font-semibold text-[#F04444] flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>↑ 8.7%</span>
              <span className="text-[#667085] font-normal">in triage queue</span>
            </div>
          </div>
        </div>

        {/* Average Response Time */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAF0] shadow-xs hover:border-[#CBD5E1] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#667085]">Average Response Time</span>
            <div className="w-8 h-8 rounded-lg bg-[#15133B]/5 text-[#15133B] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-[#17203A]">2h 18m</div>
            <div className="text-xs font-semibold text-[#18A779] flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>42m faster</span>
              <span className="text-[#667085] font-normal">than SLA</span>
            </div>
          </div>
        </div>

        {/* AI Classification Accuracy */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAF0] shadow-xs hover:border-[#CBD5E1] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#667085]">AI Classification Accuracy</span>
            <div className="w-8 h-8 rounded-lg bg-[#18A779]/10 text-[#18A779] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-[#18A779]">94.2%</div>
            <div className="text-xs text-[#667085] mt-1 font-normal">
              Based on 1,248 automated classifications
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Ticket Volume & Priority Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Volume (Clickable to Analytics) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAF0]/80">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#15133B]">Ticket Volume</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#18A779]/10 text-[#18A779]">
                  Live Stream
                </span>
              </div>
              <p className="text-xs text-[#667085] mt-0.5">Automated vs manual triage daily load</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-[#F7F8FC] p-0.5 rounded-lg border border-[#E8EAF0] text-xs font-semibold">
                <button
                  onClick={() => setVolumeTimeRange('7d')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    volumeTimeRange === '7d' ? 'bg-white text-[#15133B] shadow-xs' : 'text-[#667085]'
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setVolumeTimeRange('30d')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    volumeTimeRange === '30d' ? 'bg-white text-[#15133B] shadow-xs' : 'text-[#667085]'
                  }`}
                >
                  30 Days
                </button>
              </div>

              <button
                id="volume-to-analytics-btn"
                onClick={() => onNavigate('analytics')}
                className="text-xs text-[#667085] hover:text-[#15133B] font-semibold p-1.5 rounded-lg hover:bg-[#F7F8FC] flex items-center gap-1"
                title="View full analytics"
              >
                <span>Full Trends</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="mt-6">
            <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2">
              {volumeData.map((item, idx) => {
                const heightPercent = Math.round((item.count / 260) * 100);
                const automatedPercent = Math.round((item.automated / item.count) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[11px] font-bold text-[#17203A] opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.count}
                    </div>
                    <div className="w-full bg-[#F7F8FC] rounded-lg h-36 flex items-end p-1 relative overflow-hidden group-hover:bg-[#F0F2F8] transition-colors">
                      <div
                        className="w-full bg-[#15133B] rounded-md transition-all duration-300 relative group-hover:bg-[#25225E]"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <div
                          className="w-full bg-[#FF6B57] rounded-t-md transition-all opacity-80"
                          style={{ height: `${100 - automatedPercent}%` }}
                          title={`Manual escalation: ${item.count - item.automated}`}
                        />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#667085]">{item.day}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8EAF0] flex items-center justify-between text-xs text-[#667085]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#15133B]" />
                  <span>AI Automated Triage (94.2%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#FF6B57]" />
                  <span>Manual Escalation (5.8%)</span>
                </div>
              </div>
              <span className="font-semibold text-[#17203A]">Weekly Average: 178 tickets/day</span>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EAF0]/80">
              <h3 className="text-sm font-bold text-[#15133B]">Priority Distribution</h3>
              <span className="text-xs font-mono font-semibold text-[#667085]">Total: 1,248</span>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#F04444] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F04444]" />
                    Critical
                  </span>
                  <span className="font-semibold text-[#17203A]">94 (7.5%)</span>
                </div>
                <div className="w-full bg-[#F7F8FC] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#F04444] h-full rounded-full" style={{ width: '7.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#F04444] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F04444]/80" />
                    High Priority
                  </span>
                  <span className="font-semibold text-[#17203A]">321 (25.7%)</span>
                </div>
                <div className="w-full bg-[#F7F8FC] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#F04444]/80 h-full rounded-full" style={{ width: '25.7%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#F59E0B] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    Medium Priority
                  </span>
                  <span className="font-semibold text-[#17203A]">542 (43.4%)</span>
                </div>
                <div className="w-full bg-[#F7F8FC] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '43.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#3B82F6] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    Low Priority
                  </span>
                  <span className="font-semibold text-[#17203A]">291 (23.4%)</span>
                </div>
                <div className="w-full bg-[#F7F8FC] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: '23.4%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8EAF0] bg-[#F7F8FC] p-3 rounded-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#667085]">AI Routing Confidence:</span>
              <span className="font-bold text-[#18A779]">95.1% Avg</span>
            </div>
            <p className="text-[11px] text-[#667085] mt-1">
              Tickets classified High or Critical automatically trigger SMS and Slack alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Ticket Categories Quick Section (Interacts -> Categories page) */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EAF0]/80">
          <div>
            <h3 className="text-sm font-bold text-[#15133B]">Ticket Categories</h3>
            <p className="text-xs text-[#667085] mt-0.5">
              Active taxonomy distributions and model confidence rates
            </p>
          </div>
          <button
            id="dashboard-view-all-categories-btn"
            onClick={() => onNavigate('categories')}
            className="text-xs text-[#15133B] hover:text-[#FF6B57] font-bold flex items-center gap-1 transition-colors"
          >
            <span>Manage Taxonomy</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              id={`dashboard-category-${cat.id}`}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(cat);
                } else {
                  onNavigate('categories');
                }
              }}
              className="p-4 rounded-xl bg-[#F7F8FC] hover:bg-[#F0F2F8] border border-[#E8EAF0] cursor-pointer transition-all hover:scale-[1.01] group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#17203A] group-hover:text-[#15133B]">{cat.name}</span>
                <span className="text-[11px] font-bold text-[#18A779]">{cat.confidence}%</span>
              </div>
              <div className="text-base font-extrabold text-[#15133B] mt-1.5">{cat.ticketCount}</div>
              <p className="text-[11px] text-[#667085] truncate mt-0.5">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tickets Table Section */}
      <div className="bg-white rounded-2xl border border-[#E8EAF0] shadow-xs overflow-hidden">
        <div className="p-6 pb-4 border-b border-[#E8EAF0] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#15133B]">Recent Tickets</h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#15133B]/5 text-[#15133B]">
                {filteredTickets.length} Items
              </span>
            </div>
            <p className="text-xs text-[#667085] mt-0.5">
              Real-time classification log and agent routing queue
            </p>
          </div>

          <button
            id="dashboard-view-history-btn"
            onClick={() => onNavigate('history')}
            className="text-xs text-[#15133B] hover:text-[#FF6B57] font-bold flex items-center gap-1 transition-colors"
          >
            <span>View Full History</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FC] text-[#667085] uppercase tracking-wider text-[10px] font-bold border-b border-[#E8EAF0]">
              <tr>
                <th className="py-3 px-5">Ticket ID</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5">Subject</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Priority</th>
                <th className="py-3 px-5">AI Confidence</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAF0]">
              {filteredTickets.slice(0, 6).map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className="hover:bg-[#F7F8FC]/80 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-5 font-mono font-bold text-[#15133B] group-hover:text-[#FF6B57]">
                    {ticket.id}
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-[#17203A]">{ticket.customerName}</div>
                    <div className="text-[11px] text-[#667085] truncate max-w-[140px]">{ticket.customerCompany}</div>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="font-medium text-[#17203A] max-w-xs truncate">{ticket.subject}</div>
                    <div className="text-[11px] text-[#667085] truncate max-w-xs">{ticket.body}</div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="font-medium px-2 py-1 rounded-md bg-[#15133B]/5 text-[#15133B] border border-[#15133B]/10">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`font-bold px-2 py-0.5 rounded-full border text-[11px] ${getPriorityBadge(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1.5 font-bold text-[#18A779]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#18A779]" />
                      {ticket.aiConfidence}%
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`font-semibold px-2 py-0.5 rounded-full border text-[11px] ${getStatusBadge(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right font-mono text-[#667085] text-[11px]">
                    {ticket.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
