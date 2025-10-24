import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
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
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState(0);

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

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="" border={false}>
        <DemoWidget name="Slider" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Positioning the Tooltip">
        <Text>
          The tooltip can be positioned to either <code>top</code> or{' '}
          <code>bottom</code>. The Example here shows the tooltip positioned to
          the bottom of the slider.
        </Text>
        <DemoWidget name="Slider" width={width}>
          {CustomTooltipPosition}
        </DemoWidget>
      </Section>
      <Section size="md" title="Preselected Value">
        <DemoWidget name="Slider" width={width}>
          {PreSelected}
        </DemoWidget>
      </Section>
      <Section size="md" title="Show Tooltip on Hover">
        <Text>
          With the <code>showTooltipOnHover</code>, the tooltip will be
          displayed only when the user hovers over the slider control.
        </Text>
        <DemoWidget name="Slider" width={width}>
          {TooltipOnHover}
        </DemoWidget>
      </Section>
      <Section size="md" title="Formatted value">
        <Text>The slider can also display the value in a formatted way.</Text>
        <DemoWidget name="Slider" width={width}>
          {TooltipFormatted}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled state">
        <Text>
          The slide can be disabled via the <code>disabled</code> prop.
        </Text>
        <DemoWidget name="Slider" width={width}>
          {Disabled}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
};

export default Widgets;
