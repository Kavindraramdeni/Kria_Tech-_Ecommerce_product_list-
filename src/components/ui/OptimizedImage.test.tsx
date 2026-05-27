import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OptimizedImage } from './OptimizedImage';
import React from 'react';

describe('OptimizedImage Component', () => {
  it('renders correctly', () => {
    render(<OptimizedImage src="test.jpg" alt="Test Image" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Test Image');
  });

  it('optimizes unsplash URLs', () => {
    const unsplashUrl = 'https://images.unsplash.com/photo-123';
    render(<OptimizedImage src={unsplashUrl} alt="Unsplash" width={500} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('auto=format'));
    expect(img).toHaveAttribute('src', expect.stringContaining('w=500'));
  });

  it('handles load state', () => {
    render(<OptimizedImage src="test.jpg" alt="Test" />);
    const img = screen.getByRole('img');
    
    // Initially not loaded classes might be applied or opacity set by motion
    // Difficult to test motion state directly, but we can verify onLoad trigger
    fireEvent.load(img);
    expect(img).toHaveClass('opacity-100');
  });
});
