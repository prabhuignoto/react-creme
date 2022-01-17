import { render } from '@testing-library/react';
import React from 'react';
import { DataGridCell } from '../data-grid-cell';

describe('DataGridCell', () => {
  it('should render the data grid cell', () => {
    const { getByText, getByRole } = render(
      <DataGridCell name="name" value="john" />
    );

    expect(getByText('john')).toBeInTheDocument();

    expect(getByRole('cell')).toBeInTheDocument();
    expect(getByRole('cell')).toHaveClass('rc-data-grid-cell');
  });

  it('should render with border', () => {
    const { getByRole } = render(
      <DataGridCell name="name" value="john" border />
    );

    expect(getByRole('cell')).toHaveClass('rc-data-grid-cell-border');
  });
});
