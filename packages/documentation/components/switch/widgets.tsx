import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CheckIcon,
  Default,
  Disabled,
  Large,
  Medium,
} from './widget-variants';

function widgets() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column' }}
      className="rc-demo-widgets"
    >
      <Section size="md" title="Switch - default" border={false}>
        <DemoWidget name="Switch" width={200}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Switch with Check status" border={false}>
        <Text>
          Use <code>showCheckIcon</code> property to display a check icon inside
          the toggle control.
        </Text>
        <DemoWidget name="Switch" width={200}>
          {CheckIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled" border={false}>
        <Text>Use the disabled property to disable the switch.</Text>
        <DemoWidget name="Switch" width={200}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="Medium" border={false}>
        <Text>
          Switch comes in three sizes: small, medium, and large. This example
          shows a large size switch.
        </Text>
        <DemoWidget name="Switch" width={250}>
          {Medium}
        </DemoWidget>
      </Section>
      <Section size="md" title="Large" border={false}>
        <DemoWidget name="Switch" width={300}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
