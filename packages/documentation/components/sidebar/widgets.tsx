import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Searchable } from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isExtraLargeScreen) {
      setWidth(500);
    }
  }, [media]);
  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <BlockQuote>Sections are collapsible by default.</BlockQuote>
          <DemoWidget width={width} height={400}>
            {Default}
          </DemoWidget>
        </Section>
        <Section title="Search">
          <BlockQuote>
            Can optionally include a search bar for filtering the sidebar.
          </BlockQuote>
          <DemoWidget width={width} height={400}>
            {Searchable}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
