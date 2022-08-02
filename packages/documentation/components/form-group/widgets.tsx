import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, DefaultCode, RTL, RTLCode } from './widget-variants';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState<string | number>(0);

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
        <Section title="Default render" size="md">
          <DemoWidget name="FormGroup" width={width} codeString={DefaultCode}>
            {Default}
          </DemoWidget>
        </Section>
        <Section title="RTL" size="md">
          <DemoWidget name="FormGroup" width={width} codeString={RTLCode}>
            {RTL}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
