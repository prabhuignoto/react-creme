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
  currentValue?: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  observeContainer?: boolean;
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
    currentValue = 0,
    observeContainer = false,
  }
) => {
  const dragStarted = useRef(false);
  const [percent, setPercent] = useState(0);

  const resizeObserver = useRef<ResizeObserver>();

  const maxXValue = useRef<number>(0);
  const maxYValue = useRef<number>(0);

  const handleDragStart = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      ev.preventDefault();

      if (ev.target === target.current) {
        dragStarted.current = true;
        onDragStart && onDragStart();
      }
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
            maxXValue.current - rnd(targetWidth / 2)
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
    if (observeContainer) {
      resizeObserver.current = new ResizeObserver((observer) => {
        const { width, height } = observer[0].contentRect;

        if (direction === "horizontal") {
          maxXValue.current = maxX || width;
        } else if (direction === "vertical") {
          maxYValue.current = maxY || height;
        }
      });

      container.current && resizeObserver.current.observe(container.current);
    }

    return () => {
      resizeObserver.current?.disconnect();
      container.current?.removeEventListener("mousemove", handleDrag);
      container.current?.removeEventListener("touchmove", handleDrag);

      container.current?.removeEventListener("mousedown", handleDragStart);
      container.current?.removeEventListener("touchstart", handleDragStart);

      container.current?.removeEventListener("mouseup", handleDragEnd);
      container.current?.removeEventListener("touchend", handleDragEnd);
    };
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
      const percent = currentValue
        ? (currentValue - offsetLeft) / endValue
        : (startValue - offsetLeft) / endValue;

      if (currentValue) {
        target.current.style.left = `${Math.round(
          clientWidth * (percent * offsetLeft)
        )}px`;
        setPercent(percent);
      } else {
        target.current.style.left = `${rnd(clientWidth * percent)}px`;
        setPercent(percent);
      }
    }

    container.current.addEventListener("mousemove", handleDrag);
    container.current.addEventListener("touchmove", handleDrag);

    container.current.addEventListener("mousedown", handleDragStart);
    container.current.addEventListener("touchstart", handleDragStart);

    container.current.addEventListener("mouseup", handleDragEnd);
    container.current.addEventListener("touchend", handleDragEnd);
  }, [target.current?.clientWidth, container]);

  return [percent, setPercent];
};

export { useDrag };
