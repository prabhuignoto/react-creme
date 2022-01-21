import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Slider } from '../../lib/components';
export {
  CustomTooltipPosition,
  Default,
  Disabled,
  PreSelected,
  TooltipFormatted,
  TooltipOnHover,
} from '../../documentation/components/slider/widget-variants';

export default {
  component: Slider,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Slider',
} as ComponentMeta<typeof Slider>;
