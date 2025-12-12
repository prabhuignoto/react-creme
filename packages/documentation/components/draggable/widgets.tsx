import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { responsiveState } from '../../atoms/home';
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
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(700);
    } else if (media.isBigScreen) {
      setWidth(600);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Container-bound dragging"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The draggable element is constrained within its container boundaries.
            Drag the box within the gray container.
          </Text>
          <HeaderCodeToggle.Content
            code={ContainerBound}
            language="jsx"
            componentName="useDraggable"
          >
            <DemoWidget name="useDraggable" width={width}>
              <BoundToContainer />
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Horizontal dragging"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Restrict dragging to horizontal movement only using the{' '}
            <code>dragDirection: 'HORIZONTAL'</code> option.
          </Text>
          <HeaderCodeToggle.Content
            code={ContainerBoundHorizontal}
            language="jsx"
            componentName="useDraggable"
          >
            <DemoWidget name="useDraggable" width={width}>
              <BoundToContainerHorizontal />
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Vertical dragging"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Restrict dragging to vertical movement only using the{' '}
            <code>dragDirection: 'VERTICAL'</code> option.
          </Text>
          <HeaderCodeToggle.Content
            code={ContainerBoundVertical}
            language="jsx"
            componentName="useDraggable"
          >
            <DemoWidget name="useDraggable" width={width}>
              <BoundToContainerVertical />
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Multiple draggable targets"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Enable dragging for multiple child elements by using the{' '}
            <code>makeChildrenDraggable: true</code> option. All children become
            independently draggable within the container.
          </Text>
          <HeaderCodeToggle.Content
            code={Multiple}
            language="jsx"
            componentName="useDraggable"
          >
            <DemoWidget name="useDraggable" width={width}>
              <DraggableWidgets />
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default Widgets;
