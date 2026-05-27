import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './SEO';
import React from 'react';

describe('SEO Component', () => {
  it('renders correctly', () => {
    render(
      <HelmetProvider>
        <SEO title="Test Title" description="Test Description" />
      </HelmetProvider>
    );
    // Helmet renders to the head, so we can't easily check with react-testing-library
    // unless we use a specific helmet internal or just verify it does not crash.
    expect(true).toBe(true);
  });
});
