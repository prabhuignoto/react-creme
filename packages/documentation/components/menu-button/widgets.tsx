import React from 'react';
import { Section } from '../../../lib/components';
import { MenuButton } from '../../../lib/components/menu-button/menu-button';
import { DemoWidget } from '../../common/demo-widget';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render" size="md">
        <DemoWidget width={100}>
          <MenuButton
            items={['save', 'save as new', 'discard']}
            width={150}
            size="sm"
          />
        </DemoWidget>
      </Section>
      <Section title="Right to Left" size="md">
        <DemoWidget>
          <MenuButton
            items={['save', 'save as new', 'discard']}
            width={100}
            RTL
          />
        </DemoWidget>
      </Section>
      <Section title="Custom sizes" size="md">
        <DemoWidget>
          <MenuButton
            size="md"
            items={['save', 'save as new', 'discard']}
            width={150}
            RTL
          />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
