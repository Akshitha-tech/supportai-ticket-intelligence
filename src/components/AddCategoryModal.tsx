import { useState, FormEvent } from 'react';
import { X, Tag, Plus } from 'lucide-react';
import { CategoryItem } from '../types';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCategory: Omit<CategoryItem, 'id' | 'ticketCount' | 'confidence' | 'accuracy'>) => void;
}

export function AddCategoryModal({ isOpen, onClose, onSave }: AddCategoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('Tier 1 Support Generalists');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category Name is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      color: '#15133B',
      assignedTeam,
      slaHours: 4,
      sampleKeywords: [name.toLowerCase(), 'support', 'inquiry'],
    });

    setName('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <div
      id="add-category-modal-backdrop"
      className="fixed inset-0 bg-[#15133B]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="add-category-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full border border-[#E8EAF0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#E8EAF0] flex items-center justify-between bg-[#F7F8FC]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#15133B] text-white flex items-center justify-center">
              <Tag className="w-4 h-4 text-[#FF6B57]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#15133B]">Add New Category</h3>
              <p className="text-xs text-[#667085]">Register a new taxonomy class into the AI model</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#667085] hover:text-[#17203A] p-1.5 rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 text-xs text-[#F04444] bg-[#F04444]/10 border border-[#F04444]/20 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="cat-name-input" className="block text-xs font-bold text-[#17203A] mb-1.5">
                Category Name *
              </label>
              <input
                id="cat-name-input"
                type="text"
                placeholder="e.g. Compliance & Audits"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-3.5 py-2 text-xs text-[#17203A] placeholder-[#667085] bg-[#F7F8FC] focus:bg-white border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="cat-desc-input" className="block text-xs font-bold text-[#17203A] mb-1.5">
                Description *
              </label>
              <textarea
                id="cat-desc-input"
                rows={3}
                placeholder="e.g. Inquiries regarding regulatory disclosures, vendor assessments, GDPR..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-3.5 py-2 text-xs text-[#17203A] placeholder-[#667085] bg-[#F7F8FC] focus:bg-white border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label htmlFor="cat-team-select" className="block text-xs font-bold text-[#17203A] mb-1.5">
                Default Assigned Team
              </label>
              <select
                id="cat-team-select"
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className="w-full px-3.5 py-2 text-xs text-[#17203A] bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
              >
                <option value="Tier 1 Support Generalists">Tier 1 Support Generalists</option>
                <option value="Tier 2 Billing Operations">Tier 2 Billing Operations</option>
                <option value="Tier 3 Engineering Escalations">Tier 3 Engineering Escalations</option>
                <option value="Identity & Access Support">Identity & Access Support</option>
                <option value="SecOps Incident Team">SecOps Incident Team</option>
                <option value="Customer Success & Renewals">Customer Success & Renewals</option>
                <option value="Logistics & Dispatch">Logistics & Dispatch</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#E8EAF0] bg-[#F7F8FC] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#17203A] hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              id="save-category-btn"
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B57] hover:bg-[#ff553e] text-white transition-all shadow-sm shadow-[#FF6B57]/20 flex items-center gap-1.5 active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
