import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Section, Text } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { CustomLayout, Default, Disabled, RTL } from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(180);
    } else if (media.isMobile) {
      setWidth(180);
    } else if (media.isDesktop) {
      setWidth(180);
    } else if (media.isBigScreen) {
      setWidth(180);
    } else if (media.isExtraLargeScreen) {
      setWidth(200);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default render">
        <DemoWidget name="RadioGroup" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom layout">
        <Text>
          The Layout of the RadioGroup can be customized to be either{' '}
          <code>row</code> or <code>column</code>.
        </Text>
        <DemoWidget name="RadioGroup" width={width * 3}>
          {CustomLayout}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled option">
        <Text>
          Disable a specific option by setting the disabled property to true.
        </Text>
        <DemoWidget name="RadioGroup" width={width}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="RadioGroup" width={width}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
