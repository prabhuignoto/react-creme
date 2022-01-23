import React from 'react';
import { BlockQuote, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { CustomStyle, Default, Disabled, Large } from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget width={250}>{Default}</DemoWidget>
      </Section>
      <Section title="Disabled State">
        <DemoWidget width={250}>{Disabled}</DemoWidget>
      </Section>
      <Section title="Large size">
        <BlockQuote>Comes in three sizes: small, medium, large.</BlockQuote>
        <DemoWidget width={250}>{Large}</DemoWidget>
      </Section>
      <Section title="Custom Checkbox style">
        <DemoWidget width={250}>{CustomStyle}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
