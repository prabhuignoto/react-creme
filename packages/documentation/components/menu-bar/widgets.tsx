import { BlockQuote, Section } from '../../../lib/components';
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
      <Section title="Default Render">
        <DemoWidget name="MenuBar" width={400} style={{ marginLeft: '2rem' }}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="RTL">
        <BlockQuote>
          Use the <code>RTL</code> prop for right to left alignment
        </BlockQuote>
        <DemoWidget name="MenuBar" width={400} style={{ marginLeft: '2rem' }}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section title="Icons">
        <BlockQuote>
          The <code>icons</code> prop can be used to add a custom icon for each
          top level menu bar item
        </BlockQuote>
        <DemoWidget
          name="MenuBar"
          width={400}
          style={{ marginLeft: '2rem' }}
          codeString={IconsCode}
        >
          {Icons}
        </DemoWidget>
      </Section>
      <Section title="Custom Sizes">
        <BlockQuote>
          With the <code>size</code> prop customize the size of the menu bar.
        </BlockQuote>
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
