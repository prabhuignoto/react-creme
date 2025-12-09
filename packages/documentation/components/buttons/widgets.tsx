import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  Default,
  Disabled,
  Icon,
  Large,
  Medium,
  SearchingState,
} from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Default" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Button"
          >
            <DemoWidget name="Button" width={80}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Icon" border={false}>
          <HeaderCodeToggle.Button />
          <Text>Insert a custom icon to the button.</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Icon, jsxToStringOptions)}
            language="jsx"
            componentName="Button"
          >
            <DemoWidget name="Button" width={150}>
              {Icon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Loading state" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Use the <code>type</code> property to change the button to a loading
            state.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(SearchingState, jsxToStringOptions)}
            language="jsx"
            componentName="Button"
          >
            <DemoWidget name="Button" width={120}>
              {SearchingState}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Disabled" border={false}>
          <HeaderCodeToggle.Button />
          <Text>Buttons can be disabled</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="Button"
          >
            <DemoWidget name="Button" width={120}>
              {Disabled}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Medium sized button" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Customize the size of the button by using the <code>size</code> prop
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Medium, jsxToStringOptions)}
            language="jsx"
            componentName="Button"
          >
            <DemoWidget name="Button" width={130}>
              {Medium}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Button with State (Extra large)"
          border={false}
        >
          <HeaderCodeToggle.Button />
          <Text>
            Buttons can be in different states. Example shows button in{' '}
            <code>danger</code> state
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Large, jsxToStringOptions)}
            language="jsx"
            componentName="Button"
          >
            <DemoWidget name="Button" width={130}>
              {Large}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
