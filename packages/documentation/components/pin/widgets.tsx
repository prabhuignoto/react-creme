import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  CustomLength,
  Default,
  LargeSized,
  MediumSized,
  RTL,
  SmallSized,
} from './widget-variants';

function widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState<string | number>(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(400);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth('100%');
    }
  }, [media]);

  return (
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
            componentName="Pin"
          >
            <DemoWidget name="Pin" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom length"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Customize the number of pins via the <code>length</code> property
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomLength, jsxToStringOptions)}
            language="jsx"
            componentName="Pin"
          >
            <DemoWidget name="Pin" width={width}>
              {CustomLength}
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
          <Text>
            Use the <code>RTL</code> prop to render the pin in RTL mode.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="Pin"
          >
            <DemoWidget name="Pin" width={width}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom Sizes"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Customize the pin size with the <code>size</code> prop
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(SmallSized, jsxToStringOptions)}
            language="jsx"
            componentName="Pin"
          >
            <DemoWidget name="Pin" width={width}>
              {SmallSized}
            </DemoWidget>
            <DemoWidget name="Pin" width={width}>
              {MediumSized}
            </DemoWidget>
            <DemoWidget name="Pin" width={width}>
              {LargeSized}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
