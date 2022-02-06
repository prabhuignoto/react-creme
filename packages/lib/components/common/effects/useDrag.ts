import { useCallback, useEffect, useRef, useState } from 'react';
import isTouchDevice from '../utils';
import { useDragFunctionType } from './use-drag-settings-model';

const rnd = Math.round;

const isTouch = isTouchDevice();

const { max, min } = Math;

const useDrag: useDragFunctionType = (
  container,
  target,
  {
    direction,
    maxX,
    maxY,
    minX = 0,
    minY = 0,
    startValue = 0,
    endValue = 0,
    offsetLeft = 0,
    onDragEnd,
    onDragStart,
    currentValue = 0,
    observeContainer = false,
    moveToPositionOnClick = false,
  }
) => {
  const dragStarted = useRef(false);
  const [percent, setPercent] = useState(rnd(startValue / endValue));

  const containerRect = useRef<DOMRect>();
  const resizeObserver = useRef<ResizeObserver>();

  const dragStartTimer = useRef<number>();

  const maxXValue = useRef<number>(0);
  const maxYValue = useRef<number>(0);
  const trackerValue = useRef<number>(currentValue);

  /**
   * Event handler for drag start operation
   */
  const handleDragStart = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      if (ev.target === target.current) {
        // detect if the user intended a drag operation
        dragStartTimer.current = window.setTimeout(() => {
          dragStarted.current = true;
          onDragStart && onDragStart();
        }, 30);

        // get the bounding client rect
        if (container.current) {
          containerRect.current = container.current.getBoundingClientRect();
        }
      }
    },
    [target]
  );

  /**
   * Event handler for keyboard based drag operation
   */
  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      ev.stopPropagation();
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
        ev.preventDefault();

        if (!endValue || !target.current || !container.current) {
          return;
        }

        const trackerVal = trackerValue.current;

        console.log(trackerVal);

        if (ev.key === 'ArrowLeft' && startValue) {
          if (trackerVal > Math.max(trackerVal - startValue, 0)) {
            trackerValue.current -= 1;
          }
        } else if (ev.key === 'ArrowRight' && endValue) {
          if (trackerVal < endValue) {
            trackerValue.current += 1;
          }
        }

        const newPercent = trackerValue.current / endValue;

        setPercent(newPercent);
      }
    },
    [percent]
  );

  /**
   * Event handler for drag operation
   */
  const handleDrag = useCallback((ev: MouseEvent | TouchEvent) => {
    if (dragStarted.current && target.current && container.current) {
      ev.preventDefault();
      const {
        left: parentLeft,
        top: parentTop,
        width: parentWidth,
        height: parentHeight,
      } = containerRect.current as DOMRect;

      let clientX = 0;
      let clientY = 0;

      if (ev instanceof MouseEvent) {
        clientX = (ev as MouseEvent).clientX;
        clientY = (ev as MouseEvent).clientY;
      } else if (ev instanceof TouchEvent) {
        clientX = (ev as TouchEvent).touches[0].clientX;
        clientY = (ev as TouchEvent).touches[0].clientY;
      }

      // calculate the target's position for both horizontal and vertical mode.
      if (direction === 'horizontal') {
        const left = max(0, clientX - (parentLeft || 0));

        if (left < offsetLeft) {
          setPercent(0);
        } else if (left <= maxXValue.current && left >= minX) {
          const percent = left / parentWidth;
          setPercent(percent);
        } else if (left >= maxXValue.current) {
          const percent = maxXValue.current / parentWidth;
          setPercent(percent);
        }
      } else if (direction === 'vertical') {
        const top = max(0, clientY - (parentTop || 0));

        if (top <= maxYValue.current && top >= minY) {
          target.current.style.top = `${top}px`;

          const percent = (top - rnd(offsetLeft * 0.5)) / parentHeight;
          setPercent(percent);
        }
      }
    }
  }, []);

  const handleClick = (ev: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;

    if (ev instanceof MouseEvent) {
      clientX = (ev as MouseEvent).clientX;
      clientY = (ev as MouseEvent).clientY;
    } else if (ev instanceof TouchEvent) {
      clientX = (ev as TouchEvent).touches[0].clientX;
      clientY = (ev as TouchEvent).touches[0].clientY;
    }

    if (container.current) {
      const { left, width, height, top } =
        container.current.getBoundingClientRect();
      ev.stopPropagation();
      let clickedPosition;
      let percent = 0;

      if (direction === 'horizontal') {
        clickedPosition = clientX - left;
        percent = clickedPosition / width;
      } else if (direction === 'vertical') {
        clickedPosition = clientY - top;
        percent = clickedPosition / height;
      }

      if (target.current) {
        setPercent(percent);
        target.current.focus();
      }
    }
  };

  useEffect(() => {
    if (target.current && container.current) {
      const { clientWidth: containerWidth, clientHeight: containerHeight } =
        container.current;

      if (direction === 'horizontal') {
        const offset = rnd(target.current.clientWidth / 2);
        target.current.style.left = containerWidth * percent - offset + 'px';
      } else if (direction === 'vertical') {
        const offset = rnd(target.current.clientHeight / 2);
        target.current.style.top = containerHeight * percent - offset + 'px';
      }

      trackerValue.current = rnd(percent * (endValue || 0));
    }
  }, [percent]);

  /**
   * Event handler for drag end operation
   */
  const handleDragEnd = useCallback(() => {
    window.clearTimeout(dragStartTimer.current);
    dragStarted.current = false;
    onDragEnd && onDragEnd();
  }, []);

  /**
   * onMount operation
   */
  useEffect(() => {
    if (observeContainer) {
      resizeObserver.current = new ResizeObserver(observer => {
        const { width, height } = observer[0].contentRect;

        if (direction === 'horizontal') {
          maxXValue.current = maxX || width;
        } else if (direction === 'vertical') {
          maxYValue.current = maxY || height;
        }
      });

      container.current && resizeObserver.current.observe(container.current);
    }

    /**
     * cleanup event handlers
     */
    return () => {
      resizeObserver.current?.disconnect();
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);

      document.removeEventListener('mousedown', handleDragStart);
      document.removeEventListener('touchstart', handleDragStart);

      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);

      if (moveToPositionOnClick) {
        container.current?.removeEventListener('click', handleClick);
      }
    };
  }, []);

  useEffect(() => {
    if (!target.current || !container.current) {
      return;
    }

    const _target = target.current;
    const _container = container.current;

    const setup = () => {
      if (!_target || !_container) {
        return;
      }

      container.current.style.userSelect = 'none';

      const { clientHeight, clientWidth } = container.current;

      if (!maxX) {
        maxXValue.current = clientWidth;
      } else {
        maxXValue.current = min(maxX, clientWidth);
      }

      if (!maxY) {
        maxYValue.current = clientHeight;
      } else {
        maxYValue.current = min(maxY, clientHeight);
      }

      if (startValue && endValue) {
        const percent = currentValue
          ? (currentValue - startValue) / (endValue - startValue)
          : 0;

        if (currentValue) {
          target.current.style.left = `${Math.round(clientWidth * percent)}px`;
          setPercent(percent);
        } else {
          target.current.style.left = `${rnd(clientWidth * percent)}px`;
          setPercent(percent);
        }
      }

      //wire up event handlers

      if (isTouch) {
        document.addEventListener('touchmove', handleDrag);
        document.addEventListener('touchstart', handleDragStart);
        document.addEventListener('touchend', handleDragEnd);
        target.current.removeEventListener('keydown', handleKeyDown);
      } else {
        document.addEventListener('mousedown', handleDragStart);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('mousemove', handleDrag);
        target.current.addEventListener('keydown', handleKeyDown);
      }

      if (moveToPositionOnClick) {
        container.current.addEventListener('click', handleClick);
      }
    };

    setup();
  }, [target, container]);

  return [percent, setPercent];
};

export { useDrag };
