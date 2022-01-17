import { render } from '@testing-library/react';
import React from 'react';
import { DataGridHeader } from '../data-grid-header';

describe('DataGridHeader', () => {
  it('should render the headers correctly', () => {
    const { getByText } = render(
      <DataGridHeader
        columns={[
          {
            name: 'property',
            type: 'string',
          },
          {
            name: 'value',
            type: 'string',
          },
        ]}
      />
    );

    expect(getByText('property')).toBeInTheDocument();
    expect(getByText('value')).toBeInTheDocument();
  });

  it('headers should be sortable', () => {
    const { getByText, getAllByRole } = render(
      <DataGridHeader
        columns={[
          {
            name: 'property',
            type: 'string',
            sortable: true,
          },
          {
            name: 'value',
            type: 'string',
          },
        ]}
      />
    );

    expect(getByText('property')).toBeInTheDocument();
    expect(getByText('value')).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(2);
  });
});
