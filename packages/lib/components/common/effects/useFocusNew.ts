import { useCallback, useEffect, useRef } from 'react';
import styles from './focus.module.scss';

/**
 * @param  {React.RefObject<HTMLElement>} ref
 * @param  {(ev?:Event)=>void} cb?
 */
export default function useFocusNew(
  ref: React.RefObject<HTMLElement>,
  cb?: (ev?: Event) => void
) {
  const ring = useRef<HTMLSpanElement>();

  const focusHandler = useCallback(() => {
    const ele = ring.current;
    if (ele) {
      ele.classList.remove(styles.ring_inactive);
      ele.classList.add(styles.ring_active);
    }
  }, []);

  const removeFocus = useCallback(() => {
    const ele = ring.current;
    if (ele) {
      ele.classList.remove(styles.ring_active);
      ele.classList.add(styles.ring_inactive);
    }
  }, []);

  const blurHandler = useCallback(() => {
    removeFocus();
  }, []);

  const handleKeyUp = useCallback((ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      cb?.(ev);
    }
  }, []);

  useEffect(() => {
    const ele = ref.current;
    if (ele) {
      const focusRing = document.createElement('span');
      const { clientWidth, clientHeight } = ele;

      ele.style.outline = 'none';
      ele.style.position = 'relative';

      focusRing.classList.add(styles.focus_ring);
      focusRing.style.cssText = `
        width: ${clientWidth + 6}px;
        height: ${clientHeight + 6}px; 
      `;
      ring.current = ele;
      ele.appendChild(focusRing);
      ring.current = focusRing;

      ele.addEventListener('focus', focusHandler);
      ele.addEventListener('focusout', blurHandler);
      ele.addEventListener('keyup', handleKeyUp);
    }
  }, [ref]);

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', focusHandler);
        ref.current.removeEventListener('focusout', blurHandler);
        ref.current.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, []);
}
