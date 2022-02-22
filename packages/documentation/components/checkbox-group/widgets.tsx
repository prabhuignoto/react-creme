import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import {
  CustomStyle,
  Default,
  Disabled,
  PreSelected,
  RTL,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render" size="md">
        <DemoWidget width={100}>{Default}</DemoWidget>
      </Section>
      <Section title="Preselected Option" size="md">
        <DemoWidget width={200}>{PreSelected}</DemoWidget>
      </Section>
      <Section title="Disabled Option" size="md">
        <DemoWidget width={200}>{Disabled}</DemoWidget>
      </Section>
      <Section title="Checkbox Group - Round style" size="md">
        <DemoWidget width={150}>{CustomStyle}</DemoWidget>
      </Section>
      <Section title="Checkbox Group - RTL" size="md">
        <DemoWidget width={150}>{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
