import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  ButtonRaisedRight,
  Default,
  largeSized,
  mediumSized,
  smallSized,
  Thickness,
  WithCombination,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default rendering"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Kbd"
          >
            <DemoWidget name="Kbd">{Default}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Keyboard combinations"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Keyboard combinations allows you to render a combination of keys.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(WithCombination, jsxToStringOptions)}
            language="jsx"
            componentName="Kbd"
          >
            <DemoWidget name="Kbd">{WithCombination}</DemoWidget>
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
            Three sizes are available: <code>sm</code>, <code>md</code>, and{' '}
            <code>lg</code>
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(smallSized, jsxToStringOptions)}
            language="jsx"
            componentName="Kbd"
          >
            <DemoWidget name="Kbd">{smallSized}</DemoWidget>
            <DemoWidget name="Kbd">{mediumSized}</DemoWidget>
            <DemoWidget name="Kbd">{largeSized}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Button raised direction"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The element is raised to the right by default. This can be changed
            via the <code>buttonRaised</code> prop.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(ButtonRaisedRight, jsxToStringOptions)}
            language="jsx"
            componentName="Kbd"
          >
            <DemoWidget name="Kbd">{ButtonRaisedRight}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Keyboard Thickness"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Customize the thickness of the keyboard with the{' '}
            <code>thickness</code> prop.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Thickness, jsxToStringOptions)}
            language="jsx"
            componentName="Kbd"
          >
            <DemoWidget name="Kbd">{Thickness}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
