import React from "react";
import { BlockQuote, Section } from "../../../components";
import {
  BoundToContainer,
  BoundToContainerHorizontal,
  BoundToContainerVertical,
  DraggableWidgets,
} from "./draggable-examples";

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Bound to Container">
        <BlockQuote>
          The draggable widget can be bound to a container. This means that the
          widget can only be dragged within the container.
        </BlockQuote>
        <div className="rc-demo-widget">
          <BoundToContainer />
        </div>
      </Section>
      <Section title="Restrict Drag in one Direction">
        <BlockQuote>
          The draggable widget can be restricted to only drag in one direction.
          In this example, the widget can only be dragged horizontally.
        </BlockQuote>
        <div className="rc-demo-widget">
          <BoundToContainerHorizontal />
        </div>
        <div className="rc-demo-widget">
          <BoundToContainerVertical />
        </div>
      </Section>
      <Section title="Multiple">
        <BlockQuote>
          You can also make all elements in a container draggable. This is
          useful if you have a container with multiple elements and you want to
          be able to drag them all. The example shows multiple drag targets
          bound to a container.
        </BlockQuote>
        <DraggableWidgets />
      </Section>
    </div>
  );
}

export default Widgets;
