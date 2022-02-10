import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  Selection,
} from '../../documentation/components/tree/widget-variants';
import { Tree } from '../../lib/components';

export default {
  component: Tree,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '650px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Tree',
} as ComponentMeta<typeof Tree>;

export const CustomImageExample = () => <>{Selection}</>;
export const DefaultTree = () => <>{Default}</>;
