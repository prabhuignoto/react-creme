import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { CheckBoxGroup } from '../../lib/components';

import {
  CustomStyle,
  Default,
  Disabled,
  PreSelected,
  RTL,
} from '../../documentation/components/checkbox-group/widget-variants';

export default {
  component: CheckBoxGroup,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'CheckBox Group',
} as ComponentMeta<typeof CheckBoxGroup>;

export const CustomStyleExample = () => <>{CustomStyle}</>;
export const DefaultExample = () => <>{Default}</>;
export const DisabledExample = () => <>{Disabled}</>;
export const PreSelectedExample = () => <>{PreSelected}</>;
export const RTLExample = () => <>{RTL}</>;