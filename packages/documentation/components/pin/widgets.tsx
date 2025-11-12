import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
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
  const media = useAtomValue(responsiveState);
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
      <Section size="md" title="Default" border={false}>
        <DemoWidget name="Pin" width={width} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom length" border={false}>
        <Text>
          Customize the number of pins via the <code>length</code> property
        </Text>
        <DemoWidget name="Pin" width={width} showCodeByDefault>
          {CustomLength}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL" border={false}>
        <Text>
          Use the <code>RTL</code> prop to render the pin in RTL mode.
        </Text>
        <DemoWidget name="Pin" width={width} showCodeByDefault>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Sizes" border={false}>
        <Text>
          Customize the pin size with the <code>size</code> prop
        </Text>
        <DemoWidget name="Pin" width={width} showCodeByDefault>
          {SmallSized}
        </DemoWidget>
        <DemoWidget name="Pin" width={width} showCodeByDefault>
          {MediumSized}
        </DemoWidget>
        <DemoWidget name="Pin" width={width} showCodeByDefault>
          {LargeSized}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
