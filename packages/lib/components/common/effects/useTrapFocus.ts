import { useCallback, useRef, useEffect } from 'react';

// Our hook takes two parameters: `timeout` (with a default value of 200ms),
// and an optional callback `onRender` which will be invoked when the component has rendered.
export default function useTrapFocus<T extends HTMLElement>(
  timeout: number | null = 200,
  onRender?: (() => void) | null
) {
  // We are storing the DOM references in the following refs:
  // focusTargets for all focusable elements, and targetRef for the element using this hook
  const focusTargets = useRef<T[] | null>([]);
  const targetRef = useRef<T | null>(null);

  // `onInit` is used to initialize the references when the component is mounted
  const onInit = useCallback(
    (node: T) => {
      if (node) {
        targetRef.current = node;
        // We are selecting all focusable elements except those that are disabled or hidden
        focusTargets.current = Array.from(
          node.querySelectorAll('[tabindex="0"]:not([disabled]):not([hidden])')
        );

        // If an `onRender` function is provided, we call it
        onRender?.();

        if (timeout) {
          setTimeout(() => {
            // If there are focusable elements, we focus the first one
            focusTargets.current?.[0]?.focus();
          }, timeout);
        }
      }
    },
    [onRender, timeout]
  ); // added dependencies

  // `handleKeyDown` is the event handler for keydown events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab' && focusTargets.current) {
      const targets = focusTargets.current;
      const currentIndex = targets.indexOf(event.target as T);

      if (currentIndex !== -1) {
        const nextIndex = currentIndex + (event.shiftKey ? -1 : 1);
        let nextElement: T | null = null;

        // We cycle the focus if it reaches the boundaries
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
    }
  }, []); // No dependencies here as all values are provided from the event or are refs

  // Use an effect to bind our `handleKeyDown` to the `keydown` event
  useEffect(() => {
    if (timeout && targetRef.current) {
      targetRef.current.addEventListener('keydown', handleKeyDown);

      // Remember to unbind event listeners when the component is unmounted
      return () => {
        targetRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown, timeout]); // Add dependencies

  // We are returning the `handleKeyDown` and `onInit` functions, and `targetRef` ref,
  // only if `timeout` is defined and truthy.
  return timeout ? { handleKeyDown, onInit, targetRef } : null;
}
