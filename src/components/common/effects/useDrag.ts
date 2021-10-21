import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface Settings {
  direction: "horizontal" | "vertical";
  maxX?: number;
  minX?: number;
  minY?: number;
  maxY?: number;
  startValue?: number;
  endValue?: number;
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
  { direction, maxX, maxY, minX = 0, minY = 0, startValue, endValue }
) => {
  const dragStarted = useRef(false);
  const [percent, setPercent] = useState(0);

  const maxXValue = useRef<number>(0);
  const maxYValue = useRef<number>(0);

  const handleDragStart = useCallback(
    (ev: MouseEvent) => {
      ev.preventDefault();

      if (ev.target === target.current) {
        dragStarted.current = true;
      }
    },
    [target]
  );

  const handleDrag = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    if (dragStarted.current && target.current && container.current) {
      const { clientWidth: parentWidth, clientHeight: parentHeight } =
        container.current;
      const { left: parentLeft, top: parentTop } =
        container.current.getBoundingClientRect();
      const { clientWidth: targetWidth, clientHeight: targetHeight } =
        target.current;

      if (direction === "horizontal") {
        const left = max(0, ev.clientX - (parentLeft || 0));

        if (left === 0) {
          setPercent(0);
        } else if (
          // left + targetWidth <= maxXValue.current &&
          left <= maxXValue.current &&
          left + targetWidth >= minX
        ) {
          target.current.style.left = `${left - Math.round(targetWidth / 2)}px`;

          // const percent = (left + targetWidth) / parentWidth;
          const percent = left / parentWidth;
          setPercent(percent);
        }
      } else if (direction === "vertical") {
        const top = max(0, ev.clientY - (parentTop || 0));

        if (
          top + targetHeight <= maxYValue.current &&
          top + targetHeight >= minY
        ) {
          target.current.style.top = `${top - Math.round(targetHeight / 2)}px`;

          const percent = (top + targetHeight) / parentHeight;
          setPercent(percent);
        }
      }
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    dragStarted.current = false;
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
      const percent = startValue / endValue;
      target.current.style.left = `${Math.round(clientWidth * percent)}px`;
      setPercent(percent);
    }

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mousedown", handleDragStart);
    document.addEventListener("mouseup", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mousedown", handleDragStart);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [target, container]);

  return [percent, setPercent];
};

export { useDrag };
