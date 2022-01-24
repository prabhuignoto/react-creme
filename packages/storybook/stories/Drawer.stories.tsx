import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Bottom,
  Left,
  Right,
  Top,
} from '../../documentation/components/drawer/widget-variants';
import { Drawer } from '../../lib/components';

export default {
  component: Drawer,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Drawer',
} as ComponentMeta<typeof Drawer>;

export const TopDrawer = () => <>{Top}</>;
export const RightDrawer = () => <>{Right}</>;
export const BottomDrawer = () => <>{Bottom}</>;
export const LeftDrawer = () => <>{Left}</>;
