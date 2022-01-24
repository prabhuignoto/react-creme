import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  Error,
  RTL,
  Success,
  WithBorder,
  WithIcon,
} from '../../documentation/components/input/widget-variants';
import { Input } from '../../lib/components';

export default {
  component: Input,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Input',
} as ComponentMeta<typeof Input>;

export const DefaultInput = () => <>{Default}</>;
export const WithIconInput = () => <>{WithIcon}</>;
export const WithBorderInput = () => <>{WithBorder}</>;
export const ErrorInput = () => <>{Error}</>;
export const SuccessInput = () => <>{Success}</>;
export const RTLInput = () => <>{RTL}</>;
