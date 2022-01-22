import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Dropdown } from '../../lib/components';
export {
  MultiSelection,
  RTL,
  Searchable,
  SingleSelection,
  Virtualized,
} from '../../documentation/components/dropdown/widget-variants';

export default {
  component: Dropdown,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Dropdown',
} as ComponentMeta<typeof Dropdown>;
