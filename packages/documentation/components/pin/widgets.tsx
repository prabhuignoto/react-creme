import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { CustomLength, Default, RTL } from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget fullWidth>{Default}</DemoWidget>
      </Section>
      <Section title="Custom length">
        <DemoWidget fullWidth>{CustomLength}</DemoWidget>
      </Section>
      <Section title="RLT">
        <DemoWidget fullWidth>{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
