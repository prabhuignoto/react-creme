import React, { useRef } from "react";
import useDraggable from "../../../components/common/effects/useDraggable";

export function BoundToContainer() {
  const ref = useRef();
  const boundRef = useRef();
  useDraggable(ref, { boundTo: boundRef });

  return (
    <div
      style={{
        width: `450px`,
        height: `350px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `100px`,
          height: `100px`,
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

  return (
    <div
      style={{
        width: `350px`,
        height: `300px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `100px`,
          height: `100px`,
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

  return (
    <div
      style={{
        width: `350px`,
        height: `300px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `100px`,
          height: `100px`,
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

  return (
    <div
      style={{
        width: `350px`,
        height: `300px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `50px`,
          height: `50px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
      <div
        style={{
          width: `50px`,
          height: `50px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
      <div
        style={{
          width: `50px`,
          height: `50px`,
        }}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
}
