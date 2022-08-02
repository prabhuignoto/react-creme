import React, { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Border, Default, LargeSize, MediumSize, RTL } from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(120);
    } else if (media.isBigScreen) {
      setWidth(120);
    } else if (media.isDesktop) {
      setWidth(120);
    } else if (media.isTablet) {
      setWidth(120);
    } else if (media.isMobile) {
      setWidth(120);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section title="Default render" size="md">
        <DemoWidget name="InputNumber" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="Border" size="md">
        <BlockQuote>
          The outlook of the Input Number component can be changed via the{' '}
          <code>border</code> prop.
        </BlockQuote>
        <DemoWidget name="InputNumber" width={width}>
          {Border}
        </DemoWidget>
      </Section>
      <Section title="RTL" size="md">
        <BlockQuote>
          with the <code>RTL</code> prop, the Input Number component will be
          rendered in RTL mode.
        </BlockQuote>
        <DemoWidget name="InputNumber" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section title="Sizes" size="md">
        <BlockQuote>
          The component supports 3 different sizes: <code>sm</code>,{' '}
          <code>md</code> and <code>lg</code>. Use the theme provider to
          customize the sizes.
        </BlockQuote>
        <DemoWidget name="InputNumber" width={width}>
          {Border}
        </DemoWidget>
        <DemoWidget name="InputNumber" width={width}>
          {MediumSize}
        </DemoWidget>
        <DemoWidget name="InputNumber" width={width}>
          {LargeSize}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
