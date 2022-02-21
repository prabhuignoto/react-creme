import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Carousel, Image, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Horizontal, Vertical } from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState<string | number>(null);
  const [height, setHeight] = React.useState<string | number>(350);

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
        <Section title="Horizontal layout">
          <BlockQuote>
            Renders the items in a horizontal layout with navigation controls
            displayed at the bottom
          </BlockQuote>
          <DemoWidget width={width} height={height}>
            {Horizontal}
          </DemoWidget>
        </Section>
        <Section title="Vertical layout">
          <BlockQuote>
            Renders the items in a vertical layout with navigation controls
            displayed to the left
          </BlockQuote>
          <DemoWidget width={width} height={height}>
            {Vertical}
          </DemoWidget>
        </Section>
        <Section title="Swipable">
          <BlockQuote>
            The carousel can be swipable. Swipe left or right to navigate.
          </BlockQuote>
          <DemoWidget width={width} height={height}>
            <Carousel direction="horizontal" enableSwipe>
              <Image src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1474&q=80" />
              <Image src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1274&q=80" />
              <Image src="https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1476&q=80" />
              <Image src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80" />
              <span>1233</span>
            </Carousel>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
