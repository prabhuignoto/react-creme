import React from 'react';
import { Image } from '../../../lib/components';

export const Default = (
  <Image
    width={200}
    height={200}
    loaderSize="md"
    src="https://bit.ly/3q1ID4W"
  />
);

export const Expand = (
  <Image
    width={300}
    height={200}
    loaderSize="md"
    expandImageOnClick
    src="https://bit.ly/3q1ID4W"
  />
);
