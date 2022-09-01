import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CheckIcon,
  Default,
  Disabled,
  LabelOutside,
  Large,
  Medium,
} from './widget-variants';

function widgets() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="rc-demo-widgets"
    >
      <Section title="Switch - default">
        <DemoWidget name="Switch" width={100}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="Switch with label outside">
        <BlockQuote>The label can be placed outside the switch.</BlockQuote>
        <DemoWidget name="Switch" width={150}>
          {LabelOutside}
        </DemoWidget>
      </Section>
      <Section title="Switch with Check status">
        <BlockQuote>
          Use <code>showCheckIcon</code> property to display a check icon inside
          the toggle control.
        </BlockQuote>
        <DemoWidget name="Switch" width={140}>
          {CheckIcon}
        </DemoWidget>
      </Section>
      <Section title="Disabled">
        <BlockQuote>
          Use the disabled property to disable the switch.
        </BlockQuote>
        <DemoWidget name="Switch" width={90}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section title="Medium">
        <BlockQuote>
          Switch comes in three sizes: small, medium, and large. This example
          shows a large size switch.
        </BlockQuote>
        <DemoWidget name="Switch" width={200}>
          {Medium}
        </DemoWidget>
      </Section>
      <Section title="Large">
        <DemoWidget name="Switch" width={240}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
