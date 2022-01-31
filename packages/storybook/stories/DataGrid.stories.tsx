import { ComponentMeta } from '@storybook/react';
import React from 'react';
import {
  columnsConfig,
  data,
} from '../../documentation/components/data-grid/grids-data';
import { DataGrid } from '../../lib/components';

export default {
  component: DataGrid,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ height: '750px', margin: '0 auto', width: '850px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'DataGrid',
} as ComponentMeta<typeof DataGrid>;

export const Comfortable = () => (
  <DataGrid
    layoutStyle="comfortable"
    border
    columns={columnsConfig}
    data={data}
  />
);

export const Compact = () => (
  <DataGrid
    layoutStyle="compact"
    fixedHeight
    border
    columns={columnsConfig}
    data={data}
  />
);

export const Zebra = () => (
  <DataGrid
    layoutStyle="comfortable"
    zebra
    columns={columnsConfig}
    data={data}
  />
);
