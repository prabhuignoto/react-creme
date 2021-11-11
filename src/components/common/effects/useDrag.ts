import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const rnd = Math.round;

interface Settings {
  direction: "horizontal" | "vertical";
  maxX?: number;
  minX?: number;
  minY?: number;
  maxY?: number;
  startValue?: number;
  endValue?: number;
  offsetLeft?: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

type functionType = (
  container: RefObject<HTMLElement>,
  dragTarget: RefObject<HTMLElement>,
  settings: Settings
) => [number, Dispatch<SetStateAction<number>>];

const { max, min } = Math;

const useDrag: functionType = (
  container,
  target,
  {
    direction,
    maxX,
    maxY,
    minX = 0,
    minY = 0,
    startValue,
    endValue,
    offsetLeft = 0,
    onDragEnd,
    onDragStart,
  }
) => {
  const dragStarted = useRef(false);
  const [percent, setPercent] = useState(0);

  const maxXValue = useRef<number>(0);
  const maxYValue = useRef<number>(0);

  const handleDragStart = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      ev.preventDefault();

      if (ev.target === target.current) {
        dragStarted.current = true;
      }

      onDragStart && onDragStart();
    },
    [target]
  );

  const handleDrag = useCallback((ev: MouseEvent | TouchEvent) => {
    ev.preventDefault();

    if (dragStarted.current && target.current && container.current) {
      const { clientWidth: parentWidth, clientHeight: parentHeight } =
        container.current;
      const { left: parentLeft, top: parentTop } =
        container.current.getBoundingClientRect();
      const { clientWidth: targetWidth, clientHeight: targetHeight } =
        target.current;

      let clientX = 0;
      let clientY = 0;

      if (ev instanceof MouseEvent) {
        clientX = (ev as MouseEvent).clientX;
        clientY = (ev as MouseEvent).clientY;
      } else if (ev instanceof TouchEvent) {
        clientX = (ev as TouchEvent).touches[0].clientX;
        clientY = (ev as TouchEvent).touches[0].clientY;
      }

      if (direction === "horizontal") {
        const left = max(0, clientX - (parentLeft || 0));

        if (left <= 0) {
          setPercent(0);
          target.current.style.left = `${minX || -rnd(targetWidth / 2)}px`;
        } else if (left <= maxXValue.current && left >= minX) {
          target.current.style.left = `${left - rnd(targetWidth / 2)}px`;

          const percent = left / parentWidth;
          setPercent(percent);
        } else if (left >= maxXValue.current) {
          setPercent(maxXValue.current / parentWidth);
          target.current.style.left = `${
            maxXValue.current || Math.round(parentWidth - targetWidth / 2)
          }px`;
        }
      } else if (direction === "vertical") {
        const top = max(0, clientY - (parentTop || 0));

        if (
          top + targetHeight <= maxYValue.current &&
          top + targetHeight >= minY
        ) {
          target.current.style.top = `${top - rnd(targetHeight / 2)}px`;

          const percent = (top + targetHeight) / parentHeight;
          setPercent(percent);
        }
      }
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    dragStarted.current = false;

    onDragEnd && onDragEnd();
  }, []);

  useEffect(() => {
    if (!target.current || !container.current) {
      return;
    }

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
      const percent = (startValue - offsetLeft) / endValue;
      target.current.style.left = `${rnd(clientWidth * percent)}px`;
      setPercent(percent);
    }

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchmove", handleDrag);

    document.addEventListener("mousedown", handleDragStart);
    document.addEventListener("touchstart", handleDragStart);

    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("touchmove", handleDrag);

      document.removeEventListener("mousedown", handleDragStart);
      document.removeEventListener("touchstart", handleDragStart);

      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [target, container]);

  return [percent, setPercent];
};

export { useDrag };
