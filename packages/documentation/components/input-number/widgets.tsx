import jsxToString from 'react-element-to-jsx-string';
import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Border, Default, LargeSize, MediumSize, RTL } from './widget-variants';

function Widgets() {
  const media = useAtomValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(120);
    } else if (media.isBigScreen) {
      setWidth(120);
    } else if (media.isDesktop) {
      setWidth(120);
    } else if (media.isTablet) {
      setWidth(120);
    } else if (media.isMobile) {
      setWidth(120);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Default" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="InputNumber"
          >
            <DemoWidget name="InputNumber" width={width}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Border" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            The outlook of the Input Number component can be changed via the{' '}
            <code>border</code> prop.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Border, jsxToStringOptions)}
            language="jsx"
            componentName="InputNumber"
          >
            <DemoWidget name="InputNumber" width={width}>
              {Border}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="RTL" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            with the <code>RTL</code> prop, the Input Number component will be
            rendered in RTL mode.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="InputNumber"
          >
            <DemoWidget name="InputNumber" width={width}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Sizes" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            The component supports 3 different sizes: <code>sm</code>,{' '}
            <code>md</code> and <code>lg</code>. Use the theme provider to
            customize the sizes.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Border, jsxToStringOptions)}
            language="jsx"
            componentName="InputNumber"
          >
            <DemoWidget name="InputNumber" width={width}>
              {Border}
            </DemoWidget>
            <DemoWidget name="InputNumber" width={width}>
              {MediumSize}
            </DemoWidget>
            <DemoWidget name="InputNumber" width={width}>
              {LargeSize}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
