import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  CustomIcon,
  CustomIconCount,
  CustomSize,
  Default,
  Disabled,
  RTL,
} from '../../documentation/components/rate/widget-variants';
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

export const CustomIconExample = () => <>{CustomIcon}</>;
export const CustomIconCountExample = () => <>{CustomIconCount}</>;
export const CustomSizeExample = () => <>{CustomSize}</>;
export const DefaultExample = () => <>{Default}</>;
export const DisabledExample = () => <>{Disabled}</>;
export const RTLExample = () => <>{RTL}</>;
