import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default } from './widget-variants';

function Widgets() {
  return (
    <Section title="Default Render">
      <DemoWidget>
        <Default />
      </DemoWidget>
    </Section>
  );
}

export default Widgets;
