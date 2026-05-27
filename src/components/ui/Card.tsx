import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm ${hoverEffect ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-500' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-8 pb-0 ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-8 pt-0 ${className}`}>{children}</div>
);
