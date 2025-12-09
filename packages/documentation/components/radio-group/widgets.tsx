import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { CustomLayout, Default, Disabled, RTL } from './widget-variants';

function Widgets() {
  const media = useAtomValue(responsiveState);
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
            componentName="RadioGroup"
          >
            <DemoWidget name="RadioGroup" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom layout"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The Layout of the RadioGroup can be customized to be either{' '}
            <code>row</code> or <code>column</code>.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomLayout, jsxToStringOptions)}
            language="jsx"
            componentName="RadioGroup"
          >
            <DemoWidget name="RadioGroup" width={width * 3}>
              {CustomLayout}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Disabled option"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Disable a specific option by setting the disabled property to true.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="RadioGroup"
          >
            <DemoWidget name="RadioGroup" width={width}>
              {Disabled}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="RTL"
          RTL
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="RadioGroup"
          >
            <DemoWidget name="RadioGroup" width={width}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  ) : null;
}

export default Widgets;
