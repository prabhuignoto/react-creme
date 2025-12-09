import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  CustomStyle,
  Default,
  Disabled,
  Large,
  LargeRounded,
  Medium,
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
            componentName="CheckBox"
          >
            <DemoWidget name="CheckBox" width={220}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Disabled State" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Use the <code>disabled</code> prop to disable the checkbox.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="CheckBox"
          >
            <DemoWidget name="CheckBox" width={200}>
              {Disabled}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Large size" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            The size of the checkbox can be customized. Supports three sizes:
            small, medium, large.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Large, jsxToStringOptions)}
            language="jsx"
            componentName="CheckBox"
          >
            <DemoWidget name="CheckBox" width={200}>
              {Large}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Custom Checkbox style" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Change the outlook of the Checkbox via the{' '}
            <code>checkBoxStyle</code> prop.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomStyle, jsxToStringOptions)}
            language="jsx"
            componentName="CheckBox"
          >
            <DemoWidget name="CheckBox" width={150}>
              {CustomStyle}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="All Sizes" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(CustomStyle, jsxToStringOptions)}
            language="jsx"
            componentName="CheckBox"
          >
            <DemoWidget name="CheckBox" width={200}>
              {CustomStyle}
            </DemoWidget>
            <DemoWidget name="CheckBox" width={200}>
              {Medium}
            </DemoWidget>
            <DemoWidget name="CheckBox" width={200}>
              {LargeRounded}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
