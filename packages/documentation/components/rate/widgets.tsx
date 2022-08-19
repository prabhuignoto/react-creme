import { BlockQuote, Section } from '@core';
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
      <Section title="Rating default" size="md">
        <DemoWidget name="Rate">{Default}</DemoWidget>
      </Section>
      <Section title="Custom icon count" size="md">
        <BlockQuote>
          Use the <code>iconCount</code> prop to customize the number of icons.
          The example renders the component with 3 icons.
        </BlockQuote>
        <DemoWidget name="Rate">{CustomIconCount}</DemoWidget>
      </Section>
      <Section title="Custom Icon" size="md">
        <BlockQuote>
          Customize the icon with the <code>icon</code> prop.
        </BlockQuote>
        <DemoWidget name="Rate">{CustomIcon}</DemoWidget>
      </Section>
      <Section title="Custom size" size="md">
        <BlockQuote>
          Choose a custom size with the <code>size</code> prop. The prop value
          can be <code>sm</code>, <code>md</code> or <code>lg</code>.
        </BlockQuote>
        <DemoWidget name="Rate">{CustomSize}</DemoWidget>
      </Section>
      <Section title="Disabled state" size="md">
        <DemoWidget name="Rate">{Disabled}</DemoWidget>
      </Section>
      <Section title="RTL" size="md">
        <DemoWidget name="Rate">{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
