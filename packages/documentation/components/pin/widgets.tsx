import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomLength,
  Default,
  LargeSized,
  MediumSized,
  RTL,
  SmallSized,
} from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget width={300}>{Default}</DemoWidget>
      </Section>
      <Section title="Custom length">
        <BlockQuote>
          Customize the number of pins via the <code>length</code> property
        </BlockQuote>
        <DemoWidget width={300}>{CustomLength}</DemoWidget>
      </Section>
      <Section title="RTL">
        <BlockQuote>
          Use the <code>RTL</code> prop to render the pin in RTL mode.
        </BlockQuote>
        <DemoWidget width={300}>{RTL}</DemoWidget>
      </Section>
      <Section title="Custom Sizes">
        <BlockQuote>
          Customize the pin size with the <code>size</code> prop
        </BlockQuote>
        <DemoWidget width={300}>{SmallSized}</DemoWidget>
        <DemoWidget width={300}>{MediumSized}</DemoWidget>
        <DemoWidget width={300}>{LargeSized}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
