import jsxToString from 'react-element-to-jsx-string';
import { Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  CustomStyle,
  Default,
  Disabled,
  PreSelected,
  RTL,
} from './widget-variants';

function Widgets() {
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
            componentName="CheckBoxGroup"
          >
            <DemoWidget name="CheckBoxGroup" width={100}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Preselected Option"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(PreSelected, jsxToStringOptions)}
            language="jsx"
            componentName="CheckBoxGroup"
          >
            <DemoWidget name="CheckBoxGroup" width={200}>
              {PreSelected}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Disabled Option"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Disabled, jsxToStringOptions)}
            language="jsx"
            componentName="CheckBoxGroup"
          >
            <DemoWidget name="CheckBoxGroup" width={200}>
              {Disabled}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Checkbox Group - Round style"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(CustomStyle, jsxToStringOptions)}
            language="jsx"
            componentName="CheckBoxGroup"
          >
            <DemoWidget name="CheckBoxGroup" width={150}>
              {CustomStyle}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Checkbox Group - RTL"
          RTL
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="CheckBoxGroup"
          >
            <DemoWidget name="CheckBoxGroup" width={150}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
