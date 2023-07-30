import { renderHook, act } from '@testing-library/react-hooks';
import { useCloseOnEscape } from '../useCloseOnEsc';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useCloseOnEscape', () => {
  let container: HTMLDivElement;
  let handler;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    handler = vi.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it('should call handler when Escape key is pressed', () => {
    renderHook(() => useCloseOnEscape(handler, { current: container }));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Escape' });
      container.dispatchEvent(event);
    });

    expect(handler).toHaveBeenCalled();
  });

  it('should not call handler when other key is pressed', () => {
    renderHook(() => useCloseOnEscape(handler, { current: container }));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      container.dispatchEvent(event);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not attach event listener when element does not exist', () => {
    renderHook(() => useCloseOnEscape(handler, { current: null }));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Escape' });
      container.dispatchEvent(event);
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
