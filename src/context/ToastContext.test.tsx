import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider, useToastContext } from './ToastContext';
import React from 'react';

// Mock hook
vi.mock('../hooks/useToast', () => ({
  useToast: () => ({
    toasts: [],
    showToast: vi.fn(),
    removeToast: vi.fn()
  })
}));

// Mock component
vi.mock('../components/shared/Toast', () => ({
  ToastContainer: () => <div data-testid="toast-container" />
}));

describe('ToastContext', () => {
  it('provides showToast function', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );
    const { result } = renderHook(() => useToastContext(), { wrapper });
    
    expect(result.current.showToast).toBeDefined();
    expect(typeof result.current.showToast).toBe('function');
  });

  it('throws error when used outside provider', () => {
    // Suppress console error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => renderHook(() => useToastContext())).toThrow('useToastContext must be used within a ToastProvider');
    
    consoleSpy.mockRestore();
  });
});
