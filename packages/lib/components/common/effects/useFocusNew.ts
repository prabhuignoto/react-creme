import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { isDark } from '../utils';
import styles from './focus.module.scss';

/**
 * @param  {React.RefObject<HTMLElement>} ref
 * @param  {(ev?:Event)=>void} cb?
 */
export default function useFocusNew(
  ref: React.RefObject<HTMLElement> | null,
  cb?: ((ev: PointerEvent | KeyboardEvent) => void) | null
) {
  const ring = useRef<HTMLSpanElement | null>(null);

  const isDarkMode = useMemo(() => isDark(), []);

  const focusHandler = useCallback(() => {
    const ele = ring.current;

    if (ele) {
      ele.classList.remove(styles.focus_ring_inactive);
      ele.classList.add(styles.focus_ring_active);
    }
  }, []);

  const removeFocus = useCallback(() => {
    const ele = ring.current;
    if (ele) {
      ele.classList.remove(styles.focus_ring_active);
      ele.classList.add(styles.focus_ring_inactive);
    }
  }, []);

  const blurHandler = useCallback(() => {
    removeFocus();
  }, []);

  const handleKeyUp = (ev: KeyboardEvent) => {
    focusHandler();

    if (ev.key === 'Enter' || ev.key === ' ') {
      cb?.(ev);
    }
  };

  useEffect(() => {
    const ele = ref?.current;
    if (ele) {
      const focusRing = document.createElement('span');
      const { clientWidth, clientHeight } = ele;

      ele.style.outline = 'none';
      ele.style.position = 'relative';

      const classesToAdd = [
        styles.focus_ring,
        isDarkMode ? styles.dark : '',
      ].filter(cls => !!cls);

      focusRing.classList.add(...classesToAdd);
      focusRing.classList.add(styles.focus_ring_inactive); // Add inactive class initially
      focusRing.style.cssText = `
        width: ${clientWidth + 6}px;
        height: ${clientHeight + 6}px; 
      `;
      ele.appendChild(focusRing);
      ring.current = focusRing;

      ele.addEventListener('focusout', blurHandler);
      ele.addEventListener('keyup', handleKeyUp);
    }
  }, [ref, isDarkMode, blurHandler, handleKeyUp]);

  useEffect(() => {
    return () => {
      if (ref?.current) {
        ref?.current.removeEventListener('focusout', blurHandler);
        ref?.current.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [ref, blurHandler, handleKeyUp]);
}
