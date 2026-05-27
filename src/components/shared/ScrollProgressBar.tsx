import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent pointer-events-none">
      <div 
        className="h-full bg-indigo-600 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(79,70,229,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};