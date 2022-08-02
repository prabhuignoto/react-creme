import React from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { CustomSpeed, Default, Large, Medium } from './widget-variants';

const Widgets = () => {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render" size="md">
        <DemoWidget name="Spinner" width={200}>
          {Default}
        </DemoWidget>
      </Section>
      <Section title="Custom Speed" size="md">
        <BlockQuote>
          The speed of the spinner can be adjusted through the{' '}
          <code>speed</code> prop.
        </BlockQuote>
        <DemoWidget name="Spinner" width={200}>
          {CustomSpeed}
        </DemoWidget>
      </Section>
      <Section title="Custom sizes" size="md">
        <BlockQuote>
          Three different sizes are available for the spinner. <code>sm</code>,{' '}
          <code>md</code> and <code>lg</code>.
        </BlockQuote>
        <DemoWidget name="Spinner" width={200}>
          {Default}
        </DemoWidget>
        <DemoWidget name="Spinner" width={200}>
          {Medium}
        </DemoWidget>
        <DemoWidget name="Spinner" width={200}>
          {Large}
        </DemoWidget>
      </Section>
    </div>
  );
};

export default Widgets;
