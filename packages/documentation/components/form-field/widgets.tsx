import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, DropdownField, Icon, RTL, State } from './widget-variants';

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
        <Section title="Default render">
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Custom Icon">
          <BlockQuote>
            Use the <code>icon</code> prop to add an icon to the form field.
          </BlockQuote>
          <DemoWidget width={width}>{Icon}</DemoWidget>
        </Section>
        <Section title="Field with state">
          <DemoWidget width={width}>{State}</DemoWidget>
        </Section>
        <Section title="Dropdown Field">
          <DemoWidget width={width}>{DropdownField}</DemoWidget>
        </Section>
        <Section title="RTL Render">
          <DemoWidget width={width}>{RTL}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
