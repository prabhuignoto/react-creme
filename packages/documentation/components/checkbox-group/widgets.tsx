import React from 'react';
import { Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Disabled } from '../buttons/widget-variants';
import { CustomStyle, Default, PreSelected, RTL } from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render">
        <DemoWidget>
          <Default />
        </DemoWidget>
      </Section>
      <Section title="Preselected Option">
        <DemoWidget>
          <PreSelected />
        </DemoWidget>
      </Section>
      <Section title="Disabled Option">
        <DemoWidget>
          <Disabled />
        </DemoWidget>
      </Section>
      <Section title="Checkbox Group - Round style">
        <DemoWidget>
          <CustomStyle />
        </DemoWidget>
      </Section>
      <Section title="Checkbox Group - RTL">
        <DemoWidget>
          <RTL />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
