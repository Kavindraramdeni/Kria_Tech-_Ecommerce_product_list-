import React from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../ui/Button';

interface NotFoundProps {
  onNavigateBack?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigateBack }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-[15rem] md:text-[20rem] font-black text-gray-100 dark:text-gray-900 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    animate={{ 
                        rotate: [0, 10, -10, 0],
                        y: [0, -10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl shadow-indigo-500/50"
                >
                    <Search size={64} className="text-white" />
                </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-12 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {onNavigateBack && (
              <Button 
                variant="outline" 
                onClick={onNavigateBack}
                leftIcon={<ArrowLeft size={18} />}
              >
                Go Back
              </Button>
            )}
            <Button 
                onClick={() => window.location.href = '/'}
                leftIcon={<Home size={18} />}
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
