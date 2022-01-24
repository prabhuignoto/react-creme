import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  Disabled,
  Icon,
  Large,
  Medium,
  SearchingState,
} from '../../documentation/components/buttons/widget-variants';
import { Button } from '../../lib/components';

export default {
  component: Button,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Button',
} as ComponentMeta<typeof Button>;

export const DefaultRender = () => <>{Default}</>;
export const DisabledState = () => <>{Disabled}</>;
export const ButtonWithIcon = () => <>{Icon}</>;
export const LargeButton = () => <>{Large}</>;
export const MediumButton = () => <>{Medium}</>;
export const SearchState = () => <>{SearchingState}</>;
