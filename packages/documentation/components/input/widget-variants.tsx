import React from 'react';
import { Input } from '../../../lib/components';
import { ChevronRightIcon } from '../../../lib/icons';

export const Default = <Input enableClear></Input>;
export const WithIcon = (
  <Input enableClear focusable>
    <ChevronRightIcon />
  </Input>
);
export const WithBorder = (
  <Input enableClear border>
    <ChevronRightIcon />
  </Input>
);
export const Error = <Input enableClear state="error" focusable></Input>;
export const Success = <Input enableClear state="success"></Input>;
export const RTL = (
  <Input enableClear focusable RTL>
    <ChevronRightIcon />
  </Input>
);
