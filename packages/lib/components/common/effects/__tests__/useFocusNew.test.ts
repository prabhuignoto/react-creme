import { renderHook, act } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { describe, it, assert } from 'vitest';
import useFocusNew from '../useFocusNew';
import styles from '../focus.module.scss';

describe('useFocusNew hook', () => {
  it('should add focus ring when keyup event is triggered', () => {
    const ref = { current: document.createElement('div') };
    const callback = () => {};
    const { rerender } = renderHook(() => useFocusNew(ref, callback));

    act(() => {
      const event = new KeyboardEvent('keyup', { key: 'Enter' });
      ref.current.dispatchEvent(event);
    });

    rerender();

    assert(
      ref.current.querySelector(`.${styles.focus_ring_active}`) !== null,
      'Focus ring should be active'
    );
  });

  it('should remove focus ring when focusout event is triggered', () => {
    const ref = { current: document.createElement('div') };
    const callback = () => {};
    const { rerender } = renderHook(() => useFocusNew(ref, callback));

    act(() => {
      const event = new Event('focusout');
      ref.current.dispatchEvent(event);
    });

    rerender();

    assert(
      ref.current.querySelector(`.${styles.focus_ring_inactive}`) !== null,
      'Focus ring should be inactive'
    );
  });

  it('should call the callback when Enter or Space is pressed', () => {
    let callCount = 0;
    const callback = () => {
      callCount++;
    };
    const ref = { current: document.createElement('div') };

    const { rerender } = renderHook(() => useFocusNew(ref, callback));

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
});
