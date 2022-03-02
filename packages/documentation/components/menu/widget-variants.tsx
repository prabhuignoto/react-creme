import React from 'react';
import { Button, Menu } from '../../../lib/components';

export const AttachedToButton = (
  <Menu
    dockPosition="left"
    items={[
      { name: 'Open' },
      { name: 'Save As' },
      { name: 'Close' },
      { name: 'Exit' },
    ]}
    size="sm"
  >
    <Button label="File" size="sm"></Button>
  </Menu>
);

export const AttachedToIcon = (
  <Menu
    items={[
      { name: 'Open' },
      { name: 'Save As' },
      { name: 'Close' },
      { name: 'Exit' },
    ]}
    dockPosition="center"
  >
    <Button size="md" label="Open Menu">
      {/* <CheckCircleIcon /> */}
    </Button>
  </Menu>
);

export const AttachedToNativeElement = (
  <Menu
    dockPosition="left"
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
