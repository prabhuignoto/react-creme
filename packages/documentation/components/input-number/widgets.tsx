import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Border, Default, RTL } from './widget-variants';

function widgets() {
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
        <DemoWidget width={width}>{Border}</DemoWidget>
      </Section>
      <Section title="RTL">
        <DemoWidget width={width}>{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
