import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  Default,
  MultiSelection,
  Search,
  Virtualized,
} from '../../documentation/components/list/widget-variants';
import { List } from '../../lib/components';

export default {
  component: List,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '650px', margin: '0 auto', width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'List',
} as ComponentMeta<typeof List>;

export const DefaultList = () => <>{Default}</>;
export const MultiSelectionList = () => <>{MultiSelection}</>;
export const SearchList = () => <>{Search}</>;
export const VirtualizedList = () => <>{Virtualized}</>;
