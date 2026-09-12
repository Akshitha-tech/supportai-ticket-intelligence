import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Eye,
  UserCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  X,
} from 'lucide-react';
import { Ticket, TicketPriority, TicketStatus } from '../types';

interface TicketHistoryPageProps {
  tickets: Ticket[];
  onViewTicket: (ticket: Ticket) => void;
  onAssignTicket: (ticket: Ticket) => void;
  onResolveTicket: (ticketId: string) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  initialSearchQuery?: string;
}

export function TicketHistoryPage({
  tickets,
  onViewTicket,
  onAssignTicket,
  onResolveTicket,
  onShowToast,
  initialSearchQuery = '',
}: TicketHistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [showFilterControls, setShowFilterControls] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'confidence-desc' | 'priority-desc'>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter & sort logic
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.customerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.extractedKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
      const matchStatus = statusFilter === 'All' || t.status === statusFilter;

      return matchSearch && matchCategory && matchPriority && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'date-asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'confidence-desc') {
        return b.aiConfidence - a.aiConfidence;
      }
      if (sortBy === 'priority-desc') {
        const priorityWeight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      return 0;
    });
  }, [tickets, searchQuery, categoryFilter, priorityFilter, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / itemsPerPage));
  const currentItems = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => {
    // Generate actual CSV content
    const headers = ['Ticket ID', 'Customer', 'Company', 'Subject', 'Category', 'Priority', 'AI Confidence', 'Assigned To', 'Status', 'Created At'];
    const rows = filteredTickets.map((t) => [
      t.id,
      `"${t.customerName}"`,
      `"${t.customerCompany}"`,
      `"${t.subject.replace(/"/g, '""')}"`,
      t.category,
      t.priority,
      `${t.aiConfidence}%`,
      `"${t.assignedTo}"`,
      t.status,
      t.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `supportai_ticket_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast(
      'Export Complete',
      `Exported ${filteredTickets.length} tickets to CSV format successfully.`,
      'success'
    );
  };

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

  const categories = ['All', 'Billing', 'Technical Issue', 'Account', 'Delivery', 'General Query', 'Security', 'Subscription', 'Other'];
  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const statuses = ['All', 'Open', 'In Progress', 'Resolved'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in-50 duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#15133B] tracking-tight">Ticket History</h1>
          <p className="text-xs text-[#667085] mt-1">
            View, filter and manage previously analyzed support tickets.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            id="history-filter-btn"
            onClick={() => setShowFilterControls((prev) => !prev)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border shadow-xs flex items-center gap-2 transition-all ${
              showFilterControls
                ? 'bg-[#15133B] text-white border-[#15133B]'
                : 'bg-white hover:bg-[#F7F8FC] text-[#17203A] border-[#E8EAF0]'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
            {(categoryFilter !== 'All' || priorityFilter !== 'All' || statusFilter !== 'All') && (
              <span className="w-2 h-2 rounded-full bg-[#FF6B57]" />
            )}
          </button>

          <button
            id="history-export-btn"
            onClick={handleExport}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#F7F8FC] text-[#17203A] border border-[#E8EAF0] shadow-xs flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#15133B]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8EAF0] shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5 pointer-events-none" />
            <input
              id="history-search-input"
              type="text"
              placeholder="Search by ID, customer, keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#F7F8FC] focus:bg-white border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-2.5 text-[#667085] hover:text-[#17203A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          {showFilterControls && (
            <>
              <div>
                <select
                  id="history-category-filter"
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      Category: {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <select
                  id="history-priority-filter"
                  value={priorityFilter}
                  onChange={(e) => {
                    setPriorityFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                >
                  {priorities.map((p) => (
                    <option key={p} value={p}>
                      Priority: {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <select
                  id="history-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                >
                  <option value="date-desc">Sort: Newest First</option>
                  <option value="date-asc">Sort: Oldest First</option>
                  <option value="confidence-desc">Sort: Highest Confidence</option>
                  <option value="priority-desc">Sort: Highest Priority</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Status Quick Pills */}
        {showFilterControls && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8EAF0]/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mr-1">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-[#15133B] text-white'
                    : 'bg-[#F7F8FC] text-[#667085] hover:bg-[#E8EAF0] hover:text-[#17203A]'
                }`}
              >
                {st}
              </button>
            ))}
            <span className="ml-auto text-xs text-[#667085]">
              Showing <strong className="text-[#17203A]">{filteredTickets.length}</strong> of {tickets.length} tickets
            </span>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-[#E8EAF0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FC] text-[#667085] uppercase tracking-wider text-[10px] font-bold border-b border-[#E8EAF0]">
              <tr>
                <th className="py-3 px-5">Ticket ID</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5">Subject</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Priority</th>
                <th className="py-3 px-5">Confidence</th>
                <th className="py-3 px-5">Assigned To</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Created</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAF0]">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-[#667085]">
                    <div className="max-w-xs mx-auto">
                      <Layers className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
                      <p className="text-xs font-bold text-[#17203A]">No tickets match the selected filters</p>
                      <p className="text-[11px] text-[#667085] mt-1">Try resetting the search query or category filters.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setCategoryFilter('All');
                          setPriorityFilter('All');
                          setStatusFilter('All');
                        }}
                        className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#15133B]/5 text-[#15133B] hover:bg-[#15133B]/10 transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-[#F7F8FC]/70 transition-colors group"
                  >
                    <td className="py-3.5 px-5 font-mono font-bold text-[#15133B]">
                      {ticket.id}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-[#17203A]">{ticket.customerName}</div>
                      <div className="text-[11px] text-[#667085] truncate max-w-[130px]">{ticket.customerCompany}</div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="font-medium text-[#17203A] max-w-xs truncate">{ticket.subject}</div>
                      <div className="text-[11px] text-[#667085] truncate max-w-xs">{ticket.body}</div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="font-medium px-2 py-0.5 rounded-md bg-[#15133B]/5 text-[#15133B] border border-[#15133B]/10">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`font-bold px-2 py-0.5 rounded-full border text-[11px] ${getPriorityBadge(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1 font-bold text-[#18A779]">
                        <span>{ticket.aiConfidence}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="font-medium text-[#17203A] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#15133B] text-white flex items-center justify-center font-bold text-[9px]">
                          {ticket.assignedTo.split(' ').map((n) => n[0]).join('')}
                        </span>
                        <span className="truncate max-w-[100px]">{ticket.assignedTo}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`font-semibold px-2 py-0.5 rounded-full border text-[11px] ${getStatusBadge(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-[#667085] text-[11px]">
                      {ticket.createdAt}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Action */}
                        <button
                          title="View Details"
                          onClick={() => onViewTicket(ticket)}
                          className="p-1.5 rounded-lg text-[#667085] hover:text-[#15133B] hover:bg-white border border-transparent hover:border-[#E8EAF0] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Assign Action */}
                        <button
                          title="Assign Agent"
                          onClick={() => onAssignTicket(ticket)}
                          className="p-1.5 rounded-lg text-[#667085] hover:text-[#15133B] hover:bg-white border border-transparent hover:border-[#E8EAF0] transition-colors"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>

                        {/* Resolve Action */}
                        <button
                          title={ticket.status === 'Resolved' ? 'Ticket Resolved' : 'Resolve Ticket'}
                          onClick={() => onResolveTicket(ticket.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            ticket.status === 'Resolved'
                              ? 'text-[#18A779] bg-[#18A779]/10 border-[#18A779]/20'
                              : 'text-[#667085] hover:text-[#18A779] hover:bg-[#18A779]/10 hover:border-[#18A779]/20'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-[#E8EAF0] bg-[#F7F8FC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-[#667085]">
            Page {currentPage} of {totalPages} ({filteredTickets.length} total entries)
          </span>

          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button
              id="history-prev-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 transition-all ${
                currentPage === 1
                  ? 'bg-white text-[#CBD5E1] border-[#E8EAF0] cursor-not-allowed'
                  : 'bg-white text-[#17203A] border-[#E8EAF0] hover:bg-[#F0F2F8]'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-[#15133B] text-white shadow-xs'
                    : 'bg-white text-[#667085] border border-[#E8EAF0] hover:bg-[#F0F2F8] hover:text-[#17203A]'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              id="history-next-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 transition-all ${
                currentPage === totalPages
                  ? 'bg-white text-[#CBD5E1] border-[#E8EAF0] cursor-not-allowed'
                  : 'bg-white text-[#17203A] border-[#E8EAF0] hover:bg-[#F0F2F8]'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
