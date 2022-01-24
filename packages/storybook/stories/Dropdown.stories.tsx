import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  MultiSelection,
  RTL,
  Searchable,
  SingleSelection,
  Virtualized,
} from '../../documentation/components/dropdown/widget-variants';
import { Dropdown } from '../../lib/components';

export default {
  component: Dropdown,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Dropdown',
} as ComponentMeta<typeof Dropdown>;

export const MultiSelectionDropdown = () => <>{MultiSelection}</>;
export const RTLDropdown = () => <>{RTL}</>;
export const SearchableDropdown = () => <>{Searchable}</>;
export const SingleSelectionDropdown = () => <>{SingleSelection}</>;
export const VirtualizedDropdown = () => <>{Virtualized}</>;
