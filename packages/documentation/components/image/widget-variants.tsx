import React from 'react';
import { Image } from '../../../lib/components';

export const Default = () => (
  <Image
    width={200}
    height={200}
    src="https://images.unsplash.com/photo-1637196268676-ccfe49d8ba1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
  />
);

export const Expand = () => (
  <Image
    width={300}
    height={200}
    expandImageOnClick
    src="https://images.unsplash.com/photo-1639074430062-2a2c8d3b1f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
  />
);
