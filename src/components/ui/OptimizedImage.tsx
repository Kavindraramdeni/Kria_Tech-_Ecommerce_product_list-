import React, { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && blur && (
        <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
      )}
      {hasError ? (
        <div
          role="img"
          aria-label={alt ? `${alt} image unavailable` : 'Image unavailable'}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
        >
          <ImageOff size={24} aria-hidden="true" />
          <span className="px-3 text-center text-[10px] font-semibold uppercase tracking-wider">Image unavailable</span>
        </div>
      ) : (
        <motion.img
          {...props}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={(event) => {
            setIsLoaded(true);
            props.onLoad?.(event);
          }}
          onError={(event) => {
            setHasError(true);
            setIsLoaded(false);
            props.onError?.(event);
          }}
          initial={blur ? { opacity: 0 } : false}
          animate={isLoaded || !blur ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`h-full w-full object-cover ${className.includes('object-contain') ? 'object-contain' : 'object-cover'} ${isLoaded || !blur ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};
