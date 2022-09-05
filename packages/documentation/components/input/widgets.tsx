import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  Accent,
  Default,
  Error,
  MaxLength,
  RTL,
  Success,
  WithBorder,
  WithIcon,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default render">
        <DemoWidget name="Input" width={200}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Input with a custom Icon">
        <Text>Use a custom icon inside the input.</Text>
        <DemoWidget name="Input" width={200}>
          {WithIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Input with border">
        <Text>Use a custom icon inside the input.</Text>
        <DemoWidget name="Input" width={200}>
          {WithBorder}
        </DemoWidget>
      </Section>
      <Section size="md" title="States">
        <Text>
          Inputs can be configured to have different states. The example below
          shows input in error and success state
        </Text>
        <DemoWidget name="Input" width={200}>
          {Error}
        </DemoWidget>
        <DemoWidget name="Input" width={200}>
          {Success}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="Input" width={200}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section size="md" title="Accent">
        <Text>
          Inputs can be configured to have different accents. The example below
          shows input in rounded accent.
        </Text>
        <DemoWidget name="Input" width={200}>
          {Accent}
        </DemoWidget>
      </Section>
      <Section size="md" title="Max length">
        <Text>Inputs can be configured to have a maximum length.</Text>
        <DemoWidget name="Input" width={200}>
          {MaxLength}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
