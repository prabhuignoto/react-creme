import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Section, Text } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  Animate,
  Circle,
  CustomBlockCount,
  CustomRowAndHeight,
  Default,
  RTL,
} from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

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

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default rendering">
        <DemoWidget name="Skeleton" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="With Circle">
        <Text>Optional Circle figure can be added to the skeleton</Text>
        <DemoWidget name="Skeleton" width={width}>
          {Circle}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom row count and height">
        <Text>
          The height of each row and the height of it can be customized.
        </Text>
        <DemoWidget name="Skeleton" width={width}>
          {CustomRowAndHeight}
        </DemoWidget>
      </Section>
      <Section size="md" title="Animated rows">
        <Text>
          Use the <code>animate</code> prop to animate the skeleton.
        </Text>
        <DemoWidget name="Skeleton" width={width}>
          {Animate}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom block count">
        <Text>
          A collection of Skeleton is a block. with the <code>blocks</code> prop
          we can also customize the number of blocks we want to be displayed.
          The example shows how to create 2 blocks with 4 rows per block.
        </Text>
        <DemoWidget name="Skeleton" width={width}>
          {CustomBlockCount}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="Skeleton" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
