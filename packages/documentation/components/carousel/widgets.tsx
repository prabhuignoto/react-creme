import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Carousel, Image, Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Horizontal, Vertical } from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState<string | number>(0);
  const [height, setHeight] = useState<string | number>(350);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(700);
      setHeight(400);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(600);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return width ? (
    <div className="rc-demo-widgets" style={{ minHeight: '1000px' }}>
      <Section size="md" title="Horizontal layout" border={false}>
        <Text>
          Renders the items in a horizontal layout with navigation controls
          displayed at the bottom
        </Text>
        <DemoWidget name="Carousel" width={width} height={height}>
          {Horizontal}
        </DemoWidget>
      </Section>
      <Section size="md" title="Vertical layout" border={false}>
        <Text>
          Renders the items in a vertical layout with navigation controls
          displayed to the left
        </Text>
        <DemoWidget name="Carousel" width={width} height={height}>
          {Vertical}
        </DemoWidget>
      </Section>
      <Section size="md" title="Swipable" border={false}>
        <Text>
          The carousel can be swipable. Swipe left or right to navigate.
        </Text>
        <DemoWidget name="Carousel" width={width} height={height}>
          <Carousel direction="horizontal" enableSwipe>
            <Image src="https://bit.ly/3tYnFoD" />
            <Image src="https://bit.ly/3q3YLmk" />
            <Image src="https://bit.ly/3I8nuvN" />
            <Image src="https://bit.ly/3JcM9ko" />
            <span>1233</span>
          </Carousel>
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
