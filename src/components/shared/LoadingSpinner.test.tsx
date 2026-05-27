import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from './LoadingSpinner';
import React from 'react';

describe('LoadingSpinner Component', () => {
  it('renders correctly', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders full screen', () => {
    const { container } = render(<LoadingSpinner fullScreen />);
    expect(container.firstChild).toHaveClass('fixed inset-0');
  });

  it('applies custom color', () => {
    const { container } = render(<LoadingSpinner color="text-red-500" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('text-red-500');
  });
});
