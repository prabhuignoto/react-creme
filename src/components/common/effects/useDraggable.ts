import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

type DragDirection = "HORIZONTAL" | "VERTICAL" | "BOTH";

interface Position {
  x: number;
  y: number;
  target: HTMLElement | null;
}

interface DragSettings {
  makeChildrenDraggable?: boolean;
  boundTo?: RefObject<HTMLElement> | null;
  dragDirection?: DragDirection;
}

type UseDraggable = (
  ref: RefObject<HTMLElement> | HTMLElement,
  settings?: DragSettings
) => Position;

const useDraggable: UseDraggable = (
  targetRef,
  settings = {
    boundTo: null,
    makeChildrenDraggable: false,
    dragDirection: "BOTH",
  }
) => {
  const { makeChildrenDraggable, boundTo, dragDirection = "BOTH" } = settings;
  const elementRef = useRef<HTMLElement | null>(null);

  const mousePressed = useRef(false);
  const rect = useRef<DOMRect>();
  const boundToRect = useRef<DOMRect | null>();
  const start = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const dragTarget = useRef<HTMLElement | null>(null);

  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    target: null,
  });

  const [debouncedPosition] = useDebounce(position, 500, { trailing: true });

  const handleMouseDown = useCallback((ev: MouseEvent | TouchEvent) => {
    ev.preventDefault();
    mousePressed.current = true;
    const target = ev.target as HTMLElement;

    if (boundTo) {
      boundToRect.current = boundTo.current?.getBoundingClientRect();
    } else if (makeChildrenDraggable) {
      const _targetRef =
        targetRef instanceof HTMLElement ? targetRef : targetRef.current;
      boundToRect.current = _targetRef?.getBoundingClientRect();
    } else {
      boundToRect.current = document.body.getBoundingClientRect();
    }

    if (target) {
      dragTarget.current = target;

      const rect = target.getBoundingClientRect();

      const event = ev instanceof MouseEvent ? ev : ev.touches[0];

      start.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  }, []);

  const checkBounds = useCallback((left: number, top: number) => {
    let boundRect = boundToRect?.current;
    const target = dragTarget.current;

    if (makeChildrenDraggable && rect.current) {
      boundRect = rect.current;
    }

    let canMoveLeft = true;
    let canMoveTop = true;

    if (boundRect && target) {
      if (left + target.offsetWidth > boundRect.right) {
        canMoveLeft = false;
      }

      if (left < boundRect.left) {
        canMoveLeft = false;
      }

      if (top < boundRect.top) {
        canMoveTop = false;
      }

      if (top + target.offsetHeight > boundRect.bottom) {
        canMoveTop = false;
      }
    }

    return {
      canMoveLeft,
      canMoveTop,
    };
  }, []);

  const handleMouseMove = useCallback((ev: MouseEvent | TouchEvent) => {
    ev.preventDefault();
    const isMousePressed = mousePressed.current;
    const target =
      targetRef instanceof HTMLElement ? targetRef : targetRef.current;
    const boundRect = boundToRect?.current;
    const dir = dragDirection;

    if (isMousePressed && target && boundRect) {
      const { x, y } = start.current;

      const event = ev instanceof MouseEvent ? ev : ev.touches[0];

      let newLeft = event.clientX - x;
      let newTop = event.clientY - y;

      const { canMoveLeft, canMoveTop } = checkBounds(newLeft, newTop);

      const element = makeChildrenDraggable ? dragTarget.current : target;

      if (!element) {
        return;
      }

      const { offsetWidth, offsetHeight } = element;

      if (!canMoveLeft && boundRect) {
        const { left, right } = boundRect;

        if (newLeft + offsetWidth > right) {
          newLeft = right - offsetWidth;
        }

        if (newLeft < left) {
          newLeft = left;
        }
      }

      if (!canMoveTop && boundRect) {
        const { top, bottom } = boundRect;

        if (newTop + offsetHeight > bottom) {
          newTop = bottom - offsetHeight;
        }

        if (newTop < top) {
          newTop = top;
        }
      }

      element.style.cssText +=
        ";" +
        `
        position: absolute;
        ${
          dir === "BOTH" || dir === "HORIZONTAL"
            ? `left: ${newLeft - boundRect?.left}px`
            : ""
        };
        ${
          dir === "BOTH" || dir === "VERTICAL"
            ? `top: ${newTop - boundRect?.top}px`
            : ""
        };
        z-index: 999;
      `;

      setPosition({ x: newLeft, y: newTop, target: ev.target as HTMLElement });
    }
  }, []);

  const handleMouseUp = useCallback((ev) => {
    ev.preventDefault();
    // set pressed state to false
    mousePressed.current = false;

    (ev.target as HTMLElement).style.zIndex = "";

    // re calculate the positions
    if (targetRef instanceof HTMLElement) {
      rect.current = targetRef.getBoundingClientRect();
    } else {
      rect.current = targetRef.current?.getBoundingClientRect();
    }
  }, []);

  useEffect(() => {
    const target =
      targetRef instanceof HTMLElement ? targetRef : targetRef.current;

    if (target) {
      elementRef.current = target;
      rect.current = target.getBoundingClientRect();

      if (makeChildrenDraggable) {
        setTimeout(() => {
          boundToRect.current = target.getBoundingClientRect();
        }, 500);
        Array.from<HTMLElement>(target.querySelectorAll(":scope > *")).forEach(
          (item) => {
            item.addEventListener("mousedown", handleMouseDown);
            item.addEventListener("touchstart", handleMouseDown);
          }
        );
      } else {
        target.addEventListener("mousedown", handleMouseDown);
        target.addEventListener("touchstart", handleMouseDown);
      }

      document.addEventListener("mouseup", handleMouseUp, { passive: false });
      document.addEventListener("touchend", handleMouseUp, { passive: false });

      document.addEventListener("touchmove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
    }
  }, [targetRef]);

  useEffect(() => {
    setTimeout(() => {
      const _targetRef =
        targetRef instanceof HTMLElement ? targetRef : targetRef.current;

      if (boundTo?.current) {
        boundToRect.current = boundTo.current?.getBoundingClientRect();
        boundTo.current.style.position = "relative";
      }

      if (!boundTo?.current && makeChildrenDraggable && _targetRef) {
        boundToRect.current = _targetRef.getBoundingClientRect();
        _targetRef.style.position = "relative";
      }
    }, 500);
  }, [boundTo]);

  useEffect(() => {
    // cleanup
    return () => {
      const eleRef = elementRef.current;

      if (eleRef) {
        if (makeChildrenDraggable) {
          Array.from<HTMLElement>(
            eleRef.querySelectorAll(":scope > *")
          ).forEach((item) => {
            item.removeEventListener("mousedown", handleMouseDown);
            item.removeEventListener("touchstart", handleMouseDown);
          });
        } else {
          eleRef.removeEventListener("mousedown", handleMouseDown);
          eleRef.removeEventListener("touchstart", handleMouseDown);
        }

        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);

        document.removeEventListener("touchend", handleMouseUp);
        document.removeEventListener("touchmove", handleMouseMove);
      }
    };
  }, []);

  return debouncedPosition;
};

export default useDraggable;
