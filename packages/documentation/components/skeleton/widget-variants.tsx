import React from 'react';
import { Skeleton } from '../../../lib/components';

export const Default = () => <Skeleton rows={6} rowHeight={6} blocks={1} />;

export const Circle = () => (
  <Skeleton rows={6} rowHeight={6} blocks={1} showCircle />
);

export const CustomRowAndHeight = () => (
  <Skeleton rows={8} rowHeight={5} blocks={1} />
);

export const Animate = () => <Skeleton rows={6} rowHeight={8} animate />;

export const CustomBlockCount = () => (
  <Skeleton rows={4} rowHeight={8} blocks={2} />
);
