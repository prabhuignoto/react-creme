import { useLayoutEffect, useState } from 'react';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import {
  AutoClosing,
  CustomIconCode,
  DefaultCode,
  InitialStateCode,
  MediumSizedCode,
  RTLCode,
} from './code-strings';
import {
  AutoClosingSections,
  CustomIcon,
  Default,
  InitialState,
  LargeSized,
  MediumSized,
  RTL,
} from './widget-variants';

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(500);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(330);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets" style={{ minHeight: '1200px' }}>
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={DefaultCode}
            language="jsx"
            componentName="AccordionGroup"
          >
            <DemoWidget name="AccordionGroup" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Initial state"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Set a default state for the AccordionGroup on load. This is useful
            if you want to keep the accordions closed or open on load. The
            example shows the accordions open on load
          </Text>
          <HeaderCodeToggle.Content
            code={InitialStateCode}
            language="jsx"
            componentName="AccordionGroup"
          >
            <DemoWidget name="AccordionGroup" width={width}>
              {InitialState}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Auto Closing Sections"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The AccordionGroup can be configured to close all other sections
            when one is open.
          </Text>
          <HeaderCodeToggle.Content
            code={AutoClosing}
            language="jsx"
            componentName="AccordionGroup"
          >
            <DemoWidget name="AccordionGroup" width={width}>
              {AutoClosingSections}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom Icon"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The AccordionGroup can be configured to use custom icons and the
            alignment of the icon can be changed.
          </Text>
          <HeaderCodeToggle.Content
            code={CustomIconCode}
            language="jsx"
            componentName="AccordionGroup"
          >
            <DemoWidget name="AccordionGroup" width={width}>
              {CustomIcon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="RTL"
          RTL
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={RTLCode}
            language="jsx"
            componentName="AccordionGroup"
          >
            <DemoWidget name="AccordionGroup" width={width}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom Sizes"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={MediumSizedCode}
            language="jsx"
            componentName="AccordionGroup"
          >
            <DemoWidget name="AccordionGroup" width={width}>
              {MediumSized}
            </DemoWidget>
            <DemoWidget name="AccordionGroup" width={width}>
              {LargeSized}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default Widgets;
