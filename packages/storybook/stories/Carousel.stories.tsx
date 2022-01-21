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
  title: 'Carousel',
};
