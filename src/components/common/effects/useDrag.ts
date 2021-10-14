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
    minX?: number;
    minY?: number;
    maxY?: number;
  }
) => [number, Dispatch<SetStateAction<number>>];

const { max, min } = Math;

const useDrag: functionType = (
  container,
  target,
  { direction, maxX, maxY, minX = 0, minY = 0 }
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
          left + targetWidth <= maxXValue.current &&
          left + targetWidth >= minX
        ) {
          target.current.style.left = `${left}px`;

          const percent = (left + targetWidth) / parentWidth;
          setPercent(percent);
        }
      } else if (direction === "vertical") {
        const top = max(0, ev.clientY - (parentTop || 0));

        if (
          top + targetHeight <= maxYValue.current &&
          top + targetHeight >= minY
        ) {
          target.current.style.top = `${top}px`;

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
