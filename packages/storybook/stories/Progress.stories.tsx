import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Progress } from '../../lib/components';
export {
  Circular,
  Error,
  Infinite,
  Success,
} from '../../documentation/components/progress/widget-variants';

export default {
  component: Progress,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Progress',
} as ComponentMeta<typeof Progress>;
