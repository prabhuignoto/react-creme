import React, { useRef } from "react";
import { Section } from "../../components";
import DemoPageRenderer from "../demo-page-renderer";
import useDraggable from "./../../components/common/effects/useDraggable";
import "./draggable.scss";

const DraggableWidget: React.FC<{
  outerWidth: number;
  width: number;
  outerHeight?: number;
  height?: number;
  bound?: boolean;
}> = ({ outerWidth, width, outerHeight, height, bound }) => {
  const ref = useRef();
  const boundRef = useRef();

  if (bound) {
    useDraggable(ref, boundRef);
  } else {
    useDraggable(ref);
  }

  return (
    <div
      style={{
        width: `${outerWidth}px`,
        height: `${outerHeight}px`,
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

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default">
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
        <div className="rc-demo-widget">
          <DraggableWidget
            outerWidth={400}
            outerHeight={300}
            width={100}
            height={100}
            bound
          />
        </div>
      </Section>
    </div>
  );
}

function Draggable() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      data={[]}
      tabTitles={["draggable"]}
    ></DemoPageRenderer>
  );
}

export default Draggable;
