import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Border, Default, LargeSize, MediumSize, RTL } from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(200);
    } else if (media.isBigScreen) {
      setWidth(200);
    } else if (media.isDesktop) {
      setWidth(150);
    } else if (media.isTablet) {
      setWidth(150);
    } else if (media.isMobile) {
      setWidth(150);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget width={width}>{Default}</DemoWidget>
      </Section>
      <Section title="Border">
        <BlockQuote>
          The outlook of the Input Number component can be changed via the{' '}
          <code>border</code> prop.
        </BlockQuote>
        <DemoWidget width={width}>{Border}</DemoWidget>
      </Section>
      <Section title="RTL">
        <BlockQuote>
          with the <code>RTL</code> prop, the Input Number component will be
          rendered in RTL mode.
        </BlockQuote>
        <DemoWidget width={width}>{RTL}</DemoWidget>
      </Section>
      <Section title="Sizes">
        <BlockQuote>
          The component supports 3 different sizes: <code>sm</code>,{' '}
          <code>md</code> and <code>lg</code>. Use the theme provider to
          customize the sizes.
        </BlockQuote>
        <DemoWidget width={width}>{Border}</DemoWidget>
        <DemoWidget width={width}>{MediumSize}</DemoWidget>
        <DemoWidget width={width}>{LargeSize}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;