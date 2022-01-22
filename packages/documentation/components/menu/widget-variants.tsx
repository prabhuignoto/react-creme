import React from 'react';
import { Button, Menu } from '../../../lib/components';
import { CheckCircleIcon } from '../../../lib/icons';

export const AttachedToButton = () => (
  <Menu
    position="left"
    items={[
      { name: 'Open' },
      { name: 'Save As' },
      { name: 'Close' },
      { name: 'Exit' },
    ]}
  >
    <Button label="File"></Button>
  </Menu>
);

export const AttachedToIcon = () => (
  <Menu
    items={[
      { name: 'Open' },
      { name: 'Save As' },
      { name: 'Close' },
      { name: 'Exit' },
    ]}
  >
    <Button type="icon" size="lg">
      <CheckCircleIcon />
    </Button>
  </Menu>
);

export const AttachedToNativeElement = () => (
  <Menu
    position="right"
    items={[
      { name: 'Open' },
      { name: 'Save As' },
      { name: 'Close' },
      { name: 'Exit' },
    ]}
    focusable={false}
  >
    <input type="button" value="File" />
  </Menu>
);
