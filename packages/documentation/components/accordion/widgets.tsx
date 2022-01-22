import React, { useEffect } from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import { CustomIcon, Default, Expanded } from './widgets-variants';

function widgets() {
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
        <Section title="Default render">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Default />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Custom Icon alignment">
          <BlockQuote>The icon can be aligned to the right</BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <CustomIcon />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Expanded by default">
          <BlockQuote>
            Accordions can be expanded or collapsed by default
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Expanded />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
