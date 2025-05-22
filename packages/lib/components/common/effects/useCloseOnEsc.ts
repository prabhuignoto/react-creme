import { RefObject, useEffect, useRef } from 'react';

/**
 * Type definition for the custom hook function.
 */
type UseCloseOnEscapeFn = (
  handler: (ev: KeyboardEvent) => void,
  element: RefObject<HTMLDivElement>
) => void;

/**
 * Custom hook to handle the 'Escape' key press event on a specific element.
 *
 * @param {Function} handler - The function to be called when the 'Escape' key is pressed.
 * @param {RefObject<HTMLDivElement>} element - The reference to the DOM element to which the event listener is attached.
 */
const useCloseOnEscape: UseCloseOnEscapeFn = (handler, element) => {
  const savedHandler = useRef<(ev: KeyboardEvent) => void>(handler);

  useEffect(() => {
    // Store the latest handler function in a ref
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      // Call the handler function if the 'Escape' key is pressed
      if (event.key === 'Escape' && savedHandler.current) {
        savedHandler.current(event);
      }
    };

    // Ensure the element exists before attaching the event listener
    if (!element.current) {
      return;
    }

    // Add the 'keyup' event listener to the element
    element.current.addEventListener('keyup', eventListener);

    // Cleanup function to remove the event listener
    return () => {
      element.current?.removeEventListener('keyup', eventListener);
    };
  }, [element]);
};

export { useCloseOnEscape };
