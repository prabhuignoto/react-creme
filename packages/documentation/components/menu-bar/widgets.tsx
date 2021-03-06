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
      <Section title="Default Render" size="md">
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="RTL" size="md">
        <BlockQuote>
          Use the <code>RTL</code> prop for right to left alignment
        </BlockQuote>
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section title="Icons" size="md">
        <BlockQuote>
          The <code>icons</code> prop can be used to add a custom icon for each
          top level menu bar item
        </BlockQuote>
        <DemoWidget
          width={400}
          style={{ marginLeft: '2rem' }}
          codeString={IconsCode}
        >
          {Icons}
        </DemoWidget>
      </Section>
      <Section title="Custom Sizes" size="md">
        <BlockQuote>
          With the <code>size</code> prop customize the size of the menu bar.
        </BlockQuote>
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          {Medium}
        </DemoWidget>
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
