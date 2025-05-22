import { render } from '@testing-library/react';
import { DataGridRow } from '../data-grid-row';
import styles from '../data-grid.module.scss';

describe('DataGridRow', () => {
  it('should render the row with correct data', async () => {
    const { getByText } = render(
      <DataGridRow
        data={{ name: 'John', age: 30 }}
        columnConfigs={[
          { name: 'name', type: 'string' },
          { name: 'age', type: 'number' },
        ]}
      />
    );

    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
  });

  it('should apply zebra styling', async () => {
    const { container } = render(
      <DataGridRow
        data={{ name: 'John' }}
        columnConfigs={[{ name: 'name', type: 'string' }]}
        zebra
      />
    );

    expect(container.firstChild).toHaveClass(styles.zebra);
  });
});
