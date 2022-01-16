import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import useDraggable from "../../../lib/components/common/effects/useDraggable";
import { responsiveState } from "../../atoms/home";

function useDimensions() {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });

  const media = useRecoilValue(responsiveState);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isExtraLargeScreen) {
      setDimensions({ height: 350, width: 700 });
    } else if (media.isBigScreen) {
      setDimensions({ height: 300, width: 600 });
    } else if (media.isDesktop) {
      setDimensions({ height: 250, width: 500 });
    } else if (media.isTablet) {
      setDimensions({ height: 200, width: 400 });
    } else if (media.isMobile) {
      setDimensions({ height: 200, width: 300 });
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
        height: `${dimensions.height}px`,
        padding: "1rem",
        width: `${dimensions.width}px`,
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
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
        height: `${dimensions.height}px`,
        padding: "1rem",
        width: `${dimensions.width}px`,
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
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
        height: `${dimensions.height}px`,
        padding: "1rem",
        width: `${dimensions.width}px`,
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
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
    boundTo: boundRef,
    makeChildrenDraggable: true,
  });

  const dimensions = useDimensions();

  return (
    <div
      style={{
        height: `${dimensions.height}px`,
        padding: "1rem",
        width: `${dimensions.width}px`,
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
      <div
        style={{
          height: `${dimensions.height / 3}px`,
          width: `${dimensions.width / 3}px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}
