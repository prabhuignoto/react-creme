import { BlockQuote, Section } from '@core';
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
      <Section title="Default render" size="md">
        <DemoWidget name="Input" width={200}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="Input with a custom Icon" size="md">
        <BlockQuote>Use a custom icon inside the input.</BlockQuote>
        <DemoWidget name="Input" width={200}>
          {WithIcon}
        </DemoWidget>
      </Section>
      <Section title="Input with border" size="md">
        <BlockQuote>Use a custom icon inside the input.</BlockQuote>
        <DemoWidget name="Input" width={200}>
          {WithBorder}
        </DemoWidget>
      </Section>
      <Section title="States" size="md">
        <BlockQuote>
          Inputs can be configured to have different states. The example below
          shows input in error and success state
        </BlockQuote>
        <DemoWidget name="Input" width={200}>
          {Error}
        </DemoWidget>
        <DemoWidget name="Input" width={200}>
          {Success}
        </DemoWidget>
      </Section>
      <Section title="RTL" size="md">
        <DemoWidget name="Input" width={200}>
          {RTL}
        </DemoWidget>
      </Section>
      <Section title="Accent" size="md">
        <BlockQuote>
          Inputs can be configured to have different accents. The example below
          shows input in rounded accent.
        </BlockQuote>
        <DemoWidget name="Input" width={200}>
          {Accent}
        </DemoWidget>
      </Section>
      <Section title="Max length" size="md">
        <BlockQuote>
          Inputs can be configured to have a maximum length.
        </BlockQuote>
        <DemoWidget name="Input" width={200}>
          {MaxLength}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
