import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Sidebar } from '../../lib/components';
export {
  Default,
  Searchable,
} from '../../documentation/components/sidebar/widget-variants';

export default {
  component: Sidebar,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Sidebar',
} as ComponentMeta<typeof Sidebar>;
