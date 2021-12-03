import { RefObject, useCallback, useEffect, useRef } from "react";

function useDraggable(
  ref: RefObject<HTMLElement>,
  boundTo?: RefObject<HTMLElement>
) {
  const elementRef = useRef<HTMLElement | null>(null);
  const boundToRef = useRef<HTMLElement | null>(null);

  const mousePressed = useRef(false);
  const rect = useRef<DOMRect>();
  const boundToRect = useRef<DOMRect | null>(null);
  const start = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    mousePressed.current = true;

    if (rect.current) {
      const _rect = rect.current;

      start.current = {
        x: ev.clientX - _rect.left,
        y: ev.clientY - _rect.top,
      };
    }
  }, []);

  const checkBounds = useCallback((left: number, top: number) => {
    const _bound = boundToRect?.current;
    const _ref = ref.current;

    let canMoveLeft = true;
    let canMoveTop = true;

    if (_bound && _ref) {
      if (left + _ref.clientWidth > _bound.right) {
        canMoveLeft = false;
      }

      if (left < _bound.left) {
        canMoveLeft = false;
      }

      if (top < _bound.top) {
        canMoveTop = false;
      }

      if (top + _ref.clientHeight > _bound.bottom) {
        canMoveTop = false;
      }
    }

    return {
      canMoveLeft,
      canMoveTop,
    };
  }, []);

  const handleMouseMove = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    const _mousePressed = mousePressed.current;
    const _start = start.current;
    const _ref = ref.current;
    const _bound = boundToRect?.current;

    if (_mousePressed && _start && _ref) {
      const { x, y } = start.current;

      let newLeft = ev.clientX - x;
      let newTop = ev.clientY - y;

      const { canMoveLeft, canMoveTop } = checkBounds(newLeft, newTop);

      if (!canMoveLeft && _bound) {
        newLeft = _bound.right - _ref.clientWidth;
      }

      if (!canMoveTop && _bound) {
        newTop = _bound.bottom - _ref.clientHeight;
      }

      if (canMoveLeft) {
        ref.current.style.position = "absolute";
        ref.current.style.left = `${newLeft}px`;
      }

      if (canMoveTop) {
        ref.current.style.position = "absolute";
        ref.current.style.top = `${newTop}px`;
      }
    }
  }, []);

  const handleMouseUp = useCallback((ev) => {
    ev.preventDefault();
    mousePressed.current = false;
    rect.current = ref.current?.getBoundingClientRect();
  }, []);

  useEffect(() => {
    const _ref = ref.current;

    if (_ref) {
      elementRef.current = _ref;
      rect.current = _ref.getBoundingClientRect();

      _ref.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp, { passive: false });

      if (boundTo) {
        boundToRef.current = boundTo.current;
        boundTo.current?.addEventListener("mousemove", handleMouseMove, {
          passive: false,
        });
      } else {
        document.addEventListener("mousemove", handleMouseMove, {
          passive: false,
        });
      }
    }
  }, [ref, boundTo]);

  useEffect(() => {
    if (boundTo?.current) {
      boundToRect.current = boundTo.current.getBoundingClientRect();
    }
  }, [boundTo]);

  useEffect(() => {
    return () => {
      const _ref = elementRef.current;
      const _boundToRef = boundToRef.current;

      if (_boundToRef) {
        _boundToRef.removeEventListener("mousemove", handleMouseMove);
      }

      if (_ref) {
        _ref.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);
}

export default useDraggable;
