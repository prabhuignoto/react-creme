import { useCallback, useEffect, useRef } from 'react';
import './focus.scss';

export default function useFocusNew(
  ref: React.RefObject<HTMLElement>,
  cb?: () => void
) {
  const ring = useRef<HTMLSpanElement>();

  const focusHandler = useCallback((ev: FocusEvent) => {
    const ele = document.createElement('span');
    const { left, top, width, height } = (
      ev.target as HTMLElement
    ).getBoundingClientRect();
    ele.classList.add('rc-focus-ring');
    ele.style.cssText = `
      height: ${height + 6}px;
      left: ${left - 6}px;
      top: ${top - 6}px;
      width: ${width + 6}px;
  `;
    ring.current = ele;
    document.body.appendChild(ele);
    setTimeout(() => {
      ele.classList.add('rc-focus-ring-active');
    }, 25);
  }, []);

  const blurHandler = useCallback((ev: FocusEvent) => {
    const ele = ring.current;
    if (ele) {
      ele.classList.remove('rc-focus-ring-active');
      ele.classList.add('rc-focus-ring-inactive');
      setTimeout(() => ele?.remove(), 25);
    }
  }, []);

  const handleKeyUp = useCallback((ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      cb?.();
    }
  }, []);

  const onScroll = useCallback((ev: Event) => {
    if (ring.current && ref.current) {
      const { left, top } = ref.current.getBoundingClientRect();
      ring.current.style.left = `${left - 3}px`;
      ring.current.style.top = `${top - 3}px`;
    }
  }, []);

  useEffect(() => {
    const ele = ref.current;
    if (ele) {
      ele.style.outline = 'none';
      ele.addEventListener('focus', focusHandler);
      ele.addEventListener('focusout', blurHandler);
      window.addEventListener('scroll', onScroll);
      ele.addEventListener('keyup', handleKeyUp);
    }
  }, [ref]);

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', focusHandler);
        ref.current.removeEventListener('focusout', blurHandler);
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, []);
}
