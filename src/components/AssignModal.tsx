import { useState } from 'react';
import { X, UserCheck, Shield, Check } from 'lucide-react';
import { Ticket, TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/mockData';

interface AssignModalProps {
  ticket: Ticket | null;
  onClose: () => void;
  onAssign: (ticketId: string, member: TeamMember) => void;
}

export function AssignModal({ ticket, onClose, onAssign }: AssignModalProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    TEAM_MEMBERS.find((m) => m.name === ticket?.assignedTo)?.id || TEAM_MEMBERS[0].id
  );

  if (!ticket) return null;

  const handleConfirm = () => {
    const member = TEAM_MEMBERS.find((m) => m.id === selectedMemberId);
    if (member) {
      onAssign(ticket.id, member);
      onClose();
    }
  };

  return (
    <div
      id="assign-modal-backdrop"
      className="fixed inset-0 bg-[#15133B]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="assign-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full border border-[#E8EAF0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#E8EAF0] flex items-center justify-between bg-[#F7F8FC]/60">
          <div>
            <h3 className="text-sm font-bold text-[#15133B]">Assign Support Agent</h3>
            <p className="text-xs text-[#667085] mt-0.5">
              Routing ticket <span className="font-mono font-bold text-[#17203A]">{ticket.id}</span> ({ticket.category})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#667085] hover:text-[#17203A] p-1.5 rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
            Available Specialists & Queues
          </p>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {TEAM_MEMBERS.map((member) => {
              const isSelected = selectedMemberId === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#FF6B57] bg-[#FF6B57]/5 ring-1 ring-[#FF6B57]'
                      : 'border-[#E8EAF0] hover:bg-[#F7F8FC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#17203A]">{member.name}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            member.status === 'Online'
                              ? 'bg-[#18A779]'
                              : member.status === 'Busy'
                              ? 'bg-[#F04444]'
                              : 'bg-[#F59E0B]'
                          }`}
                        />
                      </div>
                      <div className="text-[11px] text-[#667085]">{member.role} • {member.team}</div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <span className="text-[11px] font-medium text-[#667085] bg-white px-2 py-0.5 rounded border border-[#E8EAF0]">
                      {member.assignedCount} active
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#15133B] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8EAF0] bg-[#F7F8FC] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#17203A] hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B57] hover:bg-[#ff553e] text-white transition-all shadow-sm shadow-[#FF6B57]/20 active:scale-[0.98]"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
