import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Accent, Default, RTL } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render">
        <DemoWidget width={300}>{Default}</DemoWidget>
      </Section>
      <Section title="Rounded Accent">
        <DemoWidget width={300}>{Accent}</DemoWidget>
      </Section>
      <Section title="RTL">
        <DemoWidget width={300}>{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
