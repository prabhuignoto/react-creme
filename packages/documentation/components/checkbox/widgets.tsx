import React from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { CustomStyle, Default, Disabled, Large } from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render" size="md">
        <DemoWidget width={220}>{Default}</DemoWidget>
      </Section>
      <Section title="Disabled State" size="md">
        <DemoWidget width={200}>{Disabled}</DemoWidget>
      </Section>
      <Section title="Large size" size="md">
        <BlockQuote>Comes in three sizes: small, medium, large.</BlockQuote>
        <DemoWidget width={200}>{Large}</DemoWidget>
      </Section>
      <Section title="Custom Checkbox style" size="md">
        <DemoWidget width={150}>{CustomStyle}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
