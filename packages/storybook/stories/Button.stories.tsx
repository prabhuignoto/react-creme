export {
  Default,
  Disabled,
  Icon,
  Large,
  Medium,
  SearchingState,
} from '../../documentation/components/buttons/widget-variants';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Button } from '../../lib/components';

export default {
  component: Button,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Button',
} as ComponentMeta<typeof Button>;
