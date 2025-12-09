import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  CustomIcon,
  CustomIconCount,
  CustomSize,
  Default,
  Disabled,
  RTL,
} from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Rating default" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Rate"
          >
            <DemoWidget name="Rate" width={200}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Custom icon count" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Use the <code>iconCount</code> prop to customize the number of
            icons. The example renders the component with 3 icons.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomIconCount, jsxToStringOptions)}
            language="jsx"
            componentName="Rate"
          >
            <DemoWidget name="Rate" width={200}>
              {CustomIconCount}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Custom Icon" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Customize the icon with the <code>icon</code> prop.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomIcon, jsxToStringOptions)}
            language="jsx"
            componentName="Rate"
          >
            <DemoWidget name="Rate" width={200}>
              {CustomIcon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Custom size" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            Choose a custom size with the <code>size</code> prop. The prop value
            can be <code>sm</code>, <code>md</code> or <code>lg</code>.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomSize, jsxToStringOptions)}
            language="jsx"
            componentName="Rate"
          >
            <DemoWidget name="Rate" width={200}>
              {CustomSize}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Disabled state" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="Rate"
          >
            <DemoWidget name="Rate" width={200}>
              {Disabled}
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
            componentName="Rate"
          >
            <DemoWidget name="Rate" width={200}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
