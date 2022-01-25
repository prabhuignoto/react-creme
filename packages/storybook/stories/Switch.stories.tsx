import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  CheckIcon,
  Default,
  Disabled,
  ExtraLarge,
  LabelOutside,
  Large,
} from '../../documentation/components/switch/widget-variants';
import { Switch } from '../../lib/components';

export default {
  component: Switch,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Switch',
} as ComponentMeta<typeof Switch>;

export const DefaultSwitch = () => <>{Default}</>;
export const DisabledSwitch = () => <>{Disabled}</>;
export const LargeSwitch = () => <>{Large}</>;
export const ExtraLargeSwitch = () => <>{ExtraLarge}</>;
export const LabelOutsideSwitch = () => <>{LabelOutside}</>;
export const CheckIconSwitch = () => <>{CheckIcon}</>;
