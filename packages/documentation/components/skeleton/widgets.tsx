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
            Optional Circle figure can be added to the skeleton
          </BlockQuote>
          <DemoWidget width={width}>{Circle}</DemoWidget>
        </Section>
        <Section title="Custom row count and height" size="md">
          <BlockQuote>
            The height of each row and the height of it can be customized.
          </BlockQuote>
          <DemoWidget width={width}>{CustomRowAndHeight}</DemoWidget>
        </Section>
        <Section title="Animated rows" size="md">
          <BlockQuote>
            Use the <code>animate</code> prop to animate the skeleton.
          </BlockQuote>
          <DemoWidget width={width}>{Animate}</DemoWidget>
        </Section>
        <Section title="Custom block count" size="md">
          <BlockQuote>
            A collection of Skeleton is a block. with the <code>blocks</code>{' '}
            prop we can also customize the number of blocks we want to be
            displayed. The example shows how to create 2 blocks with 4 rows per
            block.
          </BlockQuote>
          <DemoWidget width={width}>{CustomBlockCount}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
