import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Animate,
  Circle,
  CustomBlockCount,
  CustomRowAndHeight,
  Default,
} from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isExtraLargeScreen) {
      setWidth(650);
    } else if (media.isBigScreen) {
      setWidth(550);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default rendering" size="md">
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="With Circle" size="md">
          <BlockQuote>
            A circle can be added to the Skeleton to make it more visible.
          </BlockQuote>
          <DemoWidget width={width}>{Circle}</DemoWidget>
        </Section>
        <Section title="Custom row count and height" size="md">
          <BlockQuote>The height and row count can be customized.</BlockQuote>
          <DemoWidget width={width}>{CustomRowAndHeight}</DemoWidget>
        </Section>
        <Section title="Animated rows" size="md">
          <BlockQuote>
            The rows can be animated by setting the <code>animate</code> prop
          </BlockQuote>
          <DemoWidget width={width}>{Animate}</DemoWidget>
        </Section>
        <Section title="Custom block count" size="md">
          <BlockQuote>Can customize the number of blocks</BlockQuote>
          <DemoWidget width={width}>{CustomBlockCount}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
