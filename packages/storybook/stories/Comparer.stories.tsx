import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { ImageComparer } from '../../lib/components';
import {
  Horizontal,
  Vertical,
} from '../../documentation/components/comparer/widget-variants';

export default {
  component: ImageComparer,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'ImageComparer',
} as ComponentMeta<typeof ImageComparer>;


export const HorizontalComparer = () => <>{Horizontal}</>;
export const VerticalComparer = () => <>{Vertical}</>;