import { useState } from 'react';
import { PageId, Ticket, CategoryItem, TeamMember } from './types';
import { INITIAL_TICKETS, INITIAL_CATEGORIES } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ToastContainer, ToastMessage } from './components/Toast';
import { TicketDetailModal } from './components/TicketDetailModal';
import { AssignModal } from './components/AssignModal';
import { AddCategoryModal } from './components/AddCategoryModal';
import { CategoryDetailModal } from './components/CategoryDetailModal';
import { QueueFilterModal } from './components/QueueFilterModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzeTicketPage } from './pages/AnalyzeTicketPage';
import { TicketHistoryPage } from './pages/TicketHistoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);

  // Modals state
  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState<Ticket | null>(null);
  const [selectedTicketForAssign, setSelectedTicketForAssign] = useState<Ticket | null>(null);
  const [selectedCategoryForDetail, setSelectedCategoryForDetail] = useState<CategoryItem | null>(null);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isQueueFilterOpen, setIsQueueFilterOpen] = useState(false);
  const [activeQueueFilter, setActiveQueueFilter] = useState('all');

  // Search query propagated from topbar to history
  const [historySearchQuery, setHistorySearchQuery] = useState('');

  // Toast Notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Ticket status toggle (Resolve / Re-open)
  const handleResolveTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const newStatus = t.status === 'Resolved' ? 'Open' : 'Resolved';
          addToast(
            newStatus === 'Resolved' ? `Ticket ${ticketId} Resolved` : `Ticket ${ticketId} Re-Opened`,
            newStatus === 'Resolved'
              ? 'Status marked as Resolved. SLA record logged.'
              : 'Ticket moved back to active triage queue.',
            'success'
          );
          return { ...t, status: newStatus };
        }
        return t;
      })
    );

    // Update modal if currently viewing this ticket
    if (selectedTicketForDetail && selectedTicketForDetail.id === ticketId) {
      setSelectedTicketForDetail((prev) =>
        prev ? { ...prev, status: prev.status === 'Resolved' ? 'Open' : 'Resolved' } : null
      );
    }
  };

  // Re-assign ticket
  const handleAssignMember = (ticketId: string, member: TeamMember) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            assignedTo: member.name,
            assignedTeam: member.team,
          };
        }
        return t;
      })
    );

    if (selectedTicketForDetail && selectedTicketForDetail.id === ticketId) {
      setSelectedTicketForDetail((prev) =>
        prev ? { ...prev, assignedTo: member.name, assignedTeam: member.team } : null
      );
    }

    addToast(
      'Agent Assigned',
      `Ticket ${ticketId} assigned to ${member.name} (${member.team}).`,
      'success'
    );
  };

  // Add new ticket from Analyze Ticket page
  const handleAddTicket = (newTicket: Ticket) => {
    setTickets((prev) => [newTicket, ...prev]);

    // Update category ticket count if matching
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.name.toLowerCase() === newTicket.category.toLowerCase()) {
          return { ...cat, ticketCount: cat.ticketCount + 1 };
        }
        return cat;
      })
    );

    addToast(
      'Ticket Logged to History',
      `New ticket ${newTicket.id} (${newTicket.category}) logged to active queue.`,
      'success'
    );
  };

  // Add new Category
  const handleAddCategory = (newCat: Omit<CategoryItem, 'id' | 'ticketCount' | 'confidence' | 'accuracy'>) => {
    const createdCategory: CategoryItem = {
      ...newCat,
      id: `cat-${newCat.name.toLowerCase().replace(/\s+/g, '-')}`,
      ticketCount: 0,
      confidence: 93.5,
      accuracy: 89,
    };

    setCategories((prev) => [...prev, createdCategory]);
    setIsAddCategoryOpen(false);
    addToast(
      'Category Added',
      `Taxonomy class "${createdCategory.name}" registered and deployed to inference pipeline.`,
      'success'
    );
  };

  const openTicketsCount = tickets.filter((t) => t.status !== 'Resolved').length;

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex text-[#17203A] font-sans antialiased">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openTicketsCount={openTicketsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Consistent Top Bar */}
        <TopBar
          tickets={tickets}
          onSelectTicket={(ticket) => setSelectedTicketForDetail(ticket)}
          onNavigate={(page) => setCurrentPage(page)}
          onSearchSubmit={(query) => {
            setHistorySearchQuery(query);
            setCurrentPage('history');
          }}
        />

        {/* Page Views */}
        <main className="flex-1 pb-16">
          {currentPage === 'dashboard' && (
            <DashboardPage
              tickets={tickets}
              categories={categories}
              onNavigate={(page) => setCurrentPage(page)}
              onSelectTicket={(ticket) => setSelectedTicketForDetail(ticket)}
              onSelectCategory={(cat) => setSelectedCategoryForDetail(cat)}
              onOpenFilterQueues={() => setIsQueueFilterOpen(true)}
              activeQueueFilter={activeQueueFilter}
            />
          )}

          {currentPage === 'analyze' && (
            <AnalyzeTicketPage
              onAddTicketToHistory={handleAddTicket}
              onNavigateToHistory={() => setCurrentPage('history')}
            />
          )}

          {currentPage === 'history' && (
            <TicketHistoryPage
              tickets={tickets}
              onViewTicket={(ticket) => setSelectedTicketForDetail(ticket)}
              onAssignTicket={(ticket) => setSelectedTicketForAssign(ticket)}
              onResolveTicket={handleResolveTicket}
              onShowToast={addToast}
              initialSearchQuery={historySearchQuery}
            />
          )}

          {currentPage === 'analytics' && (
            <AnalyticsPage categories={categories} />
          )}

          {currentPage === 'categories' && (
            <CategoriesPage
              categories={categories}
              onSelectCategory={(cat) => setSelectedCategoryForDetail(cat)}
              onOpenAddModal={() => setIsAddCategoryOpen(true)}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsPage onShowToast={addToast} />
          )}

          {currentPage === 'about' && (
            <AboutPage onNavigate={(page) => setCurrentPage(page)} />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <TicketDetailModal
        ticket={selectedTicketForDetail}
        onClose={() => setSelectedTicketForDetail(null)}
        onResolveToggle={handleResolveTicket}
        onOpenAssign={(ticket) => {
          setSelectedTicketForDetail(null);
          setSelectedTicketForAssign(ticket);
        }}
      />

      <AssignModal
        ticket={selectedTicketForAssign}
        onClose={() => setSelectedTicketForAssign(null)}
        onAssign={handleAssignMember}
      />

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSave={handleAddCategory}
      />

      <CategoryDetailModal
        category={selectedCategoryForDetail}
        tickets={tickets}
        onClose={() => setSelectedCategoryForDetail(null)}
        onSelectTicket={(ticket) => {
          setSelectedCategoryForDetail(null);
          setSelectedTicketForDetail(ticket);
        }}
      />

      <QueueFilterModal
        isOpen={isQueueFilterOpen}
        onClose={() => setIsQueueFilterOpen(false)}
        currentFilter={activeQueueFilter}
        onApplyFilter={(filter) => {
          setActiveQueueFilter(filter);
          addToast(
            'Queue Filter Applied',
            filter === 'all' ? 'Showing all incoming queues' : `Filtered to: ${filter}`,
            'info'
          );
        }}
      />

      {/* Enterprise Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
