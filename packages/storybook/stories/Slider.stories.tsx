import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  CustomTooltipPosition,
  Default,
  Disabled,
  PreSelected,
  TooltipFormatted,
  TooltipOnHover,
} from '../../documentation/components/slider/widget-variants';
import { Slider } from '../../lib/components';

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

export const CustomTooltipPositionExample = () => <>{CustomTooltipPosition}</>;
export const DefaultExample = () => <>{Default}</>;
export const DisabledExample = () => <>{Disabled}</>;
export const PreSelectedExample = () => <>{PreSelected}</>;
export const TooltipFormattedExample = () => <>{TooltipFormatted}</>;
export const TooltipOnHoverExample = () => <>{TooltipOnHover}</>;
