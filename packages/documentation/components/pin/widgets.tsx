import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { CustomLength, Default, RTL } from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget width={300}>{Default}</DemoWidget>
      </Section>
      <Section title="Custom length">
        <DemoWidget width={300}>{CustomLength}</DemoWidget>
      </Section>
      <Section title="RTL">
        <DemoWidget width={300}>{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
