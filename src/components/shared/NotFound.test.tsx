import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotFound } from './NotFound';
import React from 'react';

describe('NotFound Component', () => {
  it('renders correctly', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('calls onNavigateBack when clicked', () => {
    const handleBack = vi.fn();
    render(<NotFound onNavigateBack={handleBack} />);
    fireEvent.click(screen.getByText('Go Back'));
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('navigates to home when button clicked', () => {
    // Mock window.location
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, href: '' } as any;
    
    render(<NotFound />);
    fireEvent.click(screen.getByText('Back to Home'));
    expect(window.location.href).toBe('/');
    
    window.location = originalLocation as any;
  });
});
