import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { Menu } from '../../lib/components';
export {
  AttachedToButton,
  AttachedToIcon,
  AttachedToNativeElement,
} from '../../documentation/components/menu/widget-variants';

export default {
  component: Menu,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Menu',
} as ComponentMeta<typeof Menu>;
