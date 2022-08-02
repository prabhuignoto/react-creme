import { useLayoutEffect, useState } from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import {
  AutoClosingSections,
  CustomIcon,
  Default,
  IconCustomPositioning,
  InitialState,
  LargeSized,
  MediumSized,
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

  return (
    width > 0 && (
      <div className="rc-demo-widgets" style={{ minHeight: '1200px' }}>
        <Section title="Default Render" size="md">
          <DemoWidget name="AccordionGroup" width={width}>
            {Default}
          </DemoWidget>
        </Section>
        <Section title="Initial state" size="md">
          <BlockQuote>
            Set a default state for the AccordionGroup on load. This is useful
            if you want to keep the accordions closed or open on load. The
            example shows the accordions open on load
          </BlockQuote>
          <DemoWidget name="AccordionGroup" width={width}>
            {InitialState}
          </DemoWidget>
        </Section>
        <Section title="Auto Closing Sections" size="md">
          <BlockQuote>
            The AccordionGroup can be configured to close all other sections
            when one is open.
          </BlockQuote>
          <DemoWidget name="AccordionGroup" width={width}>
            {AutoClosingSections}
          </DemoWidget>
        </Section>
        <Section title="Custom Icon" size="md">
          <BlockQuote>
            The AccordionGroup can be configured to use custom icons and the
            alignment of the icon can be changed.
          </BlockQuote>
          <DemoWidget name="AccordionGroup" width={width}>
            {CustomIcon}
          </DemoWidget>
        </Section>
        <Section title="Icon Positioning" size="md">
          <DemoWidget name="AccordionGroup" width={width}>
            {IconCustomPositioning}
          </DemoWidget>
        </Section>
        <Section title="Custom Sizes" size="md">
          <DemoWidget name="AccordionGroup" width={width}>
            {MediumSized}
          </DemoWidget>
          <DemoWidget name="AccordionGroup" width={width}>
            {LargeSized}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
