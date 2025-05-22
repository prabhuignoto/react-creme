import { renderHook, act } from '@testing-library/react';
import { useKey } from '../useKey';
import { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import { describe, it, assert } from 'vitest';

describe('useKey hook', () => {
  it('should call the callback when Enter is pressed', () => {
    let callCount = 0;
    const callback = () => {
      callCount++;
    };
    const ref = { current: document.createElement('div') };

    const { rerender } = renderHook(() => useKey(ref, callback));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      ref.current.dispatchEvent(event);
    });

    rerender();

    assert.equal(
      callCount,
      1,
      'callback should be called once when Enter is pressed'
    );
  });

  it('should not call the callback when other keys are pressed', () => {
    let callCount = 0;
    const callback = () => {
      callCount++;
    };
    const ref = { current: document.createElement('div') };

    const { rerender } = renderHook(() => useKey(ref, callback));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'A' });
      ref.current.dispatchEvent(event);
    });

    rerender();

    assert.equal(
      callCount,
      0,
      'callback should not be called when other keys are pressed'
    );
  });

  it('should not call the callback after unmount', () => {
    let callCount = 0;
    const callback = () => {
      callCount++;
    };
    const ref = { current: document.createElement('div') };

    const { unmount } = renderHook(() => useKey(ref, callback));

    unmount();

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      ref.current.dispatchEvent(event);
    });

    assert.equal(callCount, 0, 'callback should not be called after unmount');
  });
});
