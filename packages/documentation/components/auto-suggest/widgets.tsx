import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default } from './widget-variants';

function Widgets() {
  return (
    <Section title="Default Render">
      <DemoWidget width={300}>{Default}</DemoWidget>
    </Section>
  );
}

export default Widgets;
