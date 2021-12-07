import React, { useRef } from "react";
import { BlockQuote, Section } from "../../components";
import useDraggable from "../../components/common/effects/useDraggable";

const DraggableWidget: React.FC<{
  outerWidth: number;
  width: number;
  outerHeight?: number;
  height?: number;
  bound?: boolean;
  draggableChildren?: boolean;
  direction?: "horizontal" | "vertical";
}> = ({
  outerWidth,
  width,
  outerHeight,
  height,
  bound,
  draggableChildren,
  direction,
}) => {
  const ref = useRef();
  const boundRef = useRef();

  if (bound) {
    useDraggable(ref, {
      boundTo: boundRef,
    });
  } else if (direction) {
    useDraggable(ref, { dragDirection: "HORIZONTAL", boundTo: boundRef });
  } else if (draggableChildren) {
    useDraggable(ref, { makeChildrenDraggable: true });
  } else {
    useDraggable(ref);
  }

  return (
    <div
      style={{
        width: `${outerWidth}px`,
        height: `${outerHeight}px`,
        padding: "1rem",
      }}
      ref={boundRef}
      className="rc-demo-drag-outer-box"
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        ref={ref}
        className="rc-demo-drag-inner-box"
      ></div>
    </div>
  );
};

const DraggableWidgets: React.FunctionComponent<{
  outerWidth: number;
  outerHeight: number;
}> = ({ outerWidth, outerHeight }) => {
  const ref = useRef();

  useDraggable(ref, {
    makeChildrenDraggable: true,
  });

  return (
    <div
      style={{
        width: `${outerWidth}px`,
        height: `${outerHeight}px`,
      }}
      ref={ref}
      className="rc-demo-drag-outer-box"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          style={{
            width: `50px`,
            height: `50px`,
          }}
          className="rc-demo-drag-inner-box"
        ></div>
      ))}
    </div>
  );
};

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default">
        <BlockQuote>
          By default, the drag target can be moved freely and placed anywhere on
          the screen.
        </BlockQuote>
        <div className="rc-demo-widget">
          <DraggableWidget
            outerWidth={400}
            outerHeight={300}
            width={100}
            height={100}
          />
        </div>
      </Section>
      <Section title="Bound to Container">
        <BlockQuote>
          The draggable widget can be bound to a container. This means that the
          widget can only be dragged within the container.
        </BlockQuote>
        <div className="rc-demo-widget">
          <DraggableWidget
            outerWidth={400}
            outerHeight={300}
            width={120}
            height={100}
            bound
          />
        </div>
      </Section>
      <Section title="Restrict Drag in one Direction">
        <BlockQuote>
          The draggable widget can be restricted to only drag in one direction.
          In this example, the widget can only be dragged horizontally.
        </BlockQuote>
        <div className="rc-demo-widget">
          <DraggableWidget
            outerWidth={400}
            outerHeight={300}
            width={120}
            height={100}
            direction="horizontal"
            bound={null}
          />
        </div>
      </Section>
      <Section title="Multiple">
        <BlockQuote>
          You can also make all elements in a container draggable. This is
          useful if you have a container with multiple elements and you want to
          be able to drag them all. The example shows multiple drag targets
          bound to a container.
        </BlockQuote>
        <DraggableWidgets outerWidth={400} outerHeight={300} />
      </Section>
    </div>
  );
}

export default Widgets;
