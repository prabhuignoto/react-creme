import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { useCloseOnEscape } from '../useCloseOnEsc';
import { describe, it, expect, vi } from 'vitest';

// Mock the addEventListener and removeEventListener functions
window.addEventListener = vi.fn();
window.removeEventListener = vi.fn();

describe('useCloseOnEscape hook', () => {
  it('should add and remove event listener', () => {
    const element = {
      current: document.createElement('div'), // Create a dummy DOM element
    };
    const handler = vi.fn();

    const { unmount } = renderHook(() => useCloseOnEscape(handler, element));

    expect(window.addEventListener).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );
  });

  it('should call the handler when "Escape" key is pressed', () => {
    const element = {
      current: document.createElement('div'), // Create a dummy DOM element
    };
    const handler = vi.fn();

    renderHook(() => useCloseOnEscape(handler, element));

    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    element.current.dispatchEvent(event);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(event);
  });

  it('should not call the handler when a different key is pressed', () => {
    const element = {
      current: document.createElement('div'), // Create a dummy DOM element
    };
    const handler = vi.fn();

    renderHook(() => useCloseOnEscape(handler, element));

    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    element.current.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not throw an error if element is null', () => {
    const element = useRef(null); // Set element as null
    const handler = vi.fn();

    expect(() =>
      renderHook(() => useCloseOnEscape(handler, element))
    ).not.toThrow();
  });
});
