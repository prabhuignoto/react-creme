import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Horizontal,
  Vertical,
} from '../../documentation/components/carousel/widget-variants';
import { Carousel } from '../../lib/components';

export const HorizontalMode = () => (
  <div style={{ height: '450px', width: '650px' }}>
    <Horizontal />
  </div>
);

export const VerticalMode = () => (
  <div style={{ height: '450px', width: '650px' }}>
    <Vertical />
  </div>
);

export default {
  component: Carousel,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Carousel',
} as ComponentMeta<typeof Carousel>;
