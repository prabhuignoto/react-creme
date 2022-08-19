import { BlockQuote, Section } from '@core';
import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Default,
  MultiSelection,
  Search,
  Virtualized,
} from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(500);
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render" size="md">
          <DemoWidget name="List" width={width}>
            {Default}
          </DemoWidget>
        </Section>
        <Section title="Multi selection mode" size="md">
          <BlockQuote>
            In Multi selection mode you can select multiple items.
          </BlockQuote>
          <DemoWidget name="List" width={width}>
            {MultiSelection}
          </DemoWidget>
        </Section>
        <Section title="Searchable list" size="md">
          <BlockQuote>
            With searchable list items can be quickly searched.
          </BlockQuote>
          <DemoWidget name="List" width={width} showCodeByDefault={false}>
            {Search}
          </DemoWidget>
        </Section>
        <Section title="Virtualized" size="md">
          <BlockQuote>
            The virtualized list is a performance improvement over the default
            rendering. It renders only the visible items
          </BlockQuote>
          <DemoWidget name="List" width={width} showCodeByDefault={false}>
            {Virtualized}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
