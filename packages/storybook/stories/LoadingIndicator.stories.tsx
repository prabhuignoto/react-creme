import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  CircleShape,
  CustomSize,
  CustomSpeed,
  Default,
  FineGrainedSize,
  LoadingIndicatorCount,
  RTL,
} from '../../documentation/components/loading-indicator/widget-variants';
import { LoadingIndicator } from '../../lib/components';

export default {
  component: LoadingIndicator,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Loading Indicator',
} as ComponentMeta<typeof LoadingIndicator>;

export const DefaultLoadingIndicator = () => <>{Default}</>;
export const RTLLoadingIndicator = () => <>{RTL}</>;
export const CircleShapeLoadingIndicator = () => <>{CircleShape}</>;
export const CustomSpeedLoadingIndicator = () => <>{CustomSpeed}</>;
export const CustomSizeLoadingIndicator = () => <>{CustomSize}</>;
export const FineGrainedSizeLoadingIndicator = () => <>{FineGrainedSize}</>;
export const LoadingIndicatorCountLoadingIndicator = () => (
  <>{LoadingIndicatorCount}</>
);
