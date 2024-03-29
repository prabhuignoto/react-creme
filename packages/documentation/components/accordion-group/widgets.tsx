import { useLayoutEffect, useState } from 'react';
import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import {
  AutoClosing,
  CustomIconCode,
  DefaultCode,
  InitialStateCode,
  LargeSizedCode,
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
      <Section size="md" title="Default">
        <DemoWidget
          name="AccordionGroup"
          width={width}
          codeString={DefaultCode}
        >
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Initial state">
        <Text>
          Set a default state for the AccordionGroup on load. This is useful if
          you want to keep the accordions closed or open on load. The example
          shows the accordions open on load
        </Text>
        <DemoWidget
          name="AccordionGroup"
          width={width}
          codeString={InitialStateCode}
        >
          {InitialState}
        </DemoWidget>
      </Section>
      <Section size="md" title="Auto Closing Sections">
        <Text>
          The AccordionGroup can be configured to close all other sections when
          one is open.
        </Text>
        <DemoWidget
          name="AccordionGroup"
          width={width}
          codeString={AutoClosing}
        >
          {AutoClosingSections}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Icon">
        <Text>
          The AccordionGroup can be configured to use custom icons and the
          alignment of the icon can be changed.
        </Text>
        <DemoWidget
          name="AccordionGroup"
          width={width}
          codeString={CustomIconCode}
        >
          {CustomIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="AccordionGroup" width={width} codeString={RTLCode}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Sizes">
        <DemoWidget
          name="AccordionGroup"
          width={width}
          codeString={MediumSizedCode}
        >
          {MediumSized}
        </DemoWidget>
        <DemoWidget
          name="AccordionGroup"
          width={width}
          codeString={LargeSizedCode}
        >
          {LargeSized}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
