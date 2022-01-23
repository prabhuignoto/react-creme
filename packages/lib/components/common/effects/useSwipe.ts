import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

type SwipeDirection = 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'NONE';

type SwipeStrength = 'low' | 'medium' | 'high';

const SwipeStrengthSettings = {
  high: 0.75,
  low: 0.1,
  medium: 0.5,
};

interface SwipeState {
  dir: SwipeDirection;
  offset: number;
}

type SwipeFunc = (
  ref: RefObject<HTMLElement | null>,
  swipeStrength?: SwipeStrength
) => SwipeState;

const useSwipe: SwipeFunc = (ref, strength = 'medium') => {
  const swipeStarted = useRef<boolean>(false);
  const rect = useRef<DOMRect | null>(null);
  const startPosition = useRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const endPosition = useRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const threshold = SwipeStrengthSettings[strength];

  const [swipeState, setSwipeState] = useState<SwipeState>({
    dir: 'NONE',
    offset: -1,
  });

  const elementRef = useRef<HTMLElement>();

  const handleMouseDown = useCallback((ev: MouseEvent | TouchEvent) => {
    ev.preventDefault();
    swipeStarted.current = true;

    const _rect = rect.current;

    const { clientX, clientY } =
      ev instanceof window.TouchEvent ? ev.touches[0] : ev;

    ref.current?.setAttribute('disabled', 'true');

    if (_rect) {
      startPosition.current = {
        x: clientX - _rect.left,
        y: clientY - _rect.top,
      };
    }
  }, []);

  const handleMouseUp = () => {
    swipeStarted.current = false;

    if (!startPosition && !endPosition) {
      return;
    }

    const { x: startX, y: startY } = startPosition.current;
    const { x: endX, y: endY } = endPosition.current;

    const diffX = startX - endX;
    const diffY = startY - endY;

    if (rect.current && Math.abs(diffX) / rect.current.width < threshold) {
      return;
    }

    if (Math.abs(diffX) > Math.abs(diffY)) {
      const left = diffX !== 0 ? diffX > 0 : null;

      if (left !== null) {
        setSwipeState(
          left
            ? {
                dir: 'LEFT',
                offset: Math.abs(diffX),
              }
            : {
                dir: 'RIGHT',
                offset: Math.abs(diffX),
              }
        );
      }
    } else {
      const top = diffY !== 0 ? diffY > 0 : null;

      if (top !== null) {
        setSwipeState(
          top
            ? {
                dir: 'TOP',
                offset: Math.abs(diffY),
              }
            : {
                dir: 'BOTTOM',
                offset: Math.abs(diffY),
              }
        );
      }
    }

    ref.current?.removeAttribute('disabled');
  };

  const handleMouseMove = (ev: MouseEvent | TouchEvent) => {
    ev.preventDefault();
    const _rect = rect.current;

    const { clientX, clientY } = ev instanceof TouchEvent ? ev.touches[0] : ev;

    if (_rect) {
      endPosition.current = {
        x: clientX - _rect.left,
        y: clientY - _rect.top,
      };
    }
  };

  useEffect(() => {
    if (elementRef.current) {
      return;
    }

    const _ref = ref.current;

    if (_ref) {
      elementRef.current = ref.current;
      rect.current = _ref.getBoundingClientRect();
      _ref.addEventListener('mousedown', handleMouseDown);
      _ref.addEventListener('mouseup', handleMouseUp);
      _ref.addEventListener('mousemove', handleMouseMove);

      _ref.addEventListener('touchstart', handleMouseDown, {
        passive: false,
      });
      _ref.addEventListener('touchend', handleMouseUp, { passive: false });
      _ref.addEventListener('touchmove', handleMouseMove, {
        passive: false,
      });
    }
  }, [ref]);

  useEffect(() => {
    return () => {
      if (elementRef.current) {
        const _ref = elementRef.current;
        _ref.removeEventListener('mousedown', handleMouseDown);
        _ref.removeEventListener('mouseup', handleMouseUp);
        _ref.removeEventListener('mousemove', handleMouseMove);

        _ref.removeEventListener('touchstart', handleMouseDown);
        _ref.removeEventListener('touchend', handleMouseUp);
        _ref.removeEventListener('touchmove', handleMouseMove);
      }
    };
  }, []);

  return swipeState;
};

export default useSwipe;
