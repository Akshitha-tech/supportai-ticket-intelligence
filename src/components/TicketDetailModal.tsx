import {
  X,
  User,
  Building,
  Mail,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Send,
  Tag,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { Ticket } from '../types';

interface TicketDetailModalProps {
  ticket: Ticket | null;
  onClose: () => void;
  onResolveToggle: (ticketId: string) => void;
  onOpenAssign: (ticket: Ticket) => void;
}

export function TicketDetailModal({
  ticket,
  onClose,
  onResolveToggle,
  onOpenAssign,
}: TicketDetailModalProps) {
  if (!ticket) return null;

  const isResolved = ticket.status === 'Resolved';

  const getPriorityStyle = (priority: string) => {
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
        return 'bg-slate-100 text-[#667085] border-[#E8EAF0]';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-[#18A779]/10 text-[#18A779] border-[#18A779]/30';
      case 'In Progress':
        return 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20';
      default:
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
    }
  };

  return (
    <div
      id="ticket-detail-modal-backdrop"
      className="fixed inset-0 bg-[#15133B]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="ticket-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-3xl w-full border border-[#E8EAF0] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#E8EAF0] flex items-center justify-between bg-[#F7F8FC]/60">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-bold text-[#15133B] bg-white px-2.5 py-1 rounded-lg border border-[#E8EAF0] shadow-xs">
              {ticket.id}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(
                ticket.status
              )}`}
            >
              {ticket.status}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getPriorityStyle(
                ticket.priority
              )}`}
            >
              {ticket.priority} Priority
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#15133B]/5 text-[#15133B] border border-[#15133B]/10">
              {ticket.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-[#667085] hover:text-[#17203A] p-1.5 rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Customer Quick Meta */}
          <div>
            <h2 className="text-lg font-bold text-[#17203A] tracking-tight">{ticket.subject}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-[#E8EAF0]/80">
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <User className="w-3.5 h-3.5 text-[#15133B]" />
                <span className="font-semibold text-[#17203A]">{ticket.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <Building className="w-3.5 h-3.5 text-[#15133B]" />
                <span className="truncate">{ticket.customerCompany}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <Mail className="w-3.5 h-3.5 text-[#15133B]" />
                <span className="truncate">{ticket.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#667085]">
                <Clock className="w-3.5 h-3.5 text-[#15133B]" />
                <span>{ticket.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Ticket Message Body */}
          <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0]">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-2">
              Customer Message ({ticket.source})
            </h4>
            <p className="text-sm text-[#17203A] leading-relaxed whitespace-pre-line font-normal">
              {ticket.body}
            </p>
          </div>

          {/* AI Intelligence Card (Prominent & Enterprise) */}
          <div className="rounded-xl border-2 border-[#15133B]/10 bg-gradient-to-b from-white to-[#F7F8FC]/50 p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E8EAF0]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#15133B] flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
                </div>
                <h3 className="text-sm font-bold text-[#15133B]">SupportAI Inference Analysis</h3>
              </div>
              <div className="flex items-center gap-2 bg-[#18A779]/10 text-[#18A779] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#18A779]/20">
                <span>Confidence:</span>
                <span className="font-bold">{ticket.aiConfidence}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-3 rounded-lg border border-[#E8EAF0]">
                <span className="text-[11px] font-medium text-[#667085]">Predicted Category</span>
                <p className="text-sm font-bold text-[#17203A] mt-0.5">{ticket.category}</p>
                <p className="text-[11px] text-[#667085] mt-1 font-mono">Taxonomy ID: cat-{ticket.category.toLowerCase()}</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-[#E8EAF0]">
                <span className="text-[11px] font-medium text-[#667085]">Predicted Priority</span>
                <p className="text-sm font-bold text-[#F04444] mt-0.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  {ticket.priority}
                </p>
                <p className="text-[11px] text-[#667085] mt-1">SLA Target: {ticket.slaTarget}</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-[#E8EAF0]">
                <span className="text-[11px] font-medium text-[#667085]">Sentiment Assessment</span>
                <p className="text-sm font-bold text-[#17203A] mt-0.5 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      ticket.sentiment.label === 'Positive'
                        ? 'bg-[#18A779]'
                        : ticket.sentiment.label === 'Urgent' || ticket.sentiment.label === 'Negative'
                        ? 'bg-[#F04444]'
                        : 'bg-[#667085]'
                    }`}
                  />
                  {ticket.sentiment.label} (Score: {ticket.sentiment.score > 0 ? `+${ticket.sentiment.score}` : ticket.sentiment.score})
                </p>
                <p className="text-[11px] text-[#667085] mt-1">Tone: Frustration Detected</p>
              </div>
            </div>

            {/* Extracted Keywords */}
            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                Extracted Keywords & Entities
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {ticket.extractedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-white border border-[#E8EAF0] text-[#15133B] font-medium flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-[#FF6B57]" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* NLP Reasoning & Recommendation */}
            <div className="mt-4 space-y-3 pt-3 border-t border-[#E8EAF0]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                  Classification Reason
                </span>
                <p className="text-xs text-[#17203A] mt-1 leading-relaxed bg-white p-2.5 rounded-lg border border-[#E8EAF0]">
                  {ticket.classificationReason}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                  Recommended Action
                </span>
                <p className="text-xs text-[#18A779] font-medium mt-1 leading-relaxed bg-[#18A779]/5 p-2.5 rounded-lg border border-[#18A779]/20">
                  {ticket.recommendedAction}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                  Customer Impact
                </span>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed bg-white p-2.5 rounded-lg border border-[#E8EAF0]">
                  {ticket.customerImpact}
                </p>
              </div>
            </div>
          </div>

          {/* Assignment Info */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#E8EAF0]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#15133B] text-white flex items-center justify-center font-bold text-xs">
                {ticket.assignedTo.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="text-xs font-bold text-[#17203A]">{ticket.assignedTo}</div>
                <div className="text-[11px] text-[#667085]">{ticket.assignedTeam}</div>
              </div>
            </div>

            <button
              onClick={() => onOpenAssign(ticket)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#15133B] bg-[#F7F8FC] hover:bg-[#E8EAF0] border border-[#E8EAF0] transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Reassign Agent
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E8EAF0] bg-[#F7F8FC] flex items-center justify-between">
          <button
            onClick={() => onResolveToggle(ticket.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 ${
              isResolved
                ? 'bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100'
                : 'bg-[#18A779] text-white hover:bg-[#159068] shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isResolved ? 'Mark as Re-Opened' : 'Resolve Ticket'}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#667085] hover:text-[#17203A] hover:bg-white border border-transparent hover:border-[#E8EAF0] transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
