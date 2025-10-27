/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { DataGridCell } from '../data-grid-cell';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../data-grid.module.scss';

describe('DataGridCell', () => {
  it('should render the data grid cell', async () => {
    const { getByText, getByRole } = render(
      <DataGridCell name="name" value="john" />
    );

    expect(getByText('john')).toBeInTheDocument();

    expect(getByRole('cell')).toBeInTheDocument();
    expect(getByRole('cell')).toHaveClass(styles.cell);
  });

  it('should render with border', async () => {
    const { getByRole } = render(
      <DataGridCell name="name" value="john" border />
    );

    expect(getByRole('cell')).toHaveClass(styles.cell_border);
  });

  it('should render formatted value when formatter is provided', async () => {
    const formatter = (value: string | number) => `Formatted: ${value}`;
    const { getByText } = render(
      <DataGridCell name="name" value="john" formatter={formatter} />
    );

    expect(getByText('Formatted: john')).toBeInTheDocument();
  });

  it('should apply zebra styling', async () => {
    const { getByRole } = render(
      <DataGridCell name="name" value="john" zebra />
    );

    expect(getByRole('cell')).toHaveClass(styles.zebra);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<DataGridCell />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
