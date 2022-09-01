import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Section } from '../../../lib/components';
import { BlockQuote } from '../../../lib/components/block-quote/block-quote';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Horizontal, Vertical } from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState<string | number>('100%');
  const [height, setHeight] = useState<string | number>(450);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(850);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(500);
      setHeight(300);
    } else if (media.isTablet) {
      setWidth(450);
      setHeight(300);
    } else if (media.isMobile) {
      setWidth(350);
      setHeight(200);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section title="Horizontal Comparison">
        <BlockQuote>
          Compare two images side by side horizontally. The drag handle guides
          the user to the correct position.
        </BlockQuote>
        <DemoWidget name="ImageComparer" height={height} width={width}>
          {Horizontal}
        </DemoWidget>
      </Section>
      <Section title="Vertical comparison">
        <BlockQuote>
          Compare two images side by side vertically. The drag handle guides the
          user to the correct position.
        </BlockQuote>
        <DemoWidget name="ImageComparer" height={height} width={width}>
          {Vertical}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
