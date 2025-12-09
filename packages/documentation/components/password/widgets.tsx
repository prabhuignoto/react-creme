import jsxToString from 'react-element-to-jsx-string';
import { Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Default, Large, Medium, RTL } from './widget-variants';

function widgets() {
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
            componentName="Password"
          >
            <DemoWidget name="Password" width={320}>
              {Default}
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
            componentName="Password"
          >
            <DemoWidget name="Password" width={320}>
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
          <HeaderCodeToggle.Content
            code={jsxToString(Medium, jsxToStringOptions)}
            language="jsx"
            componentName="Password"
          >
            <DemoWidget name="Password" width={320}>
              {Medium}
            </DemoWidget>
            <DemoWidget name="Password" width={320}>
              {Large}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
