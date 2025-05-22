import { useCallback, useEffect, useRef, useState } from 'react';
import { isTouchDevice } from '../utils';

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

type SwipeFunc = (swipeStrength?: SwipeStrength) => {
  onInit: (node: HTMLElement | null) => void;
  swipeState: SwipeState;
};

const useSwipe: SwipeFunc = (strength = 'medium') => {
  const swipeStarted = useRef<boolean>(false);
  const rect = useRef<DOMRect | null>(null);
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const endPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement | null>(null);
  const threshold = SwipeStrengthSettings[strength];
  const [swipeState, setSwipeState] = useState<SwipeState>({
    dir: 'NONE',
    offset: -1,
  });

  // Helper function to handle the start of a swipe
  const handleSwipeStart = useCallback((clientX: number, clientY: number) => {
    swipeStarted.current = true;
    const _rect = rect.current;
    if (_rect) {
      startPosition.current = {
        x: clientX - _rect.left,
        y: clientY - _rect.top,
      };
    }
  }, []);

  // Helper function to handle the end of a swipe
  const handleSwipeEnd = useCallback(() => {
    swipeStarted.current = false;

    const { x: startX, y: startY } = startPosition.current;
    const { x: endX, y: endY } = endPosition.current;
    const diffX = startX - endX;
    const diffY = startY - endY;

    if (rect.current && Math.abs(diffX) / rect.current.width < threshold) {
      return;
    }

    if (Math.abs(diffX) > Math.abs(diffY)) {
      setSwipeState({
        dir: diffX > 0 ? 'LEFT' : 'RIGHT',
        offset: Math.abs(diffX),
      });
    } else {
      setSwipeState({
        dir: diffY > 0 ? 'TOP' : 'BOTTOM',
        offset: Math.abs(diffY),
      });
    }
  }, [threshold]);

  // Helper function to handle swipe move
  const handleSwipeMove = useCallback((clientX: number, clientY: number) => {
    const _rect = rect.current;
    if (_rect) {
      endPosition.current = {
        x: clientX - _rect.left,
        y: clientY - _rect.top,
      };
    }
  }, []);

  // Handlers for mouse events
  const handleMouseDown = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      ev.preventDefault();
      const { clientX, clientY } = 'touches' in ev ? ev.touches[0] : ev;
      handleSwipeStart(clientX, clientY);
    },
    [handleSwipeStart]
  );

  const handleMouseUp = useCallback(() => {
    if (swipeStarted.current) {
      handleSwipeEnd();
    }
  }, [handleSwipeEnd]);

  const handleMouseMove = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      ev.preventDefault();
      const { clientX, clientY } = 'touches' in ev ? ev.touches[0] : ev;
      if (swipeStarted.current) {
        handleSwipeMove(clientX, clientY);
      }
    },
    [handleSwipeMove]
  );

  const onInit = useCallback(
    (node: HTMLElement | null) => {
      const ele = node as HTMLElement;
      if (ele) {
        elementRef.current = ele;
        rect.current = ele.getBoundingClientRect();

        const eventOptions = isTouchDevice ? { passive: true } : undefined;

        ele.addEventListener('mousedown', handleMouseDown);
        ele.addEventListener('mouseup', handleMouseUp);
        ele.addEventListener('mousemove', handleMouseMove);
        if (isTouchDevice) {
          ele.addEventListener('touchstart', handleMouseDown, eventOptions);
          ele.addEventListener('touchend', handleMouseUp, eventOptions);
          ele.addEventListener('touchmove', handleMouseMove, eventOptions);
        }
      }
    },
    [handleMouseDown, handleMouseUp, handleMouseMove]
  );

  useEffect(() => {
    const cleanup = () => {
      if (elementRef.current) {
        const _ref = elementRef.current;
        _ref.removeEventListener('mousedown', handleMouseDown);
        _ref.removeEventListener('mouseup', handleMouseUp);
        _ref.removeEventListener('mousemove', handleMouseMove);
        if (isTouchDevice) {
          _ref.removeEventListener('touchstart', handleMouseDown);
          _ref.removeEventListener('touchend', handleMouseUp);
          _ref.removeEventListener('touchmove', handleMouseMove);
        }
      }
    };
    return cleanup;
  }, [handleMouseDown, handleMouseUp, handleMouseMove]);

  return { onInit, swipeState };
};

export default useSwipe;
