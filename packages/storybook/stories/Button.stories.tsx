import type { Meta } from '@storybook/react';
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

const meta: Meta<typeof Button> = {
  component: Button,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Button',
  tags: ['autodocs'],
};

export default meta;

export const DefaultRender = () => <>{Default}</>;
export const DisabledState = () => <>{Disabled}</>;
export const ButtonWithIcon = () => <>{Icon}</>;
export const LargeButton = () => <>{Large}</>;
export const MediumButton = () => <>{Medium}</>;
export const SearchState = () => <>{SearchingState}</>;
