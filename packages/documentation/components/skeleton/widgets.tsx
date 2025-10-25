import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
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

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function widgets() {
  const media = useAtomValue(responsiveState);
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
      <Section size="md" title="Default rendering" border={false}>
        <DemoWidget name="Skeleton" width={width} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="With Circle" border={false}>
        <Text>Optional Circle figure can be added to the skeleton</Text>
        <DemoWidget name="Skeleton" width={width} showCodeByDefault>
          {Circle}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom row count and height" border={false}>
        <Text>
          The height of each row and the height of it can be customized.
        </Text>
        <DemoWidget name="Skeleton" width={width} showCodeByDefault>
          {CustomRowAndHeight}
        </DemoWidget>
      </Section>
      <Section size="md" title="Animated rows" border={false}>
        <Text>
          Use the <code>animate</code> prop to animate the skeleton.
        </Text>
        <DemoWidget name="Skeleton" width={width} showCodeByDefault>
          {Animate}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom block count" border={false}>
        <Text>
          A collection of Skeleton is a block. with the <code>blocks</code> prop
          we can also customize the number of blocks we want to be displayed.
          The example shows how to create 2 blocks with 4 rows per block.
        </Text>
        <DemoWidget name="Skeleton" width={width} showCodeByDefault>
          {CustomBlockCount}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL" border={false}>
        <DemoWidget name="Skeleton" width={width} showCodeByDefault>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
