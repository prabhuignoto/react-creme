import React, { useLayoutEffect } from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import {
  AutoClosingSections,
  CustomIcon,
  Default,
  InitialState,
} from './widget-variants';

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

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
        <Section title="Default Render">
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Initial state">
          <BlockQuote>
            Set a default state for the AccordionGroup on load. This is useful
            if you want to keep the accordions closed or open on load. The
            example shows the accordions open on load
          </BlockQuote>
          <DemoWidget width={width}>{InitialState}</DemoWidget>
        </Section>
        <Section title="Auto Closing Sections">
          <BlockQuote>
            The AccordionGroup can be configured to close all other sections
            when one is open.
          </BlockQuote>
          <DemoWidget width={width}>{AutoClosingSections}</DemoWidget>
        </Section>
        <Section title="Custom Icon">
          <BlockQuote>
            The AccordionGroup can be configured to use custom icons and the
            alignment of the icon can be changed.
          </BlockQuote>
          <DemoWidget width={width}>{CustomIcon}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
