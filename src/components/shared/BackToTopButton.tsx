import React, { useState, useEffect } from 'react';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          ${isVisible ? 'opacity-100' : 'opacity-0'}
          bg-indigo-600 hover:bg-indigo-700 text-white font-bold
          rounded-full w-12 h-12 flex items-center justify-center
          transition-all duration-300 ease-in-out
          shadow-lg transform hover:scale-110 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        `}
        aria-label="Go to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};
