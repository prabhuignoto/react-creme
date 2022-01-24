import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Horizontal,
  Vertical,
} from '../../documentation/components/carousel/widget-variants';
import { Carousel } from '../../lib/components';

export default {
  component: Carousel,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '650px', height: '450px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Carousel',
} as ComponentMeta<typeof Carousel>;

export const HorizontalCarousel = () => <>{Horizontal}</>;
export const VerticalCarousel = () => <>{Vertical}</>;
