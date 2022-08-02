import React, { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, RTL, Searchable } from './widget-variants';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(800);
    } else if (media.isBigScreen) {
      setWidth(700);
    } else if (media.isDesktop) {
      setWidth(650);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render" size="md">
          <DemoWidget name="Transfer" width={width}>
            {Default}
          </DemoWidget>
        </Section>
        <Section title="Search" size="md">
          <DemoWidget name="Transfer" width={width}>
            {Searchable}
          </DemoWidget>
        </Section>
        <Section title="RTL">
          <DemoWidget name="Transfer" width={width}>
            {RTL}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
