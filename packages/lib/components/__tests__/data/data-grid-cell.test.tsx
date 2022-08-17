import { render } from '@testing-library/react';
import { DataGridCell } from '../../data/data-grid/data-grid-cell';
import styles from '../data/data-grid/data-grid.module.scss';

describe('DataGridCell', () => {
  it.concurrent('should render the data grid cell', async () => {
    const { getByText, getByRole } = render(
      <DataGridCell name="name" value="john" />
    );

    expect(getByText('john')).toBeInTheDocument();

    expect(getByRole('cell')).toBeInTheDocument();
    expect(getByRole('cell')).toHaveClass(styles.cell);
  });

  it.concurrent('should render with border', async () => {
    const { getByRole } = render(
      <DataGridCell name="name" value="john" border />
    );

    expect(getByRole('cell')).toHaveClass(styles.cell_border);
  });
});
