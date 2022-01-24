import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  CustomStyle,
  Default,
  Disabled,
  Large,
} from '../../documentation/components/checkbox/widget-variants';
import { CheckBox } from '../../lib/components';

export default {
  component: CheckBox,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'CheckBox',
} as ComponentMeta<typeof CheckBox>;

export const CustomStyleExample = () => <>{CustomStyle}</>;
export const DefaultExample = () => <>{Default}</>;
export const DisabledExample = () => <>{Disabled}</>;
export const LargeExample = () => <>{Large}</>;
