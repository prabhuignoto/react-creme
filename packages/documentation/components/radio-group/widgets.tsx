import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { CustomLayout, Default, Disabled, RTL } from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(200);
    } else if (media.isMobile) {
      setWidth(200);
    } else if (media.isDesktop) {
      setWidth(200);
    } else if (media.isBigScreen) {
      setWidth(200);
    } else if (media.isExtraLargeScreen) {
      setWidth(300);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Custom layout">
          <BlockQuote>
            The Layout of the RadioGroup can be customized to either row or
            column.
          </BlockQuote>
          <DemoWidget width={width * 3}>{CustomLayout}</DemoWidget>
        </Section>
        <Section title="Disabled option">
          <BlockQuote>
            Disable specific option by setting the disabled property to true.
          </BlockQuote>
          <DemoWidget width={width}>{Disabled}</DemoWidget>
        </Section>
        <Section title="RTL">
          <DemoWidget width={width}>{RTL}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
