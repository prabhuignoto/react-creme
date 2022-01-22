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

  const Para = () => (
    <p>
      Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit amet justo
      vel, convallis volutpat neque. Morbi semper odio sed diam tristique, nec
      tempor neque tempus. Praesent quis ultrices odio. Nulla vestibulum nulla
      sed massa molestie, quis vulputate risus semper. Phasellus elementum,
      metus in iaculis sollicitudin, risus elit pulvinar neque, eget pulvinar
      odio libero eu mi. Vivamus id leo facilisis, tincidunt lacus semper,
      condimentum est. Nam euismod non eros a lacinia.
    </p>
  );

  return (
    width > 0 && (
      <div className="rc-demo-widgets" style={{ minHeight: '1200px' }}>
        <Section title="Default Render">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Default />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Initial state">
          <BlockQuote>
            Set a default state for the AccordionGroup on load. This is useful
            if you want to keep the accordions closed or open on load. The
            example shows the accordions open on load
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <InitialState />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Auto Closing Sections">
          <BlockQuote>
            The AccordionGroup can be configured to close all other sections
            when one is open.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <AutoClosingSections />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Custom Icon">
          <BlockQuote>
            The AccordionGroup can be configured to use custom icons and
            alignment
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <CustomIcon />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
