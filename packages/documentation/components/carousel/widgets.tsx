import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Carousel, Image, Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Horizontal, Vertical } from './widget-variants';

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

  const swipableCarousel = (
    <Carousel direction="horizontal" enableSwipe>
      <Image src="https://bit.ly/3tYnFoD" />
      <Image src="https://bit.ly/3q3YLmk" />
      <Image src="https://bit.ly/3I8nuvN" />
      <Image src="https://bit.ly/3JcM9ko" />
      <span>1233</span>
    </Carousel>
  );

  return width ? (
    <div className="rc-demo-widgets" style={{ minHeight: '1000px' }}>
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Horizontal layout" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Renders the items in a horizontal layout with navigation controls
            displayed at the bottom
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Horizontal, jsxToStringOptions)}
            language="jsx"
            componentName="Carousel"
          >
            <DemoWidget name="Carousel" width={width} height={height}>
              {Horizontal}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Vertical layout" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Renders the items in a vertical layout with navigation controls
            displayed to the left
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Vertical, jsxToStringOptions)}
            language="jsx"
            componentName="Carousel"
          >
            <DemoWidget name="Carousel" width={width} height={height}>
              {Vertical}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Swipable" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            The carousel can be swipable. Swipe left or right to navigate.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(swipableCarousel, jsxToStringOptions)}
            language="jsx"
            componentName="Carousel"
          >
            <DemoWidget name="Carousel" width={width} height={height}>
              {swipableCarousel}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default widgets;
