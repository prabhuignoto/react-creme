import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  CustomLayout,
  Default,
  Disabled,
  RTL,
} from '../../documentation/components/radio-group/widget-variants';
import { RadioGroup } from '../../lib/components';

export default {
  component: RadioGroup,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'RadioGroup',
} as ComponentMeta<typeof RadioGroup>;

export const CustomLayoutExample = () => <>{CustomLayout}</>;
export const DefaultExample = () => <>{Default}</>;
export const DisabledExample = () => <>{Disabled}</>;
export const RTLExample = () => <>{RTL}</>;
