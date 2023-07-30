import { renderHook, act } from '@testing-library/react-hooks';
import { useKeyNavigation } from '../useKeyNavigation';
import { describe, expect, beforeEach, afterEach, it } from 'vitest';

describe('useKeyNavigation', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it('should initialize with the correct default values', () => {
    const { result } = renderHook(() =>
      useKeyNavigation({ current: container }, -1, 5)
    );

    expect(result.current.selection).toBe(-1);
  });

  it('should handle ArrowDown key press', () => {
    const { result } = renderHook(() =>
      useKeyNavigation({ current: container }, -1, 5)
    );

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      container.dispatchEvent(event);
    });

    expect(result.current.selection).toBe(0);
  });

  it('should handle ArrowUp key press', () => {
    const { result } = renderHook(() =>
      useKeyNavigation({ current: container }, 0, 5)
    );

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      container.dispatchEvent(event);
    });

    expect(result.current.selection).toBe(4);
  });

  it('should not handle key press when not focusable', () => {
    const { result } = renderHook(() =>
      useKeyNavigation({ current: container }, -1, 5, 50, false)
    );

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      container.dispatchEvent(event);
    });

    expect(result.current.selection).toBe(-1);
  });
});
