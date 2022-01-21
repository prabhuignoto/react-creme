export {
  CustomIcon,
  CustomIconCount,
  CustomSize,
  Default,
  Disabled,
  RTL,
} from '../../documentation/components/rate/widget-variants';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Rate } from '../../lib/components';

export default {
  component: Rate,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Rate',
} as ComponentMeta<typeof Rate>;
