import React from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  BoundToContainer,
  BoundToContainerHorizontal,
  BoundToContainerVertical,
  DraggableWidgets,
} from './draggable-examples';
import {
  ContainerBound,
  ContainerBoundHorizontal,
  ContainerBoundVertical,
  Multiple,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Bound to Container">
        <BlockQuote>
          The draggable widget can be bound to a container. This means that the
          widget can only be dragged within the container.
        </BlockQuote>
        <DemoWidget codeString={ContainerBound}>
          <BoundToContainer />
        </DemoWidget>
      </Section>
      <Section title="Restrict Drag in one Direction - Horizontal">
        <BlockQuote>
          The draggable widget can be restricted to only drag in one direction.
          In this example, the widget can only be dragged horizontally.
        </BlockQuote>
        <DemoWidget codeString={ContainerBoundHorizontal}>
          <BoundToContainerHorizontal />
        </DemoWidget>
      </Section>
      <Section title="Restrict Drag in one Direction - Vertical">
        <DemoWidget codeString={ContainerBoundVertical}>
          <BoundToContainerVertical />
        </DemoWidget>
      </Section>
      <Section title="Multiple">
        <BlockQuote>
          You can also make all elements in a container draggable. This is
          useful if you have a container with multiple elements and you want to
          be able to drag them all. The example shows multiple drag targets
          bound to a container.
        </BlockQuote>
        <DemoWidget codeString={Multiple}>
          <DraggableWidgets />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
