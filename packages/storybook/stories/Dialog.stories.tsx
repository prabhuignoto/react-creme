import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  Drop,
} from '../../documentation/components/dialog/widget-variants';
import { Dialog } from '../../lib/components';

export default {
  component: Dialog,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '100%', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Dialog',
} as ComponentMeta<typeof Dialog>;

export const DropExample = () => <>{Drop}</>;
export const DefaultDialog = () => <>{Default}</>;
