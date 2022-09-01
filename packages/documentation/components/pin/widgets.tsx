import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomLength,
  Default,
  LargeSized,
  MediumSized,
  RTL,
  SmallSized,
} from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState<string | number>(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(400);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth('100%');
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget name="Pin" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="Custom length">
        <BlockQuote>
          Customize the number of pins via the <code>length</code> property
        </BlockQuote>
        <DemoWidget name="Pin" width={width}>
          {CustomLength}
        </DemoWidget>
      </Section>
      <Section title="RTL">
        <BlockQuote>
          Use the <code>RTL</code> prop to render the pin in RTL mode.
        </BlockQuote>
        <DemoWidget name="Pin" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section title="Custom Sizes">
        <BlockQuote>
          Customize the pin size with the <code>size</code> prop
        </BlockQuote>
        <DemoWidget name="Pin" width={width}>
          {SmallSized}
        </DemoWidget>
        <DemoWidget name="Pin" width={width}>
          {MediumSized}
        </DemoWidget>
        <DemoWidget name="Pin" width={width}>
          {LargeSized}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
