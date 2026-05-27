import React from 'react';

interface SkipLinkProps {
  targetId?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ targetId = 'main' }) => {
  return (
    <a 
      href={`#${targetId}`} 
      className="skip-link"
    >
      Skip to content
    </a>
  );
};
