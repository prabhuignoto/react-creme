import jsxToString from 'react-element-to-jsx-string';
import { Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';

function Widgets() {
  const defaultSection = (
    <Section size="md" title="Default rendering" border={false}>
      <p>lorem ipsum </p>
    </Section>
  );
  const rtlSection = (
    <Section size="md" title="Right to Left" RTL border={false}>
      <p>lorem ipsum </p>
    </Section>
  );

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
            code={jsxToString(defaultSection, jsxToStringOptions)}
            language="jsx"
            componentName="Section"
          >
            <DemoWidget name="Section" fullWidth>
              {defaultSection}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Right to Left"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(rtlSection, jsxToStringOptions)}
            language="jsx"
            componentName="Section"
          >
            <DemoWidget name="Section" fullWidth>
              {rtlSection}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
