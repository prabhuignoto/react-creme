import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
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

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render" size="md">
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Custom layout" size="md">
          <BlockQuote>
            The Layout of the RadioGroup can be customized to be either{' '}
            <code>row</code> or <code>column</code>.
          </BlockQuote>
          <DemoWidget width={width * 3}>{CustomLayout}</DemoWidget>
        </Section>
        <Section title="Disabled option" size="md">
          <BlockQuote>
            Disable a specific option by setting the disabled property to true.
          </BlockQuote>
          <DemoWidget width={width}>{Disabled}</DemoWidget>
        </Section>
        <Section title="RTL" size="md">
          <DemoWidget width={width}>{RTL}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
