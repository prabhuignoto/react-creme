export {
  Default,
  Disabled,
  Icons,
  Rounded,
} from '../../documentation/components/tabs/widget-variants';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Tabs } from '../../lib/components';

export default {
  component: Tabs,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '750px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Tabs',
} as ComponentMeta<typeof Tabs>;
