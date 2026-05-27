import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import React from 'react';

describe('Card Component', () => {
  it('renders card with children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders card pieces correctly', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies hover effect class by default', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('hover:shadow-2xl');
  });

  it('omits hover effect class when disabled', () => {
    const { container } = render(<Card hoverEffect={false}>Content</Card>);
    expect(container.firstChild).not.toHaveClass('hover:shadow-2xl');
  });
});
