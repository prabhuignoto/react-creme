import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import { Default, Selection } from './widget-variants';

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
            componentName="Tree"
          >
            <DemoWidget name="Tree" width={400}>
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Selection Mode"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            In selection mode, individual nodes with its children can be
            selected through the checkbox
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(Selection, jsxToStringOptions)}
            language="jsx"
            componentName="Tree"
          >
            <DemoWidget name="Tree" width={400}>
              {Selection}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
      {/* <Section size="md"  title="Custom Icon" >
        <Text>
          Use a custom icon for the expand and collapse actions.
        </Text>
        <DemoWidget name="Tree" width={300}>{CustomIcon}</DemoWidget>
      </Section> */}
    </div>
  );
}

export default Widgets;
