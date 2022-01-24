import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  AttachedToButton,
  AttachedToIcon,
  AttachedToNativeElement,
} from '../../documentation/components/menu/widget-variants';
import { Menu } from '../../lib/components';

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

export const AttachedToButtonExample = () => <>{AttachedToButton}</>;
export const AttachedToIconExample = () => <>{AttachedToIcon}</>;
export const AttachedToNativeElementExample = () => (
  <>{AttachedToNativeElement}</>
);
