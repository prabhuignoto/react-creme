import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Icon, RTL, State } from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState<string | number>(null);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(400);
    } else if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(320);
    } else if (media.isBigScreen) {
      setWidth(350);
    } else if (media.isDesktop) {
      setWidth(400);
    }
  }, [media]);
  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Single selection">
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Single selection">
          <DemoWidget width={width}>{Icon}</DemoWidget>
        </Section>
        <Section title="Single selection">
          <DemoWidget width={width}>{State}</DemoWidget>
        </Section>
        <Section title="Single selection">
          <DemoWidget width={width}>{RTL}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
