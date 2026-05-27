import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import React from 'react';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toContainElement(document.querySelector('svg'));
  });

  it('renders icons when provided', () => {
    render(
      <Button 
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Content
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(<Button variant="danger">Danger</Button>);
    expect(container.firstChild).toHaveClass('bg-red-600');
  });
});
