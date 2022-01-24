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
      <Section title="Default Render">
        <DemoWidget width={200}>{Default}</DemoWidget>
      </Section>
      <Section title="Preselected Option">
        <DemoWidget width={200}>{PreSelected}</DemoWidget>
      </Section>
      <Section title="Disabled Option">
        <DemoWidget width={200}>{Disabled}</DemoWidget>
      </Section>
      <Section title="Checkbox Group - Round style">
        <DemoWidget width={200}>{CustomStyle}</DemoWidget>
      </Section>
      <Section title="Checkbox Group - RTL">
        <DemoWidget width={200}>{RTL}</DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
