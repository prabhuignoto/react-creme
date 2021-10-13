import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type functionType = (
  container: RefObject<HTMLElement>,
  dragTarget: RefObject<HTMLElement>,
  settings: {
    direction: "horizontal" | "vertical";
    maxX?: number;
    maxY?: number;
  }
) => [number, Dispatch<SetStateAction<number>>];

const useDrag: functionType = (
  container,
  target,
  { direction, maxX, maxY }
) => {
  const dragStarted = useRef(false);
  const [percent, setPercent] = useState(0);

  const leftValue = useRef(0);
  const topValue = useRef(0);

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
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight,
      } = container.current;
      const {
        left: containerLeft,
        top: containerTop,
      } = container.current.getBoundingClientRect();
      const {
        clientWidth: targetWidth,
        clientHeight: targetHeight,
      } = target.current;

      if (direction === "horizontal") {
        const left = Math.max(0, ev.clientX - (containerLeft || 0));

        if (left === 0) {
          setPercent(0);
        } else if (left + targetWidth <= maxXValue.current) {
          target.current.style.left = `${left}px`;
          leftValue.current = left;

          const percent = (left + targetWidth) / containerWidth;
          setPercent(percent);
        }
      } else if (direction === "vertical") {
        const top = Math.max(0, ev.clientY - (containerTop || 0));

        if (top + targetHeight <= maxYValue.current) {
          target.current.style.top = `${top}px`;
          topValue.current = top;

          const percent = (top + targetHeight) / containerHeight;
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

    if (!maxX) {
      maxXValue.current = container.current.clientWidth;
    } else {
      maxXValue.current = maxX;
    }

    if (!maxY) {
      maxYValue.current = container.current.clientHeight;
    } else {
      maxYValue.current = maxY;
    }

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mousedown", handleDragStart, { capture: true });
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
