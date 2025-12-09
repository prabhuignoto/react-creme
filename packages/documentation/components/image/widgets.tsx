import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Default, Expand } from './widget-variants';

function widgets() {
  return (
    <div className={'rc-demo-widgets'}>
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Default" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="Image"
          >
            <DemoWidget name="Image">{Default}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Expandable Image" border={false}>
          <HeaderCodeToggle.Button />
          <Text>
            use <code>expandImageOnClick</code> to make image expandable on
            click.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Expand, jsxToStringOptions)}
            language="jsx"
            componentName="Image"
          >
            <DemoWidget name="Image">{Expand}</DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
