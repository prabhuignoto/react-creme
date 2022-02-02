import React from 'react';
import { Section } from '../../../lib/components';
import { MenuButton } from '../../../lib/components/menu-button/menu-button';
import { DemoWidget } from '../../common/demo-widget';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget>
          <MenuButton items={['save', 'save as new', 'discard']} width={150} />
        </DemoWidget>
      </Section>
      <Section title="Right to Left">
        <DemoWidget>
          <MenuButton
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
