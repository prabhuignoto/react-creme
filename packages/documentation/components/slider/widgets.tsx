import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
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
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Slider"
          >
            <DemoWidget name="Slider" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Positioning the Tooltip"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The tooltip can be positioned to either <code>top</code> or{' '}
            <code>bottom</code>. The Example here shows the tooltip positioned
            to the bottom of the slider.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomTooltipPosition, jsxToStringOptions)}
            language="jsx"
            componentName="Slider"
          >
            <DemoWidget name="Slider" width={width}>
              {CustomTooltipPosition}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Preselected Value"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(PreSelected, jsxToStringOptions)}
            language="jsx"
            componentName="Slider"
          >
            <DemoWidget name="Slider" width={width}>
              {PreSelected}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Show Tooltip on Hover"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            With the <code>showTooltipOnHover</code>, the tooltip will be
            displayed only when the user hovers over the slider control.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(TooltipOnHover, jsxToStringOptions)}
            language="jsx"
            componentName="Slider"
          >
            <DemoWidget name="Slider" width={width}>
              {TooltipOnHover}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Formatted value"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>The slider can also display the value in a formatted way.</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(TooltipFormatted, jsxToStringOptions)}
            language="jsx"
            componentName="Slider"
          >
            <DemoWidget name="Slider" width={width}>
              {TooltipFormatted}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Disabled state"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The slide can be disabled via the <code>disabled</code> prop.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="Slider"
          >
            <DemoWidget name="Slider" width={width}>
              {Disabled}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
};

export default Widgets;
