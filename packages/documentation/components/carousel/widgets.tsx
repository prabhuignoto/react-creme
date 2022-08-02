import React, { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Carousel, Image, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Horizontal, Vertical } from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
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

  return (
    width && (
      <div className="rc-demo-widgets" style={{ minHeight: '1000px' }}>
        <Section title="Horizontal layout" size="md">
          <BlockQuote>
            Renders the items in a horizontal layout with navigation controls
            displayed at the bottom
          </BlockQuote>
          <DemoWidget name="Carousel" width={width} height={height}>
            {Horizontal}
          </DemoWidget>
        </Section>
        <Section title="Vertical layout" size="md">
          <BlockQuote>
            Renders the items in a vertical layout with navigation controls
            displayed to the left
          </BlockQuote>
          <DemoWidget name="Carousel" width={width} height={height}>
            {Vertical}
          </DemoWidget>
        </Section>
        <Section title="Swipable" size="md">
          <BlockQuote>
            The carousel can be swipable. Swipe left or right to navigate.
          </BlockQuote>
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
    )
  );
}

export default widgets;
