import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  Accent,
  Default,
  Error,
  MaxLength,
  RTL,
  Success,
  WithBorder,
  WithIcon,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Default" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Input"
          >
            <DemoWidget name="Input" width={200}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Input with a custom Icon" border={false}>
          <HeaderCodeToggle.Button />
          <Text>Use a custom icon inside the input.</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(WithIcon, jsxToStringOptions)}
            language="jsx"
            componentName="Input"
          >
            <DemoWidget name="Input" width={200}>
              {WithIcon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Input with border" border={false}>
          <HeaderCodeToggle.Button />
          <Text>Use a custom icon inside the input.</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(WithBorder, jsxToStringOptions)}
            language="jsx"
            componentName="Input"
          >
            <DemoWidget name="Input" width={200}>
              {WithBorder}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="States" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Inputs can be configured to have different states. The example below
            shows input in error and success state
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Error, jsxToStringOptions)}
            language="jsx"
            componentName="Input"
          >
            <DemoWidget name="Input" width={200}>
              {Error}
            </DemoWidget>
            <DemoWidget name="Input" width={200}>
              {Success}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="RTL" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="Input"
          >
            <DemoWidget name="Input" width={200}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Accent" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Inputs can be configured to have different accents. The example
            below shows input in rounded accent.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Accent, jsxToStringOptions)}
            language="jsx"
            componentName="Input"
          >
            <DemoWidget name="Input" width={200}>
              {Accent}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Max length" border={false}>
          <HeaderCodeToggle.Button />
          <Text>Inputs can be configured to have a maximum length.</Text>
          <HeaderCodeToggle.Content
            code={jsxToString(MaxLength, jsxToStringOptions)}
            language="jsx"
            componentName="Input"
          >
            <DemoWidget name="Input" width={200}>
              {MaxLength}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
