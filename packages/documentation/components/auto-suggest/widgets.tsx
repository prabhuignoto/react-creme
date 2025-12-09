import jsxToString from 'react-element-to-jsx-string';
import { Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Accent, Default, Large, Medium, RTL } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Default" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="AutoSuggest"
          >
            <DemoWidget name="AutoSuggest" width={300}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Rounded Accent" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Accent, jsxToStringOptions)}
            language="jsx"
            componentName="AutoSuggest"
          >
            <DemoWidget name="AutoSuggest" width={300}>
              {Accent}
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
            componentName="AutoSuggest"
          >
            <DemoWidget name="AutoSuggest" width={300}>
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Custom sizes" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Medium, jsxToStringOptions)}
            language="jsx"
            componentName="AutoSuggest"
          >
            <DemoWidget name="AutoSuggest" width={300}>
              {Medium}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Large Size" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Large, jsxToStringOptions)}
            language="jsx"
            componentName="AutoSuggest"
          >
            <DemoWidget name="AutoSuggest" width={300}>
              {Large}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
