import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Border,
  Default,
  LargeSize,
  MediumSize,
  RTL,
} from '../../documentation/components/input-number/widget-variants';
import { InputNumber } from '../../lib/components';

export default {
  component: InputNumber,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'InputNumber',
} as ComponentMeta<typeof InputNumber>;

export const DefaultInputNumber = () => <>{Default}</>;
export const Medium = () => <>{MediumSize}</>;
export const Large = () => <>{LargeSize}</>;
export const WithBorder = () => <>{Border}</>;
export const RTLMode = () => <>{RTL}</>;
