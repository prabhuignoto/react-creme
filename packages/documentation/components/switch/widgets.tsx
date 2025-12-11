import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { CheckIcon, Default, Disabled, Large, Medium, RTL } from './widget-variants';

function widgets() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="rc-demo-widgets"
    >
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Switch - default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Switch"
          >
            <DemoWidget name="Switch" width={200}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Switch with Check status"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Use <code>showCheckIcon</code> property to display a check icon
            inside the toggle control.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CheckIcon, jsxToStringOptions)}
            language="jsx"
            componentName="Switch"
          >
            <DemoWidget name="Switch" width={300}>
              {CheckIcon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Disabled"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>Use the disabled property to disable the switch.</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="Switch"
          >
            <DemoWidget name="Switch" width={300}>
              {Disabled}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Medium"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Switch comes in three sizes: small, medium, and large. This example
            shows a large size switch.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Medium, jsxToStringOptions)}
            language="jsx"
            componentName="Switch"
          >
            <DemoWidget name="Switch" width={250}>
              {Medium}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Large"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Large, jsxToStringOptions)}
            language="jsx"
            componentName="Switch"
          >
            <DemoWidget name="Switch" width={300}>
              {Large}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Right-to-Left (RTL) Support"
          RTL
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Full RTL layout support for internationalization. When{' '}
            <code>RTL</code> is enabled, the switch label is positioned on the
            left side (visually right in RTL languages) and the track on the
            right. Essential for applications supporting Arabic, Hebrew, and
            other right-to-left languages. The component maintains proper
            keyboard navigation and accessibility in RTL mode.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="Switch"
          >
            <DemoWidget name="Switch" width={200}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
