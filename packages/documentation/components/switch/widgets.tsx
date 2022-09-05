import { Section, Text } from '../../../lib/components';
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
      <Section size="md" title="Switch - default">
        <DemoWidget name="Switch" width={100}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Switch with label outside">
        <Text>The label can be placed outside the switch.</Text>
        <DemoWidget name="Switch" width={150}>
          {LabelOutside}
        </DemoWidget>
      </Section>
      <Section size="md" title="Switch with Check status">
        <Text>
          Use <code>showCheckIcon</code> property to display a check icon inside
          the toggle control.
        </Text>
        <DemoWidget name="Switch" width={140}>
          {CheckIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled">
        <Text>Use the disabled property to disable the switch.</Text>
        <DemoWidget name="Switch" width={90}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="Medium">
        <Text>
          Switch comes in three sizes: small, medium, and large. This example
          shows a large size switch.
        </Text>
        <DemoWidget name="Switch" width={200}>
          {Medium}
        </DemoWidget>
      </Section>
      <Section size="md" title="Large">
        <DemoWidget name="Switch" width={240}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
