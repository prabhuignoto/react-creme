import { RefObject, useEffect, useRef } from "react";

type functionType = (
  handler: (ev: KeyboardEvent) => void,
  element: RefObject<HTMLDivElement>
) => void;

const useCloseOnEscape: functionType = (handler, element) => {
  const savedHandler = useRef<(ev: KeyboardEvent) => void>();

  if (!element) {
    return;
  }

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      if (event.key === "Escape" && savedHandler.current) {
        savedHandler.current(event);
      }
    };

    if (!element.current) {
      return;
    }

    // Add event listener
    element.current.addEventListener("keyup", eventListener);
    // Remove event listener on cleanup

    return () => {
      element.current &&
        element.current.removeEventListener("keyup", eventListener);
    };
  }, [element]);
};

export { useCloseOnEscape };
