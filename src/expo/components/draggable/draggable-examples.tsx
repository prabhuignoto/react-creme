import React, { useEffect, useRef } from "react";
import useDraggable from "../../../components/common/effects/useDraggable";
import useMedia from "../../common/useMedia";

function useDimensions() {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const media = useMedia();

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isExtraLargeScreen) {
      setDimensions({ width: 700, height: 350 });
    } else if (media.isBigScreen) {
      setDimensions({ width: 600, height: 300 });
    } else if (media.isDesktop) {
      setDimensions({ width: 500, height: 250 });
    } else if (media.isTablet) {
      setDimensions({ width: 400, height: 200 });
    } else if (media.isMobile) {
      setDimensions({ width: 300, height: 200 });
    }
  }, [media]);

  return dimensions;
}

export function BoundToContainer() {
  const ref = useRef();
  const boundRef = useRef();
  useDraggable(ref, { boundTo: boundRef });

  const dimensions = useDimensions();

  return (
    <div
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `${dimensions.width / 3}px`,
          height: `${dimensions.height / 3}px`,
        }}
        ref={ref}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}

export function BoundToContainerHorizontal() {
  const ref = useRef();
  const boundRef = useRef();
  useDraggable(ref, { boundTo: boundRef, dragDirection: "HORIZONTAL" });

  const dimensions = useDimensions();

  return (
    <div
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `${dimensions.width / 3}px`,
          height: `${dimensions.height / 3}px`,
        }}
        ref={ref}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}

export function BoundToContainerVertical() {
  const ref = useRef();
  const boundRef = useRef();
  useDraggable(ref, { boundTo: boundRef, dragDirection: "VERTICAL" });
  const dimensions = useDimensions();

  return (
    <div
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `${dimensions.width / 3}px`,
          height: `${dimensions.height / 3}px`,
        }}
        ref={ref}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}

export function DraggableWidgets() {
  const boundRef = useRef();

  useDraggable(boundRef, {
    makeChildrenDraggable: true,
    boundTo: boundRef,
  });

  const dimensions = useDimensions();

  return (
    <div
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `${dimensions.width / 3}px`,
          height: `${dimensions.height / 3}px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
      <div
        style={{
          width: `${dimensions.width / 3}px`,
          height: `${dimensions.height / 3}px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
      <div
        style={{
          width: `${dimensions.width / 3}px`,
          height: `${dimensions.height / 3}px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}
