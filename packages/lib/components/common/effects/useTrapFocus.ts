import { useCallback, useRef } from 'react';

export default function useTrapFocus<T extends HTMLElement>(
  timeout = 200,
  onRender?: () => void
) {
  const focusTargets = useRef<T[] | null>([]);
  const targetRef = useRef<T | null>(null);

  const onInit = useCallback((node: T) => {
    const ele = node as T;
    if (ele) {
      targetRef.current = ele;
      focusTargets.current = Array.from(
        ele.querySelectorAll('[tabindex="0"]:not([disabled]):not([hidden])')
      );

      onRender?.();

      if (timeout) {
        setTimeout(() => {
          if (focusTargets.current && focusTargets.current.length) {
            focusTargets.current[0].focus();
          }
        }, timeout);
      }
    }
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Tab' && focusTargets.current) {
      const currentIndex = focusTargets.current?.indexOf(event.target as T);
      const targets = focusTargets.current;

      if (currentIndex === -1) {
        return;
      }

      const nextIndex = currentIndex + (event.shiftKey ? -1 : 1);
      let nextElement = null;

      if (nextIndex >= 0 && nextIndex < targets.length) {
        nextElement = targets[nextIndex];
      } else if (nextIndex < 0) {
        nextElement = targets[targets.length - 1];
      } else if (nextIndex >= targets.length) {
        nextElement = targets[0];
      }
      event.preventDefault();

      if (nextElement) {
        nextElement.focus();
      }
    }
  }, []);

  return { handleKeyDown, onInit, targetRef };
}
