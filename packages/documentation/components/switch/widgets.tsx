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
      <Section title="Switch - default" size="md">
        <DemoWidget width={80}>{Default}</DemoWidget>
      </Section>
      <Section title="Switch with label outside" size="md">
        <BlockQuote>The label can be placed outside the switch.</BlockQuote>
        <DemoWidget width={150}>{LabelOutside}</DemoWidget>
      </Section>
      <Section title="Switch with Check status" size="md">
        <BlockQuote>
          Use <code>showCheckIcon</code> property to display a check icon inside
          the toggle control.
        </BlockQuote>
        <DemoWidget width={120}>{CheckIcon}</DemoWidget>
      </Section>
      <Section title="Disabled" size="md">
        <BlockQuote>
          Use the disabled property to disable the switch.
        </BlockQuote>
        <DemoWidget width={100}>{Disabled}</DemoWidget>
      </Section>
      <Section title="Medium" size="md">
        <BlockQuote>
          Switch comes in three sizes: small, medium, and large. This example
          shows a large size switch.
        </BlockQuote>
        <DemoWidget width={180}>{Medium}</DemoWidget>
      </Section>
      <Section title="Large" size="md">
        <DemoWidget width={240}>{Large}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
