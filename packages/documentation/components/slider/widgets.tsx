import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomTooltipPosition,
  Default,
  Disabled,
  PreSelected,
  TooltipFormatted,
  TooltipOnHover,
} from './widget-variants';

const Widgets = () => {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isBigScreen) {
      setWidth(400);
    } else if (media.isDesktop) {
      setWidth(400);
    } else if (media.isTablet) {
      setWidth(350);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isExtraLargeScreen) {
      setWidth(500);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default Render" size="md">
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Positioning the Tooltip" size="md">
          <BlockQuote>
            Can also position the tooltip to be on the top or bottom of the
            slider. The Example here shows the tooltip on the bottom.
          </BlockQuote>
          <DemoWidget width={width}>{CustomTooltipPosition}</DemoWidget>
        </Section>
        <Section title="Preselected Value" size="md">
          <DemoWidget width={width}>{PreSelected}</DemoWidget>
        </Section>
        <Section title="Show Tooltip on Hover" size="md">
          <BlockQuote>
            The tooltip will only show when the user hovers over the slider.
          </BlockQuote>
          <DemoWidget width={width}>{TooltipOnHover}</DemoWidget>
        </Section>
        <Section title="Formatted value" size="md">
          <BlockQuote>
            The slider can also display the value in a formatted way.
          </BlockQuote>
          <DemoWidget width={width}>{TooltipFormatted}</DemoWidget>
        </Section>
        <Section title="Disabled state" size="md">
          <BlockQuote>
            The slide can be disabled via the <code>disabled</code> prop.
          </BlockQuote>
          <DemoWidget width={width}>{Disabled}</DemoWidget>
        </Section>
      </div>
    )
  );
};

export default Widgets;
