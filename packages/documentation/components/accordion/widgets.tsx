import React, { useEffect } from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import { CustomIcon, Default, Expanded } from './widgets-variants';

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(700);
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return (
    width > 0 && (
      <div style={{ minHeight: '1200px' }} className="rc-demo-widgets">
        <Section title="Default render" size="md">
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Custom Icon alignment" size="md">
          <BlockQuote>The icon can be aligned to the right</BlockQuote>
          <DemoWidget width={width}>{CustomIcon}</DemoWidget>
        </Section>
        <Section title="Accordion expanded by default" size="md">
          <BlockQuote>
            Accordions can be expanded or collapsed by default. The example
            shows a accordion expanded by default.
          </BlockQuote>
          <DemoWidget width={width}>{Expanded}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export { Widgets };
