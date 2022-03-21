import React from 'react';
import { Pin } from '../../../lib/components';

export const Default = <Pin />;
export const CustomLength = (
  <Pin length={5} onChange={val => console.log(val)} />
);
export const RTL = <Pin length={4} />;
