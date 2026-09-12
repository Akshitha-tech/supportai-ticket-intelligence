import { X, Tag, Ticket as TicketIcon, Percent, Clock, Users, ArrowRight } from 'lucide-react';
import { CategoryItem, Ticket } from '../types';

interface CategoryDetailModalProps {
  category: CategoryItem | null;
  tickets: Ticket[];
  onClose: () => void;
  onSelectTicket: (ticket: Ticket) => void;
}

export function CategoryDetailModal({
  category,
  tickets,
  onClose,
  onSelectTicket,
}: CategoryDetailModalProps) {
  if (!category) return null;

  const categoryTickets = tickets.filter(
    (t) => t.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <div
      id="category-detail-modal-backdrop"
      className="fixed inset-0 bg-[#15133B]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="category-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full border border-[#E8EAF0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8EAF0] flex items-center justify-between bg-[#F7F8FC]/60">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-sm shadow-sm"
              style={{ backgroundColor: category.color }}
            >
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#15133B]">{category.name}</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-[#667085] border border-[#E8EAF0]">
                  cat-{category.name.toLowerCase().replace(/\s+/g, '-')}
                </span>
              </div>
              <p className="text-xs text-[#667085] mt-0.5">{category.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#667085] hover:text-[#17203A] p-1.5 rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F7F8FC] p-3.5 rounded-xl border border-[#E8EAF0]">
              <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                <TicketIcon className="w-3.5 h-3.5" />
                <span>Total Ingested</span>
              </div>
              <p className="text-lg font-bold text-[#17203A] mt-1">{category.ticketCount} tickets</p>
            </div>

            <div className="bg-[#F7F8FC] p-3.5 rounded-xl border border-[#E8EAF0]">
              <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                <Percent className="w-3.5 h-3.5 text-[#18A779]" />
                <span>AI Confidence</span>
              </div>
              <p className="text-lg font-bold text-[#18A779] mt-1">{category.confidence}%</p>
            </div>

            <div className="bg-[#F7F8FC] p-3.5 rounded-xl border border-[#E8EAF0]">
              <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                <Percent className="w-3.5 h-3.5 text-[#15133B]" />
                <span>Model Accuracy</span>
              </div>
              <p className="text-lg font-bold text-[#15133B] mt-1">{category.accuracy}%</p>
            </div>
          </div>

          {/* Operational Parameters */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E8EAF0]">
            <h4 className="text-xs font-bold text-[#17203A] uppercase tracking-wider text-[#667085]">
              Routing Parameters
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#15133B]" />
                <div>
                  <span className="text-[#667085] block text-[11px]">Assigned Queue</span>
                  <span className="font-semibold text-[#17203A]">{category.assignedTeam}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#15133B]" />
                <div>
                  <span className="text-[#667085] block text-[11px]">Target Resolution SLA</span>
                  <span className="font-semibold text-[#17203A]">{category.slaHours} hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Trigger Keywords */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2">
              Model Inference Trigger Keywords
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {category.sampleKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#F7F8FC] border border-[#E8EAF0] text-[#15133B] font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Associated Tickets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                Active Sample Tickets in this Category ({categoryTickets.length})
              </h4>
            </div>

            {categoryTickets.length === 0 ? (
              <p className="text-xs text-[#667085] italic py-2">No active tickets currently in this category.</p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {categoryTickets.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onClose();
                      onSelectTicket(t);
                    }}
                    className="p-2.5 bg-[#F7F8FC] hover:bg-[#E8EAF0]/60 rounded-xl border border-[#E8EAF0] cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#15133B]">{t.id}</span>
                        <span className="text-xs font-semibold text-[#17203A] truncate">{t.customerName}</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            t.priority === 'High' || t.priority === 'Critical'
                              ? 'bg-[#F04444]/10 text-[#F04444]'
                              : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </div>
                      <p className="text-xs text-[#667085] truncate mt-0.5">{t.subject}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#15133B] transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8EAF0] bg-[#F7F8FC] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#15133B] text-white hover:bg-[#25225E] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
