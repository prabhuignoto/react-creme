import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomIcon,
  CustomSize,
  Default,
  RTL,
  SelectedIndex,
  Slash,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render" size="md">
        <DemoWidget width={450}>{Default}</DemoWidget>
      </Section>
      <Section title="Custom Icon - slash" size="md">
        <BlockQuote>
          The icon can be changed by setting the <code>icon</code> property to
          any of the values <code>slash</code> <code>arrow</code> or{' '}
          <code>chevron</code>.
        </BlockQuote>
        <DemoWidget width={450}>{Slash}</DemoWidget>
      </Section>
      <Section title="Custom Icon - arrow" size="md">
        <DemoWidget width={450}>{CustomIcon}</DemoWidget>
      </Section>
      <Section title="Custom Size - Medium" size="md">
        <BlockQuote>
          The size can be changed by setting the <code>size</code> property to{' '}
          <code>sm</code> <code>md</code> or <code>lg</code>.
        </BlockQuote>
        <DemoWidget width={450}>{SelectedIndex}</DemoWidget>
      </Section>
      <Section title="Custom Size - Large" size="md">
        <DemoWidget width={400}>{CustomSize}</DemoWidget>
      </Section>
      <Section title="RTL" size="md">
        <DemoWidget width={400}>{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
