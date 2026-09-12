import { useState } from 'react';
import { X, Filter, Check } from 'lucide-react';

interface QueueFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilter: string;
  onApplyFilter: (filter: string) => void;
}

export function QueueFilterModal({
  isOpen,
  onClose,
  currentFilter,
  onApplyFilter,
}: QueueFilterModalProps) {
  const [selected, setSelected] = useState(currentFilter);

  if (!isOpen) return null;

  const filterOptions = [
    { id: 'all', title: 'All Active Queues', desc: 'Display all incoming and triage queues without restriction' },
    { id: 'high-priority', title: 'High & Critical Priority Only', desc: 'Escalations requiring immediate engineer or billing intervention' },
    { id: 'open-only', title: 'Unresolved / Open Only', desc: 'Hide all resolved tickets to focus on active backlog' },
    { id: 'tier2-billing', title: 'Tier 2 Billing Escalations', desc: 'Refunds, invoices, credit card errors, and chargebacks' },
    { id: 'tier3-eng', title: 'Tier 3 Engineering Outages', desc: 'Cluster outages, API 500s, and memory leaks' },
  ];

  const handleApply = () => {
    onApplyFilter(selected);
    onClose();
  };

  return (
    <div
      id="queue-filter-modal-backdrop"
      className="fixed inset-0 bg-[#15133B]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="queue-filter-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-md w-full border border-[#E8EAF0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        <div className="px-6 py-4.5 border-b border-[#E8EAF0] flex items-center justify-between bg-[#F7F8FC]/60">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#15133B]" />
            <h3 className="text-sm font-bold text-[#15133B]">Filter Dashboard Queues</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#667085] hover:text-[#17203A] p-1.5 rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-2.5">
          {filterOptions.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-[#15133B] bg-[#15133B]/5 ring-1 ring-[#15133B]'
                    : 'border-[#E8EAF0] hover:bg-[#F7F8FC]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-[#17203A]">{opt.title}</div>
                  <div className="text-[11px] text-[#667085] mt-0.5">{opt.desc}</div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#15133B] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-[#E8EAF0] bg-[#F7F8FC] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#17203A] hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#15133B] text-white hover:bg-[#25225E] transition-colors shadow-sm"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
