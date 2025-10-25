import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
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

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Bound to Container" border={false}>
        <Text>
          The draggable widget can be bound to a container. This means that the
          widget can only be dragged within the container.
        </Text>
        <DemoWidget name="Draggable" codeString={ContainerBound}>
          <BoundToContainer />
        </DemoWidget>
      </Section>
      <Section size="md" title="Drag in one Direction - Horizontal" border={false}>
        <Text>
          The draggable widget can be restricted to only drag in one direction.
          In this example, the widget can only be dragged horizontally.
        </Text>
        <DemoWidget name="Draggable" codeString={ContainerBoundHorizontal}>
          <BoundToContainerHorizontal />
        </DemoWidget>
      </Section>
      <Section size="md" title="Drag in one Direction - Vertical" border={false}>
        <DemoWidget name="Draggable" codeString={ContainerBoundVertical}>
          <BoundToContainerVertical />
        </DemoWidget>
      </Section>
      <Section size="md" title="Multiple" border={false}>
        <Text>
          You can also make all elements in a container draggable. This is
          useful if you have a container with multiple elements and you want to
          be able to drag them all. The example shows multiple drag targets
          bound to a container.
        </Text>
        <DemoWidget name="Draggable" codeString={Multiple}>
          <DraggableWidgets />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
