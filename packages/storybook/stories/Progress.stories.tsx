import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Circular,
  Error,
  Infinite,
  Success,
} from '../../documentation/components/progress/widget-variants';
import { Progress } from '../../lib/components';

export default {
  component: Progress,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Progress',
} as ComponentMeta<typeof Progress>;

export const CircularProgress = () => <>{Circular}</>;
export const ErrorProgress = () => <>{Error}</>;
export const InfiniteProgress = () => <>{Infinite}</>;
export const SuccessProgress = () => <>{Success}</>;
