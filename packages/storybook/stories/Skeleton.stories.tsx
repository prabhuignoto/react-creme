import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Animate,
  Circle,
  CustomBlockCount,
  CustomRowAndHeight,
  Default,
} from '../../documentation/components/skeleton/widget-variants';
import { Skeleton } from '../../lib/components';

export default {
  component: Skeleton,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Skeleton',
} as ComponentMeta<typeof Skeleton>;

export const AnimateSkeleton = () => <>{Animate}</>;
export const CircleSkeleton = () => <>{Circle}</>;
export const CustomBlockCountSkeleton = () => <>{CustomBlockCount}</>;
export const CustomRowAndHeightSkeleton = () => <>{CustomRowAndHeight}</>;
export const DefaultSkeleton = () => <>{Default}</>;
