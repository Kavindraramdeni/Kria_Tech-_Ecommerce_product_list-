import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { Toast as ToastType } from '../../hooks/useToast';

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastType; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const variants = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-indigo-600 text-white',
    warning: 'bg-orange-500 text-white',
  };

  const icons = {
    success: <CheckCircle2 size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      className={`pointer-events-auto p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px] max-w-md ${variants[toast.type]}`}
    >
      <div className="bg-white/20 p-2 rounded-xl">
        {icons[toast.type]}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-bold">{toast.message}</p>
      </div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};
