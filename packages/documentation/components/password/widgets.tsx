import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Large, Medium, RTL } from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render" size="md">
        <DemoWidget width={320}>{Default}</DemoWidget>
      </Section>
      <Section title="RTL" size="md">
        <DemoWidget width={320}>{RTL}</DemoWidget>
      </Section>
      <Section title="Custom Sizes" size="md">
        <DemoWidget width={320}>{Medium}</DemoWidget>
        <DemoWidget width={320}>{Large}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
