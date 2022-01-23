import React from 'react';
import { Rate } from '../../../lib/components';
import { SearchIcon } from '../../../lib/icons';

export const Default = <Rate size="md" />;

export const CustomIconCount = (
  <Rate size="lg" iconCount={3} focusable={false} value={2} />
);

export const CustomIcon = (
  <Rate size="md" icon={<SearchIcon />} iconCount={7} />
);

export const CustomSize = (
  <Rate
    onChange={val => console.log(val)}
    ratingValues={['one', 'two', 'three', 'four', 'five']}
  />
);

export const Disabled = <Rate size="md" disabled value={3} />;

export const RTL = <Rate size="md" RTL />;
