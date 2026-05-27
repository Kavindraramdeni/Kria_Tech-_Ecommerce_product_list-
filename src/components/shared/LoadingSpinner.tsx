import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'text-indigo-600',
  fullScreen = false
}) => {
  const sizes = {
    sm: 16,
    md: 32,
    lg: 48,
    xl: 64
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 size={sizes[size]} className={color} />
      </motion.div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 animate-pulse">Loading</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-white/80 dark:bg-gray-950/80 backdrop-blur-md flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="p-12 w-full flex items-center justify-center">{content}</div>;
};
