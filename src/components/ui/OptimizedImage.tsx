import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface OptimizedImageProps extends HTMLMotionProps<'img'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  blur?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  blur = true,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const optimizedSrc = src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {blur && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      <motion.img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        initial={blur ? { opacity: 0 } : false}
        animate={isLoaded ? { opacity: 1 } : false}
        transition={{ duration: 0.5 }}
        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};
