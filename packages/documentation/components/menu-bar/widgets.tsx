import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  Default,
  Icons,
  IconsCode,
  Large,
  Medium,
  RTL,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default Render">
        <DemoWidget name="MenuBar" width={400} style={{ marginLeft: '2rem' }}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <Text>
          Use the <code>RTL</code> prop for right to left alignment
        </Text>
        <DemoWidget name="MenuBar" width={400} style={{ marginLeft: '2rem' }}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Icons">
        <Text>
          The <code>icons</code> prop can be used to add a custom icon for each
          top level menu bar item
        </Text>
        <DemoWidget
          name="MenuBar"
          width={400}
          style={{ marginLeft: '2rem' }}
          codeString={IconsCode}
        >
          {Icons}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Sizes">
        <Text>
          With the <code>size</code> prop customize the size of the menu bar.
        </Text>
        <DemoWidget name="MenuBar" width={400} style={{ marginLeft: '2rem' }}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="MenuBar" width={400} style={{ marginLeft: '2rem' }}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
