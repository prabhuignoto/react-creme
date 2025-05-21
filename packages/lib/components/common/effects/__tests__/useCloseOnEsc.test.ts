import { renderHook, act } from '@testing-library/react';
import { useCloseOnEscape } from '../useCloseOnEsc';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useCloseOnEscape', () => {
  let container: HTMLDivElement | null;
  let handler;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    handler = vi.fn();
  });

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
    }
    container?.remove();
  });

  it('should call handler when Escape key is pressed', () => {
    renderHook(() =>
      useCloseOnEscape(handler, { current: container as HTMLDivElement })
    );

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Escape' });
      container?.dispatchEvent(event);
    });

    expect(handler).toHaveBeenCalled();
  });

  it('should not call handler when other key is pressed', () => {
    renderHook(() =>
      useCloseOnEscape(handler, { current: container as HTMLDivElement })
    );

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      container?.dispatchEvent(event);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not attach event listener when element does not exist', () => {
    const nullRef = {
      current: null,
    } as unknown as React.RefObject<HTMLDivElement>;
    renderHook(() => useCloseOnEscape(handler, nullRef));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Escape' });
      if (container) {
        container.dispatchEvent(event);
      }
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
