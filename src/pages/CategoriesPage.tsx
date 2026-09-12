import { useState } from 'react';
import {
  Tag,
  Plus,
  Percent,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { CategoryItem } from '../types';

interface CategoriesPageProps {
  categories: CategoryItem[];
  onSelectCategory: (category: CategoryItem) => void;
  onOpenAddModal: () => void;
}

export function CategoriesPage({
  categories,
  onSelectCategory,
  onOpenAddModal,
}: CategoriesPageProps) {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in-50 duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#15133B] tracking-tight">Categories</h1>
          <p className="text-xs text-[#667085] mt-1">
            Manage the ticket classification taxonomy.
          </p>
        </div>

        <button
          id="add-category-btn"
          onClick={onOpenAddModal}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B57] hover:bg-[#ff553e] text-white shadow-sm shadow-[#FF6B57]/20 flex items-center gap-2 transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Taxonomy Registry Header */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8EAF0] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#15133B]/5 text-[#15133B] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#15133B]">
              Taxonomy Registry ({categories.length})
            </h2>
            <p className="text-[11px] text-[#667085]">
              Active NLP classification targets with auto-routing policies
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#18A779]/10 text-[#18A779] border border-[#18A779]/20 hidden sm:inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          All models synced
        </span>
      </div>

      {/* Grid of Clickable Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            id={`category-card-${cat.id}`}
            onClick={() => onSelectCategory(cat)}
            className="bg-white p-5 rounded-2xl border border-[#E8EAF0] shadow-xs hover:border-[#15133B]/40 hover:shadow-md transition-all duration-150 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Category Icon & Ticket Count */}
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-xs shadow-xs"
                  style={{ backgroundColor: cat.color }}
                >
                  <Tag className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-[#17203A] block">
                    {cat.ticketCount}
                  </span>
                  <span className="text-[10px] text-[#667085] uppercase tracking-wider font-semibold">
                    tickets
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-4">
                <h3 className="text-sm font-bold text-[#15133B] group-hover:text-[#FF6B57] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#667085] mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="mt-5 pt-3 border-t border-[#E8EAF0]/80">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F7F8FC] p-2 rounded-lg">
                  <span className="text-[10px] text-[#667085] font-semibold block">Confidence</span>
                  <span className="font-bold text-[#18A779] text-xs">{cat.confidence}%</span>
                </div>
                <div className="bg-[#F7F8FC] p-2 rounded-lg">
                  <span className="text-[10px] text-[#667085] font-semibold block">Accuracy</span>
                  <span className="font-bold text-[#15133B] text-xs">{cat.accuracy}%</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-[#667085] font-medium group-hover:text-[#15133B] transition-colors">
                <span className="truncate max-w-[150px]">{cat.assignedTeam}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
