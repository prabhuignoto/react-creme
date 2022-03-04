import React from 'react';
import { MenuBar, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Menu attached to a Button" size="md">
        <DemoWidget width={350} style={{ marginLeft: '2rem' }}>
          <MenuBar
            items={[
              {
                items: [
                  {
                    name: 'Open',
                  },
                  {
                    name: 'Save As',
                  },
                  {
                    name: 'Save',
                  },
                  {
                    name: 'Close',
                  },
                ],
                name: 'File',
              },
              {
                items: [
                  {
                    name: 'Cut',
                  },
                  {
                    name: 'Copy',
                  },
                  {
                    name: 'Paste',
                  },
                  {
                    name: 'Select All',
                  },
                ],
                name: 'Edit',
              },
              {
                items: [
                  {
                    name: 'About',
                  },
                  {
                    name: 'Version',
                  },
                ],
                name: 'Help',
              },
            ]}
          />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
