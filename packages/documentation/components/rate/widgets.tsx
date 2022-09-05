import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomIcon,
  CustomIconCount,
  CustomSize,
  Default,
  Disabled,
  RTL,
} from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Rating default">
        <DemoWidget name="Rate" width={200}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom icon count">
        <Text>
          Use the <code>iconCount</code> prop to customize the number of icons.
          The example renders the component with 3 icons.
        </Text>
        <DemoWidget name="Rate" width={200}>
          {CustomIconCount}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Icon">
        <Text>
          Customize the icon with the <code>icon</code> prop.
        </Text>
        <DemoWidget name="Rate" width={200}>
          {CustomIcon}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom size">
        <Text>
          Choose a custom size with the <code>size</code> prop. The prop value
          can be <code>sm</code>, <code>md</code> or <code>lg</code>.
        </Text>
        <DemoWidget name="Rate" width={200}>
          {CustomSize}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled state">
        <DemoWidget name="Rate" width={200}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="RTL">
        <DemoWidget name="Rate" width={200}>
          {RTL}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
