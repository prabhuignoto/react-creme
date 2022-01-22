import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Skeleton } from '../../lib/components';
export {
  Animate,
  Circle,
  CustomBlockCount,
  CustomRowAndHeight,
  Default,
} from '../../documentation/components/skeleton/widget-variants';

export default {
  component: Skeleton,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Skeleton',
} as ComponentMeta<typeof Skeleton>;
