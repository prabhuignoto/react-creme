import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomStyle,
  Default,
  Disabled,
  Large,
  LargeRounded,
  Medium,
} from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default">
        <DemoWidget name="CheckBox" width={220} showCodeByDefault>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Disabled State">
        <Text>
          Use the <code>disabled</code> prop to disable the checkbox.
        </Text>
        <DemoWidget name="CheckBox" width={200} showCodeByDefault>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section size="md" title="Large size">
        <Text>
          The size of the checkbox can be customized. Supports three sizes:
          small, medium, large.
        </Text>
        <DemoWidget name="CheckBox" width={200} showCodeByDefault>
          {Large}
        </DemoWidget>
      </Section>
      <Section size="md" title="Custom Checkbox style">
        <Text>
          Change the outlook of the Checkbox via the <code>checkBoxStyle</code>{' '}
          prop.
        </Text>
        <DemoWidget name="CheckBox" width={150} showCodeByDefault>
          {CustomStyle}
        </DemoWidget>
      </Section>
      <Section size="md" title="All Sizes">
        <DemoWidget name="CheckBox" width={200} showCodeByDefault>
          {CustomStyle}
        </DemoWidget>
        <DemoWidget name="CheckBox" width={200} showCodeByDefault>
          {Medium}
        </DemoWidget>
        <DemoWidget name="CheckBox" width={200} showCodeByDefault>
          {LargeRounded}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
