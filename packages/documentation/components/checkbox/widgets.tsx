import { BlockQuote, Section } from '../../../lib/components';
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
      <Section title="Default render">
        <DemoWidget name="CheckBox" width={220}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="Disabled State">
        <BlockQuote>
          Use the <code>disabled</code> prop to disable the checkbox.
        </BlockQuote>
        <DemoWidget name="CheckBox" width={200}>
          {Disabled}
        </DemoWidget>
      </Section>
      <Section title="Large size">
        <BlockQuote>
          The size of the checkbox can be customized. Supports three sizes:
          small, medium, large.
        </BlockQuote>
        <DemoWidget name="CheckBox" width={200}>
          {Large}
        </DemoWidget>
      </Section>
      <Section title="Custom Checkbox style">
        <BlockQuote>
          Change the outlook of the Checkbox via the <code>checkBoxStyle</code>{' '}
          prop.
        </BlockQuote>
        <DemoWidget name="CheckBox" width={150}>
          {CustomStyle}
        </DemoWidget>
      </Section>
      <Section title="All Sizes">
        <DemoWidget name="CheckBox" width={200}>
          {CustomStyle}
        </DemoWidget>
        <DemoWidget name="CheckBox" width={200}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="CheckBox" width={200}>
          {LargeRounded}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
