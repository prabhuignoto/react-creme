import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Border, Default, LargeSize, MediumSize, RTL } from './widget-variants';

function Widgets() {
  const media = useAtomValue(responsiveState);
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
      <Section size="md" title="Default" border={false}>
        <DemoWidget name="InputNumber" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Border" border={false}>
        <Text>
          The outlook of the Input Number component can be changed via the{' '}
          <code>border</code> prop.
        </Text>
        <DemoWidget name="InputNumber" width={width}>
          {Border}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL" border={false}>
        <Text>
          with the <code>RTL</code> prop, the Input Number component will be
          rendered in RTL mode.
        </Text>
        <DemoWidget name="InputNumber" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Sizes" border={false}>
        <Text>
          The component supports 3 different sizes: <code>sm</code>,{' '}
          <code>md</code> and <code>lg</code>. Use the theme provider to
          customize the sizes.
        </Text>
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
