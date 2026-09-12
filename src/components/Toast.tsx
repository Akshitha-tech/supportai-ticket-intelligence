import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E8EAF0] shadow-lg shadow-[#15133B]/5 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' && (
            <div className="w-8 h-8 rounded-lg bg-[#18A779]/10 text-[#18A779] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
          {toast.type === 'error' && (
            <div className="w-8 h-8 rounded-lg bg-[#F04444]/10 text-[#F04444] flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
          {toast.type === 'info' && (
            <div className="w-8 h-8 rounded-lg bg-[#15133B]/10 text-[#15133B] flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
          )}

          <div className="flex-1 min-w-0 pt-0.5">
            <h4 className="text-sm font-semibold text-[#17203A]">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-[#667085] mt-0.5 leading-relaxed">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#667085] hover:text-[#17203A] p-1 rounded-md hover:bg-[#F7F8FC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
