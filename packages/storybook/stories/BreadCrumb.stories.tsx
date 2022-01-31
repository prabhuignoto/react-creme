import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { BreadCrumb } from '../../lib/components';
export {
  CustomIcon,
  CustomSize,
  Default,
  SelectedIndex,
  Slash,
} from '../../documentation/components/bread-crumb/widget-variants';

export default {
  component: BreadCrumb,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'BreadCrumb',
} as ComponentMeta<typeof BreadCrumb>;
