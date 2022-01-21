export {
  BottomLeft,
  LeftTop,
  RightCenter,
  TopCenter,
} from '../../documentation/components/tooltip/widget-variants';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Tooltip } from '../../lib/components';

export default {
  component: Tooltip,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', marginTop: '200px', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Tooltip',
} as ComponentMeta<typeof Tooltip>;
