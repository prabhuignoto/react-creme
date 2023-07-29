import { renderHook, act } from '@testing-library/react-hooks';
import { useFirstRender } from '../useFirstRender';
import { describe, it, expect } from 'vitest';

describe('useFirstRender hook', () => {
  it('should return true on first render', () => {
    const { result, rerender } = renderHook(() => useFirstRender());

    rerender();

    expect(result.current.current).toBe(false);
  });

  it('should return the same reference for every render', () => {
    const { result, rerender } = renderHook(() => useFirstRender());
    const initialReference = result.current;

    act(() => {
      rerender();
    });

    expect(result.current).toBe(initialReference);
  });
});
