import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  largeSized,
  mediumSized,
  WithCombination,
} from '../../documentation/components/kbd/widget-variants';
import { Kbd } from '../../lib/components';

export default {
  component: Kbd,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '450px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Kbd',
} as ComponentMeta<typeof Kbd>;

export const Combination = () => <>{WithCombination}</>;
export const DefaultKbd = () => <>{Default}</>;
export const Medium = () => <>{mediumSized}</>;
export const Large = () => <>{largeSized}</>;
