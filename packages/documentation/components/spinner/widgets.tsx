import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { CustomSpeed, Default, Large, Medium } from './widget-variants';

const Widgets = () => {
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
            componentName="Spinner"
          >
            <DemoWidget name="Spinner" width={200}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom Speed"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The speed of the spinner can be adjusted through the{' '}
            <code>speed</code> prop.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomSpeed, jsxToStringOptions)}
            language="jsx"
            componentName="Spinner"
          >
            <DemoWidget name="Spinner" width={200}>
              {CustomSpeed}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom sizes"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Three different sizes are available for the spinner. <code>sm</code>
            , <code>md</code> and <code>lg</code>.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Spinner"
          >
            <DemoWidget name="Spinner" width={200}>
              {Default}
            </DemoWidget>
            <DemoWidget name="Spinner" width={200}>
              {Medium}
            </DemoWidget>
            <DemoWidget name="Spinner" width={200}>
              {Large}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
};

export default Widgets;
